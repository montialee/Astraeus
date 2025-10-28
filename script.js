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
// Exaggerated 3D Galaxy with Navigation Stars
// ================================
function create3DGalaxy() {
    const galaxy = document.getElementById('galaxy');
    if (!galaxy) return;

    const particles = [];
    const spiralArms = 4; // Number of spiral arms
    const particlesPerArm = 400;
    const centerParticles = 150;

    // Create bright galactic center
    for (let i = 0; i < centerParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'galaxy-particle';

        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 100;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = (Math.random() - 0.5) * 400; // Much deeper 3D

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
            const z = (Math.random() - 0.5) * 600 + (Math.random() - 0.5) * t * 100; // Extreme 3D depth

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

    // Create navigation stars
    const navStars = [
        { id: 'features', label: 'Features', x: '25%', y: '30%', z: 200, color: '#6366f1', size: 30 },
        { id: 'technology', label: 'Technology', x: '75%', y: '25%', z: 150, color: '#8b5cf6', size: 28 },
        { id: 'how-it-works', label: 'How It Works', x: '20%', y: '70%', z: 180, color: '#0ea5e9', size: 26 },
        { id: 'early-access', label: 'Join Waitlist', x: '80%', y: '75%', z: 220, color: '#d946ef', size: 32 }
    ];

    navStars.forEach(star => {
        const navStar = document.createElement('div');
        navStar.className = 'nav-star galaxy-particle';
        navStar.dataset.section = star.id;

        navStar.style.width = `${star.size}px`;
        navStar.style.height = `${star.size}px`;
        navStar.style.background = star.color;
        navStar.style.boxShadow = `0 0 ${star.size * 2}px ${star.color}, 0 0 ${star.size * 3}px ${star.color}`;
        navStar.style.left = star.x;
        navStar.style.top = star.y;
        navStar.style.transform = `translateZ(${star.z}px) translate(-50%, -50%)`;

        const label = document.createElement('span');
        label.className = 'nav-star-label';
        label.textContent = star.label;
        navStar.appendChild(label);

        navStar.addEventListener('click', () => openModal(star.id));

        galaxy.appendChild(navStar);
    });

    // Subtle continuous rotation animation with dramatic 3D effect
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });

    function animateGalaxy() {
        time += 0.0005;

        // Apply mouse parallax to entire galaxy
        const rotateX = mouseY * 20;
        const rotateY = mouseX * 20;
        galaxy.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        particles.forEach((p, i) => {
            const offset = (i / particles.length) * Math.PI * 2;
            const wave = Math.sin(time + offset) * 5;

            p.element.style.transform = `
                translate3d(${p.x}px, ${p.y}px, ${p.z + wave}px)
            `;
        });

        requestAnimationFrame(animateGalaxy);
    }
    animateGalaxy();
}

// ================================
// Modal System
// ================================
function openModal(sectionId) {
    const modal = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const section = document.getElementById(sectionId);

    if (section && modal && modalContent) {
        // Clone the section content
        const content = section.cloneNode(true);
        content.style.display = 'block';
        modalContent.innerHTML = '';
        modalContent.appendChild(content);

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('modal-overlay');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Modal close handlers
document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.querySelector('.modal-close');

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});


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
// Initialize Immersive Experience
// ================================
document.addEventListener('DOMContentLoaded', () => {
    create3DGalaxy();

    console.log('%cAstraea - Immersive 3D Experience', 'font-size: 24px; font-weight: bold; color: #6366f1;');
    console.log('%cNavigate through the cosmos', 'font-size: 14px; color: #94a3b8;');
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
