# 🏆 SCORE KSHETRA - Competitive Quiz Platform

**Transform your quiz experience into an epic competitive arena with advanced integrity checking, progression systems, and shareable certificates.**

---

## ✨ Features

### 1️⃣ **Anti-Cheat Logic (Client-Side Integrity)**
- **Invisible monitoring** of suspicious behavior:
  - Tracks tab switches and visibility changes
  - Detects unrealistically fast answers (< 1 second)
- **Non-blocking approach**: Subtle warnings, no popups
- **Integrity flagging**: Attempts marked as suspicious receive:
  - 20% score penalty
  - Leaderboard annotation (⚠️ badge)
  - Detailed report stored with result

### 2️⃣ **User Tiers System (Progression)**
- **Three competitive ranks**:
  - 💀 **Mortal**: Accuracy < 50%
  - ⚔️ **Hero**: Accuracy 50–80%
  - 👑 **Divine**: Accuracy > 80%
- **Tier displays** on result page, certificate, and leaderboard
- **Dynamic styling**: Glow effects and color themes per tier
- **Motivation loop**: Clear progression path for players

### 3️⃣ **Shareable Public Certificates**
- **Unique URL per certificate**: `/index.html?certId=CERT_ID`
- **Public viewing**: No authentication required
- **Verification details**:
  - Player name, score, accuracy
  - Tier badge with special effects
  - Mode completed
  - Certificate ID for authenticity
- **One-click share link** button
- **Works in cards/social embeds**

### 4️⃣ **Offline-First Support**
- **Local caching**:
  - Questions cached in localStorage
  - Quiz progress saved mid-quiz
- **Seamless offline quiz**: Continue even without internet
- **Automatic sync**: When back online:
  - Leaderboard entries synced
  - Certificates uploaded
  - Pending entries queue if sync fails
- **Offline indicator**: Badge shows connection status

### 5️⃣ **Game Modes System**
Three distinct modes affecting scoring, difficulty, and gameplay:

| Mode | Icon | Description | Time/Q | Lives | Speed Bonus | Multiplier |
|------|------|-------------|--------|-------|-------------|------------|
| **Classic** | ⚔️ | Steady. Strategic. | No limit | ∞ | No | 1x |
| **Survival** | 🔥 | One wrong = end | 30s | 1 | Yes | 1.5x |
| **Speed** | ⚡ | Fast answers earn bonus | 15s | 3 | Yes | 1.3x |

- **Mode-specific scoring**:
  - Survival: Higher base multiplier (1.5x) for high stakes
  - Speed: Bonus points for fast correct answers
- **Dynamic difficulty**: Survival mode questions get harder
- **Lives system**: Speed mode allows 3 mistakes

### 6️⃣ **Typography & Visual Identity**
- **Epic font stack**:
  - Titles: **Audiowide** (mythic, attention-grabbing)
  - Headings: **Orbitron** (futuristic, strong)
  - Body: **Rajdhani** (readable, modern)
- **Visual enhancements**:
  - Cyan/magenta gradient branding
  - Glow effects on tier badges
  - Smooth animations and transitions
  - Dark theme optimized for focus
  - Responsive design (mobile-first)

---

## 🎮 How to Play

### Quick Start
1. **Select Mode**: Choose Classic, Survival, or Speed
2. **Enter Name**: Personalize your profile
3. **Answer Questions**: Select from 4 options per question
4. **View Results**: See score, tier, and certificate
5. **Share Certificate**: Send link to friends (publicly verifiable)

### Scoring Rules
```
Base Score = 10 points per correct answer

Classic Mode: 10 × 1 = 10 points
Survival Mode: 10 × 1.5 = 15 points
Speed Mode: 10 × 1.3 + speed bonus = 13-20 points
```

