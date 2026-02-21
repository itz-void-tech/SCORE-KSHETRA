/**
 * INTEGRITY.JS - Anti-Cheat Logic Module
 * Tracks suspicious behavior: tab switches, speed anomalies
 * Flags attempts without blocking user experience
 */

class IntegrityMonitor {
    constructor() {
        this.tabSwitches = 0;
        this.isTabFocused = true;
        this.questionStartTime = 0;
        this.speedViolations = 0;
        this.isFlagged = false;
        this.suspiciousEvents = [];
        this.SPEED_THRESHOLD = 1000; // 1 second min per question
        this.MAX_TAB_SWITCHES = 2;
        this.MAX_SPEED_VIOLATIONS = 3;
        
        this.init();
    }

    init() {
        window.addEventListener('focus', () => this.handleWindowFocus());
        window.addEventListener('blur', () => this.handleWindowBlur());
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
    }

    handleWindowFocus() {
        this.isTabFocused = true;
    }

    handleWindowBlur() {
        this.isTabFocused = false;
        this.tabSwitches++;
        this.suspiciousEvents.push({
            type: 'TAB_SWITCH',
            timestamp: Date.now()
        });

        if (this.tabSwitches > this.MAX_TAB_SWITCHES) {
            this.isFlagged = true;
            this.updateWarningUI('tabWarning');
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            this.tabSwitches++;
            this.suspiciousEvents.push({
                type: 'VISIBILITY_CHANGE',
                timestamp: Date.now()
            });

            if (this.tabSwitches > this.MAX_TAB_SWITCHES) {
                this.isFlagged = true;
                this.updateWarningUI('tabWarning');
            }
        }
    }

    startQuestionTimer() {
        this.questionStartTime = performance.now();
    }

    checkAnswerSpeed() {
        const answerTime = performance.now() - this.questionStartTime;
        
        if (answerTime < this.SPEED_THRESHOLD) {
            this.speedViolations++;
            this.suspiciousEvents.push({
                type: 'SPEED_VIOLATION',
                answerTime: answerTime,
                timestamp: Date.now()
            });

            if (this.speedViolations >= this.MAX_SPEED_VIOLATIONS) {
                this.isFlagged = true;
                this.updateWarningUI('speedWarning');
            }

            return true;
        }

        return false;
    }

    updateWarningUI(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('hidden');
            setTimeout(() => {
                element.classList.add('hidden');
            }, 2000);
        }

        // Update main warning
        const suspiciousWarning = document.getElementById('suspiciousWarning');
        if (suspiciousWarning && this.isFlagged) {
            suspiciousWarning.classList.remove('hidden');
        }
    }

    applyIntegrityPenalty(baseScore) {
        if (!this.isFlagged) return baseScore;

        // 20% penalty for flagged attempts
        const penaltyPercent = 0.20;
        const penalty = Math.floor(baseScore * penaltyPercent);
        return Math.max(0, baseScore - penalty);
    }

    getReport() {
        return {
            isFlagged: this.isFlagged,
            tabSwitches: this.tabSwitches,
            speedViolations: this.speedViolations,
            totalEvents: this.suspiciousEvents.length,
            events: this.suspiciousEvents
        };
    }

    reset() {
        this.tabSwitches = 0;
        this.speedViolations = 0;
        this.isFlagged = false;
        this.suspiciousEvents = [];
        this.questionStartTime = 0;
    }
}

// Singleton instance
window.integrityMonitor = new IntegrityMonitor();
