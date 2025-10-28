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
// 3D Galaxy Background
// ================================
function create3DGalaxy() {
    const galaxy = document.getElementById('galaxy');
    if (!galaxy) return;

    const particles = [];
    const spiralArms = 3; // Number of spiral arms
    const particlesPerArm = 300;
    const centerParticles = 100;

    // Create bright galactic center
    for (let i = 0; i < centerParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'galaxy-particle';

        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 80;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = (Math.random() - 0.5) * 40;

        const size = Math.random() * 4 + 2;
        const brightness = Math.random() * 0.5 + 0.5;

        // Bright yellow-white center
        const hue = 40 + Math.random() * 20;
        const saturation = 70 + Math.random() * 30;
        const lightness = 70 + brightness * 30;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = `hsla(${hue}, ${saturation}%, ${lightness}%, ${brightness})`;
        particle.style.boxShadow = `0 0 ${size * 4}px hsla(${hue}, ${saturation}%, ${lightness}%, ${brightness})`;
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;

        galaxy.appendChild(particle);
        particles.push({ element: particle, x, y, z });
    }

    // Create distinct spiral arms
    for (let arm = 0; arm < spiralArms; arm++) {
        const armAngleOffset = (arm / spiralArms) * Math.PI * 2;

        for (let i = 0; i < particlesPerArm; i++) {
            const particle = document.createElement('div');
            particle.className = 'galaxy-particle';

            // Logarithmic spiral formula for realistic galaxy arms
            const t = (i / particlesPerArm) * 4; // Parameter along spiral
            const spiralTightness = 0.3; // Lower = tighter spiral
            const radius = 80 + t * 80; // Distance from center grows
            const angle = armAngleOffset + t * Math.PI * 2 * spiralTightness;

            // Add randomness within the arm (arm thickness)
            const armThickness = 30 + t * 10; // Arms get thicker as they extend
            const randomOffset = (Math.random() - 0.5) * armThickness;
            const perpAngle = angle + Math.PI / 2;

            const x = Math.cos(angle) * radius + Math.cos(perpAngle) * randomOffset;
            const y = Math.sin(angle) * radius + Math.sin(perpAngle) * randomOffset;
            const z = (Math.random() - 0.5) * 100 + (Math.random() - 0.5) * t * 30;

            // Size varies along the arm
            const size = Math.random() * 3 + 1;
            const brightness = Math.random() * 0.6 + 0.3;

            // Color transitions from blue (outer) to purple to pink (inner)
            const colorPosition = 1 - (i / particlesPerArm);
            const hue = 200 + colorPosition * 80; // 200 (cyan-blue) to 280 (magenta)
            const saturation = 60 + Math.random() * 30;
            const lightness = 50 + brightness * 25;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = `hsla(${hue}, ${saturation}%, ${lightness}%, ${brightness})`;
            particle.style.boxShadow = `0 0 ${size * 3}px hsla(${hue}, ${saturation}%, ${lightness}%, ${brightness * 0.8})`;
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;

            galaxy.appendChild(particle);
            particles.push({ element: particle, x, y, z, angle, radius });
        }
    }

    console.log(`Created galaxy with ${particles.length} particles in ${spiralArms} spiral arms`);

    // Scroll-based rotation
    let lastScrollY = 0;
    let rotation = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const scrollDelta = scrollY - lastScrollY;
        lastScrollY = scrollY;

        // Update rotation based on scroll
        rotation += scrollDelta * 0.1;

        // Apply rotation to entire galaxy
        galaxy.style.transform = `rotateX(${rotation * 0.05}deg) rotateY(${rotation * 0.1}deg) rotateZ(${rotation * 0.05}deg)`;
    });

    // Subtle continuous rotation animation
    let time = 0;
    function animateGalaxy() {
        time += 0.001;

        particles.forEach((p, i) => {
            const offset = (i / particleCount) * Math.PI * 2;
            const wave = Math.sin(time + offset) * 2;

            p.element.style.transform = `
                translate3d(${p.x}px, ${p.y}px, ${p.z + wave}px)
            `;
        });

        requestAnimationFrame(animateGalaxy);
    }
    animateGalaxy();
}

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
    create3DGalaxy();
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
