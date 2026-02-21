/**
 * CERTIFICATE-GENERATOR.JS - Canvas-based Certificate Image Generation
 * Generates downloadable PNG certificates with epic theming
 */

class CertificateGenerator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
    }

    /**
     * Generate certificate as image
     */
    generate(playerName, score, accuracy, tier, mode, certId) {
        // Create canvas (high DPI for quality downloads)
        const dpi = 2; // For 2x quality
        const width = 1200 * dpi;
        const height = 800 * dpi;
        
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');
        
        // Scale for high DPI
        this.ctx.scale(dpi, dpi);
        
        // Draw background
        this.drawBackground(tier);
        
        // Draw decorative elements
        this.drawBorders(tier);
        this.drawCornerDecorations(tier);
        
        // Draw content
        this.drawTitle();
        this.drawMainText(playerName, score, accuracy, tier, mode);
        this.drawFooter(certId);
        
        return this.canvas;
    }

    /**
     * Draw epic background based on tier
     */
    drawBackground(tier) {
        const width = 1200;
        const height = 800;
        
        // Use tier colors for gradient
        const gradient = this.ctx.createLinearGradient(0, 0, width, height);
        
        // Create gradient using tier color (darkened versions)
        const tierColor = tier.color || '#666';
        const darkerColor = this.darkenColor(tierColor, 50);
        const darkestColor = '#1a1a2e';
        
        gradient.addColorStop(0, darkerColor);
        gradient.addColorStop(0.5, this.darkenColor(tierColor, 30));
        gradient.addColorStop(1, darkestColor);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Subtle pattern overlay
        this.drawPattern();
    }

    /**
     * Darken a hex color by a given percentage
     */
    darkenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, (num >> 16) - amt);
        const G = Math.max(0, (num >> 8 & 0x00FF) - amt);
        const B = Math.max(0, (num & 0x0000FF) - amt);
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }

    /**
     * Draw subtle background pattern
     */
    drawPattern() {
        const width = 1200;
        const height = 800;
        
        this.ctx.strokeStyle = 'rgba(200, 150, 100, 0.05)';
        this.ctx.lineWidth = 0.5;
        
        // Vertical lines
        for (let x = 0; x < width; x += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y < height; y += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(width, y);
            this.ctx.stroke();
        }
    }

    /**
     * Draw decorative borders
     */
    drawBorders(tier) {
        const width = 1200;
        const height = 800;
        const borderColor = tier.color;
        
        // Outer border (thick)
        this.ctx.strokeStyle = borderColor;
        this.ctx.lineWidth = 8;
        this.ctx.strokeRect(40, 40, width - 80, height - 80);
        
        // Inner border (thin)
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(60, 60, width - 120, height - 120);
        
        // Accent corners
        this.drawCornerAccent(80, 80, borderColor);
        this.drawCornerAccent(width - 80, 80, borderColor);
        this.drawCornerAccent(80, height - 80, borderColor);
        this.drawCornerAccent(width - 80, height - 80, borderColor);
    }

    /**
     * Draw corner decorations
     */
    drawCornerDecorations(tier) {
        const width = 1200;
        const height = 800;
        const color = tier.color;
        
        // Top left
        this.drawFloral(100, 100, color);
        // Top right
        this.drawFloral(width - 100, 100, color, true);
        // Bottom left
        this.drawFloral(100, height - 100, color);
        // Bottom right
        this.drawFloral(width - 100, height - 100, color, true);
    }

    /**
     * Draw decorative floral pattern
     */
    drawFloral(x, y, color, mirror = false) {
        const scale = mirror ? -1 : 1;
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.scale(scale, 1);
        
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = 0.3;
        
        // Small decorative circle
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 8, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Petals
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const px = Math.cos(angle) * 15;
            const py = Math.sin(angle) * 15;
            this.ctx.beginPath();
            this.ctx.arc(px, py, 4, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        this.ctx.globalAlpha = 1;
        this.ctx.restore();
    }

    /**
     * Draw corner accent squares
     */
    drawCornerAccent(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = 0.5;
        this.ctx.fillRect(x - 5, y - 5, 10, 10);
        this.ctx.globalAlpha = 1;
    }

    /**
     * Draw certificate title
     */
    drawTitle() {
        const width = 1200;
        
        this.ctx.fillStyle = '#ffd700';
        this.ctx.font = 'bold 48px "Georgia", serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('CERTIFICATE OF ACHIEVEMENT', width / 2, 150);
        
        this.ctx.fillStyle = 'rgba(255, 215, 0, 0.7)';
        this.ctx.font = '24px "Georgia", serif';
        this.ctx.fillText('SCORE KSHETRA COMPETITIVE PLATFORM', width / 2, 200);
    }

    /**
     * Draw main certificate content
     */
    drawMainText(playerName, score, accuracy, tier, mode) {
        const width = 1200;
        const lineSpacing = 50;
        let y = 270;
        
        // "This certifies that"
        this.ctx.fillStyle = '#e0e0e0';
        this.ctx.font = '24px "Georgia", serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('This certifies that', width / 2, y);
        y += lineSpacing;
        
        // Player name
        this.ctx.fillStyle = tier.color;
        this.ctx.font = 'bold 48px "Georgia", serif';
        this.ctx.fillText(playerName.toUpperCase(), width / 2, y);
        y += lineSpacing + 10;
        
        // "has completed"
        this.ctx.fillStyle = '#e0e0e0';
        this.ctx.font = '24px "Georgia", serif';
        this.ctx.fillText('has completed', width / 2, y);
        y += lineSpacing;
        
        // Achievement text
        const certTitle = mode ? `The ${mode} Challenge` : 'The Quiz Challenge';
        this.ctx.fillStyle = '#ffd700';
        this.ctx.font = '28px "Georgia", serif';
        this.ctx.fillText(`${certTitle} with ${accuracy}% Accuracy`, width / 2, y);
        y += lineSpacing + 20;
        
        // Score display
        this.ctx.fillStyle = '#e0e0e0';
        this.ctx.font = '20px "Georgia", serif';
        this.ctx.fillText('Score:', width / 2 - 100, y);
        this.ctx.fillStyle = tier.color;
        this.ctx.font = 'bold 28px "Georgia", serif';
        this.ctx.fillText(score, width / 2 + 50, y);
        
        // Tier badge
        this.drawTierBadge(width / 2, y + 60, tier);
    }

    /**
     * Draw tier badge in certificate
     */
    drawTierBadge(x, y, tier) {
        const size = 60;
        
        // Circle background
        this.ctx.fillStyle = tier.color;
        this.ctx.globalAlpha = 0.2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Circle border
        this.ctx.globalAlpha = 1;
        this.ctx.strokeStyle = tier.color;
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        
        // Tier badge (no icons, use mythical title)
        this.ctx.fillStyle = tier.color;
        this.ctx.font = 'bold 28px "Georgia", serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        // Tier mythical title
        this.ctx.fillText(tier.mythicalTitle || tier.name, x, y);
        
        // Tier lore subtitle below
        this.ctx.font = 'italic 16px "Georgia", serif';
        this.ctx.fillStyle = 'rgba(200, 150, 100, 0.8)';
        this.ctx.fillText(tier.lore || '', x, y + 40);
    }

    /**
     * Draw footer with certificate ID and date
     */
    drawFooter(certId) {
        const width = 1200;
        const height = 800;
        
        // Issue date and time
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const timeStr = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        this.ctx.fillStyle = '#e0e0e0';
        this.ctx.font = '14px "Georgia", serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Issued: ${dateStr} at ${timeStr}`, width / 2, height - 80);
        
        // Certificate ID
        this.ctx.fillStyle = '#999';
        this.ctx.font = '12px monospace';
        this.ctx.fillText(`Certificate ID: ${certId}`, width / 2, height - 50);
        
        // Decorative line above footer
        this.ctx.strokeStyle = 'rgba(200, 150, 100, 0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(200, height - 100);
        this.ctx.lineTo(width - 200, height - 100);
        this.ctx.stroke();
    }

    /**
     * Download certificate as PNG
     */
    download(playerName, certId) {
        const filename = `${playerName}_${certId}.png`;
        const link = document.createElement('a');
        link.href = this.canvas.toDataURL('image/png');
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /**
     * Get canvas element for preview
     */
    getCanvas() {
        return this.canvas;
    }

    /**
     * Get image data URL for sharing
     */
    getImageUrl() {
        return this.canvas.toDataURL('image/png');
    }
}

// Export globally
window.CertificateGenerator = CertificateGenerator;
