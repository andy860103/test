document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- Header Scroll Effect ---
    const header = document.querySelector('.main-header');
    if (header) {
        ScrollTrigger.create({
            start: "top -80",
            end: 99999,
            toggleClass: {className: 'scrolled', targets: header}
        });
    }

    // --- Hero Section Initial Animation & Page Title Animation ---
    const elementsToAnimateOnLoad = document.querySelectorAll('.animate-on-load');
    elementsToAnimateOnLoad.forEach(el => {
        let delay = 0;
        if (el.classList.contains('delay-1')) delay = 0.2;
        if (el.classList.contains('delay-2')) delay = 0.4;

        gsap.fromTo(el,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: delay,
                ease: "power2.out",
                scrollTrigger: { // Make it trigger on scroll if it's lower on page
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none none",
                    once: true
                }
            }
        );
    });

    // --- General Scroll-triggered Animations ---
    const scrollAnimatedElements = document.querySelectorAll('.scroll-animate');
    scrollAnimatedElements.forEach(el => {
        const animationType = el.dataset.animation || 'fade-in';
        const delay = parseFloat(el.dataset.delay) || 0;

        let xFrom = 0, yFrom = 0;
        if (animationType === 'fade-in-left') xFrom = -50;
        if (animationType === 'fade-in-right') xFrom = 50;
        if (animationType === 'fade-up' || animationType === 'fade-in') yFrom = 50;

        gsap.fromTo(el,
            { opacity: 0, x: xFrom, y: yFrom },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.8,
                delay: delay / 1000,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true
                }
            }
        );
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainHeaderForMenu = document.querySelector('.main-header'); // Re-selector to avoid conflict
    if (menuToggle && mainHeaderForMenu) {
        menuToggle.addEventListener('click', () => {
            mainHeaderForMenu.classList.toggle('open');
            const isExpanded = mainHeaderForMenu.classList.contains('open');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // --- Current Year for Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});