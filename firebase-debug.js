/**
 * FIREBASE-DEBUG.JS - Console debugging utilities for Firebase
 * Paste into browser console or include in page for debugging
 */

window.FirebaseDebug = {
    /**
     * Check Firebase initialization status
     */
    status() {
        console.log('=== FIREBASE STATUS ===');
        console.log('Firebase SDK:', typeof firebase !== 'undefined' ? '✅ Loaded' : '❌ Not loaded');
        console.log('Database API:', typeof firebase?.database !== 'undefined' ? '✅ Available' : '❌ Not available');
        console.log('Firebase Apps:', firebase?.getApps?.().length || 0);
        
        if (window.firebaseDB) {
            console.log('\nFirebaseDB Instance:');
            console.log('  Initialized:', window.firebaseDB.initialized ? '✅' : '❌');
            console.log('  Database ref:', window.firebaseDB.db ? '✅' : '❌');
            console.log('  Connected:', window.firebaseDB.isConnected ? '✅' : '❌');
            console.log('  Status:', window.firebaseDB.getConnectionStatus());
        } else {
            console.warn('FirebaseDB instance not found');
        }
    },

    /**
     * Test Firebase connection
     */
    async testConnection() {
        console.log('Testing Firebase connection...');
        try {
            const result = await window.firebaseDB.testConnection();
            if (result) {
                console.log('✅ Connection test PASSED');
            } else {
                console.log('❌ Connection test FAILED');
            }
            return result;
        } catch (e) {
            console.error('❌ Connection test error:', e);
            return false;
        }
    },

    /**
     * Check Firebase config
     */
    checkConfig() {
        console.log('=== FIREBASE CONFIG CHECK ===');
        if (typeof FIREBASE_CONFIG === 'undefined') {
            console.error('❌ FIREBASE_CONFIG not found');
            return;
        }

        const config = FIREBASE_CONFIG;
        console.log('Config loaded:', config);

        const checks = {
            'API Key': config.apiKey && config.apiKey !== 'YOUR_API_KEY',
            'Auth Domain': config.authDomain && config.authDomain.includes('firebaseapp.com'),
            'Project ID': config.projectId && config.projectId !== 'your-project-id',
            'Storage Bucket': config.storageBucket && config.storageBucket.includes('appspot.com'),
            'Messaging Sender ID': config.messagingSenderId && config.messagingSenderId !== 'your-sender-id',
            'Database URL': config.databaseURL && config.databaseURL.includes('firebaseio.com')
        };

        Object.entries(checks).forEach(([key, ok]) => {
            console.log(`${ok ? '✅' : '❌'} ${key}${!ok ? ' - MISSING OR INVALID' : ''}`);
        });

        const allValid = Object.values(checks).every(v => v);
        if (!allValid) {
            console.error('⚠️ Firebase config has issues. Update FIREBASE_CONFIG in firebase-config.js');
        }
    },

    /**
     * Write test data to Firebase
     */
    async writeTest(data = { test: Date.now(), message: 'Debug write test' }) {
        console.log('Writing test data...');
        try {
            const result = await window.firebaseDB.addLeaderboardEntry({
                playerName: 'DebugTest',
                score: 999,
                accuracy: 100,
                tier: 'Test Tier',
                mode: 'debug',
                ...data
            });
            console.log('✅ Write successful:', result);
            return result;
        } catch (e) {
            console.error('❌ Write failed:', e);
            return null;
        }
    },

    /**
     * Read leaderboard from Firebase
     */
    async readLeaderboard(limit = 10) {
        console.log(`Reading leaderboard (limit: ${limit})...`);
        try {
            const data = await window.firebaseDB.getLeaderboard(limit);
            console.log(`✅ Read ${data.length} entries from Firebase:`, data);
            return data;
        } catch (e) {
            console.error('❌ Read failed:', e);
            return null;
        }
    },

    /**
     * Check security rules
     */
    checkRules() {
        console.log('=== FIREBASE SECURITY RULES ===');
        console.log('If you see PERMISSION_DENIED errors:');
        console.log('1. Go to Firebase Console → Realtime Database → Rules');
        console.log('2. For testing, use:');
        console.log(`{
  "rules": {
    ".read": true,
    ".write": true
  }
}`);
        console.log('3. Click Publish');
    },

    /**
     * Monitor Firebase events
     */
    monitorEvents() {
        console.log('Monitoring Firebase events...');

        // Listen for online/offline
        window.addEventListener('online', () => {
            console.log('🟢 Browser online');
        });
        window.addEventListener('offline', () => {
            console.log('🔴 Browser offline');
        });

        // Listen for Firebase connection
        if (window.firebaseDB && window.firebaseDB.db) {
            const app = firebase.getApp();
            const db = firebase.database(app);
            const connRef = firebase.database.ref(db, '.info/connected');
            
            firebase.database.onValue(connRef, (snap) => {
                console.log(snap.val() ? '✅ Firebase connected' : '❌ Firebase disconnected');
            });
        }
    },

    /**
     * Show all commands
     */
    help() {
        console.log('=== FIREBASE DEBUG COMMANDS ===');
        console.log('FirebaseDebug.status()          - Check Firebase status');
        console.log('FirebaseDebug.checkConfig()     - Verify Firebase config');
        console.log('FirebaseDebug.checkRules()      - Show security rules info');
        console.log('FirebaseDebug.testConnection()  - Test Firebase connection');
        console.log('FirebaseDebug.writeTest()       - Write test data');
        console.log('FirebaseDebug.readLeaderboard() - Read leaderboard');
        console.log('FirebaseDebug.monitorEvents()   - Monitor connection events');
        console.log('FirebaseDebug.help()            - Show this help');
    }
};

console.log('✅ Firebase Debug Utils loaded. Type: FirebaseDebug.help()');
