/**
 * CONFIG.JS - Centralized Configuration
 * Adjust all platform parameters here without touching core logic
 */

const PLATFORM_CONFIG = {
    // ============ APP IDENTITY ============
    APP_TITLE: 'SCORE KSHETRA',
    APP_SUBTITLE: 'Rise through the ranks. Prove your worth.',
    
    // ============ QUESTIONS ============
    QUESTIONS: [
        { id: 1, question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'], correct: 0 },
        { id: 2, question: 'Which planet is closest to the sun?', options: ['Venus', 'Mercury', 'Earth', 'Mars'], correct: 1 },
        { id: 3, question: 'Who wrote Romeo and Juliet?', options: ['Shakespeare', 'Marlowe', 'Jonson', 'Bacon'], correct: 0 },
        { id: 4, question: 'What is the largest ocean?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correct: 3 },
        { id: 5, question: 'What is 15 + 27?', options: ['32', '42', '52', '62'], correct: 1 },
        { id: 6, question: 'Which element has atomic number 1?', options: ['Helium', 'Hydrogen', 'Lithium', 'Boron'], correct: 1 },
        { id: 7, question: 'In what year did World War II end?', options: ['1943', '1944', '1945', '1946'], correct: 2 },
        { id: 8, question: 'What is the smallest prime number?', options: ['0', '1', '2', '3'], correct: 2 }
    ],

    // ============ GAME MODES TUNING ============
    MODES: {
        CLASSIC: {
            TIME_PER_QUESTION: null,  // No time limit
            LIVES: Infinity,           // No lives system
            SCORE_MULTIPLIER: 1,
            SPEED_BONUS_ENABLED: false,
            DIFFICULTY_PROGRESSION: false
        },
        SURVIVAL: {
            TIME_PER_QUESTION: 30,    // 30 seconds per question
            LIVES: 1,                 // One wrong answer = end
            SCORE_MULTIPLIER: 1.5,
            SPEED_BONUS_ENABLED: true,
            DIFFICULTY_PROGRESSION: true
        },
        SPEED: {
            TIME_PER_QUESTION: 15,    // 15 seconds per question
            LIVES: 3,                 // 3 strikes allowed
            SCORE_MULTIPLIER: 1.3,
            SPEED_BONUS_ENABLED: true,
            DIFFICULTY_PROGRESSION: false
        }
    },

    // ============ SCORING ============
    BASE_SCORE_PER_QUESTION: 10,
    INTEGRITY_PENALTY_PERCENT: 20,  // 20% penalty if flagged
    SPEED_BONUS_PERCENT: 50,        // Up to 50% speed bonus
    
    // ============ INTEGRITY/ANTI-CHEAT ============
    INTEGRITY: {
        SPEED_THRESHOLD_MS: 1000,      // 1 second minimum per answer
        MAX_TAB_SWITCHES: 2,            // Flag if > 2 switches
        MAX_SPEED_VIOLATIONS: 3,        // Flag if >= 3 fast answers
        ENABLE_WARNINGS: true           // Show warning UI
    },

    // ============ TIER THRESHOLDS ============
    TIERS: {
        MORTAL: {
            MIN_ACCURACY: 0,
            MAX_ACCURACY: 50,
            DISPLAY_NAME: 'MORTAL'
        },
        HERO: {
            MIN_ACCURACY: 50,
            MAX_ACCURACY: 80,
            DISPLAY_NAME: 'HERO'
        },
        DIVINE: {
            MIN_ACCURACY: 80,
            MAX_ACCURACY: 100,
            DISPLAY_NAME: 'DIVINE'
        }
    },

    // ============ LEADERBOARD ============
    LEADERBOARD: {
        DISPLAY_LIMIT: 100,    // Show top 100
        SORT_BY: 'score',      // 'score' or 'accuracy'
        SORT_ORDER: 'desc',    // 'asc' or 'desc'
        SHOW_FLAGGED: true     // Show flagged entries with annotation
    },

    // ============ UI/UX ============
    UI: {
        ENABLE_ANIMATIONS: true,
        ANIMATION_SPEED_MS: 300,
        SHOW_OFFLINE_INDICATOR: true,
        SHOW_INTEGRITY_WARNINGS: true,
        ENABLE_TIER_GLOW_EFFECTS: true
    },

    // ============ STORAGE ============
    STORAGE: {
        ENABLE_FIREBASE: false,  // Set to true if Firebase configured
        FALLBACK_TO_LOCALSTORAGE: true,
        MAX_LEADERBOARD_SIZE: 500,
        CLEAR_OLD_DATA_DAYS: 365  // Auto-clear data older than 1 year
    },

    // ============ OFFLINE ============
    OFFLINE: {
        CACHE_QUESTIONS: true,
        CACHE_PROGRESS: true,
        AUTO_SYNC_ON_RECONNECT: true,
        SYNC_TIMEOUT_MS: 5000
    }
};

// Example: Use in script.js
/*
    const baseScore = PLATFORM_CONFIG.BASE_SCORE_PER_QUESTION;
    const speedThreshold = PLATFORM_CONFIG.INTEGRITY.SPEED_THRESHOLD_MS;
    const questions = PLATFORM_CONFIG.QUESTIONS;
    
    this.questions = questions;
*/

// Export for use
window.PLATFORM_CONFIG = PLATFORM_CONFIG;
