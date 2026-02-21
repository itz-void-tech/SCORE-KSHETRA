/**
 * OFFLINE.JS - Offline-First Resilience
 * Caches questions and progress locally
 * Syncs when connection returns
 */

class OfflineManager {
    constructor() {
        this.isOnline = navigator.onLine;
        this.pendingSyncs = [];
        this.questionCache = {};
        this.progressCache = {};
        
        this.init();
    }

    init() {
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
    }

    handleOnline() {
        this.isOnline = true;
        this.updateOnlineStatus();
        this.syncPendingData();
    }

    handleOffline() {
        this.isOnline = false;
        this.updateOnlineStatus();
    }

    updateOnlineStatus() {
        const offlineBadge = document.getElementById('offlineBadge');
        if (offlineBadge) {
            if (this.isOnline) {
                offlineBadge.classList.add('hidden');
            } else {
                offlineBadge.classList.remove('hidden');
            }
        }
    }

    cacheQuestions(questions) {
        try {
            localStorage.setItem('quiz_questions_cache', JSON.stringify(questions));
            this.questionCache = questions;
        } catch (e) {
            console.error('Failed to cache questions:', e);
        }
    }

    getQuestionCache() {
        try {
            const cached = localStorage.getItem('quiz_questions_cache');
            return cached ? JSON.parse(cached) : null;
        } catch (e) {
            console.error('Failed to retrieve cached questions:', e);
            return null;
        }
    }

    saveProgress(quizData) {
        try {
            const progress = {
                mode: quizData.mode,
                currentQuestion: quizData.currentQuestion,
                answers: quizData.answers,
                timestamp: Date.now(),
                integrity: quizData.integrity
            };
            localStorage.setItem('quiz_progress', JSON.stringify(progress));
        } catch (e) {
            console.error('Failed to save progress:', e);
        }
    }

    getProgress() {
        try {
            const progress = localStorage.getItem('quiz_progress');
            return progress ? JSON.parse(progress) : null;
        } catch (e) {
            console.error('Failed to retrieve progress:', e);
            return null;
        }
    }

    clearProgress() {
        localStorage.removeItem('quiz_progress');
    }

    queueSync(data) {
        this.pendingSyncs.push({
            data: data,
            timestamp: Date.now()
        });
        
        try {
            localStorage.setItem('pending_syncs', JSON.stringify(this.pendingSyncs));
        } catch (e) {
            console.error('Failed to queue sync:', e);
        }
    }

    async syncPendingData() {
        if (!this.isOnline || this.pendingSyncs.length === 0) {
            return;
        }

        const syncStatus = document.getElementById('syncStatus');
        if (syncStatus) {
            syncStatus.textContent = 'Syncing...';
            syncStatus.classList.add('syncing');
        }

        try {
            // Attempt to sync each pending item
            for (const sync of this.pendingSyncs) {
                await this.pushLeaderboardEntry(sync.data);
            }

            this.pendingSyncs = [];
            localStorage.removeItem('pending_syncs');

            if (syncStatus) {
                syncStatus.textContent = 'Synced ✓';
                syncStatus.classList.remove('syncing');
                setTimeout(() => {
                    syncStatus.textContent = '';
                }, 2000);
            }
        } catch (e) {
            console.error('Sync failed:', e);
            if (syncStatus) {
                syncStatus.textContent = 'Sync failed - will retry';
                syncStatus.classList.remove('syncing');
            }
        }
    }

    async pushLeaderboardEntry(entry) {
        // This will be implemented in firebase-config.js
        if (window.firebaseDB && window.firebaseDB.addLeaderboardEntry) {
            return window.firebaseDB.addLeaderboardEntry(entry);
        }
    }

    getLargeStorageUsage() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length + key.length;
            }
        }
        return (total / 1024).toFixed(2) + ' KB';
    }
}

// Singleton instance
window.offlineManager = new OfflineManager();
