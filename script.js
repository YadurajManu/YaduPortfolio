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
    
    // Advanced typewriter effect with cursor
    const typewriterTargets = document.querySelectorAll('.tagline');
    
    typewriterTargets.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        element.style.borderRight = '2px solid #000';
        
        let i = 0;
        let isDeleting = false;
        let currentText = '';
        
        function typeEffect() {
            const fullText = text;
            const typingSpeed = isDeleting ? 30 : 100;
            
            if (isDeleting) {
                currentText = fullText.substring(0, currentText.length - 1);
            } else {
                currentText = fullText.substring(0, currentText.length + 1);
            }
            
            element.innerHTML = currentText;
            
            if (!isDeleting && currentText === fullText) {
                // Pause at the end
                setTimeout(() => {
                    element.style.borderRight = '2px solid transparent';
                    setTimeout(() => {
                        element.style.borderRight = '2px solid #000';
                        setTimeout(() => {
                            isDeleting = true;
                            typeEffect();
                        }, 1000);
                    }, 500);
                }, 2000);
            } else if (isDeleting && currentText === '') {
                isDeleting = false;
                // Pause before starting again
                setTimeout(typeEffect, 1000);
            } else {
                setTimeout(typeEffect, typingSpeed);
            }
        }
        
        setTimeout(typeEffect, 1000);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Add active class to the clicked nav item
        document.querySelectorAll('.nav-links a').forEach(item => {
            item.classList.remove('active-link');
        });
        this.classList.add('active-link');
        
        // Smooth scroll with easing
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
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

// Advanced form animations
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    formInputs.forEach(input => {
        // Create and add placeholder element
        const placeholder = document.createElement('span');
        placeholder.classList.add('floating-placeholder');
        placeholder.textContent = input.getAttribute('placeholder');
        placeholder.style.position = 'absolute';
        placeholder.style.top = '20px';
        placeholder.style.left = '16px';
        placeholder.style.color = '#999';
        placeholder.style.pointerEvents = 'none';
        placeholder.style.transition = 'all 0.3s ease';
        placeholder.style.transformOrigin = 'left top';
        
        input.parentNode.style.position = 'relative';
        input.parentNode.insertBefore(placeholder, input);
        
        // Remove default placeholder
        input.setAttribute('placeholder', '');
        
        // Handle focus and blur events
        input.addEventListener('focus', () => {
            placeholder.style.transform = 'translateY(-20px) scale(0.8)';
            placeholder.style.color = '#000';
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                placeholder.style.transform = 'translateY(0) scale(1)';
                placeholder.style.color = '#999';
            }
        });
        
        // Check if input already has value
        if (input.value !== '') {
            placeholder.style.transform = 'translateY(-20px) scale(0.8)';
            placeholder.style.color = '#000';
        }
    });
    
    // Add ripple effect to submit button
    const submitBtn = document.querySelector('.contact-form button');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.top = y + 'px';
            ripple.style.left = x + 'px';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s linear';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 0.5;
                }
                100% {
                    width: 500px;
                    height: 500px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// Navbar active state based on scroll position
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 300;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }
    
    // Add active-link style
    const style = document.createElement('style');
    style.textContent = `
        .active-link {
            color: var(--primary-color) !important;
            font-weight: 600 !important;
            position: relative;
        }
        .active-link::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--primary-color);
            animation: fadeIn 0.3s forwards;
        }
        @keyframes navItemFade {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Run once on page load
});

// Enhanced particle background effect for hero section
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '0';
        canvas.style.opacity = '0.2';
        
        heroSection.insertBefore(canvas, heroSection.firstChild);
        
        const ctx = canvas.getContext('2d');
        
        let width, height, particles;
        
        function init() {
            resize();
            createParticles();
            loop();
        }
        
        function resize() {
            width = canvas.width = heroSection.offsetWidth;
            height = canvas.height = heroSection.offsetHeight;
        }
        
        function createParticles() {
            particles = [];
            const particleCount = Math.min(Math.floor(width * height / 8000), 150);
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5 + 0.5,
                    vx: Math.random() * 1 - 0.5,
                    vy: Math.random() * 1 - 0.5,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }
        
        function loop() {
            ctx.clearRect(0, 0, width, height);
            updateParticles();
            drawParticles();
            requestAnimationFrame(loop);
        }
        
        function updateParticles() {
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                
                // Add slight random movement
                p.vx += (Math.random() - 0.5) * 0.01;
                p.vy += (Math.random() - 0.5) * 0.01;
                
                // Limit velocity
                p.vx = Math.max(Math.min(p.vx, 1), -1);
                p.vy = Math.max(Math.min(p.vy, 1), -1);
                
                p.x += p.vx;
                p.y += p.vy;
                
                // Bounce off edges with slight damping
                if (p.x < 0) {
                    p.x = 0;
                    p.vx *= -0.9;
                }
                if (p.y < 0) {
                    p.y = 0;
                    p.vy *= -0.9;
                }
                if (p.x > width) {
                    p.x = width;
                    p.vx *= -0.9;
                }
                if (p.y > height) {
                    p.y = height;
                    p.vy *= -0.9;
                }
                
                // Random opacity fluctuation
                p.opacity += (Math.random() - 0.5) * 0.01;
                p.opacity = Math.max(Math.min(p.opacity, 0.7), 0.1);
            }
        }
        
        function drawParticles() {
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 0, 0, ${p.opacity})`;
                ctx.fill();
            }
            
            // Draw connections
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 0.1;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
                    
                    if (dist < 100) {
                        ctx.globalAlpha = (1 - (dist / 100)) * 0.2;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            
            ctx.globalAlpha = 1;
        }
        
        // Mouse interaction
        let mouseX, mouseY;
        
        heroSection.addEventListener('mousemove', function(e) {
            const rect = heroSection.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            
            particles.forEach(p => {
                const dist = Math.sqrt(Math.pow(p.x - mouseX, 2) + Math.pow(p.y - mouseY, 2));
                if (dist < 150) {
                    const angle = Math.atan2(p.y - mouseY, p.x - mouseX);
                    const force = (150 - dist) / 1500;
                    p.vx += Math.cos(angle) * force;
                    p.vy += Math.sin(angle) * force;
                }
            });
        });
        
        window.addEventListener('resize', function() {
            resize();
            createParticles();
        });
        
        init();
    }
});

