document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').classList.remove('fa-times');
                mobileToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting during scroll
    const sections = document.querySelectorAll('section');
    function highlightNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', highlightNav);

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Stats counter animation
    const statValues = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    function animateStats() {
        statValues.forEach(stat => {
            const finalNumberText = stat.getAttribute('data-target');
            // extract just the number part
            let target = parseInt(finalNumberText.replace(/\D/g, ''));
            if(isNaN(target)) target = 100;

            const isPercentage = finalNumberText.includes('%');
            const isPlus = finalNumberText.includes('+');
            const isTime = finalNumberText.includes('/');

            let current = 0;
            const increment = target / 40;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.innerText = finalNumberText;
                    clearInterval(timer);
                } else {
                    let displayValue = Math.floor(current);
                    if (isPercentage) displayValue += '%';
                    if (isPlus) displayValue += '+';
                    if (isTime) displayValue = '24/7';
                    stat.innerText = displayValue;
                }
            }, 40);
        });
    }

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimatedStats) {
                animateStats();
                hasAnimatedStats = true;
            }
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // Dynamic Greeting (Typewriter effect) on Hero
    const dynamicGreeting = document.querySelector('.hero-subtitle');
    if (dynamicGreeting) {
        const roles = ["Cybersecurity Engineer", "Threat Hunter", "Cloud Security Expert", "SOC Analyst"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeWriter() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                dynamicGreeting.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                dynamicGreeting.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before typing next
            }
            
            setTimeout(typeWriter, typeSpeed);
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Contact Form simulation handling
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
                btn.style.background = 'var(--accent-green)';
                btn.style.color = '#000';
                
                setTimeout(() => {
                    contactForm.reset();
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 3000);
            }, 1500);
        });
    }
});
