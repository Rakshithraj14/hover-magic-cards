// 3D Card Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all card containers
    const cardContainers = document.querySelectorAll('.card-container');
    
    cardContainers.forEach(container => {
        const cardBody = container.querySelector('.card-body');
        const cardItems = container.querySelectorAll('.card-item');
        
        // Apply initial transforms to card items
        applyCardItemTransforms(cardItems);
        
        // Add mouse move event listener for 3D rotation
        cardBody.addEventListener('mousemove', function(e) {
            const rect = cardBody.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 4;
            const rotateY = (centerX - x) / 4;
            
            cardBody.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Apply 3D rotation to image on hover
            const imageContainer = cardBody.querySelector('.card-item[data-translate-z="100"]');
            if (imageContainer) {
                imageContainer.style.transform = `translateX(0px) translateY(0px) translateZ(100px) rotateX(${20 + rotateX}deg) rotateY(${rotateY}deg) rotateZ(${-10}deg)`;
            }
        });
        
        // Reset rotation on mouse leave
        cardBody.addEventListener('mouseleave', function(e) {
            cardBody.style.transform = 'rotateX(0deg) rotateY(0deg)';
            
            // Reset image to proper alignment
            const imageContainer = cardBody.querySelector('.card-item[data-translate-z="100"]');
            if (imageContainer) {
                imageContainer.style.transform = 'translateX(0px) translateY(0px) translateZ(100px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
            }
        });
    });
    
    // Function to apply transforms to card items based on data attributes
    function applyCardItemTransforms(cardItems) {
        cardItems.forEach(item => {
            const translateX = item.dataset.translateX || '0';
            const translateY = item.dataset.translateY || '0';
            const translateZ = item.dataset.translateZ || '0';
            const rotateX = item.dataset.rotateX || '0';
            const rotateY = item.dataset.rotateY || '0';
            const rotateZ = item.dataset.rotateZ || '0';
            
            const transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
            item.style.transform = transform;
        });
    }
    
    // Dark mode functionality removed
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add keyboard navigation support
    addKeyboardNavigation();
    
    // Add intersection observer for animation on scroll
    addScrollAnimations();
    
    // Initialize image slideshow
    initializeSlideshow();
});

// Image slideshow functionality
function initializeSlideshow() {
    const imageElement = document.getElementById('slideshow-image');
    if (!imageElement) return;
    
    // Array of image paths - update these to match your actual image files
    const images = [
        'assets/card-1.jpg',
        'assets/card-2.jpg'
    ];
    
    let currentImageIndex = 0;
    
    // Function to change image with fade effect
    function changeImage() {
        // Fade out
        imageElement.style.opacity = '0';
        
        setTimeout(() => {
            // Change image source
            currentImageIndex = (currentImageIndex + 1) % images.length;
            imageElement.src = images[currentImageIndex];
            
            // Fade in
            imageElement.style.opacity = '1';
        }, 250); // Half of transition duration for smooth fade
    }
    
    // Change image every 10 seconds
    setInterval(changeImage, 10000);
    
    // Optional: Preload images for smoother transitions
    images.forEach((imageSrc, index) => {
        if (index > 0) { // Skip first image as it's already loaded
            const img = new Image();
            img.src = imageSrc;
        }
    });
}

// Dark mode toggle function removed

// Add keyboard navigation support
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Focus management for accessibility
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all card containers
    const cardContainers = document.querySelectorAll('.card-container');
    cardContainers.forEach(container => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        container.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(container);
    });
}

// Utility function to create smooth transitions
function createSmoothTransition(element, property, value, duration = 200) {
    element.style.transition = `${property} ${duration}ms ease-in-out`;
    element.style[property] = value;
    
    setTimeout(() => {
        element.style.transition = '';
    }, duration);
}

// Add click effects to buttons
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        e.target.style.position = 'relative';
        e.target.style.overflow = 'hidden';
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .keyboard-navigation button:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle mousemove events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to mousemove events for better performance
document.addEventListener('DOMContentLoaded', function() {
    const cardContainers = document.querySelectorAll('.card-container');
    
    cardContainers.forEach(container => {
        const cardBody = container.querySelector('.card-body');
        
        // Throttle the mousemove event to 16ms (60fps)
        const throttledMouseMove = throttle(function(e) {
            const rect = cardBody.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 4;
            const rotateY = (centerX - x) / 4;
            
            cardBody.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }, 16);
        
        cardBody.addEventListener('mousemove', throttledMouseMove);
    });
});
