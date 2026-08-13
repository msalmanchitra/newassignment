let qty = 1;
function changeQty(val){
  qty += val;
  if(qty < 1) qty = 1;
  document.getElementById('qty').innerText = qty;
}

function addCurrentProductToCart() {
  const productName = document.querySelector('.product-info h1')?.textContent?.trim() || 'Asgaard sofa';
  const productPriceText = document.querySelector('.product-info .price')?.textContent || 'Rs. 0';
  const productImage = document.querySelector('.main-img')?.src || '';
  const productId = 'asgaard-sofa';
  const price = Number(String(productPriceText).replace(/[^\d.]/g, '')) || 0;
  const quantity = Number(document.getElementById('qty')?.textContent || 1);

  const product = {
    id: productId,
    name: productName,
    price: price,
    image: productImage
  };

  if (typeof addToCart === 'function') {
    for (let i = 0; i < quantity; i += 1) {
      addToCart(product);
    }
  } else {
    const currentCart = JSON.parse(localStorage.getItem('furniroCart') || '[]');
    const existing = currentCart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      currentCart.push({ ...product, quantity });
    }
    localStorage.setItem('furniroCart', JSON.stringify(currentCart));
    const badge = document.getElementById('cart-count-page');
    if (badge) {
      const totalItems = currentCart.reduce((sum, item) => sum + item.quantity, 0);
      badge.textContent = totalItems;
    }
  }

  alert(`${productName} added to cart.`);
}

const productAddToCartButton = document.querySelector('.btn');
if (productAddToCartButton) {
  productAddToCartButton.addEventListener('click', addCurrentProductToCart);
}

// size select
document.querySelectorAll('.size').forEach(s=>{
  s.onclick = () => {
    document.querySelector('.size.active').classList.remove('active');
    s.classList.add('active');
  }
})

// color select
document.querySelectorAll('.color').forEach(c=>{
  c.onclick = () => {
    document.querySelector('.color.active').classList.remove('active');
    c.classList.add('active');
  }
})

// new section
// ES6 Product Page Logic
class ProductPage {
  constructor() {
    this.qty = 1;
    this.selectedSize = 'L';
    this.selectedColor = 'Purple';
    this.init();
  }

  init = () => {
    this.handleGallery();
    this.handleOptions();
    this.handleQuantity();
    this.handleCart();
  }

  // 1. Image Gallery Switch
  handleGallery = () => {
    const thumbs = document.querySelectorAll('.thumbnails img');
    const mainImg = document.getElementById('mainImage');
    
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        mainImg.src = thumb.dataset.big;
      });
    });
  }

  // 2. Size and Color Selection
  handleOptions = () => {
    document.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedSize = btn.dataset.size;
      });
    });

    document.querySelectorAll('.color-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedColor = btn.dataset.color;
      });
    });
  }

  // 3. Quantity Counter
  handleQuantity = () => {
    document.getElementById('increase').addEventListener('click', () => {
      this.qty++;
      document.getElementById('qty').textContent = this.qty;
    });
    document.getElementById('decrease').addEventListener('click', () => {
      if(this.qty > 1) this.qty--;
      document.getElementById('qty').textContent = this.qty;
    });
  }

  // 4. Add to Cart + Compare
  handleCart = () => {
    document.getElementById('addToCart').addEventListener('click', () => {
      const product = {
        name: 'Asgaard sofa',
        price: 250000,
        qty: this.qty,
        size: this.selectedSize,
        color: this.selectedColor,
        sku: document.getElementById('sku').textContent
      };
      
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      
      this.showToast(`✅ Added ${this.qty}x Asgaard Sofa to Cart`);
    });

    document.getElementById('compare').addEventListener('click', () => {
      this.showToast('Added to Compare List');
    });
  }

  // 5. Toast Notification
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

new ProductPage();

// second section


/* =========================================
   PRODUCT TABS
========================================= */

const tabs = document.querySelectorAll(".tab");

const panels = document.querySelectorAll(".tab-panel");


/* =========================================
   ACTIVATE TAB
========================================= */

function activateTab(tab) {

  const targetId = tab.dataset.tab;


  /* -------------------------------
     Update Buttons
  ------------------------------- */

  tabs.forEach((item) => {

    const isActive = item === tab;

    item.classList.toggle(
      "active",
      isActive
    );

    item.setAttribute(
      "aria-selected",
      String(isActive)
    );

  });


  /* -------------------------------
     Update Panels
  ------------------------------- */

  panels.forEach((panel) => {

    const isActive = panel.id === targetId;

    panel.classList.toggle(
      "active",
      isActive
    );

    panel.hidden = !isActive;

  });

}


/* =========================================
   CLICK EVENTS
========================================= */

tabs.forEach((tab) => {

  tab.addEventListener(
    "click",
    () => {
      activateTab(tab);
    }
  );


  /* =====================================
     KEYBOARD NAVIGATION
  ===================================== */

  tab.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowLeft"
      ) {

        event.preventDefault();


        const currentIndex =
          [...tabs].indexOf(tab);


        const direction =
          event.key === "ArrowRight"
            ? 1
            : -1;


        const nextIndex =
          (
            currentIndex +
            direction +
            tabs.length
          ) % tabs.length;


        const nextTab =
          tabs[nextIndex];


        nextTab.focus();

        activateTab(nextTab);

      }

    }
  );

});

// third section