**Speed Bonus Formula** (Survival & Speed modes):
```
Speed Bonus = 10 × (TimePerQ - AnswerTime) / TimePerQ × 0.5
```
Example: Answer in 5s on 30s question = 10 × (30-5)/30 × 0.5 = 4.17 bonus points

---

## 🔧 Architecture

### Module Structure
```
index.html              # Main UI structure
├── integrity.js        # Anti-cheat monitoring
├── tiers.js           # Progression system
├── modes.js           # Game mode logic
├── offline.js         # Offline support
├── storage.js         # localStorage management
├── firebase-config.js # Firebase sync (optional)
└── script.js          # Main app orchestration

style.css              # Responsive, dark-mode design
```

### Key Classes

**IntegrityMonitor** (`integrity.js`)
```javascript
window.integrityMonitor
  .startQuestionTimer()          // Track answer speed
  .checkAnswerSpeed()            // Detect speed violations
  .applyIntegrityPenalty(score)  // 20% penalty if flagged
  .getReport()                   // Full violation log
```

**TierSystem** (`tiers.js`)
```javascript
window.TierSystem
  .calculateTier(accuracy)       // Returns tier object
  .getTierBadge(tier)           // HTML badge with glow
  .applyTierStyling(tier)       // CSS theme per tier
```

**ModeSystem** (`modes.js`)
```javascript
window.modeSystem
  .selectMode(modeId)           // 'classic', 'survival', 'speed'
  .calculateScore(base, time, isCorrect)
  .validateSurvivalMode(lives, isCorrect)
  .getDifficultyAdjustment(questionNumber)
```

**StorageManager** (`storage.js`)
```javascript
window.StorageManager
  .addLeaderboardEntry(entry)   // Save result
  .getCertificateById(id)       // Retrieve certificate
  .getLeaderboard(limit)        // Top 100 entries
```

**OfflineManager** (`offline.js`)
```javascript
window.offlineManager
  .cacheQuestions(questions)    // localStorage backup
  .saveProgress(quizData)       // Mid-quiz save
  .queueSync(data)              // Queue for later sync
  .syncPendingData()            // Upload when online
```

---

## 🚀 Setup Instructions

### 1. Basic Setup (No Backend)
```bash
# Clone or download files
# Serve with any HTTP server

# Using Python 3
python -m http.server 8000

# Or with Node.js
npx http-server
```

### 2. Firebase Integration (Optional)
For cloud sync of leaderboard and certificates:

```javascript
// firebase-config.js - Replace with your config:
this.firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com"
};
```

**Firebase Realtime Database Rules** (open read, restricted write):
```json
{
  "rules": {
    "leaderboard": {
      ".read": true,
      ".write": true,
      ".validate": "newData.hasChildren(['playerName', 'score', 'accuracy'])"
    },
    "certificates": {
      ".read": true,
      ".write": true,
      ".validate": "newData.hasChildren(['playerName', 'score', 'id'])"
    }
  }
}
```

Add Firebase SDK to `index.html`:
```html
<script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js"></script>
```

### 3. Customizing Questions
Edit `script.js` - `loadQuestions()` method:
```javascript
this.questions = [
    { 
        id: 1, 
        question: 'Your question?', 
        options: ['Option A', 'Option B', 'Option C', 'Option D'], 
        correct: 0  // Index of correct answer
    },
    // ... more questions
];
```

---

## 📊 Data Structure

### Leaderboard Entry
```javascript
{
    id: "ENTRY_ABC123",
    playerName: "DarkKnight",
    score: 127,
    accuracy: 85,
    tier: "DIVINE",
    mode: "survival",
    isFlagged: false,
    correctAnswers: 6,
    totalQuestions: 8,
    timestamp: 1705003200000,
    integrityReport: {
        isFlagged: false,
        tabSwitches: 0,
        speedViolations: 0,
        totalEvents: 0,
        events: []
    }
}
```

