/**
 * Portfolio Lightbox System
 * Provides enhanced image viewing for galleries and image containers
 * Features: click to enlarge, navigation, mobile-friendly, keyboard support
 */

(function() {
    'use strict';
    
    console.log('🎨 New Lightbox Script Loaded - Clean Version');
    
    // Simple lightbox state
    let currentImage = null;
    let currentIndex = 0;
    let images = [];
    
    // Create lightbox HTML
    function createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.id = 'portfolio-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <div class="lightbox-image-container">
                    <img class="lightbox-image" src="" alt="" />
                </div>
                <div class="lightbox-caption"></div>
                <div class="lightbox-nav">
                    <button class="lightbox-prev" aria-label="Previous image">‹</button>
                    <span class="lightbox-counter"></span>
                    <button class="lightbox-next" aria-label="Next image">›</button>
                </div>
                <button class="lightbox-close" aria-label="Close lightbox">×</button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        return lightbox;
    }
    
    // Initialize lightbox
    function initLightbox() {
        console.log('🚀 Initializing new lightbox...');
        
        // Create lightbox if it doesn't exist
        let lightbox = document.getElementById('portfolio-lightbox');
        if (!lightbox) {
            lightbox = createLightbox();
        }
        
        // Setup event listeners
        setupEventListeners(lightbox);
        
        // Setup image click handlers
        setupImageHandlers();
        
        console.log('✅ Lightbox initialized successfully');
    }
    
    // Setup event listeners
    function setupEventListeners(lightbox) {
        const overlay = lightbox.querySelector('.lightbox-overlay');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        // Close on overlay click
        overlay.addEventListener('click', closeLightbox);
        
        // Close on close button
        closeBtn.addEventListener('click', closeLightbox);
        
        // Navigation
        prevBtn.addEventListener('click', showPrevious);
        nextBtn.addEventListener('click', showNext);
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);
        
        console.log('🎯 Event listeners attached');
    }
    
    // Setup image click handlers
    function setupImageHandlers() {
        const selectors = [
            '.image-container img',
            '.two-images img', 
            '.gallery img',
            '.spotlight img',
            'figure img'
        ];
        
        const allImages = document.querySelectorAll(selectors.join(', '));
        console.log(`📸 Found ${allImages.length} images to make clickable`);
        
        allImages.forEach((img, index) => {
            img.style.cursor = 'pointer';
            
            img.addEventListener('click', (e) => {
                e.preventDefault();
                openLightbox(img, index);
            });
        });
    }
    
    // Open lightbox
    function openLightbox(clickedImg, index = 0) {
        console.log('🖼️ Opening lightbox for:', clickedImg.src);
        
        // Find all images in the same gallery context
        const galleryContext = findGalleryContext(clickedImg);
        images = galleryContext.images;
        currentIndex = galleryContext.index;
        
        if (images.length === 0) {
            console.log('❌ No images found in gallery');
            return;
        }
        
        // Show lightbox
        const lightbox = document.getElementById('portfolio-lightbox');
        lightbox.classList.add('active');
        
        // Load first image
        loadImage(images[currentIndex]);
        
        // Update navigation
        updateNavigation();
        
        console.log('✅ Lightbox opened with', images.length, 'images');
    }
    
    // Find gallery context
    function findGalleryContext(clickedImg) {
        // Look for parent containers
        const containers = [
            clickedImg.closest('.image-container'),
            clickedImg.closest('.two-images'),
            clickedImg.closest('.gallery'),
            clickedImg.closest('.spotlight'),
            clickedImg.closest('figure')
        ].filter(Boolean);
        
        if (containers.length === 0) {
            // Single image
            return { images: [clickedImg], index: 0 };
        }
        
        const container = containers[0];
        const containerImages = container.querySelectorAll('img');
        const imageArray = Array.from(containerImages);
        const index = imageArray.indexOf(clickedImg);
        
        return { images: imageArray, index: index };
    }
    
    // Load image
    function loadImage(img) {
        const lightboxImg = document.querySelector('.lightbox-image');
        const caption = document.querySelector('.lightbox-caption');
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        
        // Set caption
        const figcaption = img.parentElement.querySelector('figcaption');
        if (figcaption) {
            caption.textContent = figcaption.textContent;
            caption.style.display = 'block';
        } else {
            caption.style.display = 'none';
        }
        
        currentImage = img;
        console.log('🖼️ Loaded image:', img.src);
    }
    
    // Show previous image
    function showPrevious() {
        if (images.length <= 1) return;
        
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        loadImage(images[currentIndex]);
        updateNavigation();
    }
    
    // Show next image
    function showNext() {
        if (images.length <= 1) return;
        
        currentIndex = (currentIndex + 1) % images.length;
        loadImage(images[currentIndex]);
        updateNavigation();
    }
    
    // Update navigation
    function updateNavigation() {
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        const counter = document.querySelector('.lightbox-counter');
        
        if (images.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            counter.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
            counter.style.display = 'block';
            counter.textContent = `${currentIndex + 1} / ${images.length}`;
        }
    }
    
    // Handle keyboard
    function handleKeyboard(e) {
        if (!document.getElementById('portfolio-lightbox').classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevious();
                break;
            case 'ArrowRight':
                showNext();
                break;
        }
    }
    
    // Close lightbox
    function closeLightbox() {
        console.log('🚪 Closing lightbox');
        const lightbox = document.getElementById('portfolio-lightbox');
        lightbox.classList.remove('active');
    }
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLightbox);
    } else {
        initLightbox();
    }
    
    // Export for manual use
    window.initPortfolioLightbox = initLightbox;
    
})();

