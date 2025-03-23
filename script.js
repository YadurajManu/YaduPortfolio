// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Project data
const projects = [
    {
        title: "iOS App Project",
        description: "A modern iOS application built with SwiftUI",
        technologies: ["Swift", "SwiftUI", "Core Data"],
        image: "https://via.placeholder.com/300x200",
        link: "#"
    },
    {
        title: "Web Application",
        description: "A responsive web application using modern technologies",
        technologies: ["React", "Node.js", "MongoDB"],
        image: "https://via.placeholder.com/300x200",
        link: "#"
    },
    {
        title: "AI/ML Project",
        description: "Machine learning model for predictive analytics",
        technologies: ["Python", "TensorFlow", "Scikit-learn"],
        image: "https://via.placeholder.com/300x200",
        link: "#"
    }
];

// Function to create project cards
function createProjectCards() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <a href="${project.link}" class="btn primary">View Project</a>
            </div>
        `;
        projectsGrid.appendChild(card);
    });
}

// Add styles for project cards
const style = document.createElement('style');
style.textContent = `
    .project-card {
        background: var(--background-color);
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        transition: transform 0.3s ease;
    }

    .project-card:hover {
        transform: translateY(-5px);
    }

    .project-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .project-content {
        padding: 1.5rem;
    }

    .project-technologies {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin: 1rem 0;
    }

    .project-technologies span {
        background: var(--section-bg);
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style);

// Initialize project cards when the DOM is loaded
document.addEventListener('DOMContentLoaded', createProjectCards);

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'var(--background-color)';
        navbar.style.boxShadow = 'none';
    }
});

// Typewriter effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typewriter effect when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const tagline = document.querySelector('.tagline');
    const originalText = tagline.textContent;
    typeWriter(tagline, originalText, 100);
}); 