// Mobile navigation
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Add animation to navbar items
    const animateNavItems = () => {
        navItems.forEach((item, index) => {
            item.style.animation = `navItemFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            item.style.opacity = '1';
        });
    };
    
    // Initialize animations
    animateNavItems();
    
    // Add scroll reveal animations
    const sr = ScrollReveal ? ScrollReveal({
        origin: 'bottom',
        distance: '30px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: false
    }) : null;
    
    if (sr) {
        // Reveal sections one by one
        sr.reveal('.hero-text', {});
        sr.reveal('.hero-visual', { delay: 300 });
        sr.reveal('.about-text', {});
        sr.reveal('.about-stats', { delay: 300 });
        sr.reveal('.skills-tabs', {});
        sr.reveal('.github-stats', { interval: 200 });
        sr.reveal('.github-calendar', {});
        sr.reveal('.repo-card', { interval: 200 });
        sr.reveal('.contact-info', {});
        sr.reveal('.contact-form', { delay: 300 });
    }
    
    // Enhanced interactive typewriter effect
    const typewriterTargets = document.querySelectorAll('.tagline');
    
    typewriterTargets.forEach(element => {
        // Store original text
        const originalText = element.textContent;
        element.textContent = '';
        
        // Create and append cursor element
        const cursor = document.createElement('span');
        cursor.classList.add('cursor');
        cursor.textContent = '|';
        cursor.style.marginLeft = '2px';
        cursor.style.animation = 'blink 1s infinite';
        element.appendChild(cursor);
        
        // Create styles for blinking cursor
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Text strings to type
        const textStrings = [
            "iOS Developer | Web Developer | AI/ML Engineer",
            "Building Native iOS Applications",
            "Creating Interactive Web Experiences",
            "Developing AI & Machine Learning Solutions"
        ];
        
        let currentTextIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;
        
        function typeEffect() {
            const currentText = textStrings[currentTextIndex];
            
            // Set typing speed based on action
            if (isDeleting) {
                typingSpeed = 40;
            } else {
                typingSpeed = 80;
            }
            
            // Get text without cursor
            const textWithoutCursor = element.textContent.slice(0, -1);
            
            if (!isDeleting && charIndex < currentText.length) {
                // Add next character
                element.textContent = currentText.slice(0, charIndex + 1);
                element.appendChild(cursor);
                charIndex++;
                setTimeout(typeEffect, typingSpeed);
            } else if (isDeleting && charIndex > 0) {
                // Remove last character
                element.textContent = currentText.slice(0, charIndex - 1);
                element.appendChild(cursor);
                charIndex--;
                setTimeout(typeEffect, typingSpeed);
            } else if (!isDeleting) {
                // Pause at the end
                isDeleting = true;
                setTimeout(typeEffect, 2000);
            } else {
                // Move to next text string
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % textStrings.length;
                charIndex = 0;
                setTimeout(typeEffect, 500);
            }
        }
        
        // Start typing effect with a slight delay
        setTimeout(typeEffect, 1200);
    });
    
    // Enhanced code block animations
    const codeBlock = document.querySelector('.code-block');
    const codeClassSpans = document.querySelectorAll('.code-class');
    const codeFunctionSpans = document.querySelectorAll('.code-function');
    const codeStringSpans = document.querySelectorAll('.code-string');
    const codeParamSpans = document.querySelectorAll('.code-param');
    
    // Add syntax highlighting styles
    const syntaxStyles = document.createElement('style');
    syntaxStyles.textContent = `
        .code-class { color: #ff79c6; }
        .code-function { color: #50fa7b; }
        .code-string { color: #f1fa8c; }
        .code-param { color: #bd93f9; }
        .code-block code .hljs-keyword { color: #ff79c6; }
    `;
    document.head.appendChild(syntaxStyles);
    
    // Add 3D tilt effect to code block
    if (codeBlock) {
        codeBlock.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            this.style.transform = `perspective(800px) rotateY(${moveX}deg) rotateX(${-moveY}deg) translateZ(10px)`;
            
            // Add shine effect
            const shine = this.querySelector('.shine') || document.createElement('div');
            if (!this.querySelector('.shine')) {
                shine.classList.add('shine');
                this.appendChild(shine);
                shine.style.position = 'absolute';
                shine.style.top = '0';
                shine.style.left = '0';
                shine.style.width = '100%';
                shine.style.height = '100%';
                shine.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`;
                shine.style.pointerEvents = 'none';
                shine.style.borderRadius = 'inherit';
                shine.style.zIndex = '1';
            } else {
                shine.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`;
            }
        });
        
        codeBlock.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(800px) rotateY(-10deg) translateY(0)';
            
            const shine = this.querySelector('.shine');
            if (shine) {
                shine.style.backgroundImage = 'none';
            }
        });
    }
    
    // Add scroll-based navbar background change
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scroll for navigation with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active states to nav links based on scroll position
    const sections = document.querySelectorAll('section');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation();
    
    // Enhanced particle background for hero section
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        const canvas = document.createElement('canvas');
        canvas.classList.add('hero-particles');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '1';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.15';
        
        heroSection.insertBefore(canvas, heroSection.firstChild);
        
        const ctx = canvas.getContext('2d');
        let width, height;
        const particles = [];
        let mouseX, mouseY, animationFrame;
        
        function initCanvas() {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            
            // Create particles
            const particleCount = Math.min(Math.floor(width * height / 15000), 120);
            particles.length = 0;
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 2 + 1,
                    vx: Math.random() * 1 - 0.5,
                    vy: Math.random() * 1 - 0.5,
                    opacity: Math.random() * 0.5 + 0.3
                });
            }
        }
        
        function drawParticles() {
            ctx.clearRect(0, 0, width, height);
            
            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                
                // Add some random movement
                p.vx += (Math.random() - 0.5) * 0.01;
                p.vy += (Math.random() - 0.5) * 0.01;
                
                // Limit speed
                p.vx = Math.max(Math.min(p.vx, 1), -1);
                p.vy = Math.max(Math.min(p.vy, 1), -1);
                
                // Update position
                p.x += p.vx;
                p.y += p.vy;
                
                // Wrap around edges
                if (p.x < 0) p.x = width;
                if (p.y < 0) p.y = height;
                if (p.x > width) p.x = 0;
                if (p.y > height) p.y = 0;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 0, 0, ${p.opacity})`;
                ctx.fill();
            }
            
            // Draw connections between nearby particles
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.lineWidth = 0.5;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.globalAlpha = (1 - distance / 100) * 0.2;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }
            
            // Mouse interaction
            if (mouseX && mouseY) {
                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    const dx = p.x - mouseX;
                    const dy = p.y - mouseY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) {
                        const angle = Math.atan2(dy, dx);
                        const force = (120 - distance) / 1500;
                        p.vx += Math.cos(angle) * force;
                        p.vy += Math.sin(angle) * force;
                    }
                }
            }
            
            animationFrame = requestAnimationFrame(drawParticles);
        }
        
        // Add mouse interaction
        heroSection.addEventListener('mousemove', function(e) {
            const rect = heroSection.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            initCanvas();
        });
        
        // Initialize and start animation
        initCanvas();
        drawParticles();
        
        // Cleanup on page leave
        window.addEventListener('beforeunload', function() {
            cancelAnimationFrame(animationFrame);
        });
    }
});

