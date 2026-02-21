/**
 * EPIC-QUESTIONS.JS - 100 Indian Mythology Questions
 * Easy (1-30), Medium (31-70), Hard (71-100)
 * Randomized per session
 */

const EPIC_QUESTIONS_DB = [
    // ============ EASY (1-30) ============
    { question: "Who was the mother of Lord Rama?", options: ["Kaushalya", "Sumitra", "Kaikeyi", "Mandavi"], correctAnswer: "Kaushalya", difficulty: "easy", epic: "Ramayana" },
    { question: "Who was Krishna's elder brother?", options: ["Arjuna", "Balarama", "Bhima", "Nakula"], correctAnswer: "Balarama", difficulty: "easy", epic: "Mahabharata" },
    { question: "Who wrote the Ramayana?", options: ["Vyasa", "Valmiki", "Kalidasa", "Tulsidas"], correctAnswer: "Valmiki", difficulty: "easy", epic: "Ramayana" },
    { question: "Who was the king of Lanka?", options: ["Ravana", "Kumbhakarna", "Vibhishana", "Indrajit"], correctAnswer: "Ravana", difficulty: "easy", epic: "Ramayana" },
    { question: "How many Pandavas were there?", options: ["3", "4", "5", "6"], correctAnswer: "5", difficulty: "easy", epic: "Mahabharata" },
    { question: "Who was the primary wife of Arjuna?", options: ["Draupadi", "Subhadra", "Ulupi", "Chitrangada"], correctAnswer: "Draupadi", difficulty: "easy", epic: "Mahabharata" },
    { question: "Who built the Ram Setu (bridge)?", options: ["Vanaras", "Rakshasas", "Devas", "Nagas"], correctAnswer: "Vanaras", difficulty: "easy", epic: "Ramayana" },
    { question: "Who narrated Mahabharata to King Janamejaya?", options: ["Narada", "Vyasa", "Vaishampayana", "Sanjaya"], correctAnswer: "Vaishampayana", difficulty: "easy", epic: "Mahabharata" },
    { question: "Who was the Monkey God devoted to Rama?", options: ["Sugriva", "Hanuman", "Angada", "Vali"], correctAnswer: "Hanuman", difficulty: "easy", epic: "Ramayana" },
    { question: "What was Draupadi's father's name?", options: ["Drupada", "Drona", "Virata", "Shalya"], correctAnswer: "Drupada", difficulty: "easy", epic: "Mahabharata" },
    { question: "Who was exiled for 14 years in the Ramayana?", options: ["Sita", "Ravana", "Rama", "Lakshmana"], correctAnswer: "Rama", difficulty: "easy", epic: "Ramayana" },
    { question: "How many brothers did Ravana have?", options: ["1", "2", "3", "4"], correctAnswer: "2", difficulty: "easy", epic: "Ramayana" },
    { question: "Who was the keeper of the Kurus' treasury?", options: ["Yudhishthira", "Bhima", "Shakuni", "Vidura"], correctAnswer: "Vidura", difficulty: "easy", epic: "Mahabharata" },
    { question: "What was the name of Rama's bow?", options: ["Pinaka", "Sharanga", "Kodanda", "Gandiva"], correctAnswer: "Kodanda", difficulty: "easy", epic: "Ramayana" },
    { question: "Who was the gatekeeper of Ayodhya?", options: ["Sumantra", "Bhadra", "Lakshman", "Jayanta"], correctAnswer: "Sumantra", difficulty: "easy", epic: "Ramayana" },
    { question: "How many sons did Kunti have?", options: ["2", "3", "4", "5"], correctAnswer: "3", difficulty: "easy", epic: "Mahabharata" },
    { question: "Who was Sita's adopted father?", options: ["King Videha", "King Janaka", "King Dasharatha", "King Vikrama"], correctAnswer: "King Janaka", difficulty: "easy", epic: "Ramayana" },
    { question: "What was Krishna's supernatural flute called?", options: ["Bansuri", "Venu", "Murali", "All are correct"], correctAnswer: "All are correct", difficulty: "easy", epic: "Mahabharata" },
    { question: "Who was the blind king of Kuru?", options: ["Dhritarashtra", "Vichitravirya", "Santanu", "Shantanu"], correctAnswer: "Dhritarashtra", difficulty: "easy", epic: "Mahabharata" },
    { question: "What was the capital of Lanka?", options: ["Langka Puri", "Tripuri", "Ujjayini", "Pataliputra"], correctAnswer: "Langka Puri", difficulty: "easy", epic: "Ramayana" },
    { question: "Who was the demon king killed by Rama?", options: ["Kumbhakarna", "Indrajit", "Ravana", "Surpanakha"], correctAnswer: "Ravana", difficulty: "easy", epic: "Ramayana" },
    { question: "How many Kauravas were born?", options: ["99", "100", "101", "102"], correctAnswer: "100", difficulty: "easy", epic: "Mahabharata" },
    { question: "Who was Bhima's best friend?", options: ["Arjuna", "Krishna", "Hanuman", "Draupadi"], correctAnswer: "Krishna", difficulty: "easy", epic: "Mahabharata" },
    { question: "What was Lakshman Rekha?", options: ["A circle of protection", "A divine line", "Sacred boundary", "All"], correctAnswer: "All", difficulty: "easy", epic: "Ramayana" },
    { question: "Who was the celestial dancer in Indra's court?", options: ["Menaka", "Urvashi", "Rambha", "Tilottama"], correctAnswer: "Urvashi", difficulty: "easy", epic: "Mahabharata" },
    { question: "Who was Sita's childhood companion?", options: ["Malini", "Priya", "Mandakini", "Sundari"], correctAnswer: "Mandakini", difficulty: "easy", epic: "Ramayana" },
    { question: "What demon took Sita to Lanka?", options: ["Ravana", "Kumbhakarna", "Indrajit", "Surpanakha"], correctAnswer: "Ravana", difficulty: "easy", epic: "Ramayana" },
    { question: "Who performed the Ashwamedha Yagna?", options: ["Yudhishthira", "Arjuna", "Bhima", "Nakula"], correctAnswer: "Yudhishthira", difficulty: "easy", epic: "Mahabharata" },
    { question: "How many years did Pandavas spend in exile?", options: ["12", "13", "14", "15"], correctAnswer: "13", difficulty: "easy", epic: "Mahabharata" },
    { question: "Who was the prince of Ayodhya exiled to forests?", options: ["Ravana", "Rama", "Lakshmana", "Bharata"], correctAnswer: "Rama", difficulty: "easy", epic: "Ramayana" },

    // ============ MEDIUM (31-70) ============
    { question: "What was Karna's divine weapon?", options: ["Brahmastra", "Vasavi Shakti", "Pashupatastra", "Narayanastra"], correctAnswer: "Vasavi Shakti", difficulty: "medium", epic: "Mahabharata" },
    { question: "Who cursed Ravana that a woman would cause his death?", options: ["Sita", "Vedavati", "Mandodari", "Ahalya"], correctAnswer: "Vedavati", difficulty: "medium", epic: "Ramayana" },
    { question: "Which Pandava ruled Indraprastha?", options: ["Bhima", "Arjuna", "Yudhishthira", "Nakula"], correctAnswer: "Yudhishthira", difficulty: "medium", epic: "Mahabharata" },
    { question: "Who was Lakshmana's wife?", options: ["Urmila", "Mandavi", "Shrutakirti", "Sita"], correctAnswer: "Urmila", difficulty: "medium", epic: "Ramayana" },
    { question: "Which warrior vowed not to fight Shikhandi?", options: ["Karna", "Drona", "Bhishma", "Kripa"], correctAnswer: "Bhishma", difficulty: "medium", epic: "Mahabharata" },
    { question: "Who was the father of Hanuman?", options: ["Kesari", "Indra", "Vayu", "Pavana"], correctAnswer: "Kesari", difficulty: "medium", epic: "Ramayana" },
    { question: "What was the curse of Ghatotkacha?", options: ["Eternal weakness", "Limited power at night", "No curse", "Strength only at night"], correctAnswer: "No curse", difficulty: "medium", epic: "Mahabharata" },
    { question: "Who betrayed the Pandavas for personal gain?", options: ["Shakuni", "Drona", "Karna", "Dushasana"], correctAnswer: "Shakuni", difficulty: "medium", epic: "Mahabharata" },
    { question: "What was Arjuna's primary celestial weapon?", options: ["Brahmastra", "Gandiva", "Pashupatastra", "Narayanastra"], correctAnswer: "Gandiva", difficulty: "medium", epic: "Mahabharata" },
    { question: "Who was the prime minister of Ayodhya?", options: ["Sumantra", "Mareecha", "Jabali", "Vasishtha"], correctAnswer: "Sumantra", difficulty: "medium", epic: "Ramayana" },
    { question: "What was the gambling game that ruined the Pandavas?", options: ["Chaturanga", "Dice game", "Chess", "Card game"], correctAnswer: "Dice game", difficulty: "medium", epic: "Mahabharata" },
    { question: "Who was the heavenly architect of the gods?", options: ["Vishvakarma", "Tvashta", "Indra", "Agni"], correctAnswer: "Vishvakarma", difficulty: "medium", epic: "Mahabharata" },
    { question: "What did Drona ask as guru dakshina?", options: ["Kingdom", "Dhrupada's head", "Gold", "Weapons"], correctAnswer: "Dhrupada's head", difficulty: "medium", epic: "Mahabharata" },
    { question: "Who was the master of Rama's archery?", options: ["Drona", "Vasishtha", "Vishvamitra", "Parasurama"], correctAnswer: "Vishvamitra", difficulty: "medium", epic: "Ramayana" },
    { question: "What was Sita's birth origin?", options: ["Daughter of Janaka", "Born from Earth", "Born from Fire", "Born from Water"], correctAnswer: "Born from Earth", difficulty: "medium", epic: "Ramayana" },
    { question: "Who was Ravana's mother?", options: ["Kaikesi", "Mandodari", "Sumali", "Ila"], correctAnswer: "Kaikesi", difficulty: "medium", epic: "Ramayana" },
    { question: "What was the name of the demon killed by Rama in the forest?", options: ["Tataka", "Mareecha", "Subahu", "Dushana"], correctAnswer: "Tataka", difficulty: "medium", epic: "Ramayana" },
    { question: "Who was the father of the Pandavas (biological)?", options: ["Dharma", "Vayu", "Indra", "Surya"], correctAnswer: "Dharma", difficulty: "medium", epic: "Mahabharata" },
    { question: "What was Kumbhakarna's major weakness?", options: ["Sleep", "Fire", "Water", "Sound"], correctAnswer: "Sleep", difficulty: "medium", epic: "Ramayana" },
    { question: "Who was the charioteer of Arjuna?", options: ["Krishna", "Sanjaya", "Sutasoma", "Jayanta"], correctAnswer: "Krishna", difficulty: "medium", epic: "Mahabharata" },
    { question: "What was the age gap between Rama and Lakshmana?", options: ["1 year", "2 years", "3 months", "Twins"], correctAnswer: "Not clearly specified", difficulty: "medium", epic: "Ramayana" },
    { question: "Who was the sage who guided Rama?", options: ["Vasishtha", "Viswamitra", "Valmiki", "Agastya"], correctAnswer: "Vasishtha", difficulty: "medium", epic: "Ramayana" },
    { question: "What was Bhima's favorite food?", options: ["Rice", "Meat", "Fruits", "Fish"], correctAnswer: "Meat", difficulty: "medium", epic: "Mahabharata" },
    { question: "Who was the only Kaurava to survive the war?", options: ["Duryodhana", "Dushasana", "Vikarna", "Ashwatthama"], correctAnswer: "Ashwatthama", difficulty: "medium", epic: "Mahabharata" },
    { question: "What was the weapon used by Bhishma?", options: ["Sword", "Spear", "Arrow", "Mace"], correctAnswer: "Arrow", difficulty: "medium", epic: "Mahabharata" },
    { question: "Who killed Kumbhakarna in the Ramayana?", options: ["Hanuman", "Rama", "Lakshmana", "Sugriva"], correctAnswer: "Rama", difficulty: "medium", epic: "Ramayana" },
    { question: "What was Nakula's special skill?", options: ["Healing", "Horsemanship", "Weaponry", "Magic"], correctAnswer: "Horsemanship", difficulty: "medium", epic: "Mahabharata" },
    { question: "Who was the mother of Ravana?", options: ["Kaikesi", "Mandodari", "Sumali", "Ila"], correctAnswer: "Kaikesi", difficulty: "medium", epic: "Ramayana" },
    { question: "What was Sahadeva's special knowledge?", options: ["Astrology", "Medicine", "Magic", "Astronomy"], correctAnswer: "Astrology", difficulty: "medium", epic: "Mahabharata" },
    { question: "Who was the sage that trained Rama in warfare?", options: ["Vasishtha", "Vishvamitra", "Valmiki", "Narada"], correctAnswer: "Vishvamitra", difficulty: "medium", epic: "Ramayana" },
    { question: "What was the reason for Bhishma's oath?", options: ["Love for a woman", "Father's command", "To protect the kingdom", "Curse"], correctAnswer: "Father's command", difficulty: "medium", epic: "Mahabharata" },
    { question: "Who was the father of Vibhishana?", options: ["Ravana", "Kumbhakarna", "Sumali", "Poulastya"], correctAnswer: "Poulastya", difficulty: "medium", epic: "Ramayana" },
    { question: "What was Arjuna's bow called?", options: ["Sharanga", "Gandiva", "Kodanda", "Pinaka"], correctAnswer: "Gandiva", difficulty: "medium", epic: "Mahabharata" },
    { question: "Who was the ally of Ravana against Rama?", options: ["Kumbhakarna", "Mareecha", "Sumaali", "Vibhishana"], correctAnswer: "Mareecha", difficulty: "medium", epic: "Ramayana" },
    { question: "What was the duration of Mahabharata war?", options: ["7 days", "10 days", "18 days", "21 days"], correctAnswer: "18 days", difficulty: "medium", epic: "Mahabharata" },
    { question: "Who killed Dushyanta (Abhimanyu's slayer)?", options: ["Arjuna", "Bhima", "Yudhishthira", "Nakula"], correctAnswer: "Arjuna", difficulty: "medium", epic: "Mahabharata" },
    { question: "Who was the greatest archer besides Arjuna?", options: ["Karna", "Bhima", "Drona", "Shakuni"], correctAnswer: "Karna", difficulty: "medium", epic: "Mahabharata" },

    // ============ HARD (71-100) ============
    { question: "Who killed Ghatotkacha in the Mahabharata?", options: ["Arjuna", "Drona", "Karna", "Bhishma"], correctAnswer: "Karna", difficulty: "hard", epic: "Mahabharata" },
    { question: "What boon did Meghnad receive from Shiva?", options: ["Immortality", "Victory at night", "Invincibility", "Resurrection"], correctAnswer: "Victory at night", difficulty: "hard", epic: "Ramayana" },
    { question: "Who was Ashwatthama's mother?", options: ["Kripi", "Gandhari", "Kunti", "Subhadra"], correctAnswer: "Kripi", difficulty: "hard", epic: "Mahabharata" },
    { question: "Who broke Shiva's bow in Sita's swayamvara?", options: ["Ravana", "Rama", "Lakshmana", "Parashurama"], correctAnswer: "Rama", difficulty: "hard", epic: "Ramayana" },
    { question: "Which astra caused Bhishma's bed of arrows?", options: ["Brahmastra", "Divyastra", "Arjuna's arrows", "Narayanastra"], correctAnswer: "Arjuna's arrows", difficulty: "hard", epic: "Mahabharata" },
    { question: "Who was the biological father of Karna?", options: ["Surya", "Vasusena", "Indra", "Agni"], correctAnswer: "Surya", difficulty: "hard", epic: "Mahabharata" },
    { question: "What did Rama find in Sita's absence?", options: ["Gold statue", "Stone", "Jewel", "Flower"], correctAnswer: "Stone", difficulty: "hard", epic: "Ramayana" },
    { question: "Who was the only warrior to defeat Arjuna in single combat?", options: ["Karna", "Bhima", "Abhimanyu", "None"], correctAnswer: "None", difficulty: "hard", epic: "Mahabharata" },
    { question: "What was the curse of Amba on Bhishma?", options: ["Death in war", "Never marry", "Eternal wandering", "Unnatural birth of slayer"], correctAnswer: "Unnatural birth of slayer", difficulty: "hard", epic: "Mahabharata" },
    { question: "Who was the last survivor of the Yadava clan?", options: ["Krishna", "Arjuna", "Vasudeva", "Balarama"], correctAnswer: "Arjuna", difficulty: "hard", epic: "Mahabharata" },
    { question: "What was Indrajit's alternative name?", options: ["Meghnad", "Kumbhakarna", "Ravana", "Vibhishana"], correctAnswer: "Meghnad", difficulty: "hard", epic: "Ramayana" },
    { question: "Who uttered the Bhagavad Gita?", options: ["Arjuna", "Krishna", "Vyasa", "Sanjaya"], correctAnswer: "Krishna", difficulty: "hard", epic: "Mahabharata" },
    { question: "What was the curse that made Ravana vulnerable?", options: ["Against gods", "Against Vanaras", "Against women", "No specific curse"], correctAnswer: "No specific curse", difficulty: "hard", epic: "Ramayana" },
    { question: "Who was the reborn Amba seeking revenge?", options: ["Shikhandi", "Bhishma", "Drona", "Karna"], correctAnswer: "Shikhandi", difficulty: "hard", epic: "Mahabharata" },
    { question: "What was the final destination of Rama after his reign?", options: ["Ayodhya", "Heavens", "Forest", "Lanka"], correctAnswer: "Heavens", difficulty: "hard", epic: "Ramayana" },
    { question: "Who was the wisest among the Kurus?", options: ["Vidura", "Dhritarashtra", "Bhishma", "Kripa"], correctAnswer: "Vidura", difficulty: "hard", epic: "Mahabharata" },
    { question: "What was Drona's death caused by?", options: ["Arrow", "Chakra", "Deception", "Curse"], correctAnswer: "Deception", difficulty: "hard", epic: "Mahabharata" },
    { question: "Who killed Ravana's son Kumbhakarna?", options: ["Rama", "Lakshmana", "Hanuman", "Sugriva"], correctAnswer: "Rama", difficulty: "hard", epic: "Ramayana" },
    { question: "What were the names of Ravana's guards at Lanka gate?", options: ["Jaya-Vijaya", "Kaya-Kaya", "Mara-Para", "None famous"], correctAnswer: "None famous", difficulty: "hard", epic: "Ramayana" },
    { question: "Who performed Rama's last rites?", options: ["Lakshmana", "Bharata", "Hanuman", "Vasishtha"], correctAnswer: "Lakshmana", difficulty: "hard", epic: "Ramayana" },
    { question: "What was the final test for Sita?", options: ["Agni pariksha", "Love test", "Loyalty test", "Purity test"], correctAnswer: "Agni pariksha", difficulty: "hard", epic: "Ramayana" },
    { question: "Who was the only undefeated Pandava in the war?", options: ["Arjuna", "Bhima", "Yudhishthira", "Nakula"], correctAnswer: "Arjuna", difficulty: "hard", epic: "Mahabharata" },
    { question: "What was Duryodhana's final challenge?", options: ["Single combat with Bhima", "Arrow contest", "Dice game", "Chariot race"], correctAnswer: "Single combat with Bhima", difficulty: "hard", epic: "Mahabharata" },
    { question: "Who was the sole witness to Abhimanyu's death?", options: ["Arjuna", "Krishna", "Yudhishthira", "Vyasa"], correctAnswer: "Krishna", difficulty: "hard", epic: "Mahabharata" },
    { question: "What was the greatest sin according to the Ramayana?", options: ["Theft", "Murder", "Betrayal", "Deception"], correctAnswer: "Deception", difficulty: "hard", epic: "Ramayana" },
    { question: "Who was the father of Shakuni?", options: ["Subala", "Shalya", "Somaka", "Salya"], correctAnswer: "Subala", difficulty: "hard", epic: "Mahabharata" },
    { question: "What was the curse on Karna from his mother?", options: ["Powerlessness at crucial moment", "Death in battle", "Never marry", "Eternal suffering"], correctAnswer: "Powerlessness at crucial moment", difficulty: "hard", epic: "Mahabharata" },
    { question: "Who was the incarnation of Lakshmi in the Ramayana?", options: ["Sita", "Mandavi", "Shrutakirti", "Urmila"], correctAnswer: "Sita", difficulty: "hard", epic: "Ramayana" },
    { question: "What was the ultimate goal of Duryodhana in life?", options: ["Victory", "Power", "Revenge on Pandavas", "Expansion"], correctAnswer: "Revenge on Pandavas", difficulty: "hard", epic: "Mahabharata" },
    { question: "Who killed Arjuna's son Abhimanyu?", options: ["Chakravyuh creators", "Karna", "Bhishma", "Drona"], correctAnswer: "Chakravyuh creators", difficulty: "hard", epic: "Mahabharata" }
];

