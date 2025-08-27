// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const contactForm = document.getElementById('contact-form');
const particlesContainer = document.getElementById('particles');

// Navigation functionality
let isMenuOpen = false;

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (isMenuOpen && navMenu && navToggle) {
      isMenuOpen = false;
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
});

// Theme toggle functionality
let isDarkMode = true;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    const icon = themeToggle.querySelector('.theme-icon');
    if (icon) icon.textContent = isDarkMode ? '🌙' : '☀️';
    // Save theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  });
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  isDarkMode = savedTheme === 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const icon = themeToggle?.querySelector('.theme-icon');
  if (icon) icon.textContent = isDarkMode ? '🌙' : '☀️';
}

// Smooth scrolling and active nav link highlighting
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
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
  if (!navbar) return;
  navbar.style.background = window.scrollY > 50 ? 'rgba(10, 10, 15, 0.95)' : 'rgba(10, 10, 15, 0.9)';
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

  // Random animation
  particle.style.animationDelay = Math.random() * 6 + 's';
  particle.style.animationDuration = (Math.random() * 4 + 4) + 's';

  return particle;
}

// Initialize particles (only if motion is not reduced)
function initParticles() {
  if (!particlesContainer) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const particleCount = window.innerWidth > 768 ? 500 : 25;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < particleCount; i++) {
    frag.appendChild(createParticle());
  }
  particlesContainer.appendChild(frag);
}

// Contact form handling — GUARDED so other pages don't error out
if (contactForm) {
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

    if (!isValidEmail(String(email))) {
      alert('Please enter a valid email address.');
      return;
    }

    // Simulate form submission
    const submitButton = contactForm.querySelector('.form-submit');
    const originalText = submitButton?.textContent || 'Send Message';

    if (submitButton) {
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
    }

    setTimeout(() => {
      alert('Thank you for your message! I\'ll get back to you soon.');
      contactForm.reset();
      if (submitButton) {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    }, 2000);
  });
}

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
  if (e.key === 'Escape' && isMenuOpen && navMenu && navToggle) {
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

  const glowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutSection.classList.add('glow-active');
      } else {
        aboutSection.classList.remove('glow-active');
      }
    });
  }, { threshold: 0.4 });

  glowObserver.observe(aboutSection);
});

// Resize handler for particles
window.addEventListener('resize', () => {
  if (!particlesContainer) return;
  // Clear existing particles
  particlesContainer.innerHTML = '';
  // Reinitialize with appropriate count
  initParticles();
});

// Performance optimization: throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
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

// Preloader (safe)
(function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const failsafe = setTimeout(hidePreloader, 5000);
  window.addEventListener('load', () => {
    clearTimeout(failsafe);
    setTimeout(hidePreloader, 300);
  });

  function hidePreloader() {
    if (!preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
    }
  }
})();

// ==============================
// COPY BUTTONS FOR .code-blocks
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.code-block');
  if (!blocks.length) return; // quietly skip on pages without code samples

  blocks.forEach(block => {
    // Ensure positioning for the absolute button
    const style = window.getComputedStyle(block);
    if (style.position === 'static') {
      block.style.position = 'relative';
    }

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = '📋 Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    btn.style.cssText = [
      'position:absolute',
      'right:.6rem',
      'top:.6rem',
      'z-index:2',
      'background:var(--bg-secondary)',
      'border:1px solid var(--glass-border)',
      'border-radius:.5rem',
      'padding:.3rem .6rem',
      'color:var(--text-primary)',
      'cursor:pointer'
    ].join(';');

    block.appendChild(btn);

    btn.addEventListener('click', async () => {
      // Remove the button label if innerText includes it
      const text = block.innerText.replace(/^📋 Copy$/m, '').trim();
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = '✅ Copied';
        setTimeout(() => (btn.textContent = '📋 Copy'), 1400);
      } catch (err) {
        // Fallback for non-secure contexts
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        btn.textContent = '✅ Copied';
        setTimeout(() => (btn.textContent = '📋 Copy'), 1400);
      }
    });
  });
});

