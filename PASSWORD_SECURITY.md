# Enhanced Password Protection System

## Overview
This portfolio site now uses a **centralized, multi-layered security approach** to protect sensitive content while maintaining compatibility with GitHub Pages hosting. All password protection logic is now contained in a single, reusable module.

## New Password
**Password**: `GerardPortfolio2025`

## Architecture
- **Central Module**: `assets/js/password-protection.js`
- **Protected Pages**: Include the module and call `initPasswordProtection()`
- **Configuration**: All security settings centralized in one place

## Security Features Implemented

### 1. **Obfuscated Password Logic**
- Password validation is heavily obfuscated using JavaScript minification techniques
- The actual password is not stored in plain text anywhere in the code
- Multiple layers of encoding make reverse engineering much more difficult

### 2. **Anti-Debugging Measures**
- Detects when developer tools are opened
- Prevents right-click context menu inspection
- Blocks common keyboard shortcuts (Ctrl+U, Ctrl+S, Ctrl+I, F12)
- Continuous monitoring for debugging attempts

### 3. **Time-Based Challenges**
- 30-second time limit from page load to password entry
- Prevents automated attacks and adds complexity

### 4. **Brute Force Protection**
- 2-second delay after failed attempts
- Clears password field on failure
- Prevents rapid password guessing

### 5. **Multi-Layer Validation**
- Layer 1: Basic obfuscation
- Layer 2: Time-based challenge
- Layer 3: Complex validation with XOR operations

## Protected Pages
- `chegg_pm_international.html`
- `chegg_pm_platform.html`
- `chegg_pm_us_pricing_and_packaging.html`

## Implementation
Each protected page now includes:
```html
<script src="assets/js/password-protection.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    initPasswordProtection();
  });
</script>
```

## Benefits of Centralized Approach
✅ **Maintainable**: Update security logic in one place  
✅ **Consistent**: All pages use identical security measures  
✅ **Debuggable**: Easier to troubleshoot security issues  
✅ **Upgradable**: Simple to add new security features  
✅ **DRY Principle**: No code duplication across pages  

## How It Works
1. User visits protected page
2. Password form is displayed
3. User enters password within 30 seconds
4. Password goes through multi-layer validation
5. If successful, protected content is revealed
6. If failed, error message shown with delay

## Security Limitations
⚠️ **Important**: This is still client-side protection and can be bypassed by:
- Advanced users with technical knowledge
- Disabling JavaScript
- Using browser extensions
- Network-level inspection

However, it provides **significantly better** protection than the previous simple "t" password and will deter most casual attempts to access protected content.

## For Maximum Security
Consider implementing server-side authentication if you upgrade to a hosting provider that supports it. For now, this solution provides the best security possible on GitHub Pages.
