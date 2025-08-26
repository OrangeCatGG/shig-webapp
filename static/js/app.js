// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const contactForm = document.getElementById('contact-form');
const particlesContainer = document.getElementById('particles');

// Navigation functionality
let isMenuOpen = false;

navToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) {
            isMenuOpen = false;
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Theme toggle functionality
let isDarkMode = true;

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    themeToggle.querySelector('.theme-icon').textContent = isDarkMode ? '🌙' : '☀️';
    
    // Save theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    isDarkMode = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.querySelector('.theme-icon').textContent = isDarkMode ? '🌙' : '☀️';
}

// Smooth scrolling and active nav link highlighting
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}

// Navbar background on scroll
function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.9)';
    }
}

// Scroll event listeners
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    updateNavbar();
    
    // Parallax effect for cityscape
    const cityscape = document.querySelector('.cityscape');
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    if (cityscape) {
        cityscape.style.transform = `translateY(${parallax}px)`;
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    updateNavbar();
});

// Particle system
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random color
    const colors = ['#00ffff', '#ff00ff', '#00ff88'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    
    return particle;
}

// Initialize particles (only if motion is not reduced)
function initParticles() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const particleCount = window.innerWidth > 768 ? 500 : 25;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = createParticle();
        particlesContainer.appendChild(particle);
    }
}

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('.form-submit');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Typing animation for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = typingElement.textContent;
        setTimeout(() => {
            typeWriter(typingElement, text, 50);
        }, 1000);
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
        isMenuOpen = false;
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', initParticles);

// Neon glow for About section when it enters the viewport
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const glowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If user prefers reduced motion, we still show a softer static halo
            if (entry.isIntersecting) {
                aboutSection.classList.add('glow-active');
            } else {
                aboutSection.classList.remove('glow-active');
            }
        });
    }, { threshold: 0.4 });

    glowObserver.observe(aboutSection);
});

// 3D Projects Carousel
class ProjectsCarousel {
    constructor() {
        this.currentIndex = 0;
        this.totalProjects = 8;
        this.carousel = document.getElementById('projects-carousel');
        this.indicators = document.getElementById('projectIndicators');
        this.currentNum = document.getElementById('currentProjectNum');
        this.totalNum = document.getElementById('totalProjects');
        
        this.init();
    }
    
    init() {
        if (!this.carousel) return;
        
        this.createIndicators();
        this.updateDisplay();
        this.bindEvents();
        
        // Auto-rotate every 5 seconds (optional)
        this.startAutoRotate();
    }
    
    createIndicators() {
        if (!this.indicators) return;
        
        for (let i = 0; i < this.totalProjects; i++) {
            const indicator = document.createElement('div');
            indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicators.appendChild(indicator);
        }
    }
    
    bindEvents() {
        const prevBtn = document.getElementById('prevProject');
        const nextBtn = document.getElementById('nextProject');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousProject());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextProject());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isInViewport()) {
                if (e.key === 'ArrowLeft') this.previousProject();
                if (e.key === 'ArrowRight') this.nextProject();
            }
        });
        
        // Touch/swipe support
        this.addTouchSupport();
    }
    
    addTouchSupport() {
        if (!this.carousel) return;
        
        let startX = 0;
        let startY = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextProject();
                } else {
                    this.previousProject();
                }
            }
            
            startX = 0;
            startY = 0;
        });
    }
    
    isInViewport() {
        if (!this.carousel) return false;
        const rect = this.carousel.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
    
    nextProject() {
        this.currentIndex = (this.currentIndex + 1) % this.totalProjects;
        this.updateCarousel();
        this.resetAutoRotate();
    }
    
    previousProject() {
        this.currentIndex = (this.currentIndex - 1 + this.totalProjects) % this.totalProjects;
        this.updateCarousel();
        this.resetAutoRotate();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
        this.resetAutoRotate();
    }
    
    updateCarousel() {
        if (!this.carousel) return;
        
        // Rotate the entire carousel
        const rotationAngle = -this.currentIndex * 45; // 45 degrees per item
        this.carousel.style.transform = `rotateY(${rotationAngle}deg)`;
        
        // Update active states
        const items = this.carousel.querySelectorAll('.carousel-item');
        items.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentIndex);
        });
        
        this.updateDisplay();
    }
    
    updateDisplay() {
        // Update indicators
        const indicators = this.indicators?.querySelectorAll('.indicator');
        indicators?.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update counter
        if (this.currentNum) this.currentNum.textContent = this.currentIndex + 1;
        if (this.totalNum) this.totalNum.textContent = this.totalProjects;
    }
    
    startAutoRotate() {
        this.autoRotateInterval = setInterval(() => {
            if (this.isInViewport() && !document.hidden) {
                this.nextProject();
            }
        }, 5000); // 5 seconds
    }
    
    resetAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
            this.startAutoRotate();
        }
    }
    
    destroy() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
        }
    }
}

// Initialize Projects Carousel
let projectsCarousel;
document.addEventListener('DOMContentLoaded', () => {
    projectsCarousel = new ProjectsCarousel();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (projectsCarousel) {
        projectsCarousel.destroy();
    }
});

// Resize handler for particles
window.addEventListener('resize', () => {
    // Clear existing particles
    particlesContainer.innerHTML = '';
    // Reinitialize with appropriate count
    initParticles();
});

// Performance optimization: throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    updateActiveNavLink();
    updateNavbar();
    
    const cityscape = document.querySelector('.cityscape');
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    if (cityscape) {
        cityscape.style.transform = `translateY(${parallax}px)`;
    }
}, 16)); // ~60fps

// Lazy loading for YouTube iframe
const youtubeContainer = document.querySelector('.video-wrapper');
const youtubeIframe = youtubeContainer?.querySelector('iframe');

if (youtubeIframe) {
    const youtubeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // YouTube iframe is already loaded, just ensure it's visible
                youtubeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    youtubeObserver.observe(youtubeContainer);
}

// Add glitch effect to skill tags on hover
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.animation = 'glitch-1 0.3s ease-in-out';
        });
        
        tag.addEventListener('animationend', () => {
            tag.style.animation = '';
        });
    });
});

(function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Safety timeout in case 'load' never fires due to blocked resources
  const failsafe = setTimeout(hidePreloader, 5000);

  window.addEventListener('load', () => {
    clearTimeout(failsafe);
    // Small delay so users perceive the transition
    setTimeout(hidePreloader, 300);
  });

  function hidePreloader() {
    if (!preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
    }
  }
})();




// Console easter egg
console.log(`
    ╔══════════════════════════════════════╗
    ║                                      ║
    ║        Welcome to the Matrix!        ║
    ║                                      ║
    ║     Sheigfred Bello - DevOps Eng     ║
    ║                                      ║
    ║    "Optimizing the digital world"    ║
    ║                                      ║
    ╚══════════════════════════════════════╝
    
    🚀 Interested in the code? Check out the source!
    📧 Contact: sheigfred.bello@gmail.com
`);