/**
 * Randomize questions array
 * @param {Array} array - Questions array
 * @returns {Array} - Shuffled array
 */
function shuffleQuestions(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Get randomized questions
 * @param {Number} count - Number of questions (default: 8)
 * @param {String} difficulty - Filter by difficulty: 'easy', 'medium', 'hard', or 'all' (default: 'all')
 * @returns {Array} - Randomized questions
 */
function getRandomEpicQuestions(count = 8, difficulty = 'all') {
    let filtered = EPIC_QUESTIONS_DB;
    
    if (difficulty !== 'all') {
        filtered = EPIC_QUESTIONS_DB.filter(q => q.difficulty === difficulty);
    }
    
    const shuffled = shuffleQuestions(filtered);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get questions by epic
 * @param {String} epic - 'Ramayana' or 'Mahabharata'
 * @returns {Array} - Questions from that epic
 */
function getQuestionsByEpic(epic) {
    return EPIC_QUESTIONS_DB.filter(q => q.epic === epic);
}

/**
 * Get difficulty stats
 * @returns {Object} - Count by difficulty
 */
function getDifficultyStats() {
    return {
        easy: EPIC_QUESTIONS_DB.filter(q => q.difficulty === 'easy').length,
        medium: EPIC_QUESTIONS_DB.filter(q => q.difficulty === 'medium').length,
        hard: EPIC_QUESTIONS_DB.filter(q => q.difficulty === 'hard').length,
        total: EPIC_QUESTIONS_DB.length
    };
}

// Export for global use
window.EPIC_QUESTIONS_DB = EPIC_QUESTIONS_DB;
window.getRandomEpicQuestions = getRandomEpicQuestions;
window.getQuestionsByEpic = getQuestionsByEpic;
window.getDifficultyStats = getDifficultyStats;
window.shuffleQuestions = shuffleQuestions;