// Traffic Flow Animation System
class TrafficFlowAnimation {
  constructor() {
    this.steps = document.querySelectorAll('.flow-step');
    this.progressBar = document.getElementById('flow-progress');
    this.playButton = document.getElementById('play-flow');
    this.resetButton = document.getElementById('reset-flow');
    this.currentStep = 0;
    this.isPlaying = false;
    this.animationInterval = null;
    
    this.init();
  }
  
  init() {
    if (!this.playButton || !this.resetButton) return;
    
    this.playButton.addEventListener('click', () => this.playAnimation());
    this.resetButton.addEventListener('click', () => this.resetAnimation());
    
    // Auto-play when section comes into view
    this.setupIntersectionObserver();
  }
  
  setupIntersectionObserver() {
    const flowSection = document.querySelector('.traffic-flow-section');
    if (!flowSection) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isPlaying) {
          // Auto-play after a short delay
          setTimeout(() => {
            if (!this.isPlaying) this.playAnimation();
          }, 1000);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(flowSection);
  }
  
  playAnimation() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.playButton.textContent = '⏸️ Playing...';
    this.playButton.disabled = true;
    
    this.animationInterval = setInterval(() => {
      this.activateStep(this.currentStep);
      this.updateProgress();
      
      this.currentStep++;
      
      if (this.currentStep >= this.steps.length) {
        this.completeAnimation();
      }
    }, 800); // 800ms between each step
  }
  
  activateStep(index) {
    if (index < this.steps.length) {
      // Mark previous steps as completed
      for (let i = 0; i < index; i++) {
        this.steps[i].classList.remove('active');
        this.steps[i].classList.add('completed');
      }
      
      // Activate current step
      this.steps[index].classList.add('active');
      this.steps[index].classList.remove('completed');
      
      // Add a subtle shake animation
      this.steps[index].style.animation = 'none';
      setTimeout(() => {
        this.steps[index].style.animation = 'stepActivate 0.5s ease';
      }, 10);
    }
  }
  
  updateProgress() {
    const progress = ((this.currentStep + 1) / this.steps.length) * 100;
    if (this.progressBar) {
      this.progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
  }
  
  completeAnimation() {
    clearInterval(this.animationInterval);
    this.isPlaying = false;
    
    // Mark all steps as completed
    this.steps.forEach(step => {
      step.classList.remove('active');
      step.classList.add('completed');
    });
    
    this.playButton.textContent = '✅ Complete!';
    this.playButton.disabled = false;
    
    // Reset button text after 2 seconds
    setTimeout(() => {
      this.playButton.textContent = '▶️ Watch Flow';
    }, 2000);
  }
  
  resetAnimation() {
    clearInterval(this.animationInterval);
    this.isPlaying = false;
    this.currentStep = 0;
    
    // Reset all steps
    this.steps.forEach(step => {
      step.classList.remove('active', 'completed');
      step.style.animation = '';
    });
    
    // Reset progress bar
    if (this.progressBar) {
      this.progressBar.style.width = '0%';
    }
    
    // Reset button
    this.playButton.textContent = '▶️ Watch Flow';
    this.playButton.disabled = false;
  }
}

// Add step activation animation keyframes
const stepAnimationCSS = `
@keyframes stepActivate {
  0% { transform: scale(0.95); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
`;

// Inject the CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = stepAnimationCSS;
document.head.appendChild(styleSheet);

// Initialize Traffic Flow Animation
document.addEventListener('DOMContentLoaded', () => {
  new TrafficFlowAnimation();
});

// Console easter egg
console.log(`\n    ╔══════════════════════════════════════╗\n    ║                                      ║\n    ║        Welcome to the Matrix!        ║\n    ║                                      ║\n    ║     Sheigfred Bello - DevOps Eng     ║\n    ║                                      ║\n    ║    "Optimizing the digital world"    ║\n    ║                                      ║\n    ╚══════════════════════════════════════╝\n    \n    🚀 Interested in the code? Check out the source!\n    📧 Contact: sheigfred.bello@gmail.com\n`);