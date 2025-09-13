// ==UserScript==
// @name         🚀FreeVPS | Instant Cloud VPS | Free Windows VPS | 2025 UPDATES & NO CARDS REQUIREMENTS💲
// @namespace    https://github.com/airpl4ne
// @version      1.0.0
// @description  Professional VPS automation tool - Create unlimited free virtual private servers instantly! Auto-fill GitHub tokens, smart delays, Discord integration. Perfect for developers, students & startups. 100% FREE & SECURE ⭐
// @author       airpl4ne
// @author  w_irylis
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_notification
// @grant        window.close
// @grant        window.focus
// @icon         https://cdn-icons-png.freepik.com/512/18726/18726486.png
// @homepage     https://irylisvps.vercel.app/
// @supportURL   https://discord.gg/Gvmd7deFtS
// @updateURL    https://github.com/pillowslua/TamperMonkey
// @downloadURL  https://github.com/airpl4ne/free-vps-creator/raw/main/script.user.js
// @license      MIT
// @run-at       document-idle
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        MAIN_SITE: "https://irylisvps.vercel.app/",
        DISCORD_URL: "https://discord.gg/Gvmd7deFtS",
        SCRIPT_VERSION: "1.0.0",
        AUTHORS: "airpl4ne & w_irylis"
    };

    // Enhanced CSS with professional design
    const addStyles = () => {
        if (document.getElementById('vps-creator-styles')) return;

        const style = document.createElement('style');
        style.id = 'vps-creator-styles';
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

            .vps-overlay {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
                backdrop-filter: blur(12px) saturate(180%);
                -webkit-backdrop-filter: blur(12px) saturate(180%);
                animation: vpsOverlayFadeIn 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
            }

            .vps-modal {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%) !important;
                background-size: 200% 200%;
                animation: vpsGradientShift 6s ease infinite, vpsModalSlideIn 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                box-shadow:
                    0 32px 64px -12px rgba(0, 0, 0, 0.4),
                    0 0 0 1px rgba(255, 255, 255, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                position: relative;
                overflow: hidden;
            }

            .vps-modal::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                animation: vpsShimmer 2s ease-in-out infinite;
            }

            .vps-button {
                background: linear-gradient(135deg, #10b981, #059669, #047857);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow:
                    0 4px 15px 0 rgba(16, 185, 129, 0.4),
                    0 1px 3px 0 rgba(0, 0, 0, 0.1);
                position: relative;
                overflow: hidden;
            }

            .vps-button::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 0.5s;
            }

            .vps-button:hover {
                transform: translateY(-3px) scale(1.02);
                box-shadow:
                    0 12px 30px 0 rgba(16, 185, 129, 0.5),
                    0 4px 15px 0 rgba(0, 0, 0, 0.1);
                background: linear-gradient(135deg, #059669, #047857, #065f46);
            }

            .vps-button:hover::before {
                left: 100%;
            }

            .vps-button:active {
                transform: translateY(-1px) scale(1.01);
                transition: all 0.1s;
            }

            .vps-close-btn {
                background: linear-gradient(135deg, #ef4444, #dc2626, #b91c1c);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow:
                    0 4px 15px 0 rgba(239, 68, 68, 0.4),
                    0 1px 3px 0 rgba(0, 0, 0, 0.1);
                position: relative;
                overflow: hidden;
            }

            .vps-close-btn:hover {
                transform: translateY(-2px);
                box-shadow:
                    0 8px 25px 0 rgba(239, 68, 68, 0.5),
                    0 4px 15px 0 rgba(0, 0, 0, 0.1);
                background: linear-gradient(135deg, #dc2626, #b91c1c, #991b1b);
            }

            .vps-status-text {
                text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                line-height: 1.6;
                letter-spacing: 0.01em;
            }

            .vps-loading {
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 3px solid rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                border-top-color: #ffffff;
                border-right-color: rgba(255, 255, 255, 0.6);
                animation: vpsSpinFast 0.8s linear infinite;
                margin-right: 12px;
                vertical-align: middle;
            }

            .vps-success {
                background: linear-gradient(135deg, #10b981, #059669, #047857) !important;
                background-size: 200% 200%;
                animation: vpsGradientShift 4s ease infinite, vpsSuccessPulse 2s ease infinite;
            }

            .vps-error {
                background: linear-gradient(135deg, #ef4444, #dc2626, #b91c1c) !important;
                background-size: 200% 200%;
                animation: vpsGradientShift 4s ease infinite, vpsErrorShake 0.5s ease;
            }

            .vps-warning {
                background: linear-gradient(135deg, #f59e0b, #d97706, #b45309) !important;
                background-size: 200% 200%;
                animation: vpsGradientShift 4s ease infinite;
            }

            .vps-floating-btn {
                position: fixed;
                bottom: 24px;
                right: 24px;
                z-index: 10000;
                padding: 16px 28px;
                border-radius: 16px;
                font-size: 16px;
                font-weight: 600;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                min-width: 200px;
                justify-content: center;
                box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
            }

            @keyframes vpsOverlayFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes vpsModalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-30px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }

            @keyframes vpsSpinFast {
                to { transform: rotate(360deg); }
            }

            @keyframes vpsGradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            @keyframes vpsShimmer {
                0%, 100% { opacity: 0; transform: translateX(-100%); }
                50% { opacity: 1; transform: translateX(100%); }
            }

            @keyframes vpsSuccessPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }

            @keyframes vpsErrorShake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }

            .vps-brand {
                font-size: 14px;
                opacity: 0.7;
                margin-top: 16px;
                font-weight: 400;
            }

            .vps-countdown {
                font-size: 14px;
                opacity: 0.8;
                margin-top: 12px;
                padding: 8px 16px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                display: inline-block;
            }

            .vps-feature-badge {
                display: inline-block;
                padding: 4px 12px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                font-size: 12px;
                font-weight: 500;
                margin: 4px;
                backdrop-filter: blur(4px);
            }
        `;
        document.head.appendChild(style);
    };

    // Utility functions
    const utils = {
        showNotification: (title, message, type = 'info') => {
            if (typeof GM_notification !== 'undefined') {
                GM_notification({
                    title: title,
                    text: message,
                    timeout: 5000,
                    onclick: () => window.focus()
                });
            }
        },

        saveData: (key, value) => {
            if (typeof GM_setValue !== 'undefined') {
                GM_setValue(key, value);
            } else {
                localStorage.setItem(`vps_creator_${key}`, JSON.stringify(value));
            }
        },

        getData: (key, defaultValue = null) => {
            if (typeof GM_getValue !== 'undefined') {
                return GM_getValue(key, defaultValue);
            } else {
                const stored = localStorage.getItem(`vps_creator_${key}`);
                return stored ? JSON.parse(stored) : defaultValue;
            }
        },

        isDiscordPage: () => {
            return window.location.href.includes('discord.gg') ||
                   window.location.hostname.includes('discord.com');
        },

        isMainSite: () => {
            return window.location.href.startsWith(CONFIG.MAIN_SITE);
        }
    };

    // Create enhanced overlay
    const createOverlay = (className = '') => {
        const overlay = document.createElement('div');
        overlay.className = `vps-overlay ${className}`;
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999999;
        `;
        document.body.appendChild(overlay);
        return overlay;
    };

    // Create enhanced modal
    const createModal = (overlay, className = '') => {
        const modal = document.createElement('div');
        modal.className = `vps-modal ${className}`;
        modal.style.cssText = `
            padding: 40px 52px;
            color: white;
            font-size: 18px;
            font-weight: 500;
            text-align: center;
            min-width: 360px;
            max-width: 520px;
            margin: 20px;
        `;
        overlay.appendChild(modal);
        return modal;
    };

    // Enhanced floating button for other sites
    const createFloatingButton = () => {
        addStyles();

        const btn = document.createElement("button");
        btn.innerHTML = `
            <span style="font-size: 20px;">🚀</span>
            <span>Create Free VPS Now!</span>
        `;
        btn.className = "vps-button vps-floating-btn";
        btn.onclick = () => {
            utils.showNotification('VPS Creator Pro', 'Redirecting to VPS creation page...');
            window.open(CONFIG.MAIN_SITE, '_blank');
        };
        document.body.appendChild(btn);

        // Add entrance animation delay
        setTimeout(() => {
            btn.style.transform = 'translateY(0)';
        }, 1000);
    };

    // Main VPS creation logic
    const handleMainSite = () => {
        addStyles();

        // Get saved token or prompt for new one
        let token = utils.getData('github_token');
        if (!token) {
            token = prompt("🔑 Enter your GitHub Token:\n(This will be saved for future use)");
            if (!token) {
                utils.showNotification('VPS Creator Pro', 'GitHub token is required!', 'error');
                return;
            }
            utils.saveData('github_token', token);
        }

        const delay = parseInt(prompt("⏱️ Enter delay in seconds (recommended: 3-5):", "3"), 10) || 3;
        if (delay < 1 || delay > 30) {
            utils.showNotification('VPS Creator Pro', 'Invalid delay time!', 'error');
            return;
        }

        const overlay = createOverlay();
        const modal = createModal(overlay);

        // Add branding
        const brand = document.createElement('div');
        brand.className = 'vps-brand';
        brand.innerHTML = `VPS Creator Pro v${CONFIG.SCRIPT_VERSION} by ${CONFIG.AUTHORS}`;

        const statusText = document.createElement("div");
        statusText.className = "vps-status-text";
        statusText.innerHTML = `
            <div class="vps-loading"></div>
            🚀 Initializing VPS creation process...
        `;

        modal.appendChild(statusText);
        modal.appendChild(brand);

        const setStatus = (msg, showLoading = true, type = '') => {
            const loadingHtml = showLoading ? '<div class="vps-loading"></div>' : '';
            statusText.innerHTML = `${loadingHtml}${msg}`;

            // Update modal class based on type
            modal.className = `vps-modal ${type}`;
        };

        // Process automation
        const processSteps = async () => {
            try {
                // Step 1: Fill token
                setStatus("✍️ Filling GitHub token automatically...");
                await new Promise(resolve => setTimeout(resolve, 800));

                const input = document.querySelector("#githubToken");
                if (input) {
                    input.type = "text";
                    input.value = token;
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                    utils.showNotification('VPS Creator Pro', 'Token filled successfully!');
                } else {
                    throw new Error('Token input field not found');
                }

                // Step 2: Countdown
                for (let i = delay; i > 0; i--) {
                    setStatus(`⏳ Starting VPS creation in ${i} seconds...<br><small>Please wait while we prepare everything</small>`);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }

                // Step 3: Click creation button
                setStatus("📡 Sending VPS creation request...");
                overlay.style.pointerEvents = "none";

                const btn = document.querySelector("#createBtn");
                if (btn) {
                    btn.click();
                    utils.showNotification('VPS Creator Pro', 'VPS creation initiated!');
                } else {
                    throw new Error('Create button not found');
                }

                // Step 4: Wait for response
                setStatus("🔍 Processing your request...<br><small>This may take a few moments</small>");
                await new Promise(resolve => setTimeout(resolve, 5000));

                // Step 5: Check results
                setStatus("📋 Checking creation status...");
                await new Promise(resolve => setTimeout(resolve, 2000));

                let resultMsg = "⚠️ Status message not found";
                let isSuccess = false;

                const statusMessage = document.querySelector(".status-message");
                if (statusMessage) {
                    const statusText = statusMessage.innerText.toLowerCase();
                    resultMsg = `📌 Result: ${statusMessage.innerText}`;
                    isSuccess = statusText.includes('success') ||
                               statusText.includes('created') ||
                               statusText.includes('deployed');
                }

                const finalType = isSuccess ? 'vps-success' :
                                 statusMessage ? 'vps-warning' : 'vps-error';

                setStatus(resultMsg, false, finalType);

                const notificationType = isSuccess ? 'success' : 'warning';
                utils.showNotification('VPS Creator Pro', resultMsg.replace('📌 Result: ', ''), notificationType);

                // Step 6: Redirect countdown
                await new Promise(resolve => setTimeout(resolve, 1500));

                for (let countdown = 5; countdown > 0; countdown--) {
                    const countdownHtml = `<div class="vps-countdown">Redirecting to Discord in ${countdown}s...</div>`;
                    setStatus(`${resultMsg}<br>${countdownHtml}`, false, finalType);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }

                // Save success state for Discord page
                utils.saveData('vps_creation_success', {
                    success: isSuccess,
                    message: resultMsg,
                    timestamp: Date.now()
                });

                utils.showNotification('VPS Creator Pro', 'Redirecting to Discord community...');
                window.location.href = CONFIG.DISCORD_URL;

            } catch (error) {
                setStatus(`❌ Error: ${error.message}`, false, 'vps-error');
                utils.showNotification('VPS Creator Pro', `Error: ${error.message}`, 'error');

                setTimeout(() => {
                    overlay.style.animation = 'vpsOverlayFadeIn 0.3s ease-out reverse';
                    setTimeout(() => overlay.remove(), 300);
                }, 3000);
            }
        };

        processSteps();
    };

    // Enhanced Discord thank you page
    const handleDiscordPage = () => {
        // Wait for page to fully load
        setTimeout(() => {
            addStyles();

            // Check if we came from VPS creation
            const vpsData = utils.getData('vps_creation_success');
            const isRecentCreation = vpsData && (Date.now() - vpsData.timestamp < 300000); // 5 minutes

            if (!isRecentCreation) return; // Don't show if not from recent VPS creation

            const overlay = createOverlay();
            const modal = createModal(overlay, 'vps-success');

            const content = document.createElement("div");
            content.innerHTML = `
                <div style="font-size: 64px; margin-bottom: 20px; animation: vpsSuccessPulse 2s ease infinite;">🎉</div>
                <div style="font-size: 28px; font-weight: 700; margin-bottom: 12px;">
                    Welcome to Our Community!
                </div>
                <div style="font-size: 18px; opacity: 0.9; margin-bottom: 20px;">
                    Thank you for using VPS Creator Pro
                </div>
                <div style="font-size: 16px; opacity: 0.8; margin-bottom: 24px;">
                    ${vpsData.success ? '✅ Your VPS was created successfully!' : '⚠️ Please check your VPS status'}
                </div>
                <div class="vps-feature-badge">💻 Free VPS</div>
                <div class="vps-feature-badge">🚀 Instant Setup</div>
                <div class="vps-feature-badge">🔒 Secure</div>
                <div class="vps-feature-badge">📈 Scalable</div>
            `;
            modal.appendChild(content);

            const buttonContainer = document.createElement("div");
            buttonContainer.style.cssText = "display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;";

            const joinBtn = document.createElement("button");
            joinBtn.innerHTML = `<span style="margin-right: 8px;">💬</span><span>Join Community</span>`;
            joinBtn.className = "vps-button";
            joinBtn.style.cssText = `
                padding: 12px 24px;
                color: white;
                font-weight: 600;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                display: inline-flex;
                align-items: center;
            `;
            joinBtn.onclick = () => {
                overlay.remove();
                utils.showNotification('VPS Creator Pro', 'Welcome to our Discord community!');
            };

            const closeBtn = document.createElement("button");
            closeBtn.innerHTML = `<span style="margin-right: 8px;">✖</span><span>Close</span>`;
            closeBtn.className = "vps-close-btn";
            closeBtn.style.cssText = `
                padding: 12px 24px;
                color: white;
                font-weight: 600;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                display: inline-flex;
                align-items: center;
            `;
            closeBtn.onclick = () => {
                overlay.style.animation = 'vpsOverlayFadeIn 0.4s ease-out reverse';
                setTimeout(() => overlay.remove(), 400);
            };

            buttonContainer.appendChild(joinBtn);
            buttonContainer.appendChild(closeBtn);
            modal.appendChild(buttonContainer);

            const brand = document.createElement('div');
            brand.className = 'vps-brand';
            brand.innerHTML = `VPS Creator Pro v${CONFIG.SCRIPT_VERSION} by ${CONFIG.AUTHORS}`;
            modal.appendChild(brand);

            // Clear the saved data after showing
            utils.saveData('vps_creation_success', null);

            // Auto-close after 30 seconds
            setTimeout(() => {
                if (document.body.contains(overlay)) {
                    closeBtn.click();
                }
            }, 30000);

        }, 2000); // Wait 2 seconds for Discord to load
    };

    // Main execution logic
    const init = () => {
        // Prevent multiple executions
        if (window.vpsCreatorInitialized) return;
        window.vpsCreatorInitialized = true;

        // Clean up any old stored tokens on initialization
        if (typeof GM_deleteValue !== 'undefined') {
            GM_deleteValue('github_token');
        }
        localStorage.removeItem('vps_creator_github_token');

        if (utils.isMainSite()) {
            handleMainSite();
        } else if (utils.isDiscordPage()) {
            handleDiscordPage();
        } else {
            // Show floating button on other sites
            createFloatingButton();
        }
    };

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
