// ES6 Navbar Logic
class Navbar {
  constructor() {
    this.cartCountSpan = document.getElementById('cartCount');
    this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    this.navMenu = document.querySelector('.nav-menu');
    this.init();
  }

  init = () => {
    this.updateCartCount();
    this.handleMobileMenu();
    this.handleIcons();
  }

  // 1. Cart Count from LocalStorage
  updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    this.cartCountSpan.textContent = totalQty;
    this.cartCountSpan.style.display = totalQty > 0 ? 'flex' : 'none';
  }

  // 2. Mobile Menu Toggle
  handleMobileMenu = () => {
    this.mobileMenuBtn.addEventListener('click', () => {
      this.navMenu.classList.toggle('active');
      if(this.navMenu.classList.contains('active')){
        this.navMenu.style.cssText = `
          display: flex; flex-direction: column; position: absolute;
          top: 70px; left: 0; width: 100%; background: white;
          padding: 20px; box-shadow: 0 5px 10px rgba(0,0,0,0.1);
        `;
      } else {
        this.navMenu.style.display = 'none';
      }
    });
  }

  // 3. Icons Click Events
  handleIcons = () => {
    document.getElementById('searchIcon').addEventListener('click', (e) => {
      e.preventDefault();
      this.showToast('Search coming soon 🔍');
    });

    document.getElementById('wishlistIcon').addEventListener('click', (e) => {
      e.preventDefault();
      this.showToast('Wishlist page');
    });

    document.getElementById('cartIcon').addEventListener('click', (e) => {
      e.preventDefault();
      // Yahan tumhara side cart open hoga
      this.showToast('Opening Cart Drawer...');
      // agar side cart banaya hai to: document.getElementById('cartDrawer').classList.add('active')
    });
  }

  // 4. Toast
  showToast = (msg) => {
    const toast = document.createElement('div');
    toast.textContent = msg;
    Object.assign(toast.style, {
      position: 'fixed', bottom: '20px', right: '20px',
      background: '#B88E2F', color: 'white', padding: '14px 24px',
      borderRadius: '8px', zIndex: '9999', fontSize: '14px',
      opacity: '0', transition: 'opacity 0.3s'
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.style.opacity = '1', 100);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  }
}

// Page Load
document.addEventListener('DOMContentLoaded', () => {
  new Navbar();
});


// 2 section
