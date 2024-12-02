// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Show success message
        const formData = new FormData(this);
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Simulate form submission
        setTimeout(() => {
            this.reset();
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            showNotification('Message sent successfully!', 'success');
        }, 1500);
    });
}

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput.value) {
            showNotification('Thank you for subscribing!', 'success');
            this.reset();
        }
    });
}

// Cookie banner handling
const cookieBanner = document.querySelector('.cookie-banner');
const acceptCookiesBtn = document.querySelector('.accept-cookies');

if (cookieBanner && acceptCookiesBtn) {
    if (!localStorage.getItem('cookiesAccepted')) {
        cookieBanner.classList.add('active');
    }

    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.remove('active');
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('active'), 100);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('active');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.feature-card, .pricing-card, .step, .faq-item').forEach(el => {
    observer.observe(el);
});

// FAQ accordion functionality
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('h3');
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all other FAQ items
            document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                activeItem.classList.remove('active');
            });
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    }
});

// Demo video modal
const videoPlaceholder = document.querySelector('.demo-video');
const playButton = document.querySelector('.play-button');

if (videoPlaceholder && playButton) {
    playButton.addEventListener('click', () => {
        // Here you would typically open a modal with the actual video
        showNotification('Video demo coming soon!', 'info');
    });
}

// Pricing toggle (if you add monthly/yearly pricing)
const pricingToggle = document.querySelector('.pricing-toggle');
if (pricingToggle) {
    pricingToggle.addEventListener('click', () => {
        document.querySelector('.pricing-cards').classList.toggle('yearly');
        pricingToggle.classList.toggle('active');
    });
}