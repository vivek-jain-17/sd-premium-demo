document.addEventListener("DOMContentLoaded", () => {
    /* =========================================
       1. CINEMATIC INTRO ANIMATION
       ========================================= */
    const introOverlay = document.getElementById("cinematic-intro");
    if (introOverlay) {
        const logoText = document.getElementById("logo-text");
        const text = logoText.innerText;
        logoText.innerHTML = ""; // Clear plain text
        
        // Generate Particles
        for(let i = 0; i < 30; i++) {
            let particle = document.createElement("div");
            particle.className = "particle";
            particle.style.left = Math.random() * 100 + "vw";
            particle.style.top = Math.random() * 100 + "vh";
            particle.style.animationDelay = Math.random() * 2 + "s";
            introOverlay.appendChild(particle);
        }

        // Split text into spans for staggered letter animation
        text.split("").forEach((char, index) => {
            let span = document.createElement("span");
            span.innerText = char === " " ? "\u00A0" : char;
            span.classList.add("intro-letter");
            logoText.appendChild(span);
            
            setTimeout(() => {
                span.classList.add("active");
            }, index * 100 + 500); // Staggered delay
        });

        // Fade out entire intro after 3.5s
        setTimeout(() => {
            introOverlay.style.opacity = "0";
            setTimeout(() => {
                introOverlay.style.display = "none";
                document.body.style.overflowY = "auto"; // Enable scrolling
            }, 1200);
        }, 3500);
    }

    /* =========================================
       2. SCROLL REVEAL (Intersection Observer)
       ========================================= */
    const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    reveals.forEach(reveal => revealOnScroll.observe(reveal));

    /* =========================================
       3. 3D TILT EFFECT ON PRODUCT CARDS
       ========================================= */
    const tiltCards = document.querySelectorAll(".tilt-card");
    tiltCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (subtle max 10 degrees)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = "transform 0.5s ease";
        });
        
        card.addEventListener("mouseenter", () => {
            card.style.transition = "none"; // Remove transition while moving for instant response
        });
    });

    /* =========================================
       4. MAGNETIC BUTTON HOVER
       ========================================= */
    const magneticBtns = document.querySelectorAll(".btn-magnetic");
    magneticBtns.forEach(btn => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    /* =========================================
       5. PARALLAX BACKGROUND
       ========================================= */
    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const parallaxBg = document.querySelector(".hero-bg");
        if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });

    /* =========================================
       6. NUMBER COUNTER ANIMATION
       ========================================= */
    const counters = document.querySelectorAll('.counter-num');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                const updateCount = () => {
                    const inc = target / 100; // Speed of counter
                    if (count < target) {
                        count += inc;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(updateCount, 15);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    });
    counters.forEach(counter => counterObserver.observe(counter));
});