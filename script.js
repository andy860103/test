document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- Header Scroll Effect ---
    const header = document.querySelector('.main-header');
    ScrollTrigger.create({
        start: "top -80", // 當滾動超過頂部 80px
        end: 99999,
        toggleClass: {className: 'scrolled', targets: header}
    });

    // --- Hero Section Initial Animation ---
    const heroElements = document.querySelectorAll('.animate-on-load');
    heroElements.forEach(el => {
        // 確保元素在 GSAP 控制前是可見的，如果 CSS 設了 opacity: 0
        // 或者直接在JS中設置初始狀態
        gsap.fromTo(el,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: parseFloat(el.style.transitionDelay) || (el.classList.contains('delay-1') ? 0.2 : (el.classList.contains('delay-2') ? 0.4 : 0)),
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: "top 80%", // 元素底部進入視窗底部時
                    toggleActions: "play none none none", // 觸發一次
                    once: true // 動畫只播放一次
                }
            }
        );
    });
    // 為了避免 CSS transition 和 GSAP 衝突，可以移除 CSS 的 .animate-on-load.loaded
    // 或者將 CSS transition 用於非 JS 環境下的回退

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
                delay: delay / 1000, // GSAP delay is in seconds
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%', // 當元素頂部進入視窗 85% 的位置
                    toggleActions: 'play none none none',
                    once: true // 動畫只播放一次
                }
            }
        );
    });


    // --- Smooth Scrolling for Nav Links (Optional, if not using a dedicated library) ---
    // document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href');
    //         const targetElement = document.querySelector(targetId);
    //         if (targetElement) {
    //             targetElement.scrollIntoView({
    //                 behavior: 'smooth'
    //             });
    //         }
    //     });
    // });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainHeader = document.querySelector('.main-header');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mainHeader.classList.toggle('open');
            // ARIA attribute for accessibility
            const isExpanded = mainHeader.classList.contains('open');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }


    // --- Current Year for Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Advanced: Consider Lenis for smooth scrolling ---
    // const lenis = new Lenis()
    // function raf(time) {
    //   lenis.raf(time)
    //   requestAnimationFrame(raf)
    // }
    // requestAnimationFrame(raf)
    // This requires including the Lenis library: <script src="https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
});