// Skills tab functionality with enhanced animations
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            // Add active class to clicked button with animated underline
            btn.classList.add('active');
            
            // Get the tab to activate
            const tabToActivate = btn.getAttribute('data-tab');
            const activeContent = document.getElementById(`${tabToActivate}-content`);
            
            // Show content with staggered animation for each skill item
            activeContent.style.display = 'block';
            setTimeout(() => {
                activeContent.classList.add('active');
                
                // Animate each skill item in a staggered fashion
                const skillItems = activeContent.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                });
            }, 50);
        });
    });
    
    // Animate skill progress bars when they come into view
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    const percentageEl = entry.target.querySelector('.skill-percentage');
                    const width = progressBar.style.width;
                    const percentage = percentageEl.textContent;
                    
                    // Reset width first
                    progressBar.style.width = '0';
                    
                    // Animate the percentage number
                    if (percentageEl) {
                        percentageEl.textContent = '0%';
                        let currentPercent = 0;
                        const targetPercent = parseInt(percentage);
                        const duration = 1500; // ms
                        const interval = duration / targetPercent;
                        
                        const counter = setInterval(() => {
                            currentPercent += 1;
                            percentageEl.textContent = `${currentPercent}%`;
                            
                            if (currentPercent >= targetPercent) {
                                clearInterval(counter);
                            }
                        }, interval);
                    }
                    
                    // Animate after a small delay with easing
                    setTimeout(() => {
                        progressBar.style.transition = 'width 1.5s cubic-bezier(0.19, 1, 0.22, 1)';
                        progressBar.style.width = width;
                    }, 200);
                    
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        skillItems.forEach(item => {
            observer.observe(item);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        skillItems.forEach(item => {
            const progressBar = item.querySelector('.skill-progress');
            progressBar.style.width = progressBar.getAttribute('data-width');
        });
    }
});

