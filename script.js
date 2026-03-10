// T-NTDC Website JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Navigation scroll effect
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.crisis-card, .module-card, .timeline-item, .evidence-card, .transform-diagram'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add CSS for animated state
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Stagger animation for grid items
    document.querySelectorAll('.crisis-grid, .modules-grid').forEach(grid => {
        const items = grid.querySelectorAll('.crisis-card, .module-card');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Timeline items stagger
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
    });

    // Counter animation for statistics
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.ceil(start) + (element.dataset.suffix || '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (element.dataset.suffix || '');
            }
        };
        
        updateCounter();
    };

    // Observe stat elements
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statEl = entry.target;
                const value = statEl.dataset.value;
                if (value) {
                    animateCounter(statEl, parseInt(value));
                }
                statObserver.unobserve(statEl);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-value]').forEach(el => {
        statObserver.observe(el);
    });

    // Ring animation
    const ringObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target.querySelector('circle:last-child');
                if (circle) {
                    circle.style.transition = 'stroke-dashoffset 1.5s ease-out';
                    // The initial offset is set to show 10% (approximately 509 out of 565)
                }
                ringObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statRing = document.querySelector('.stat-ring');
    if (statRing) {
        ringObserver.observe(statRing);
    }

    // Parallax effect for geometric shapes
    const geoShapes = document.querySelectorAll('.geo-shape');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        geoShapes.forEach((shape, index) => {
            const speed = 0.05 + (index * 0.02);
            const rotate = scrollY * 0.02;
            shape.style.transform = `translateY(${scrollY * speed}px) rotate(${rotate}deg)`;
        });
    });

    // Module card hover effect
    document.querySelectorAll('.module-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--accent)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--border)';
        });
    });

    // Active nav link highlight
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add active link styles
    const navStyle = document.createElement('style');
    navStyle.textContent = `
        .nav-links a.active {
            color: var(--accent) !important;
        }
        
        .nav-links.active {
            display: flex;
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            background: var(--primary-dark);
            flex-direction: column;
            padding: 1.5rem;
            gap: 1rem;
            border-top: 1px solid rgba(255,255,255,0.1);
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
    `;
    document.head.appendChild(navStyle);

    console.log('T-NTDC Website initialized');
});
