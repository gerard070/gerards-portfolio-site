/**
 * Portfolio Password Protection System
 * Provides secure access to protected portfolio content
 */

(function() {
    'use strict';
    
    console.log('🔒 Password Protection System Loaded');
    
    // Obfuscated password validation
    const validatePassword = function(input) {
        // Simple obfuscation - not cryptographically secure but provides basic protection
        const encoded = btoa(input);
        const expected = 'R2VyYXJkUG9ydGZvbGlvMjAyNQ=='; // GerardPortfolio2025 in base64
        return encoded === expected;
    };
    
    // Initialize password protection
    function initPasswordProtection() {
        console.log('🔐 Initializing password protection...');
        
        const passwordProtect = document.getElementById('password-protect');
        const passwordForm = document.getElementById('passwordForm');
        const passwordInput = document.getElementById('passwordInput');
        const errorMessage = document.getElementById('error-message');
        
        if (!passwordProtect || !passwordForm) {
            console.log('❌ Password protection elements not found');
            return;
        }
        
        // Check if already authenticated
        if (sessionStorage.getItem('portfolio_authenticated') === 'true') {
            console.log('✅ Already authenticated, showing content');
            showContent();
            return;
        }
        
        // Handle form submission
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = passwordInput.value.trim();
            
            if (validatePassword(password)) {
                console.log('✅ Password correct, authenticating...');
                sessionStorage.setItem('portfolio_authenticated', 'true');
                showContent();
            } else {
                console.log('❌ Incorrect password');
                showError();
            }
        });
        
        // Handle Enter key
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                passwordForm.dispatchEvent(new Event('submit'));
            }
        });
        
        // Focus on password input
        passwordInput.focus();
        
        console.log('🔐 Password protection initialized');
    }
    
    // Show protected content
    function showContent() {
        const passwordProtect = document.getElementById('password-protect');
        const protectedContent = document.getElementById('protected-content');
        
        if (passwordProtect) {
            passwordProtect.style.display = 'none';
        }
        
        if (protectedContent) {
            protectedContent.style.display = 'block';
        }
        
        console.log('🎉 Content unlocked successfully');
    }
    
    // Show error message
    function showError() {
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Incorrect password. Please try again.';
        }
        
        // Clear password input
        const passwordInput = document.getElementById('passwordInput');
        if (passwordInput) {
            passwordInput.value = '';
            passwordInput.focus();
        }
    }
    
    // Expose function globally
    window.initPasswordProtection = initPasswordProtection;
    
    console.log('🔒 Password Protection System Ready');
    
})();
