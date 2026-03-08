document.addEventListener('DOMContentLoaded', () => {
    // Elegant Mobile Navigation Toggle
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
                if (mobileToggle) {
                    mobileToggle.querySelector('i').classList.remove('fa-times');
                    mobileToggle.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });

    // Sleek Navbar Scroll Effect (Appears on scroll down)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active Link Highlighting
    const sections = document.querySelectorAll('section');
    function highlightNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
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

    // Subtle Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px"
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

    // Minimal Stat Counter Animation
    const statValues = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    function animateStats() {
        statValues.forEach(stat => {
            const finalNumberText = stat.getAttribute('data-target');
            let target = parseInt(finalNumberText.replace(/\D/g, ''));
            if (isNaN(target)) target = 100;

            const isPercentage = finalNumberText.includes('%');
            const isPlus = finalNumberText.includes('+');
            const isWord = finalNumberText.includes('rd') || finalNumberText.includes('/');

            if (isWord && !isPlus && !isPercentage) {
                // Instantly show text-heavy stats without counting
                stat.innerText = finalNumberText;
                return;
            }

            let current = 0;
            const increment = target / 30; // Faster, smoother count

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.innerText = finalNumberText;
                    clearInterval(timer);
                } else {
                    let displayValue = Math.floor(current);
                    if (isPercentage) displayValue += '%';
                    if (isPlus) displayValue += '+';
                    stat.innerText = displayValue;
                }
            }, 30);
        });
    }

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimatedStats) {
                animateStats();
                hasAnimatedStats = true;
            }
        }, { threshold: 0.2 });
        statsObserver.observe(statsSection);
    }
});
