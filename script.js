// ================================
// Smooth Scrolling for Navigation Links
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for just "#"
        if (href === '#') return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// Navbar Background on Scroll
// ================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 14, 26, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 14, 26, 0.9)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ================================
// Waitlist Form Handling
// ================================
const waitlistForm = document.getElementById('waitlistForm');
const formMessage = document.getElementById('formMessage');
const emailInput = document.getElementById('email');

waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Disable submit button
    const submitBtn = waitlistForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Joining...';

    // Simulate API call (replace with actual backend endpoint)
    try {
        // In production, this would be an actual API call:
        // const response = await fetch('/api/waitlist', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email })
        // });

        // For MVP, simulate success after delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Store in localStorage for demo purposes
        const waitlist = JSON.parse(localStorage.getItem('waitlist') || '[]');
        if (!waitlist.includes(email)) {
            waitlist.push(email);
            localStorage.setItem('waitlist', JSON.stringify(waitlist));
        }

        showMessage('Success! You\'re on the waitlist. We\'ll notify you when beta testing begins.', 'success');
        emailInput.value = '';

        // Track conversion (in production, integrate with analytics)
        trackWaitlistSignup(email);

    } catch (error) {
        showMessage('Something went wrong. Please try again later.', 'error');
        console.error('Waitlist signup error:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

function trackWaitlistSignup(email) {
    // In production, integrate with analytics platforms:
    // - Google Analytics
    // - Mixpanel
    // - Segment
    // - PostHog

    console.log('Waitlist signup tracked:', email);

    // Example GA4 event:
    // gtag('event', 'waitlist_signup', {
    //     'event_category': 'engagement',
    //     'event_label': 'early_access'
    // });
}

// ================================
// Intersection Observer for Animations
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and tech cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .tech-card, .workflow-step');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ================================
// Enhanced Star Field Animation
// ================================
function createStarField() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;

    // Create shooting stars occasionally
    setInterval(() => {
        if (Math.random() > 0.7) {
            createShootingStar();
        }
    }, 3000);
}

function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.position = 'absolute';
    star.style.width = '2px';
    star.style.height = '2px';
    star.style.background = 'white';
    star.style.borderRadius = '50%';
    star.style.boxShadow = '0 0 10px 2px rgba(255, 255, 255, 0.8)';
    star.style.top = Math.random() * 50 + '%';
    star.style.left = Math.random() * 100 + '%';
    star.style.opacity = '0';
    star.style.transition = 'all 1s ease-out';

    document.querySelector('.stars').appendChild(star);

    setTimeout(() => {
        star.style.opacity = '1';
        star.style.transform = 'translate(100px, 100px)';
    }, 10);

    setTimeout(() => {
        star.remove();
    }, 1100);
}

// ================================
// Mobile Menu Toggle (for future enhancement)
// ================================
function initMobileMenu() {
    // This can be enhanced later with a hamburger menu for mobile
    const navLinks = document.querySelector('.nav-links');

    // Add mobile menu toggle button if screen is small
    if (window.innerWidth <= 768) {
        console.log('Mobile view detected. Consider adding hamburger menu.');
    }
}

// ================================
// Dynamic Stats Counter Animation
// ================================
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;

                // Only animate if it contains numbers
                if (text.includes('10,000')) {
                    animateNumber(target, 0, 10000, 2000, (val) => `${val.toLocaleString()}+`);
                }
            }
        });
    };

    const statsObserver = new IntersectionObserver(observerCallback, { threshold: 0.5 });
    stats.forEach(stat => statsObserver.observe(stat));
}

function animateNumber(element, start, end, duration, formatter) {
    const startTime = Date.now();
    const originalValue = element.textContent;

    function update() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(start + (end - start) * easeOutQuart(progress));
        element.textContent = formatter ? formatter(current) : current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = originalValue;
        }
    }

    update();
}

function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}

// ================================
// Parallax Effect for Hero Section
// ================================
function initParallax() {
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = hero.querySelector('.stars');

        if (parallax && scrolled <= window.innerHeight) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ================================
// Initialize All Features
// ================================
document.addEventListener('DOMContentLoaded', () => {
    createStarField();
    initMobileMenu();
    animateStats();
    initParallax();

    console.log('%cAstraeus MVP Website', 'font-size: 24px; font-weight: bold; color: #6366f1;');
    console.log('%cBuilt for astrophotographers who demand precision', 'font-size: 14px; color: #94a3b8;');
});

// ================================
// Email List Export (Admin Function)
// ================================
// For development/testing purposes
window.exportWaitlist = function() {
    const waitlist = JSON.parse(localStorage.getItem('waitlist') || '[]');
    console.log('Waitlist Emails:', waitlist);
    console.log('Total Signups:', waitlist.length);

    // Create downloadable CSV
    const csv = 'Email\n' + waitlist.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'astraeus-waitlist.csv';
    a.click();
    window.URL.revokeObjectURL(url);
};

// ================================
// Error Boundary
// ================================
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // In production, send to error tracking service (e.g., Sentry)
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // In production, send to error tracking service
});
