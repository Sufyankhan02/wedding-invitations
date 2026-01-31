import { useState, useEffect } from 'react';
import { useInvitation } from '@/context/InvitationContext';
import { fetchWishes, deleteWish } from '@/services/api';
import { Loader2, Calendar, User, MessageCircle, CheckCircle, XCircle, HelpCircle, Trash2 } from 'lucide-react';
import { formatEventDate } from '@/lib/formatEventDate';

export default function AdminDashboard() {
    const { uid } = useInvitation();
    const [wishes, setWishes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [deletingId, setDeletingId] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple hardcoded password for now
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect password');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this RSVP?')) return;
        
        try {
            setDeletingId(id);
            await deleteWish(uid, id);
            setWishes(prev => prev.filter(w => w.id !== id));
        } catch (err) {
            console.error('Error deleting wish:', err);
            alert('Error deleting wish: ' + err.message);
        } finally {
            setDeletingId(null);
        }
    };

    useEffect(() => {
        if (!uid || !isAuthenticated) return;

        const loadWishes = async () => {
            try {
                setIsLoading(true);
                const response = await fetchWishes(uid);
                if (response.success) {
                    setWishes(response.data);
                }
            } catch (err) {
                console.error('Error loading wishes:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadWishes();
    }, [uid, isAuthenticated]);

    const getAttendanceIcon = (status) => {
        const normalizedStatus = status?.toLowerCase();
        switch (normalizedStatus) {
            case 'attending':
                return <CheckCircle className="w-5 h-5 text-emerald-500" />;
            case 'not_attending':
            case 'not-attending':
                return <XCircle className="w-5 h-5 text-rose-500" />;
            case 'maybe':
                return <HelpCircle className="w-5 h-5 text-amber-500" />;
            default:
                return null;
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-rose-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-rose-100">
                    <h1 className="text-2xl font-serif text-gray-800 mb-6 text-center">Admin Access</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                                placeholder="Enter admin password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors font-medium"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif text-gray-800">RSVP Dashboard</h1>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                        <span className="text-gray-500 text-sm">Total Responses: </span>
                        <span className="font-bold text-rose-600 text-lg">{wishes.length}</span>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
                        {error}
                    </div>
                ) : wishes.length === 0 ? (
                    <div className="bg-white p-12 rounded-xl shadow-sm text-center">
                        <p className="text-gray-500">No RSVPs received yet.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 font-medium text-gray-500 text-sm">Guest Name</th>
                                        <th className="px-6 py-4 font-medium text-gray-500 text-sm">Status</th>
                                        <th className="px-6 py-4 font-medium text-gray-500 text-sm">Message</th>
                                        <th className="px-6 py-4 font-medium text-gray-500 text-sm">Time</th>
                                        <th className="px-6 py-4 font-medium text-gray-500 text-sm text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {wishes.map((wish) => (
                                        <tr key={wish.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">
                                                        {wish.name[0].toUpperCase()}
                                                    </div>
                                                    <span className="font-medium text-gray-900">{wish.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {getAttendanceIcon(wish.attendance || wish.attending)}
                                                    <span className="text-sm text-gray-700 capitalize">
                                                        {(wish.attendance || wish.attending || 'Unknown').replace('_', ' ').toLowerCase()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-600 max-w-md truncate" title={wish.message}>
                                                    {wish.message}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {formatEventDate(wish.created_at, 'short', true)}
                                                <br />
                                                <span className="text-xs">{formatEventDate(wish.created_at, 'time', true)}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(wish.id)}
                                                    disabled={deletingId === wish.id}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete RSVP"
                                                >
                                                    {deletingId === wish.id ? (
                                                        <Loader2 className="w-5 h-5 animate-spin text-red-500" />
                                                    ) : (
                                                        <Trash2 className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
