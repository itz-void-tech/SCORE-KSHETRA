/**
 * TIERS.JS - 10-Tier Mythic Progression System
 * SINGLE SOURCE OF TRUTH for tier calculation and styling
 * Applies consistently across results, certificates, leaderboard
 */

// TIER CONFIGURATION - All tiers defined in one place
const TIER_CONFIG = {
    'Novice Seeker': {
        id: 1,
        minAccuracy: 0,
        maxAccuracy: 10,
        color: '#8B4513',
        textColor: '#FFFFFF',
        bgColor: 'rgba(139, 69, 19, 0.1)',
        borderColor: '#8B4513',
        lore: 'Just beginning the journey',
        mythicalTitle: 'Novice Seeker'
    },
    'Curious Wanderer': {
        id: 2,
        minAccuracy: 10,
        maxAccuracy: 20,
        color: '#A0522D',
        textColor: '#FFFFFF',
        bgColor: 'rgba(160, 82, 45, 0.1)',
        borderColor: '#A0522D',
        lore: 'Exploring ancient mysteries',
        mythicalTitle: 'Curious Wanderer'
    },
    'Knowledge Finder': {
        id: 3,
        minAccuracy: 20,
        maxAccuracy: 30,
        color: '#CD853F',
        textColor: '#FFFFFF',
        bgColor: 'rgba(205, 133, 63, 0.1)',
        borderColor: '#CD853F',
        lore: 'Discovering hidden truths',
        mythicalTitle: 'Knowledge Finder'
    },
    'Lore Student': {
        id: 4,
        minAccuracy: 30,
        maxAccuracy: 40,
        color: '#DEB887',
        textColor: '#000000',
        bgColor: 'rgba(222, 184, 135, 0.1)',
        borderColor: '#DEB887',
        lore: 'Studying epic narratives',
        mythicalTitle: 'Lore Student'
    },
    'Myth Apprentice': {
        id: 5,
        minAccuracy: 40,
        maxAccuracy: 50,
        color: '#D2691E',
        textColor: '#FFFFFF',
        bgColor: 'rgba(210, 105, 30, 0.1)',
        borderColor: '#D2691E',
        lore: 'Becoming familiar with myths',
        mythicalTitle: 'Myth Apprentice'
    },
    'Lore Seeker': {
        id: 6,
        minAccuracy: 50,
        maxAccuracy: 60,
        color: '#C0C0C0',
        textColor: '#000000',
        bgColor: 'rgba(192, 192, 192, 0.1)',
        borderColor: '#C0C0C0',
        lore: 'Competent in epic knowledge',
        mythicalTitle: 'Lore Seeker'
    },
    'Myth Scholar': {
        id: 7,
        minAccuracy: 60,
        maxAccuracy: 70,
        color: '#FFD700',
        textColor: '#000000',
        bgColor: 'rgba(255, 215, 0, 0.1)',
        borderColor: '#FFD700',
        lore: 'Expert in mythological lore',
        mythicalTitle: 'Myth Scholar'
    },
    'Epic Keeper': {
        id: 8,
        minAccuracy: 70,
        maxAccuracy: 80,
        color: '#FFA500',
        textColor: '#000000',
        bgColor: 'rgba(255, 165, 0, 0.1)',
        borderColor: '#FFA500',
        lore: 'Guardian of epic traditions',
        mythicalTitle: 'Epic Keeper'
    },
    'Mythic Master': {
        id: 9,
        minAccuracy: 80,
        maxAccuracy: 90,
        color: '#FF6347',
        textColor: '#FFFFFF',
        bgColor: 'rgba(255, 99, 71, 0.1)',
        borderColor: '#FF6347',
        lore: 'Mastered the ancient epics',
        mythicalTitle: 'Mythic Master'
    },
    'Divine Legend': {
        id: 10,
        minAccuracy: 90,
        maxAccuracy: 100,
        color: '#FF1493',
        textColor: '#FFFFFF',
        bgColor: 'rgba(255, 20, 147, 0.1)',
        borderColor: '#FF1493',
        lore: 'Legendary keeper of divine knowledge',
        mythicalTitle: 'Divine Legend'
    }
};

/**
 * SINGLE SOURCE OF TRUTH
 * Calculate tier based on accuracy
 * @param {number} accuracy - User accuracy percentage (0-100)
 * @returns {object} Tier object with all styling info
 */
function calculateTier(accuracy) {
    // Edge case handling
    if (accuracy === null || accuracy === undefined || isNaN(accuracy)) {
        accuracy = 0;
    }
    
    // Clamp accuracy between 0-100
    accuracy = Math.max(0, Math.min(100, accuracy));
    
    // Find tier by accuracy range
    for (const [tierName, tierConfig] of Object.entries(TIER_CONFIG)) {
        if (accuracy >= tierConfig.minAccuracy && accuracy < tierConfig.maxAccuracy) {
            return {
                name: tierName,
                ...tierConfig
            };
        }
    }
    
    // Fallback for accuracy = 100
    return {
        name: 'Divine Legend',
        ...TIER_CONFIG['Divine Legend']
    };
}

class TierSystem {
    static calculateTier(accuracy) {
        return calculateTier(accuracy);
    }

    static getTierBadge(tier) {
        if (!tier) tier = calculateTier(0);
        
        return `<div class="tier-badge" style="
            background: ${tier.bgColor};
            border: 2px solid ${tier.color};
            color: ${tier.textColor};
        ">
            <div class="tier-badge-title">${tier.mythicalTitle}</div>
            <div class="tier-badge-lore">${tier.lore}</div>
            <div class="tier-badge-id">Tier ${tier.id}/10</div>
        </div>`;
    }

    static getTierBadgeCompact(tier) {
        if (!tier) tier = calculateTier(0);
        
        return `<span class="tier-badge-compact" style="
            background: ${tier.bgColor};
            border: 1px solid ${tier.color};
            color: ${tier.textColor};
        " title="${tier.lore}">
            <span class="tier-rank">${tier.id}</span>
            <span class="tier-name">${tier.mythicalTitle}</span>
        </span>`;
    }

    static applyTierStyling(tier) {
        if (!tier) tier = calculateTier(0);
        
        const root = document.documentElement;
        root.style.setProperty('--tier-color', tier.color);
        root.style.setProperty('--tier-bg-color', tier.bgColor);
        root.style.setProperty('--tier-border-color', tier.borderColor);
        root.style.setProperty('--tier-text-color', tier.textColor);
        
        document.body.classList.forEach(cls => {
            if (cls.startsWith('tier-')) {
                document.body.classList.remove(cls);
            }
        });
        
        const tierClass = `tier-${tier.name.toLowerCase().replace(/\s+/g, '-')}`;
        document.body.classList.add(tierClass);
    }

    static getAllTiers() {
        return TIER_CONFIG;
    }

    static getTierStats() {
        const stats = {};
        for (const [name, config] of Object.entries(TIER_CONFIG)) {
            stats[name] = `${config.minAccuracy}–${config.maxAccuracy}%`;
        }
        return stats;
    }

    static getTierName(tier) {
        if (typeof tier === 'string') return tier;
        return tier?.name || 'Novice Seeker';
    }

    static isValidTier(tierName) {
        return TIER_CONFIG.hasOwnProperty(tierName);
    }
}

// Export for global use
window.TierSystem = TierSystem;
window.calculateTier = calculateTier;
window.TIER_CONFIG = TIER_CONFIG;
