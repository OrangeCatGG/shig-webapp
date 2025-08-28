// Base JavaScript functionality shared across all pages

// Theme Management
class ThemeManager {
  constructor() {
    this.isDarkMode = true;
    this.themeToggle = document.getElementById('theme-toggle');
    this.init();
  }

  init() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
      this.updateIcon();
    }

    // Add event listener
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggle());
    }
  }

  toggle() {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateIcon();
  }

  updateIcon() {
    const icon = this.themeToggle?.querySelector('.theme-icon');
    if (icon) {
      icon.textContent = this.isDarkMode ? '🌙' : '☀️';
    }
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.navToggle = document.getElementById('nav-toggle');
    this.navMenu = document.getElementById('nav-menu');
    this.isMenuOpen = false;
    this.init();
  }

  init() {
    // Mobile menu toggle
    if (this.navToggle && this.navMenu) {
      this.navToggle.addEventListener('click', () => this.toggleMenu());
    }

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
      }
    });

    // Scroll effects
    window.addEventListener('scroll', () => this.updateNavbar());
    this.updateNavbar();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.navMenu?.classList.toggle('active');
    this.navToggle?.classList.toggle('active');
  }

  closeMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      this.navMenu?.classList.remove('active');
      this.navToggle?.classList.remove('active');
    }
  }

  updateNavbar() {
    if (!this.navbar) return;
    const scrolled = window.scrollY > 50;
    this.navbar.style.background = scrolled 
      ? 'rgba(10, 10, 15, 0.95)' 
      : 'rgba(10, 10, 15, 0.9)';
  }
}

// Particle System
class ParticleSystem {
  constructor() {
    this.container = document.getElementById('particles');
    this.particles = [];
    this.init();
  }

  init() {
    if (!this.container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.createParticles();
    window.addEventListener('resize', () => this.handleResize());
  }

  createParticles() {
    const particleCount = window.innerWidth > 768 ? 50 : 25;
    const colors = ['#00ffff', '#ff00ff', '#00ff88'];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      // Random color
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      // Random animation
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
      
      this.container.appendChild(particle);
      this.particles.push(particle);
    }
  }

  handleResize() {
    this.clearParticles();
    this.createParticles();
  }

  clearParticles() {
    this.particles.forEach(particle => particle.remove());
    this.particles = [];
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

// Loading Screen Manager
class LoadingManager {
  constructor() {
    this.preloader = document.getElementById('preloader');
    this.init();
  }

  init() {
    if (!this.preloader) return;

    const failsafe = setTimeout(() => this.hide(), 5000);
    
    window.addEventListener('load', () => {
      clearTimeout(failsafe);
      setTimeout(() => this.hide(), 2000); // 2 second display
    });
  }

  hide() {
    if (this.preloader && !this.preloader.classList.contains('hidden')) {
      this.preloader.classList.add('hidden');
      // Remove from DOM after transition
      setTimeout(() => {
        if (this.preloader && this.preloader.parentNode) {
          this.preloader.parentNode.removeChild(this.preloader);
        }
      }, 500);
    }
  }
}

// Utility Functions
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

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Initialize base functionality
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new NavigationManager();
  new ParticleSystem();
  new LoadingManager();
});

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