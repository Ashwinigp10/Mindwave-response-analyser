/* ==========================================================================
   MindWave Client Interactivity & Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  setupStickyNavbar();
  setupMobileNavigation();
  setupCardSpotlightEffect();
  setupIntersectionObserverReveal();
  setupScrollSpy();
  setupNavbarAuthState();
});

function setupNavbarAuthState() {
  const loginBtn = document.getElementById('login-button');
  if (!loginBtn) return;

  const token = localStorage.getItem('mindwave_token');
  const isAuth = Boolean(token && token !== 'undefined' && token !== 'null' && token.trim() !== '');

  if (isAuth) {
    let name = 'Logout';
    try {
      const u = JSON.parse(localStorage.getItem('mindwave_user') || '{}');
      if (u.name) name = `Logout (${u.name.split(' ')[0]})`;
    } catch (e) {}

    loginBtn.textContent = name;
    loginBtn.setAttribute('href', '#logout');
    loginBtn.onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem('mindwave_token');
      localStorage.removeItem('mindwave_user');
      window.location.href = '/login.html';
    };
  } else {
    loginBtn.textContent = 'Login';
    loginBtn.setAttribute('href', '/login.html');
  }
}

/**
 * Adds active class to navbar when user scrolls down
 */
function setupStickyNavbar() {
  const navbar = document.querySelector('.navbar-header');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once in case page starts scrolled down
}

/**
 * Manages mobile drawer toggle and aria state
 */
function setupMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('primary-navigation');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a navigation link is clicked
  const navLinks = navMenu.querySelectorAll('.nav-link, .btn-login');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Tracks cursor positions within feature cards for premium spotlight overlay
 */
function setupCardSpotlightEffect() {
  const cards = document.querySelectorAll('.feature-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * Reveals elements smoothly as they enter the viewport
 */
function setupIntersectionObserverReveal() {
  const revealElements = document.querySelectorAll('.fade-in-trigger');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once element is visible, we don't need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(element => observer.observe(element));
  } else {
    // Fallback for browsers not supporting IntersectionObserver
    revealElements.forEach(element => element.classList.add('visible'));
  }
}

/**
 * Highlight navbar links based on scroll position (ScrollSpy)
 */
function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120; // offset navbar height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}
