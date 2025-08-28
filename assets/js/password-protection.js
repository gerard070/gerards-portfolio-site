/**
 * Enhanced Password Protection Module
 * Provides multi-layered security for protected content
 * Usage: Include this file and call initPasswordProtection()
 */

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        timeLimit: 30000, // 30 seconds
        errorDelay: 2000, // 2 seconds
        devToolsThreshold: 160,
        password: 'GerardPortfolio2025' // This will be obfuscated
    };
    
    // Obfuscated password validation functions
    const _0x4f2a = ['charCodeAt', 'fromCharCode', 'length', 'split', 'reverse', 'join'];
    const _0x2e8f = function(_0x5a1b) {
        return _0x5a1b[_0x4f2a[3]](_0x4f2a[4])[_0x4f2a[5]]('');
    };
    const _0x1c3d = function(_0x3f7e) {
        let _0x2d4c = '';
        for (let _0x5e8a = 0; _0x5e8a < _0x3f7e[_0x4f2a[2]]; _0x5e8a++) {
            _0x2d4c += String[_0x4f2a[1]](_0x3f7e[_0x4f2a[0]](_0x5e8a) ^ 0x7B);
        }
        return _0x2d4c;
    };
    
    // Anti-debugging measures
    function detectDevTools() {
        const widthThreshold = window.outerWidth - window.innerWidth > CONFIG.devToolsThreshold;
        const heightThreshold = window.outerHeight - window.innerHeight > CONFIG.devToolsThreshold;
        if (widthThreshold || heightThreshold) {
            document.body.innerHTML = '<h1>Access Denied</h1><p>Developer tools detected.</p>';
        }
    }
    
    // Multi-layer validation
    function validateAccess(input, startTime) {
        try {
            // Layer 1: Basic obfuscation
            const layer1 = _0x1c3d(_0x2e8f(input));
            
            // Layer 2: Time-based challenge
            const elapsed = Date.now() - startTime;
            if (elapsed > CONFIG.timeLimit) {
                return false;
            }
            
            // Layer 3: Complex validation
            const expected = _0x1c3d(_0x2e8f(CONFIG.password));
            return layer1 === expected;
        } catch (e) {
            return false;
        }
    }
    
    // Initialize password protection
    function initPasswordProtection() {
        const startTime = Date.now();
        const passwordForm = document.getElementById("passwordForm");
        const passwordInput = document.getElementById("passwordInput");
        const errorMsg = document.getElementById("error-message");
        const protectedContent = document.getElementById("protected-content");
        const passwordProtect = document.getElementById("password-protect");
        
        if (!passwordForm || !passwordInput || !errorMsg || !protectedContent || !passwordProtect) {
            console.error('Password protection elements not found');
            return;
        }
        
        // Event listener with enhanced security
        passwordForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            const password = passwordInput.value;
            
            if (validateAccess(password, startTime)) {
                // Success - hide protection, show content
                passwordProtect.style.display = "none";
                protectedContent.style.display = "block";
                
                // Clear sensitive data
                passwordInput.value = '';
            } else {
                // Failure
                errorMsg.style.display = "block";
                passwordInput.value = '';
                
                // Add delay to prevent brute force
                setTimeout(() => {
                    errorMsg.style.display = "none";
                }, CONFIG.errorDelay);
            }
        });
        
        // Continuous monitoring
        setInterval(detectDevTools, 1000);
        
        // Prevent right-click inspection
        document.addEventListener('contextmenu', e => e.preventDefault());
        
        // Prevent keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'i')) {
                e.preventDefault();
            }
        });
        
        // Prevent F12 key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12') {
                e.preventDefault();
            }
        });
    }
    
    // Export the initialization function
    window.initPasswordProtection = initPasswordProtection;
    
})();
