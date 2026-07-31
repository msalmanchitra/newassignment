// ES6 Features: Arrow Functions, Classes, LocalStorage, Event Delegation

class Navbar {
  constructor() {
    this.init();
  }

  init = () => {
    this.handleNavigation();
    this.handleSearch();
    this.handleMobileMenu();
    this.addPageTransition();
  }

  // 1. Click pe New Page Open
  handleNavigation = () => {
    document.querySelectorAll('.nav-item, .btn-login, .btn-signup, .logo').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        // Ripple effect
        this.createRipple(e, link);
        
        // Smooth fade out then redirect
        document.body.style.transition = 'opacity 0.2s';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
          window.location.href = href; // New page open
        }, 200);
      });
    });
  }

  // 2. Search with Debounce
  handleSearch = () => {
    const searchInput = document.getElementById('searchInput');
    let timer;
    
    searchInput?.addEventListener('input', (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const query = e.target.value.trim();
        if(query.length > 2){
          localStorage.setItem('lastSearch', query);
          this.showToast(`Searching: "${query}"`);
        }
      }, 400);
    });
  }

  // 3. Mobile Menu Toggle
  handleMobileMenu = () => {
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('mobileMenu');

    toggle?.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('active');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.textContent = isOpen ? '✕' : '☰';
      document.body.classList.toggle('menu-open', isOpen);
    });

    document.querySelectorAll('.mobile-nav-links a, .mobile-actions a').forEach(link => {
      link.addEventListener('click', () => {
        menu?.classList.remove('active');
        toggle?.setAttribute('aria-expanded', 'false');
        if (toggle) toggle.textContent = '☰';
        document.body.classList.remove('menu-open');
      });
    });
  }

  // 4. Ripple Effect on Click
  createRipple = (e, element) => {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size/2}px;
      top: ${e.clientY - rect.top - size/2}px;
      background: rgba(13,153,255,0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }

  // 5. Toast Notification
  showToast = (message) => {
    const toast = document.createElement('div');
    toast.textContent = message;
    Object.assign(toast.style, {
      position: 'fixed', bottom: '20px', right: '20px',
      background: '#111', color: 'white', padding: '12px 20px',
      borderRadius: '8px', zIndex: '9999', opacity: '0',
      transition: 'opacity 0.3s', fontSize: '14px'
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.style.opacity = '1', 100);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  }

  // 6. Page Load Animation
  addPageTransition = () => {
    window.addEventListener('DOMContentLoaded', () => {
      document.body.style.opacity = '1';
    });
  }
}

// Ripple animation CSS
const style = document.createElement('style');
style.textContent = `
@keyframes ripple {
  to { transform: scale(4); opacity: 0; }
}
`;
document.head.appendChild(style);

// Navbar ko start karo
new Navbar();
// hero section
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        alert(`${button.innerText} clicked`);
    });
});