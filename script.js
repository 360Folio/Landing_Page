// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ROI Calculator
function calculateROI() {
    const budget = parseInt(document.getElementById('monthly-budget').value) || 0;
    const followers = parseInt(document.getElementById('current-followers').value) || 0;
    const industry = document.getElementById('industry').value;

    // Different multipliers based on industry
    const multipliers = {
        ecommerce: { followerGrowth: 2.5, conversionRate: 0.08, aov: 65 },
        saas: { followerGrowth: 2.0, conversionRate: 0.05, aov: 3500 },
        service: { followerGrowth: 2.8, conversionRate: 0.06, aov: 150 },
        coaching: { followerGrowth: 2.2, conversionRate: 0.1, aov: 500 },
        nonprofit: { followerGrowth: 1.8, conversionRate: 0.04, aov: 50 }
    };

    const multiplier = multipliers[industry];

    // Calculate 12-month projections
    const monthlyGrowthFollowers = followers * multiplier.followerGrowth;
    const projectedFollowers = followers + (monthlyGrowthFollowers * 12);

    // Monthly revenue calculation
    const monthlyLeads = (budget * 0.3) / 5; // Assuming $5 per lead
    const monthlyConversions = monthlyLeads * multiplier.conversionRate;
    const monthlyRevenue = monthlyConversions * multiplier.aov;
    const annualRevenue = monthlyRevenue * 12;

    // ROI calculation
    const totalInvestment = budget * 12;
    const roi = ((annualRevenue - totalInvestment) / totalInvestment) * 100;

    // Display results
    document.getElementById('result-followers').textContent = formatNumber(Math.round(projectedFollowers));
    document.getElementById('result-revenue').textContent = '$' + formatCurrency(annualRevenue);
    document.getElementById('result-roi').textContent = Math.round(roi) + '%';
    document.getElementById('result-monthly').textContent = '$' + formatCurrency(monthlyRevenue);

    document.getElementById('calculator-results').style.display = 'block';

    // Smooth scroll to results
    setTimeout(() => {
        document.getElementById('calculator-results').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Format currency
function formatCurrency(num) {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;

        // Close other items
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.parentElement.classList.remove('active');
            }
        });

        // Toggle current item
        faqItem.classList.toggle('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Button click handlers
const primaryButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

primaryButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const buttonText = this.textContent.toLowerCase();

        if (buttonText.includes('free audit') || buttonText.includes('schedule')) {
            showNotification('Thanks for your interest! Our team will contact you soon.');
        } else if (buttonText.includes('download')) {
            downloadGuide();
        } else if (buttonText.includes('get started')) {
            scrollToSection('#pricing');
        }
    });
});

// Scroll to pricing section
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Download guide
function downloadGuide() {
    showNotification('Guide download started!');
    // In a real scenario, this would trigger a file download
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for animations
document.querySelectorAll('.service-card, .case-study-card, .pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);

// Counter animation for metrics
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Trigger counter animation when in view
const metricsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const metricValues = entry.target.querySelectorAll('.metric-value');
            metricValues.forEach(value => {
                const text = value.textContent;
                let target;

                if (text.includes('%')) {
                    target = parseInt(text);
                } else if (text.includes('x')) {
                    target = parseFloat(text) * 10; // Multiply for animation
                } else {
                    target = parseInt(text);
                }

                animateCounter(value, target);
            });

            metricsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const metricsSection = document.querySelector('.metrics');
if (metricsSection) {
    metricsObserver.observe(metricsSection);
}

// Form input validation
const formInputs = document.querySelectorAll('.form-group input, .form-group select');

formInputs.forEach(input => {
    input.addEventListener('change', function() {
        // Hide previous results when inputs change
        const results = document.getElementById('calculator-results');
        if (results) {
            results.style.display = 'none';
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + / to focus search or show help
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        // Could open a search modal or help menu
    }
});

// Track page performance
window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    }
});

// Prevent layout shift with scroll restoration
if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('SocialPeak Landing Page Loaded');

    // Add any additional initialization here
    initializeForm();
});

// Initialize form with default values
function initializeForm() {
    const budgetInput = document.getElementById('monthly-budget');
    const followersInput = document.getElementById('current-followers');

    if (budgetInput && followersInput) {
        // Set placeholder behaviors or default values
        budgetInput.addEventListener('input', function() {
            if (this.value < 1000) {
                this.value = 1000;
            }
        });
    }
}

// Add scroll-to-top button functionality
function createScrollTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 999;
        font-size: 1.2rem;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
            button.style.justifyContent = 'center';
            button.style.alignItems = 'center';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('hover', function() {
        this.style.background = '#4f46e5';
    });
}

// Initialize scroll-to-top button
createScrollTopButton();