// Enhanced code block interaction
document.addEventListener('DOMContentLoaded', function() {
    const codeBlock = document.querySelector('.code-block');
    
    if (codeBlock) {
        // Syntax highlighting
        const code = codeBlock.querySelector('code').innerHTML;
        const highlightedCode = code
            .replace(/class\s+([a-zA-Z_]+)/g, 'class <span style="color:#ff79c6">$1</span>')
            .replace(/constructor/g, '<span style="color:#50fa7b">constructor</span>')
            .replace(/function/g, '<span style="color:#50fa7b">function</span>')
            .replace(/this\./g, '<span style="color:#bd93f9">this.</span>')
            .replace(/"([^"]*)"/g, '"<span style="color:#f1fa8c">$1</span>"')
            .replace(/(\[|\])/g, '<span style="color:#f8f8f2">$1</span>')
            .replace(/(\{|\})/g, '<span style="color:#f8f8f2">$1</span>')
            .replace(/(\(|\))/g, '<span style="color:#f8f8f2">$1</span>')
            .replace(/return/g, '<span style="color:#ff79c6">return</span>')
            .replace(/const|let|var/g, '<span style="color:#ff79c6">$&</span>')
            .replace(/\.\w+(?=\()/g, '<span style="color:#50fa7b">$&</span>');
            
        codeBlock.querySelector('code').innerHTML = highlightedCode;
        
        // Typing effect for code
        const lines = codeBlock.querySelectorAll('code > *');
        if (lines.length === 0) {
            // If there are no child elements, we'll create a typing effect on the whole content
            const text = codeBlock.querySelector('code').textContent;
            codeBlock.querySelector('code').textContent = '';
            
            let i = 0;
            const typeSpeed = 30;
            
            function typeCode() {
                if (i < text.length) {
                    codeBlock.querySelector('code').innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeCode, typeSpeed);
                }
            }
            
            setTimeout(() => {
                typeCode();
            }, 800);
        }
        
        // 3D movement for code block
        codeBlock.addEventListener('mousemove', function(e) {
            const rect = codeBlock.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 30;
            const moveY = (y - centerY) / 30;
            
            codeBlock.style.transform = `perspective(800px) rotateY(${moveX}deg) rotateX(${-moveY}deg) translateZ(10px)`;
        });
        
        codeBlock.addEventListener('mouseleave', function() {
            codeBlock.style.transform = 'perspective(800px) rotateY(-10deg) translateY(0)';
        });
    }
}); 