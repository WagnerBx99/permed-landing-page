// PERMED Landing Page - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation class to elements
    const animateElements = document.querySelectorAll(
        '.pain-card, .audience-card, .differential-card, .service-item, ' +
        '.process-step, .testimonial-card, .case-item, .timeline-item, ' +
        '.stat-item, .number-item, .benefit-item'
    );

    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Counter animation for numbers (only for numbers section, not hero)
    const counterElements = document.querySelectorAll('.numbers-section .number-value');
    
    const animateCounter = (element) => {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const hasDot = text.includes('.');
        
        // Extract numeric value
        let numericText = text.replace(/[+%\.]/g, '').replace(/,/g, '');
        const targetNumber = parseInt(numericText);
        
        if (isNaN(targetNumber)) return;
        
        let current = 0;
        const increment = targetNumber / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const updateCounter = () => {
            current += increment;
            if (current < targetNumber) {
                let displayValue = Math.floor(current);
                if (hasDot) {
                    displayValue = (displayValue / 1000).toFixed(3).replace('.', '.');
                }
                element.textContent = (hasPlus ? '+' : '') + displayValue.toLocaleString('pt-BR') + (hasPercent ? '%' : '');
                setTimeout(updateCounter, stepTime);
            } else {
                element.textContent = text;
            }
        };
        
        updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => {
        counterObserver.observe(el);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (hero && scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    // Add hover effect to cards
    const cards = document.querySelectorAll('.pain-card, .audience-card, .differential-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // WhatsApp button pulse animation
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
        setInterval(() => {
            whatsappFloat.style.transform = 'scale(1.1)';
            setTimeout(() => {
                whatsappFloat.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }

    // Typing effect for hero title (optional - subtle)
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }

    // Stagger animation for hero stats
    const heroStats = document.querySelectorAll('.hero-stats .stat-item');
    heroStats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            stat.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, 600 + (index * 100));
    });

    // Hero image animation
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(30px)';
        
        setTimeout(() => {
            heroImage.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 500);
    }

    console.log('PERMED Landing Page loaded successfully!');
});