// ES6 Product Data + Logic
class RelatedProducts {
  constructor() {
    this.products = [
      {
        id: 1,
        name: 'Syltherine',
        desc: 'Stylish cafe chair',
        newPrice: 'Rp 2.500.000',
        oldPrice: 'Rp 3.500.000',
        img: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=500',
        badge: { text: '-30%', type: 'discount' }
      },
      {
        id: 2,
        name: 'Leviosa',
        desc: 'Stylish cafe chair',
        newPrice: 'Rp 2.500.000',
        oldPrice: null,
        img: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=500',
        badge: null
      },
      {
        id: 3,
        name: 'Lolito',
        desc: 'Luxury big sofa',
        newPrice: 'Rp 7.000.000',
        oldPrice: 'Rp 14.000.000',
        img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=500',
        badge: { text: '-50%', type: 'discount' }
      },
      {
        id: 4,
        name: 'Respira',
        desc: 'Outdoor bar table and stool',
        newPrice: 'Rp 500.000',
        oldPrice: null,
        img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=500',
        badge: { text: 'New', type: 'new' }
      }
    ];
    this.visibleCount = 4;
    this.init();
  }

  init = () => {
    this.renderProducts();
    document.getElementById('showMore').addEventListener('click', this.showMore);
  }

  // Render Products to DOM
  renderProducts = () => {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    
    this.products.slice(0, this.visibleCount).forEach(product => {
      const card = this.createProductCard(product);
      grid.appendChild(card);
    });
  }

  // Create Single Product Card
  createProductCard = (product) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.img}" alt="${product.name}">
        ${product.badge ? `<span class="badge ${product.badge.type}">${product.badge.text}</span>` : ''}
        
        <div class="overlay">
          <button class="btn-add-cart" data-id="${product.id}">Add to cart</button>
        </div>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <div class="price">
          <span class="new-price">${product.newPrice}</span>
          ${product.oldPrice ? `<span class="old-price">${product.oldPrice}</span>` : ''}
        </div>
      </div>
    `;

    // Add to Cart Event
    card.querySelector('.btn-add-cart').addEventListener('click', (e) => {
      this.addToCart(product);
    });

    return card;
  }

  // Add to Cart Function
  addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);
    
    if(existing){
      existing.qty += 1;
    } else {
      cart.push({...product, qty: 1});
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    this.showToast(`✅ ${product.name} added to cart`);
  }

  // Show More Button
  showMore = () => {
    // Demo ke liye same products dubara add kar rahe
    this.products = [...this.products, ...this.products];
    this.visibleCount += 4;
    this.renderProducts();
    this.showToast('Showing more products...');
    
    if(this.visibleCount >= 12){
      document.getElementById('showMore').style.display = 'none';
    }
  }

  // Toast Notification
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

new RelatedProducts();

// footer

// ES6 Newsletter Validation
class Footer {
  constructor() {
    this.form = document.getElementById('newsletterForm');
    this.emailInput = document.getElementById('emailInput');
    this.init();
  }

  init = () => {
    this.form.addEventListener('submit', this.handleSubscribe);
  }

  // Email Validation
  isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Subscribe Handler
  handleSubscribe = (e) => {
    e.preventDefault();
    const email = this.emailInput.value.trim();

    if(!this.isValidEmail(email)){
      this.showToast('⚠️ Please enter a valid email', 'error');
      return;
    }

    // Save to LocalStorage
    let subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
    if(!subscribers.includes(email)){
      subscribers.push(email);
      localStorage.setItem('subscribers', JSON.stringify(subscribers));
      this.showToast(`✅ Subscribed! Thanks ${email}`, 'success');
      this.emailInput.value = '';
    } else {
      this.showToast('⚠️ You are already subscribed', 'warning');
    }
  }

  // Toast
  showToast = (msg, type = 'success') => {
    const colors = {
      success: '#B88E2F',
      error: '#E97171',
      warning: '#FFA500'
    };

    const toast = document.createElement('div');
    toast.textContent = msg;
    Object.assign(toast.style, {
      position: 'fixed', bottom: '20px', right: '20px',
      background: colors[type], color: 'white', padding: '14px 24px',
      borderRadius: '8px', zIndex: '9999', fontSize: '14px',
      opacity: '0', transition: 'opacity 0.3s'
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.style.opacity = '1', 100);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2500);
  }
}

new Footer();

// dropdown
class SideCart {
  constructor() {
    this.cartDrawer = document.getElementById('cartDrawer');
    this.cartOverlay = document.getElementById('cartOverlay');
    this.cartItemsDiv = document.getElementById('cartItems');
    this.init();
  }

  init = () => {
    // Close Cart Events
    document.getElementById('closeCart').addEventListener('click', this.closeCart);
    this.cartOverlay.addEventListener('click', this.closeCart);

    // Add to Cart button se open karo
    document.getElementById('addToCart').addEventListener('click', () => {
      this.openCart();
      this.renderCart(); // cart update karo
    });
  }

  openCart = () => {
    this.cartDrawer.classList.add('active');
    this.cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // page scroll band
  }

  closeCart = () => {
    this.cartDrawer.classList.remove('active');
    this.cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Cart ko LocalStorage se read karke render karo
  renderCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.cartItemsDiv.innerHTML = '';

    if(cart.length === 0){
      this.cartItemsDiv.innerHTML = '<p style="text-align:center; color:#9F9F9F;">Your cart is empty</p>';
      return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;

      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <img src="https://placehold.co/80x80/E8E1D4/8B7355?text=Sofa" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>${item.qty} X <span class="price">Rs. ${item.price.toLocaleString()}.00</span></p>
        </div>
        <button class="remove-item" data-index="${index}">×</button>
      `;
      this.cartItemsDiv.appendChild(cartItem);
    });

    // Subtotal update
    document.getElementById('cartSubtotal').textContent = `Rs. ${subtotal.toLocaleString()}.00`;

    // Remove button
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.dataset.index;
        this.removeItem(idx);
      });
    });
  }

  removeItem = (index) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.renderCart();
  }
}

// Page load pe cart ready karo
document.addEventListener('DOMContentLoaded', () => {
  new SideCart();
});