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

class ProductComparer {
  constructor() {
    this.productList = [
      { id: 3, name: 'Lolito', price: 'Rs. 7,000,000.00', rating: 4.5, reviews: 89, img: 'https://i.imgur.com/8Km4V3m.png' },
      { id: 4, name: 'Respira', price: 'Rs. 500,000.00', rating: 4.8, reviews: 56, img: 'https://i.imgur.com/5Qp4s2T.png' },
      { id: 5, name: 'Grifo', price: 'Rs. 150,000.00', rating: 4.3, reviews: 120, img: 'https://i.imgur.com/8Km4V3m.png' },
      { id: 6, name: 'Muggo', price: 'Rs. 250,000.00', rating: 4.6, reviews: 200, img: 'https://i.imgur.com/5Qp4s2T.png' }
    ];
    this.fillSlot = 1;
    this.init();
  }

  init = () => {
    this.setStarWidths();
    this.setupDropdown();
  }

  setStarWidths = () => {
    document.querySelectorAll('.stars').forEach(el => {
      const rating = parseFloat(el.dataset.rating);
      el.style.setProperty('--w', `${(rating / 5) * 100}%`);
    });
  }

  
  setupDropdown = () => {
    const btn = document.getElementById('selectBtn');
    const options = document.getElementById('selectOptions');

    // Render options
    this.productList.forEach(p => {
      const li = document.createElement('li');
      li.className = 'option-item';
      li.textContent = p.name;
      li.onclick = () => this.updateProduct(p);
      options.appendChild(li);
    });

    // Toggle
    btn.addEventListener('click', e => {
      e.stopPropagation();
      options.classList.toggle('show');
      btn.classList.toggle('active');
    });

    // Close on outside
    window.addEventListener('click', () => {
      options.classList.remove('show');
      btn.classList.remove('active');
    });
  }

  // Update Product Card
  updateProduct = (product) => {
    const target = document.querySelector(`.product-card[data-id="${this.fillSlot}"]`);
    target.querySelector('.img-box img').src = product.img;
    target.querySelector('.p-title').textContent = product.name;
    target.querySelector('.p-price').textContent = product.price;
    target.querySelector('.rate').textContent = product.rating;
    target.querySelector('.review-count').textContent = `| ${product.reviews} Review`;
    target.querySelector('.stars').dataset.rating = product.rating;
    
    this.setStarWidths();
    this.toast(`${product.name} added`);
    this.fillSlot = this.fillSlot === 1 ? 2 : 1;
  }

  
  toast = (msg) => {
    const t = document.createElement('div');
    t.textContent = msg;
    Object.assign(t.style, {
      position: 'fixed', bottom: '20px', right: '20px', background: 'var(--gold)',
      color: '#fff', padding: '12px 20px', borderRadius: '8px', zIndex: '9999',
      fontSize: '14px', opacity: '0', transition: '0.3s'
    });
    document.body.appendChild(t);
    requestAnimationFrame(() => t.style.opacity = '1');
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 2000);
  }
}

// document.addEventListener('DOMContentLoaded', () => new ProductComparer());

// // section 03


"use strict";

/**
 * Product Specification
 * Professional JavaScript foundation
 */

document.addEventListener("DOMContentLoaded", () => {

    const specificationTable =
        document.querySelector(".specification-table");

    if (!specificationTable) {
        return;
    }

    /*
     * Add a small accessibility enhancement.
     * The specification table is treated as a
     * content component rather than a form.
     */

    specificationTable.setAttribute(
        "aria-label",
        "Product specification comparison"
    );

// });

// ...

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const table = document.querySelector(".specification-table");

    if (!table) {
        return;
    }

    table.setAttribute(
        "aria-label",
        "Product specification comparison table"
    );

});

// ,,,
"use strict";


/* =========================================
   DOM ELEMENTS
========================================= */

const cartButtons = document.querySelectorAll(".add-cart-btn");

const cartNotification =
    document.getElementById("cartNotification");

const cartMessage =
    document.getElementById("cartMessage");


/* =========================================
   CART STATE
========================================= */

let cart = JSON.parse(
    localStorage.getItem("productCart")
) || [];


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "productCart",
        JSON.stringify(cart)
    );
}


/* =========================================
   SHOW NOTIFICATION
========================================= */

function showCartNotification(message) {

    if (!cartNotification || !cartMessage) {
        return;
    }

    cartMessage.textContent = message;

    cartNotification.classList.add("show");

    clearTimeout(window.cartNotificationTimer);

    window.cartNotificationTimer = setTimeout(() => {

        cartNotification.classList.remove("show");

    }, 2500);
}


/* =========================================
   ADD PRODUCT TO CART
========================================= */

function addToCart(button) {

    const productName =
        button.dataset.product;

    const productPrice =
        Number(button.dataset.price);


    const product = {

        id: Date.now(),

        name: productName,

        price: productPrice,

        quantity: 1

    };


    cart.push(product);


    saveCart();


    showCartNotification(
        `${productName} added to cart`
    );


    /* Temporary button feedback */

    const originalText =
        button.textContent;

    button.textContent = "Added ✓";

    button.disabled = true;


    setTimeout(() => {

        button.textContent =
            originalText;

        button.disabled = false;

    }, 1200);
}


/* =========================================
   BUTTON EVENTS
========================================= */

// cartButtons.forEach((button) => {

//     button.addEventListener(
//         "click",
//         () => {

//             addToCart(button);

//         }
//     );

// });


document.addEventListener("DOMContentLoaded", () => {

    const cartButtons = document.querySelectorAll(".cart-btn");

    cartButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const originalText = button.textContent;

            button.textContent = "Added ✓";

            button.style.backgroundColor = "#777";

            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = "";
            }, 1200);

        });

    });

});