/**
 * SCRIPT.JS - Main Application Logic
 * Orchestrates quiz flow, scoring, certificates, leaderboard
 * Connects to Firebase Realtime Database for global leaderboard
 */

// ============ FIREBASE & GLOBAL LEADERBOARD INITIALIZATION ============
async function initializeGlobalLeaderboard() {
    try {
        // Wait for Firebase SDK to load
        const maxAttempts = 50;
        let attempts = 0;

        while (!window.firebase && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (window.firebase && globalLeaderboard) {
            const success = await globalLeaderboard.init();
            if (success) {
                console.log('✅ Global leaderboard connected to Firebase');
                return true;
            } else {
                console.warn('⚠️ Global leaderboard not available, using local only');
                return false;
            }
        } else {
            console.warn('⚠️ Firebase SDK or global leaderboard not available');
            return false;
        }
    } catch (error) {
        console.error('❌ Failed to initialize global leaderboard:', error);
        return false;
    }
}

// ============ QUIZ APP CLASS ============
class QuizApp {
    constructor() {
        this.currentMode = null;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.playerName = '';
        this.score = 0;
        this.correctAnswers = 0;
        this.answers = [];
        this.timePerQuestion = 60;
        this.timeRemaining = 60;
        this.timerInterval = null;
        this.quizStartTime = null;
        this.quizActive = false;
        this.survivalLives = 3;
        this.certificateId = null;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadLeaderboard();
        this.checkPublicCertificate();

        // Initialize global leaderboard on app load
        initializeGlobalLeaderboard().then(success => {
            if (success) {
                // Reload leaderboard after Firebase connects
                setTimeout(() => this.loadLeaderboard(), 1000);
            }
        });
    }

    setupEventListeners() {
        // Mode selection
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectMode(e.target.closest('.mode-card')));
        });

        // Start quiz
        document.getElementById('startQuizBtn')?.addEventListener('click', () => this.startQuiz());

        // Quiz controls
        document.getElementById('exitBtn')?.addEventListener('click', () => this.exitQuiz());

        // Result actions
        document.getElementById('certificateBtn')?.addEventListener('click', () => this.viewCertificate());
        document.getElementById('shareBtn')?.addEventListener('click', () => this.shareCertificate());
        document.getElementById('retryBtn')?.addEventListener('click', () => this.showModeSelection());
        document.getElementById('homeBtn')?.addEventListener('click', () => this.goHome());

        // Certificate actions
        document.getElementById('copyShareBtn')?.addEventListener('click', () => this.copyShareLink());
        document.getElementById('downloadBtn')?.addEventListener('click', () => this.downloadCertificate());
        document.getElementById('backResultBtn')?.addEventListener('click', () => this.showResultScreen());

        // Close public cert
        document.getElementById('closeCertBtn')?.addEventListener('click', () => this.goHome());
    }

    selectMode(card) {
        const modeId = card.dataset.mode;
        const mode = modeSystem.selectMode(modeId);

        if (mode) {
            this.currentMode = mode;
            modeSystem.applyModeTheme(mode);
            this.timePerQuestion = mode.timePerQuestion || 60;
            this.showNameModal();
        }
    }

    showNameModal() {
        const modal = document.getElementById('nameModal');
        const input = document.getElementById('playerNameInput');
        input.value = '';
        input.focus();
        modal.classList.remove('hidden');
    }

    startQuiz() {
        const input = document.getElementById('playerNameInput');
        this.playerName = input.value.trim();

        if (!this.playerName) {
            alert('Please enter your name');
            return;
        }

        document.getElementById('nameModal').classList.add('hidden');
        this.loadQuestions();
        this.showQuizScreen();
    }

    loadQuestions() {
        // Use epic questions - randomized per session
        const epicQuestions = window.getRandomEpicQuestions(8, 'all');

        // Convert epic format to quiz format
        this.questions = epicQuestions.map((q, idx) => ({
            id: idx + 1,
            question: q.question,
            options: q.options,
            correct: q.options.indexOf(q.correctAnswer),
            difficulty: q.difficulty,
            epic: q.epic
        }));

        // Cache questions offline
        offlineManager.cacheQuestions(this.questions);

        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.answers = [];
        this.survivalLives = 3;
        this.quizStartTime = Date.now();
        this.quizActive = true;

        // Reset integrity
        window.integrityMonitor.reset();

        this.displayQuestion();
    }

    showQuizScreen() {
        this.switchScreen('quizScreen');
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        const totalQuestions = this.questions.length;

        // Update UI
        document.getElementById('questionCounter').textContent =
            `Question ${this.currentQuestionIndex + 1} of ${totalQuestions}`;
        document.getElementById('modeTag').textContent = this.currentMode.icon + ' ' + this.currentMode.name;

        // Update progress bar
        const progress = ((this.currentQuestionIndex + 1) / totalQuestions) * 100;
        document.getElementById('progressFill').style.width = progress + '%';

        // Display question with difficulty and epic label
        document.getElementById('question').innerHTML = `
            <div class="question-meta">
                <span class="epic-label">
                    <span class="epic-icon">${question.epic === 'Ramayana' ? '🏹' : '🗡️'}</span>
                    ${question.epic}
                </span>
                <span class="difficulty-badge difficulty-${question.difficulty}">
                    ${question.difficulty === 'easy' ? '⭐' : question.difficulty === 'medium' ? '⭐⭐' : '⭐⭐⭐'}
                    ${question.difficulty}
                </span>
            </div>
            ${question.question}
        `;

        // Display options
        const container = document.getElementById('optionsContainer');
        container.innerHTML = '';

        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option';
            btn.textContent = option;
            btn.addEventListener('click', () => this.selectAnswer(index));
            container.appendChild(btn);
        });

        // Start timer
        this.startTimer();

        // Start integrity tracking
        window.integrityMonitor.startQuestionTimer();
    }

    selectAnswer(optionIndex) {
        if (!this.quizActive) return;

        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = optionIndex === question.correct;

        // Record answer
        this.answers.push({
            questionId: question.id,
            selected: optionIndex,
            correct: question.correct,
            isCorrect: isCorrect
        });

        // Check speed anomalies
        window.integrityMonitor.checkAnswerSpeed();

        // Update score
        const baseScore = 10;
        const answerTime = performance.now() - (window.integrityMonitor.questionStartTime || Date.now());
        let earnedScore = modeSystem.calculateScore(baseScore, answerTime, isCorrect);

        if (isCorrect) {
            this.correctAnswers++;
            this.score += earnedScore;
        }

        // Disable options
        document.querySelectorAll('.option').forEach(btn => btn.disabled = true);

        // Show correct/incorrect
        const options = document.querySelectorAll('.option');
        options[optionIndex].classList.add(isCorrect ? 'correct' : 'incorrect');
        options[question.correct].classList.add('correct');

        // Clear timer
        clearInterval(this.timerInterval);

        // Survival mode: check lives
        if (this.currentMode.id === 'survival' && !isCorrect) {
            setTimeout(() => this.endQuiz(), 1500);
            return;
        }

        // Speed mode: lose lives
        if (this.currentMode.id === 'speed' && !isCorrect) {
            this.survivalLives--;
            if (this.survivalLives <= 0) {
                setTimeout(() => this.endQuiz(), 1500);
                return;
            }
        }

        // Next question or end
        setTimeout(() => {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
                this.displayQuestion();
            } else {
                this.endQuiz();
            }
        }, 1500);
    }

    startTimer() {
        this.timeRemaining = this.timePerQuestion * 1000; // Convert to milliseconds
        clearInterval(this.timerInterval);

        if (!this.timePerQuestion) {
            document.querySelector('.timer-bar').style.display = 'none';
            return; // No timer for classic mode
        }

        document.querySelector('.timer-bar').style.display = 'flex';
        const timerFill = document.getElementById('timerFill');
        const timerText = document.getElementById('timerText');

        this.timerInterval = setInterval(() => {
            this.timeRemaining -= 50; // Update every 50ms for smoother display

            const percent = Math.max(0, (this.timeRemaining / (this.timePerQuestion * 1000)) * 100);
            timerFill.style.width = percent + '%';

            // Display correct time (show 0 when negative)
            let displayTime = Math.ceil(this.timeRemaining / 1000);
            if (displayTime < 0) displayTime = 0;

            timerText.textContent = displayTime + 's';

            // Add critical warning when < 5 seconds
            if (displayTime <= 5 && displayTime > 0) {
                timerText.parentElement.classList.add('timer-critical');
            } else {
                timerText.parentElement.classList.remove('timer-critical');
            }

            // When time ends, auto-submit as wrong (only once)
            if (this.timeRemaining <= 0 && this.quizActive) {
                clearInterval(this.timerInterval);
                timerText.textContent = '0s';
                this.quizActive = false; // Prevent double-submission
                // AUTO-SUBMIT: Time's up!
                this.selectAnswer(-1); // Wrong answer code
            }
        }, 50); // Update every 50ms for smooth display
    }

    endQuiz() {
        this.quizActive = false;
        clearInterval(this.timerInterval);

        // Apply integrity penalty
        const finalScore = window.integrityMonitor.applyIntegrityPenalty(this.score);
        this.score = finalScore;

        // Calculate accuracy
        const accuracy = Math.round((this.correctAnswers / this.questions.length) * 100);

        // Determine tier
        const tier = TierSystem.calculateTier(accuracy);
        TierSystem.applyTierStyling(tier);

        // Save result
        const result = {
            playerName: this.playerName,
            score: this.score,
            accuracy: accuracy,
            tier: tier.name,
            mode: this.currentMode.id,
            isFlagged: window.integrityMonitor.isFlagged,
            correctAnswers: this.correctAnswers,
            totalQuestions: this.questions.length,
            timestamp: Date.now(),
            integrityReport: window.integrityMonitor.getReport()
        };

        // Save to leaderboard
        const leaderboardEntry = StorageManager.addLeaderboardEntry(result);

        // Create certificate
        const certificate = {
            playerName: this.playerName,
            score: this.score,
            accuracy: accuracy,
            tier: tier.name,
            mode: this.currentMode.name,
            date: new Date().toLocaleDateString(),
            isFlagged: window.integrityMonitor.isFlagged
        };

        const cert = StorageManager.saveCertificate(certificate);
        this.certificateId = cert?.id || null;

        // Upload to global leaderboard
        if (globalLeaderboard && globalLeaderboard.initialized) {
            globalLeaderboard.addGlobalScore(
                this.playerName,
                this.score,
                accuracy,
                tier.name,
                this.currentMode.name
            ).catch(error => {
                console.warn('Failed to upload to global leaderboard:', error);
            });
        }

        // Show result
        this.showResult(result, tier);
    }

    showResult(result, tier) {
        document.getElementById('resultTitle').textContent =
            result.accuracy >= 80 ? 'LEGENDARY PERFORMANCE' :
                result.accuracy >= 50 ? 'STRONG SHOWING' : 'KEEP PRACTICING';

        document.getElementById('finalScore').textContent = result.score;
        document.getElementById('accuracy').textContent = result.accuracy + '%';
        document.getElementById('tierDisplay').innerHTML = TierSystem.getTierBadgeCompact(tier);
        document.getElementById('modeDisplay').textContent = this.currentMode.name;

        const tierBadge = document.getElementById('tierBadge');
        tierBadge.innerHTML = TierSystem.getTierBadge(tier);

        if (result.isFlagged) {
            document.getElementById('integrityAlert').classList.remove('hidden');
        } else {
            document.getElementById('integrityAlert').classList.add('hidden');
        }

        this.switchScreen('resultScreen');
    }

    viewCertificate() {
        const cert = StorageManager.getCertificateById(this.certificateId);
        if (!cert) {
            alert('Certificate not found');
            return;
        }

        const tier = TierSystem.calculateTier(cert.accuracy);

        // Generate certificate image using canvas
        const generator = new window.CertificateGenerator();
        const canvas = generator.generate(
            cert.playerName,
            cert.score,
            cert.accuracy,
            tier,
            cert.mode,
            cert.id
        );

        // Display certificate image
        const certImage = document.getElementById('certificateImage');
        certImage.src = generator.getImageUrl();

        // Store generator for download
        this.currentCertGenerator = generator;
        this.currentCertData = cert;

        this.switchScreen('certificateScreen');
    }

    shareCertificate() {
        if (!this.certificateId) {
            alert('No certificate to share');
            return;
        }

        const url = `${window.location.origin}${window.location.pathname}?certId=${this.certificateId}`;

        if (navigator.share) {
            navigator.share({
                title: `${this.playerName}'s Certificate`,
                text: `I scored ${this.score} points on SCORE KSHETRA!`,
                url: url
            });
        } else {
            // Fallback
            alert('Certificate URL: ' + url);
        }
    }

    copyShareLink() {
        if (!this.certificateId) return;

        const url = `${window.location.origin}${window.location.pathname}?certId=${this.certificateId}`;
        navigator.clipboard.writeText(url).then(() => {
            alert('Share link copied!');
        });
    }

    downloadCertificate() {
        if (!this.currentCertGenerator || !this.currentCertData) {
            alert('Certificate not generated');
            return;
        }

        this.currentCertGenerator.download(
            this.currentCertData.playerName,
            this.currentCertData.id
        );
    }

    exitQuiz() {
        if (confirm('Exit quiz without submitting?')) {
            this.quizActive = false;
            clearInterval(this.timerInterval);
            this.showModeSelection();
        }
    }

    loadLeaderboard() {
        // First load local leaderboard
        const localScores = StorageManager.getLeaderboard(50);
        const body = document.getElementById('leaderboardBody');
        body.innerHTML = '';

        // If Firebase is available, get global scores too
        if (globalLeaderboard && globalLeaderboard.initialized) {
            globalLeaderboard.getCombinedLeaderboard(50).then(scores => {
                this.displayLeaderboardScores(scores, body);
            }).catch(error => {
                console.warn('Failed to get combined scores, using local only');
                this.displayLeaderboardScores(localScores, body);
            });
        } else {
            // Fallback to local only
            this.displayLeaderboardScores(localScores, body);
        }
    }

    displayLeaderboardScores(scores, body) {
        body.innerHTML = '';

        scores.slice(0, 10).forEach((entry, index) => {
            const row = document.createElement('div');
            row.className = `leaderboard-row ${entry.isFlagged ? 'flagged' : ''}`;

            // Simple: Rank, Name, Score only
            const rankMedal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';

            row.innerHTML = `
                <div class="rank-cell ${index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : ''}">
                    ${rankMedal}<span>#${index + 1}</span>
                </div>
                <div class="player-cell">${entry.playerName}</div>
                <div class="score-cell">${entry.score}</div>
            `;

            body.appendChild(row);
        });
    }

    checkPublicCertificate() {
        const params = new URLSearchParams(window.location.search);
        const certId = params.get('certId');

        if (certId) {
            const cert = StorageManager.getCertificateById(certId);
            if (cert) {
                this.displayPublicCertificate(cert);
            }
        }
    }

    displayPublicCertificate(cert) {
        const tier = TierSystem.calculateTier(cert.accuracy);
        const content = document.getElementById('publicCertContent');

        // Generate certificate image
        const generator = new window.CertificateGenerator();
        const canvas = generator.generate(
            cert.playerName,
            cert.score,
            cert.accuracy,
            tier,
            cert.mode,
            cert.id
        );

        // Display as image
        content.innerHTML = `
            <div class="public-certificate-view">
                <img src="${generator.getImageUrl()}" alt="Certificate" class="public-cert-img">
                <div class="public-cert-actions">
                    <button id="publicDownloadBtn" class="btn-primary">⬇️ DOWNLOAD</button>
                    <button id="publicCopyBtn" class="btn-secondary">COPY LINK</button>
                </div>
            </div>
        `;

        // Add download event
        const downloadBtn = document.getElementById('publicDownloadBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                generator.download(cert.playerName, cert.id);
            });
        }

        // Add copy event
        const copyBtn = document.getElementById('publicCopyBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const url = window.location.href;
                navigator.clipboard.writeText(url).then(() => {
                    alert('Certificate link copied!');
                });
            });
        }

        this.switchScreen('publicCertScreen');
    }

    showModeSelection() {
        this.switchScreen('homeScreen');
        this.loadLeaderboard();
    }

    showResultScreen() {
        this.switchScreen('resultScreen');
    }

    goHome() {
        this.switchScreen('homeScreen');
        this.loadLeaderboard();
    }

    switchScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
}

// ============ APP INITIALIZATION ============
// Simple startup - Firebase disabled, just run the app
async function startApp() {
    try {
        console.log('🚀 Starting app...');

        // Ensure DOM is ready
        if (document.readyState === 'loading') {
            console.log('⏳ Waiting for DOM...');
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve, { once: true });
            });
        }

        console.log('📋 Creating app...');
        // Start the quiz app
        window.app = new QuizApp();
        console.log('✅ App ready! Enjoy the quiz!');
    } catch (error) {
        console.error('❌ App error:', error);
        // Try again anyway
        setTimeout(() => {
            try {
                window.app = new QuizApp();
                console.log('✅ App recovered');
            } catch (e2) {
                console.error('❌ Fatal:', e2);
            }
        }, 500);
    }
}

// Start now!
console.log('📡 SCORE KSHETRA initializing...');
startApp();