### Certificate
```javascript
{
    id: "CERT_1705003200_XY9Z1W3E",
    playerName: "DarkKnight",
    score: 127,
    accuracy: 85,
    tier: "DIVINE",
    mode: "Survival Test",
    date: "1/12/2024",
    isFlagged: false,
    createdAt: 1705003200000
}
```

---

## 🎯 Integrity Flagging Rules

### Automatic Flagging Triggers
- **Tab switches**: > 2 (focus/blur/visibility changes)
- **Speed violations**: ≥ 3 questions answered in < 1 second

### Consequences
1. **Score penalty**: -20% from final score
2. **Leaderboard marker**: ⚠️ badge visible
3. **Certificate marking**: Noted but still valid
4. **Data retention**: Full violation log stored

### Example
```
Base Score: 150
Speed Violations: 3
→ isFlagged = true
→ Penalty = 150 × 0.20 = 30
→ Final Score = 150 - 30 = 120
```

---

## 📱 Responsive Design

- **Desktop** (>1024px): Full grid layout, leaderboard visible
- **Tablet** (768-1023px): 2-column mode cards, optimized spacing
- **Mobile** (<768px): Single column, touch-friendly buttons, readable fonts

**Mobile-First CSS** ensures optimal performance on all devices.

---

## 🔒 Security & Integrity

### Client-Side Protections
- ✅ Anti-cheat monitoring (no backend required)
- ✅ Integrity flags for suspicious patterns
- ✅ All data timestamped for audit
- ✅ localStorage encryption-ready (implement if needed)

### Limitations
- Client-side only - determined players can manipulate data
- For high-stakes scenarios, implement server-side validation
- Firebase rules provide basic write restrictions
- No user authentication (add if needed)

---

## 🎨 Customization

### Change Colors
Edit `:root` CSS variables in `style.css`:
```css
:root {
    --accent: #00d4ff;        /* Cyan */
    --accent-alt: #ff1493;    /* Magenta */
    --primary: #1a1a2e;       /* Dark blue */
    /* ... more colors */
}
```

### Change Fonts
Update `@import` in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet">
```
Then update CSS variables:
```css
--font-epic: 'YourFont', sans-serif;
```

### Add Questions
Edit `questions` array in `loadQuestions()` - supports difficulty scaling in Survival mode.

### Mode Tuning
Adjust multipliers, timers, and lives in `modes.js`:
```javascript
SPEED: {
    timePerQuestion: 15,    // Change to 20, 25, etc.
    lives: 3,               // Change to 1, 2, 4, etc.
    scoringMultiplier: 1.3  // Change multiplier
}
```

---

## 🚨 Troubleshooting

### Quiz Won't Start
- Check browser console for errors (F12 → Console)
- Ensure `playerNameInput` value is not empty
- Verify all JavaScript files are loaded

### Offline Mode Not Working
- Check localStorage quota (usually 5-10MB)
- Clear old data: `StorageManager.clearAllData()`
- Verify `offline.js` is loaded

### Leaderboard Not Updating
- Local mode (localStorage): Refresh page
- Firebase mode: Check if `firebase-config.js` has valid credentials
- Check browser network tab for failed requests

### Firebase Sync Issues
1. Verify API key and database URL
2. Check Firebase Realtime Database rules
3. Ensure `databaseURL` is correct (note the regional endpoint)

---

## 📝 License

Open source for educational and commercial use. Modify freely.

---

## 🎯 Future Enhancements

- [ ] Backend API for validation
- [ ] User authentication & profiles
- [ ] Daily/weekly tournaments
- [ ] Achievement badges
- [ ] Difficulty levels (Easy, Medium, Hard)
- [ ] Question categories
- [ ] Multiplayer real-time mode
- [ ] Admin dashboard

---

## 📞 Support

For issues, customizations, or questions:
1. Check browser console for errors
2. Review `firebase-config.js` setup
3. Verify localStorage isn't full
4. Test offline functionality with DevTools

**Happy quizzing! Rise to Divine tier. 👑**
