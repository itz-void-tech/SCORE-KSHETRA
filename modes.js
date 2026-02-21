/**
 * MODES.JS - Game Modes System
 * Classic, Survival, Speed modes with unique scoring rules
 */

const GAME_MODES = {
    CLASSIC: {
        id: 'classic',
        name: 'Classic Quiz',
        icon: '⚔️',
        description: 'Steady. Strategic. Timeless.',
        scoringMultiplier: 1,
        timePerQuestion: null, // No time limit
        lives: null, // No lives system
        speedBonus: false,
        difficultyProgression: false,
        color: '#4a90e2'
    },
    SURVIVAL: {
        id: 'survival',
        name: 'Survival Test',
        icon: '🔥',
        description: 'One mistake ends it all.',
        scoringMultiplier: 1.5,
        timePerQuestion: 30, // 30 seconds per question
        lives: 1, // One wrong answer = quiz ends
        speedBonus: true,
        difficultyProgression: true, // Questions get harder
        color: '#e74c3c'
    },
    SPEED: {
        id: 'speed',
        name: 'Speed Mode',
        icon: '⚡',
        description: 'Answer fast. Earn bonus points.',
        scoringMultiplier: 1.3,
        timePerQuestion: 15, // 15 seconds per question
        lives: 3, // 3 strikes allowed
        speedBonus: true,
        difficultyProgression: false,
        color: '#f39c12'
    }
};

class ModeSystem {
    constructor() {
        this.currentMode = null;
        this.modeConfig = {};
    }

    selectMode(modeId) {
        for (const mode of Object.values(GAME_MODES)) {
            if (mode.id === modeId) {
                this.currentMode = mode;
                this.modeConfig = { ...mode };
                return mode;
            }
        }
        return null;
    }

    getCurrentMode() {
        return this.currentMode || GAME_MODES.CLASSIC;
    }

    calculateScore(baseScore, answerTime, isCorrect) {
        const mode = this.getCurrentMode();
        let score = baseScore;

        // Apply mode multiplier
        score = Math.floor(score * mode.scoringMultiplier);

        // Speed bonus (if enabled and time limit exists)
        if (mode.speedBonus && mode.timePerQuestion && isCorrect) {
            const speedPercent = (mode.timePerQuestion - answerTime) / mode.timePerQuestion;
            const speedBonus = Math.floor(baseScore * speedPercent * 0.5); // Up to 50% speed bonus
            if (speedBonus > 0) {
                score += speedBonus;
            }
        }

        return Math.max(0, score);
    }

    validateSurvivalMode(currentLives, isCorrectAnswer) {
        if (this.currentMode.id !== 'survival') return true;

        if (!isCorrectAnswer && currentLives <= 1) {
            return false; // Quiz should end
        }
        return true;
    }

    getDifficultyAdjustment(questionNumber) {
        const mode = this.getCurrentMode();
        
        if (mode.difficultyProgression) {
            // For survival mode, increase difficulty over time
            return 1 + (questionNumber * 0.05); // 5% harder per question
        }
        return 1;
    }

    getTimePerQuestion() {
        return this.currentMode?.timePerQuestion || 60; // Default 60s if no limit
    }

    getLivesCount() {
        return this.currentMode?.lives || Infinity;
    }

    getModeDescription() {
        return {
            name: this.currentMode.name,
            icon: this.currentMode.icon,
            description: this.currentMode.description,
            scoringMultiplier: this.currentMode.scoringMultiplier,
            hasTimeLimit: this.currentMode.timePerQuestion !== null,
            timePerQuestion: this.currentMode.timePerQuestion,
            speedBonusEnabled: this.currentMode.speedBonus
        };
    }

    getAllModes() {
        return Object.values(GAME_MODES);
    }

    getModeCSSClass(modeId) {
        return `mode-${modeId}`;
    }

    applyModeTheme(mode) {
        const root = document.documentElement;
        root.style.setProperty('--mode-color', mode.color);
        document.body.classList.remove('mode-classic', 'mode-survival', 'mode-speed');
        document.body.classList.add(`mode-${mode.id}`);
    }
}

// Singleton instance
window.modeSystem = new ModeSystem();
window.GAME_MODES = GAME_MODES;
