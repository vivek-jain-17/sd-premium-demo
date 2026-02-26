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

    /* =========================================
       7. FUNCTIONAL PRODUCT FILTERING
       ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    if(filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Handle active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter logic
                const filterValue = btn.getAttribute('data-filter');

                productItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide');
                        // Small timeout allows the display block to render before animating opacity
                        setTimeout(() => item.classList.add('show'), 10);
                    } else {
                        item.classList.remove('show');
                        item.classList.add('hide');
                    }
                });
            });
        });
    }
});
// Custom Cursor Logic
const cursor = document.getElementById('custom-cursor');
const dot = document.getElementById('cursor-dot');

if (cursor && dot) {
    window.addEventListener('mousemove', (e) => {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        // Slight delay for the outer ring for a "trailing" effect
        setTimeout(() => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        }, 50); 
    });

    // Expand cursor on links
    document.querySelectorAll('a, button').forEach(link => {
        link.addEventListener('mouseenter', () => cursor.classList.add('hover-active'));
        link.addEventListener('mouseleave', () => cursor.classList.remove('hover-active'));
    });

    /* =========================================
   INTERACTIVE DIAMOND DUST CANVAS
   ========================================= */
    const canvas = document.getElementById('diamond-dust');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        
        // Set canvas to full screen
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Track mouse position
        let mouse = { x: null, y: null, radius: 100 };
        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });
        // Remove mouse repelling when mouse leaves window
        window.addEventListener('mouseout', () => {
            mouse.x = undefined;
            mouse.y = undefined;
        });

        // Particle Object
        class Particle {
            constructor(x, y, size, speedY, opacity) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.size = size;
                this.speedY = speedY;
                this.opacity = opacity;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                // Champagne/Gold color for the dust
                ctx.fillStyle = `rgba(198, 160, 82, ${this.opacity})`; 
                ctx.fill();
            }
            update() {
                // Drift slowly upwards
                this.y -= this.speedY;
                if (this.y < 0 - this.size) {
                    this.y = canvas.height + this.size;
                    this.x = Math.random() * canvas.width;
                }

                // Mouse Repel Logic
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (mouse.x && mouse.y && distance < mouse.radius) {
                    // Calculate push direction
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let force = (mouse.radius - distance) / mouse.radius;
                    
                    let directionX = forceDirectionX * force * 3;
                    let directionY = forceDirectionY * force * 3;
                    
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    // Slowly return to natural vertical path
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 50;
                    }
                }
                this.draw();
            }
        }

        // Initialize Dust
        function initDust() {
            particlesArray = [];
            let numberOfParticles = (canvas.width * canvas.height) / 8000; // Density
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 1.5) + 0.5; // Tiny particles
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                let speedY = (Math.random() * 0.5) + 0.1;
                let opacity = (Math.random() * 0.5) + 0.1;
                particlesArray.push(new Particle(x, y, size, speedY, opacity));
            }
        }

        // Animation Loop
        function animateDust() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            requestAnimationFrame(animateDust);
        }

        // Handle Window Resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initDust();
        });

        initDust();
        animateDust();
    }
}