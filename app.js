       // Smooth scrolling for navigation
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

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(32, 50, 57, 0.98)';
            } else {
                header.style.background = 'rgba(32, 50, 57, 0.95)';
            }
        });

        // Slider functionality
        function scrollSlider(direction) {
            const slider = document.getElementById('sliderContent');
            const scrollAmount = 370; // Width of one item plus gap
            slider.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }

        // Auto-scroll slider
        let autoScrollInterval;
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                const slider = document.getElementById('sliderContent');
                const maxScroll = slider.scrollWidth - slider.clientWidth;
                if (slider.scrollLeft >= maxScroll) {
                    slider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollSlider(1);
                }
            }, 4000);
        }

        // Stop auto-scroll on hover
        document.getElementById('sliderContent').addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });

        document.getElementById('sliderContent').addEventListener('mouseleave', startAutoScroll);

        // Start auto-scroll on load
        window.addEventListener('load', startAutoScroll);

        // Newsletter subscription
        function subscribeNewsletter(event) {
            event.preventDefault();
            const email = event.target.querySelector('input[type="email"]').value;
            
            // Simulate API call
            const button = event.target.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Inscription...';
            button.disabled = true;
            
            setTimeout(() => {
                alert(`Merci ${email} ! Vous êtes maintenant abonné(e) à notre newsletter.`);
                button.textContent = 'Inscrit ✓';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    event.target.reset();
                }, 2000);
            }, 1500);
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.about-text, .slider__item, .newsletter-content').forEach(el => {
            observer.observe(el);
        });

        // Parallax effect for hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero video');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Loading animation
        window.addEventListener('load', () => {
            document.body.classList.remove('loading');
        });

        // Add loading class initially
        document.body.classList.add('loading');