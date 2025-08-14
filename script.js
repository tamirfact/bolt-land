  // Smooth scroll functionality for Contact Us buttons
  document.addEventListener('DOMContentLoaded', function() {
    const contactButtons = document.querySelectorAll('.contact-btn');
    const contactSection = document.getElementById('contact');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Typing effect functionality
    const textToType = "We develop intelligent co-pilots that empower anyone, regardless of experience, to diagnose and maintain complex machinery with precision and autonomy.";
    const typedTextElement = document.getElementById('typed-text');
    const caretElement = document.getElementById('caret');
    let currentIndex = 0;
    let isTyping = false;
    
    function typeText() {
        if (currentIndex < textToType.length) {
            typedTextElement.textContent += textToType[currentIndex];
            currentIndex++;
            setTimeout(typeText, 20);
        } else {
            setTimeout(() => {
                // caretElement.style.display = 'none';
            }, 1000);
        }
    }
    
    // Intersection Observer to trigger typing when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isTyping) {
                isTyping = true;
                typeText();
            }
        });
    }, {
        threshold: 0.3
    });
    
    const featureSection = document.querySelector('.feature');
    if (featureSection) {
        observer.observe(featureSection);
    }
    
    // Hero gradient scroll animation
    const hero = document.querySelector('.hero');
    const heroPart1 = document.querySelector('.hero-part-1');
    const heroPart2 = document.querySelector('.hero-part-2');
    
                function updateHeroGradient() {
        if (!hero) return;
        
        const heroRect = hero.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const heroHeight = hero.offsetHeight;
        
        // Calculate scroll progress through the hero section
        const scrollProgress = Math.max(0, Math.min(1, 
            (windowHeight - heroRect.top) / (heroHeight + windowHeight)
        ));
        
        // Apply gradient movement based on scroll
        const gradientMove = scrollProgress * 100; // Move up to 100px
        hero.style.setProperty('--gradient-move', `0 ${gradientMove}%`);
        
        // Interpolate color from #FF811A to #F6F9BD based on scroll
        const startColor = { r: 255, g: 129, b: 26 }; // #FF811A
        const endColor = { r: 255, g: 255, b: 255 }; // #F6F9BD
        
        const interpolatedColor = {
            r: Math.round(startColor.r + (endColor.r - startColor.r) * (scrollProgress-.5)),
            g: Math.round(startColor.g + (endColor.g - startColor.g) * (scrollProgress-.5)),
            b: Math.round(startColor.b + (endColor.b - startColor.b) * (scrollProgress-.5))
        };
        console.log(scrollProgress)
        
        // Ensure values are clamped to valid range and properly converted to hex
        const r = Math.max(0, Math.min(255, interpolatedColor.r));
        const g = Math.max(0, Math.min(255, interpolatedColor.g));
        const b = Math.max(0, Math.min(255, interpolatedColor.b));
        
        const colorHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        document.documentElement.style.setProperty('--color-orange', colorHex);
    }
    
    let loadAnimationId = null;
    let isLoading = false;
    
    function animateOnLoad() {
        if (!hero) return;
        
        isLoading = true;
        
        // Animate gradient from 0 to 50 on load with ease-out
        let loadProgress = 0;
        const targetProgress = 50;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        function easeOut(t) {
            return 1 - Math.pow(1 - t, 3); // Cubic ease-out
        }
        
        function animate(currentTime) {
            if (!isLoading) return; // Animation was cancelled
            
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOut(progress);
            loadProgress = easedProgress * targetProgress;
            
            hero.style.setProperty('--gradient-move', `0 ${loadProgress}%`);
            
            if (progress < 1) {
                loadAnimationId = requestAnimationFrame(animate);
            } else {
                isLoading = false;
            }
        }
        
        loadAnimationId = requestAnimationFrame(animate);
    }
    
    function cancelLoadAnimation() {
        if (loadAnimationId) {
            cancelAnimationFrame(loadAnimationId);
            loadAnimationId = null;
        }
        isLoading = false;
    }
    
    // Throttle scroll events for performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Cancel load animation if user starts scrolling
                if (isLoading) {
                    cancelLoadAnimation();
                }
                updateHeroGradient();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Add scroll listener
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Initial call
    updateHeroGradient();
    
    // Wait for page to be fully loaded before starting animation
    if (document.readyState === 'complete') {
        animateOnLoad();
    } else {
        window.addEventListener('load', animateOnLoad);
    }
});