import { supabase } from '@/lib/supabaseClient';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Fetch all wishes for an invitation
 * @param {string} uid - Invitation UID
 * @param {object} options - Query options (limit, offset)
 * @returns {Promise<object>} Response with wishes data
 */
export async function fetchWishes(uid, options = {}) {
  const { limit = 50, offset = 0 } = options;

  // Use Supabase if configured
  if (supabase) {
    const { data, error, count } = await supabase
      .from('wishes')
      .select('*', { count: 'exact' })
      .eq('uid', uid)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Supabase fetch error:', error);
      throw error;
    }

    return {
      success: true,
      data: data,
      pagination: { total: count, limit, offset }
    };
  }

  // Fallback to local server
  const url = new URL(`${API_URL}/api/${uid}/wishes`);
  url.searchParams.set('limit', limit);
  url.searchParams.set('offset', offset);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch wishes');
    }
    return response.json();
  } catch (error) {
    console.warn('Backend unavailable, returning mock wishes:', error);
    // Return mock data for demo purposes
    return {
      success: true,
      data: [
        {
          id: 1,
          name: "Guest Example",
          message: "Congratulations on your wedding! Wishing you a lifetime of love and happiness.",
          attendance: "ATTENDING",
          created_at: new Date().toISOString()
        }
      ],
      pagination: { total: 1, limit, offset }
    };
  }
}

/**
 * Create a new wish
 * @param {string} uid - Invitation UID
 * @param {object} wishData - Wish data (name, message, attendance)
 * @returns {Promise<object>} Response with created wish
 */
export async function createWish(uid, wishData) {
  // Use Supabase if configured
  if (supabase) {
    const { data, error } = await supabase
      .from('wishes')
      .insert([
        { 
          uid, 
          name: wishData.name, 
          message: wishData.message, 
          attendance: wishData.attendance 
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase create error:', error);
      throw error;
    }

    return {
      success: true,
      data: data
    };
  }

  try {
    const response = await fetch(`${API_URL}/api/${uid}/wishes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wishData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create wish');
    }
    return response.json();
  } catch (error) {
    console.warn('Backend unavailable, returning mock success:', error);
    // Simulate successful creation
    return {
      success: true,
      data: {
        id: Date.now(),
        name: wishData.name,
        message: wishData.message,
        attendance: wishData.attendance,
        created_at: new Date().toISOString()
      }
    };
  }
}

/**
 * Delete a wish (admin function)
 * @param {string} uid - Invitation UID
 * @param {number} wishId - Wish ID to delete
 * @returns {Promise<object>} Response with deletion confirmation
 */
export async function deleteWish(uid, wishId) {
  // Use Supabase if configured
  if (supabase) {
    const { error } = await supabase
      .from('wishes')
      .delete()
      .eq('id', wishId);

    if (error) {
      console.error('Supabase delete error:', error);
      throw error;
    }

    return { success: true };
  }

  const response = await fetch(`${API_URL}/api/${uid}/wishes/${wishId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete wish');
  }
  return response.json();
}

/**
 * Get attendance statistics
 * @param {string} uid - Invitation UID
 * @returns {Promise<object>} Response with stats data
 */
export async function fetchAttendanceStats(uid) {
  const response = await fetch(`${API_URL}/api/${uid}/stats`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch stats');
  }
  return response.json();
}

/**
 * Get invitation details
 * @param {string} uid - Invitation UID
 * @returns {Promise<object>} Response with invitation data
 */
export async function fetchInvitation(uid) {
  try {
    const response = await fetch(`${API_URL}/api/invitation/${uid}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch invitation');
    }
    return response.json();
  } catch (error) {
    console.warn('Backend unavailable, using static config fallback:', error);
    // Return success with null data to trigger static config fallback in useConfig hook
    // and prevent App.jsx from showing the error screen
    return { success: true, data: null };
  }
}