// Enhanced project cards with 3D tilt effect
document.addEventListener('DOMContentLoaded', function() {
    const repoCards = document.querySelectorAll('.repo-card');
    
    repoCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            card.style.transform = `translateY(-8px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
            card.style.transition = 'transform 0.1s ease';
            
            // Add shine effect
            const shine = card.querySelector('.shine') || document.createElement('div');
            if (!card.querySelector('.shine')) {
                shine.classList.add('shine');
                card.appendChild(shine);
                shine.style.position = 'absolute';
                shine.style.top = '0';
                shine.style.left = '0';
                shine.style.width = '100%';
                shine.style.height = '100%';
                shine.style.backgroundImage = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)';
                shine.style.pointerEvents = 'none';
                shine.style.zIndex = '1';
            } else {
                shine.style.backgroundImage = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-8px) rotateX(0deg) rotateY(0deg)';
            card.style.transition = 'transform 0.5s ease';
            
            const shine = card.querySelector('.shine');
            if (shine) {
                shine.style.backgroundImage = 'none';
            }
        });
    });
});

// Enhanced form interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to submit button
    const submitBtn = document.querySelector('.contact-form button');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.top = y + 'px';
            ripple.style.left = x + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    }
    
    // Form validation with visual feedback
    const contactForm = document.querySelector('.contact-form');
    const formGroups = document.querySelectorAll('.form-group');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate each input
            formGroups.forEach(group => {
                const input = group.querySelector('input, textarea');
                
                if (input.value.trim() === '') {
                    isValid = false;
                    group.classList.add('error');
                    
                    // Add error message if it doesn't exist
                    if (!group.querySelector('.error-message')) {
                        const errorMessage = document.createElement('span');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = 'This field is required';
                        errorMessage.style.color = '#ff3b30';
                        errorMessage.style.fontSize = '0.8rem';
                        errorMessage.style.marginTop = '0.3rem';
                        errorMessage.style.display = 'block';
                        group.appendChild(errorMessage);
                    }
                } else {
                    group.classList.remove('error');
                    
                    // Remove error message if it exists
                    const errorMessage = group.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.innerHTML = `
                    <div style="text-align: center; padding: 2rem; background-color: rgba(0,0,0,0.03); border-radius: 8px; margin-top: 1rem;">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: #4cd964; margin-bottom: 1rem;"></i>
                        <h3 style="margin-bottom: 0.5rem;">Message Sent!</h3>
                        <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                    </div>
                `;
                
                // Clear the form
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
                
                // Add animation to success message
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(20px)';
                successMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                }, 100);
            }
        });
        
        // Live validation on blur
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    group.classList.add('error');
                    
                    // Add error message if it doesn't exist
                    if (!group.querySelector('.error-message')) {
                        const errorMessage = document.createElement('span');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = 'This field is required';
                        errorMessage.style.color = '#ff3b30';
                        errorMessage.style.fontSize = '0.8rem';
                        errorMessage.style.marginTop = '0.3rem';
                        errorMessage.style.display = 'block';
                        group.appendChild(errorMessage);
                    }
                } else {
                    group.classList.remove('error');
                    
                    // Remove error message if it exists
                    const errorMessage = group.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            });
            
            input.addEventListener('focus', function() {
                // Remove error styling on focus
                group.classList.remove('error');
                
                // Remove error message if it exists
                const errorMessage = group.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });
        });
    }
    
    // Animate section headers when they come into view
    const sectionHeaders = document.querySelectorAll('.section-header h2');
    
    if ('IntersectionObserver' in window && sectionHeaders.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class
                    entry.target.classList.add('animate-border');
                    
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        sectionHeaders.forEach(header => {
            observer.observe(header);
        });
    }
    
    // Add shimmer effect to stat cards on hover
    const statCards = document.querySelectorAll('.stat, .stat-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('shimmer-effect');
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove the class after animation completes
            setTimeout(() => {
                this.classList.remove('shimmer-effect');
            }, 1000);
        });
    });
    
    // Add smooth reveal animation to about tags
    const aboutTags = document.querySelectorAll('.tag');
    
    if ('IntersectionObserver' in window && aboutTags.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation
                    setTimeout(() => {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(20px)';
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                    
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        aboutTags.forEach(tag => {
            observer.observe(tag);
        });
    }
});

// CV Section - Resume Builder and Parallax Effects
document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for CV section
    const cvSection = document.querySelector('.cv');
    const parallaxLayers = document.querySelectorAll('.parallax-bg');
    
    if (cvSection && parallaxLayers.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const sectionTop = cvSection.offsetTop;
            const sectionHeight = cvSection.offsetHeight;
            
            // Only apply parallax when CV section is in view
            if (scrollTop + window.innerHeight > sectionTop && scrollTop < sectionTop + sectionHeight) {
                const relativeScroll = (scrollTop - sectionTop + window.innerHeight);
                const scrollPercentage = relativeScroll / (sectionHeight + window.innerHeight);
                
                parallaxLayers.forEach((layer, index) => {
                    const speed = (index + 1) * 0.1;
                    const yPos = scrollPercentage * 100 * speed;
                    layer.style.transform = `translateY(${yPos}px) translateZ(-${(index + 1) * 5}px) scale(${1 + (index + 1) * 0.5})`;
                });
            }
        });
    }
    
    // Resume sections animation
    const resumeSections = document.querySelectorAll('.resume-section');
    
    resumeSections.forEach((section, index) => {
        section.style.setProperty('--index', index);
    });
    
    // Initialize empty resume content
    initializeEmptyResumeContent();
    
    // Resume Builder Functionality
    const resumeBuilder = {
        items: {
            skills: [],
            experience: [],
            education: [],
            projects: []
        },
        
        init: function() {
            this.bindUIActions();
            this.setupDragAndDrop();
        },
        
        bindUIActions: function() {
            // Add item buttons
            const addButtons = document.querySelectorAll('.add-to-resume');
            
            addButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const item = e.target.closest('.builder-item');
                    this.addItemToResume(item);
                });
            });
            
            // Reset button
            const resetButton = document.getElementById('reset-resume');
            if (resetButton) {
                resetButton.addEventListener('click', () => {
                    this.resetResume();
                });
            }
            
            // Download button
            const downloadButton = document.getElementById('download-resume');
            if (downloadButton) {
                downloadButton.addEventListener('click', () => {
                    this.downloadResume();
                });
            }
        },
        
        setupDragAndDrop: function() {
            const draggableItems = document.querySelectorAll('.builder-item');
            const resumeDropZones = {
                skills: document.querySelector('.resume-skills-content'),
                experience: document.querySelector('.resume-experience-content'),
                education: document.querySelector('.resume-education-content'),
                projects: document.querySelector('.resume-projects-content')
            };
            
            draggableItems.forEach(item => {
                item.addEventListener('dragstart', (e) => {
                    item.classList.add('dragging');
                    e.dataTransfer.setData('text/plain', JSON.stringify({
                        id: item.dataset.id,
                        type: item.dataset.type,
                        content: item.querySelector('.item-content').textContent
                    }));
                });
                
                item.addEventListener('dragend', () => {
                    item.classList.remove('dragging');
                });
            });
            
            // Set up drop zones
            Object.keys(resumeDropZones).forEach(key => {
                const zone = resumeDropZones[key];
                if (zone) {
                    zone.addEventListener('dragover', (e) => {
                        e.preventDefault();
                        zone.classList.add('drag-over');
                    });
                    
                    zone.addEventListener('dragleave', () => {
                        zone.classList.remove('drag-over');
                    });
                    
                    zone.addEventListener('drop', (e) => {
                        e.preventDefault();
                        zone.classList.remove('drag-over');
                        
                        try {
                            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                            this.addItemToResume(null, data);
                        } catch (error) {
                            console.error('Error parsing dropped item:', error);
                        }
                    });
                }
            });
        },
        
        addItemToResume: function(element, data = null) {
            let itemData;
            
            if (element) {
                // Get data from DOM element
                itemData = {
                    id: element.dataset.id,
                    type: element.dataset.type,
                    content: element.querySelector('.item-content').textContent
                };
                
                // Mark as added
                element.classList.add('added-to-resume');
            } else if (data) {
                // Use provided data
                itemData = data;
                
                // Find and mark the corresponding element
                const correspondingElement = document.querySelector(`.builder-item[data-id="${data.id}"]`);
                if (correspondingElement) {
                    correspondingElement.classList.add('added-to-resume');
                }
            } else {
                return;
            }
            
            // Check if already added
            if (this.items[itemData.type].some(item => item.id === itemData.id)) {
                return;
            }
            
            // Add to data model
            this.items[itemData.type].push(itemData);
            
            // Add to UI
            this.updateResumeUI();
        },
        
        updateResumeUI: function() {
            // Update Skills
            const skillsContainer = document.querySelector('.resume-skills-content');
            if (skillsContainer) {
                skillsContainer.innerHTML = '';
                
                this.items.skills.forEach((skill, index) => {
                    const skillElement = document.createElement('div');
                    skillElement.classList.add('resume-skill', 'draggable-item');
                    skillElement.dataset.id = skill.id;
                    skillElement.style.setProperty('--index', index);
                    skillElement.textContent = skill.content;
                    
                    // Add remove functionality
                    skillElement.addEventListener('click', () => {
                        this.removeItem(skill.type, skill.id);
                    });
                    
                    skillsContainer.appendChild(skillElement);
                });
            }
            
            // Update Experience
            const experienceContainer = document.querySelector('.resume-experience-content');
            if (experienceContainer) {
                experienceContainer.innerHTML = '';
                
                this.items.experience.forEach((exp, index) => {
                    const expElement = document.createElement('div');
                    expElement.classList.add('resume-experience-item', 'draggable-item');
                    expElement.dataset.id = exp.id;
                    expElement.style.setProperty('--index', index);
                    
                    const title = document.createElement('h5');
                    title.textContent = exp.content;
                    
                    expElement.appendChild(title);
                    
                    // Add remove functionality
                    expElement.addEventListener('click', () => {
                        this.removeItem(exp.type, exp.id);
                    });
                    
                    experienceContainer.appendChild(expElement);
                });
            }
            
            // Update Education
            const educationContainer = document.querySelector('.resume-education-content');
            if (educationContainer) {
                educationContainer.innerHTML = '';
                
                this.items.education.forEach((edu, index) => {
                    const eduElement = document.createElement('div');
                    eduElement.classList.add('resume-education-item', 'draggable-item');
                    eduElement.dataset.id = edu.id;
                    eduElement.style.setProperty('--index', index);
                    
                    const title = document.createElement('h5');
                    title.textContent = edu.content;
                    
                    eduElement.appendChild(title);
                    
                    // Add remove functionality
                    eduElement.addEventListener('click', () => {
                        this.removeItem(edu.type, edu.id);
                    });
                    
                    educationContainer.appendChild(eduElement);
                });
            }
            
            // Update Projects
            const projectsContainer = document.querySelector('.resume-projects-content');
            if (projectsContainer) {
                projectsContainer.innerHTML = '';
                
                this.items.projects.forEach((proj, index) => {
                    const projElement = document.createElement('div');
                    projElement.classList.add('resume-project-item', 'draggable-item');
                    projElement.dataset.id = proj.id;
                    projElement.style.setProperty('--index', index);
                    
                    const title = document.createElement('h5');
                    title.textContent = proj.content;
                    
                    projElement.appendChild(title);
                    
                    // Add remove functionality
                    projElement.addEventListener('click', () => {
                        this.removeItem(proj.type, proj.id);
                    });
                    
                    projectsContainer.appendChild(projElement);
                });
            }
        },
        
        removeItem: function(type, id) {
            // Remove from data model
            this.items[type] = this.items[type].filter(item => item.id !== id);
            
            // Remove 'added' class from builder item
            const builderItem = document.querySelector(`.builder-item[data-id="${id}"]`);
            if (builderItem) {
                builderItem.classList.remove('added-to-resume');
            }
            
            // Update UI
            this.updateResumeUI();
        },
        
        resetResume: function() {
            // Clear data model
            Object.keys(this.items).forEach(key => {
                this.items[key] = [];
            });
            
            // Remove 'added' class from all items
            document.querySelectorAll('.builder-item').forEach(item => {
                item.classList.remove('added-to-resume');
            });
            
            // Update UI
            this.updateResumeUI();
        },
        
        downloadResume: function() {
            // Create notification
            const notification = document.createElement('div');
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.padding = '15px 20px';
            notification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            notification.style.color = 'white';
            notification.style.borderRadius = '8px';
            notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            notification.style.zIndex = '9999';
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            notification.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            notification.textContent = 'Preparing your custom resume...';
            
            document.body.appendChild(notification);
            
            // Show notification
            setTimeout(() => {
                notification.style.transform = 'translateY(0)';
                notification.style.opacity = '1';
            }, 10);
            
            // In a real implementation, you would use a PDF generation library
            // For this example, we'll simulate a download after a delay
            setTimeout(() => {
                notification.textContent = 'Your resume has been downloaded!';
                notification.style.backgroundColor = 'rgba(0, 128, 0, 0.8)';
                
                // Hide notification after a delay
                setTimeout(() => {
                    notification.style.transform = 'translateY(100px)';
                    notification.style.opacity = '0';
                    
                    // Remove from DOM after animation
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 3000);
                
                // In a real implementation, the download would start here
                // window.open('path/to/generated/resume.pdf', '_blank');
            }, 2000);
        }
    };
    
    function initializeEmptyResumeContent() {
        // Add empty messages to resume sections
        const skillsContent = document.querySelector('.resume-skills-content');
        const experienceContent = document.querySelector('.resume-experience-content');
        const educationContent = document.querySelector('.resume-education-content');
        const projectsContent = document.querySelector('.resume-projects-content');
        
        if (skillsContent) {
            skillsContent.innerHTML = '<p class="empty-section-message">Drag skills here or click the + button to add them to your resume</p>';
        }
        
        if (experienceContent) {
            experienceContent.innerHTML = '<p class="empty-section-message">Drag experience items here or click the + button to add them to your resume</p>';
        }
        
        if (educationContent) {
            educationContent.innerHTML = '<p class="empty-section-message">Drag education items here or click the + button to add them to your resume</p>';
        }
        
        if (projectsContent) {
            projectsContent.innerHTML = '<p class="empty-section-message">Drag projects here or click the + button to add them to your resume</p>';
        }
    }
    
    // Initialize resume builder
    resumeBuilder.init();
    
    // Mouse move parallax effect for resume paper
    const resumePaper = document.querySelector('.resume-paper');
    if (resumePaper) {
        document.addEventListener('mousemove', function(e) {
            const cvContent = document.querySelector('.cv-content');
            if (!cvContent) return;
            
            const contentRect = cvContent.getBoundingClientRect();
            
            // Only apply effect when mouse is within CV content
            if (
                e.clientX >= contentRect.left && 
                e.clientX <= contentRect.right && 
                e.clientY >= contentRect.top && 
                e.clientY <= contentRect.bottom
            ) {
                const x = e.clientX / window.innerWidth - 0.5;
                const y = e.clientY / window.innerHeight - 0.5;
                
                resumePaper.style.transform = `
                    perspective(2000px) 
                    rotateY(${x * 5}deg) 
                    rotateX(${-y * 5}deg) 
                    translateZ(10px)
                `;
            }
        });
        
        // Reset transform when mouse leaves
        document.addEventListener('mouseleave', function() {
            resumePaper.style.transform = 'perspective(2000px) rotateY(-5deg) translateZ(0)';
        });
    }
}); 