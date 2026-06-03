/**
 * Schulte Verpackungs-Systeme GmbH
 * Die Packmittel-Profis - Haupt-JavaScript v3
 * Multi-Page, Cookie-Banner, Job-Filter, Animationen
 */

document.addEventListener('DOMContentLoaded', function() {

    // ============================
    // Cookie Banner
    // ============================
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieDecline = document.getElementById('cookieDecline');
    const cookieSettings = document.getElementById('cookieSettings');

    if (cookieBanner) {
        const cookieConsent = localStorage.getItem('cookieConsent');
        if (!cookieConsent) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000);
        }

        if (cookieAccept) {
            cookieAccept.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'all');
                cookieBanner.classList.remove('show');
            });
        }

        if (cookieDecline) {
            cookieDecline.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'essential');
                cookieBanner.classList.remove('show');
            });
        }

        if (cookieSettings) {
            cookieSettings.addEventListener('click', () => {
                // Einfache Variante: Toggle zwischen all und essential
                const current = localStorage.getItem('cookieConsent');
                if (current === 'all') {
                    localStorage.setItem('cookieConsent', 'essential');
                    alert('Cookie-Einstellung geändert: Nur essenzielle Cookies.');
                } else {
                    localStorage.setItem('cookieConsent', 'all');
                    alert('Cookie-Einstellung geändert: Alle Cookies akzeptiert.');
                }
                cookieBanner.classList.remove('show');
            });
        }
    }

    // ============================
    // Mobile Navigation
    // ============================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ============================
    // Aktive Navigation (Multi-Page)
    // ============================
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ============================
    // Smooth Scroll (nur für Anchor-Links)
    // ============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================
    // Back to Top
    // ============================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================
    // Kontaktformulare (alle Formulare)
    // ============================
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            if (!btn) return;

            const originalText = btn.textContent;
            btn.textContent = 'WIRD GESENDET...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'NACHRICHT GESENDET!';
                btn.style.background = 'var(--primary)';
                this.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    });

    // ============================
    // Scroll-Animationen
    // ============================
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    // ============================
    // Counter Animation
    // ============================
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                const duration = 2000;
                const step = countTo / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= countTo) {
                        target.textContent = countTo;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current);
                    }
                }, 16);

                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ============================
    // Header Scroll-Effekt
    // ============================
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
            }
        }, { passive: true });
    }

    // ============================
    // Job-Filter
    // ============================
    const jobFilters = document.querySelectorAll('.job-filter-btn');
    const jobCards = document.querySelectorAll('.job-card');

    if (jobFilters.length > 0 && jobCards.length > 0) {
        jobFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');

                jobFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                jobCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    console.log('✓ Packmittel-Profis Website v3.0 Multi-Page initialisiert');
});
