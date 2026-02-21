/**
 * STORAGE.JS - Persistent Data Management
 * Manages leaderboard, certificates, and player data in localStorage
 */

class StorageManager {
    static KEYS = {
        LEADERBOARD: 'quiz_leaderboard',
        CERTIFICATES: 'quiz_certificates',
        PLAYER_STATS: 'quiz_player_stats'
    };

    static addLeaderboardEntry(entry) {
        try {
            const leaderboard = this.getLeaderboard();
            const entryWithId = {
                ...entry,
                id: this.generateId(),
                timestamp: Date.now()
            };
            leaderboard.push(entryWithId);
            
            // Sort by score descending
            leaderboard.sort((a, b) => b.score - a.score);
            
            localStorage.setItem(this.KEYS.LEADERBOARD, JSON.stringify(leaderboard));
            return entryWithId;
        } catch (e) {
            console.error('Failed to add leaderboard entry:', e);
            return null;
        }
    }

    static getLeaderboard(limit = 100) {
        try {
            const data = localStorage.getItem(this.KEYS.LEADERBOARD);
            const leaderboard = data ? JSON.parse(data) : [];
            
            // Deduplicate: Keep only the best score per player
            const bestScores = {};
            for (const entry of leaderboard) {
                const playerName = entry.playerName.toLowerCase();
                if (!bestScores[playerName] || entry.score > bestScores[playerName].score) {
                    bestScores[playerName] = entry;
                }
            }
            
            // Convert back to array and sort by score
            const deduplicated = Object.values(bestScores).sort((a, b) => b.score - a.score);
            return deduplicated.slice(0, limit);
        } catch (e) {
            console.error('Failed to retrieve leaderboard:', e);
            return [];
        }
    }

    static saveCertificate(certificate) {
        try {
            const certs = this.getCertificates();
            const certWithId = {
                ...certificate,
                id: this.generateId(),
                createdAt: Date.now()
            };
            certs.push(certWithId);
            localStorage.setItem(this.KEYS.CERTIFICATES, JSON.stringify(certs));
            return certWithId;
        } catch (e) {
            console.error('Failed to save certificate:', e);
            return null;
        }
    }

    static getCertificates() {
        try {
            const data = localStorage.getItem(this.KEYS.CERTIFICATES);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Failed to retrieve certificates:', e);
            return [];
        }
    }

    static getCertificateById(id) {
        try {
            const certs = this.getCertificates();
            return certs.find(cert => cert.id === id) || null;
        } catch (e) {
            console.error('Failed to retrieve certificate:', e);
            return null;
        }
    }

    static generateId() {
        return `CERT_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }

    static clearAllData() {
        try {
            localStorage.removeItem(this.KEYS.LEADERBOARD);
            localStorage.removeItem(this.KEYS.CERTIFICATES);
            localStorage.removeItem(this.KEYS.PLAYER_STATS);
            localStorage.removeItem('quiz_progress');
            localStorage.removeItem('quiz_questions_cache');
            localStorage.removeItem('pending_syncs');
        } catch (e) {
            console.error('Failed to clear data:', e);
        }
    }

    static getStorageStats() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length + key.length;
            }
        }
        return {
            sizeKB: (total / 1024).toFixed(2),
            entriesCount: Object.keys(localStorage).length
        };
    }
}

// Export for global use
window.StorageManager = StorageManager;
