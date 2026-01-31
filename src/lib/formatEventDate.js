/**
 * Formats a date string into English (India) format
 * @param {string} isoString
 * @param {('full'|'short'|'time')} [format='full']
 * @returns {string}
 */

export const formatEventDate = (isoString, format = 'full') => {
    const date = new Date(isoString);

    const formats = {
        full: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Kolkata' // 🇮🇳 India Time
        },
        short: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Kolkata'
        },
        time: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        }
    };

    if (format === 'time') {
        return date.toLocaleTimeString('en-IN', formats[format]);
    }

    return date.toLocaleDateString('en-IN', formats[format]);
};
