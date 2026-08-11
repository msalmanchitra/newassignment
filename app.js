const toggle = document.getElementById('toggle');
const menu = document.getElementById('menu');
const cartCount = document.getElementById('cart-count');
const cartCountPage = document.getElementById('cart-count-page');
const wishlistCount = document.getElementById('wishlist-count');
const wishlistCountPage = document.getElementById('wishlist-count-page');
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartShipping = document.getElementById('cart-shipping');
const cartTotal = document.getElementById('cart-total');
const wishlistItemsContainer = document.getElementById('wishlist-items');
const wishlistSummary = document.getElementById('wishlist-summary');
const checkoutButton = document.querySelector('.checkout-btn');

const STORAGE_KEY = 'furniroCart';
const WISHLIST_KEY = 'furniroWishlist';
const DEFAULT_SHIPPING = 10;

const sampleProduct = {
  id: 'furniro-sofa-01',
  name: 'Premium Sofa Set',
  price: 299.99,
  image: 'https://api.iconify.design/mdi:sofa.svg',
};

function loadData(key) {
  const saved = localStorage.getItem(key);
  if (!saved) return [];
  try {
    return JSON.parse(saved) || [];
  } catch (error) {
    console.error(`Failed to parse ${key}:`, error);
    return [];
  }
}

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadCart() {
  return loadData(STORAGE_KEY);
}

function saveCart(cart) {
  saveData(STORAGE_KEY, cart);
}

function loadWishlist() {
  return loadData(WISHLIST_KEY);
}

function saveWishlist(items) {
  saveData(WISHLIST_KEY, items);
}

function getCartTotalItems(cart) {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function updateCartBadge() {
  const cart = loadCart();
  const total = getCartTotalItems(cart);
  if (cartCount) cartCount.textContent = total;
  if (cartCountPage) cartCountPage.textContent = total;
}

function updateWishlistBadge() {
  const wishlist = loadWishlist();
  const total = wishlist.length;
  if (wishlistCount) wishlistCount.textContent = total;
  if (wishlistCountPage) wishlistCountPage.textContent = total;
}

function addToCart(product) {
  const cart = loadCart();
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  updateCartBadge();
}

function addToWishlist(product) {
  const wishlist = loadWishlist();
  const existing = wishlist.find((item) => item.id === product.id);
  if (existing) return;
  wishlist.push({ ...product });
  saveWishlist(wishlist);
  updateWishlistBadge();
}

function removeFromCart(productId) {
  const cart = loadCart().filter((item) => item.id !== productId);
  saveCart(cart);
  updateCartBadge();
  renderCartPage();
}

function removeFromWishlist(productId) {
  const wishlist = loadWishlist().filter((item) => item.id !== productId);
  saveWishlist(wishlist);
  updateWishlistBadge();
  renderWishlistPage();
}

function updateQuantity(productId, quantity) {
  const cart = loadCart();
  const item = cart.find((row) => row.id === productId);
  if (!item) return;
  item.quantity = Math.max(1, quantity);
  saveCart(cart);
  updateCartBadge();
  renderCartPage();
}

function renderCartPage() {
  if (!cartItemsContainer || !cartSubtotal || !cartShipping || !cartTotal) return;

  const cart = loadCart();
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<tr class="empty-row"><td colspan="5">Your cart is empty. Add items from the shop.</td></tr>';
    cartSubtotal.textContent = formatPrice(0);
    cartShipping.textContent = formatPrice(DEFAULT_SHIPPING);
    cartTotal.textContent = formatPrice(DEFAULT_SHIPPING);
    return;
  }

  let subtotal = 0;

  cart.forEach((item) => {
    const totalPrice = item.price * item.quantity;
    subtotal += totalPrice;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div style="display:flex;align-items:center;gap:12px;">
          <img src="${item.image}" alt="${item.name}" style="width:40px;height:40px;object-fit:contain;" />
          <span>${item.name}</span>
        </div>
      </td>
      <td>
        <input data-id="${item.id}" class="quantity-input" type="number" min="1" value="${item.quantity}" style="width:60px;padding:8px;border:1px solid #ddd;border-radius:8px;" />
      </td>
      <td>${formatPrice(item.price)}</td>
      <td>${formatPrice(totalPrice)}</td>
      <td><button class="remove-button" data-id="${item.id}">Remove</button></td>
    `;
    cartItemsContainer.appendChild(row);
  });

  cartSubtotal.textContent = formatPrice(subtotal);
  cartShipping.textContent = formatPrice(DEFAULT_SHIPPING);
  cartTotal.textContent = formatPrice(subtotal + DEFAULT_SHIPPING);
}

function renderWishlistPage() {
  if (!wishlistItemsContainer) return;

  const wishlist = loadWishlist();
  wishlistItemsContainer.innerHTML = '';

  if (wishlist.length === 0) {
    wishlistItemsContainer.innerHTML = '<tr class="empty-row"><td colspan="3">Your wishlist is empty. Save products while browsing.</td></tr>';
    if (wishlistSummary) wishlistSummary.textContent = 'Save your favorite furniture and move items to cart when ready.';
    return;
  }

  wishlist.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div style="display:flex;align-items:center;gap:12px;">
          <img src="${item.image}" alt="${item.name}" style="width:40px;height:40px;object-fit:contain;" />
          <span>${item.name}</span>
        </div>
      </td>
      <td>${formatPrice(item.price)}</td>
      <td style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="move-to-cart-button" data-id="${item.id}">Add to Cart</button>
        <button class="remove-wishlist-button" data-id="${item.id}">Remove</button>
      </td>
    `;
    wishlistItemsContainer.appendChild(row);
  });
}

function bindCartEvents() {
  if (!cartItemsContainer) return;

  cartItemsContainer.addEventListener('change', (event) => {
    const target = event.target;
    if (target.matches('.quantity-input')) {
      const productId = target.dataset.id;
      const quantity = parseInt(target.value, 10);
      if (productId && !Number.isNaN(quantity)) {
        updateQuantity(productId, quantity);
      }
    }
  });

  cartItemsContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (target.matches('.remove-button')) {
      const productId = target.dataset.id;
      removeFromCart(productId);
    }
  });
}

function bindWishlistEvents() {
  if (!wishlistItemsContainer) return;

  wishlistItemsContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (target.matches('.move-to-cart-button')) {
      const productId = target.dataset.id;
      const wishlist = loadWishlist();
      const product = wishlist.find((item) => item.id === productId);
      if (product) {
        addToCart(product);
        removeFromWishlist(productId);
      }
    }

    if (target.matches('.remove-wishlist-button')) {
      const productId = target.dataset.id;
      removeFromWishlist(productId);
    }
  });
}

function handleCheckout() {
  if (!checkoutButton) return;
  checkoutButton.addEventListener('click', () => {
    alert('Thank you! Your order has been placed.');
    localStorage.removeItem(STORAGE_KEY);
    updateCartBadge();
    renderCartPage();
  });
}

function initAuthPage() {
  const authTabs = document.querySelectorAll('.auth-tab');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  if (authTabs.length === 0) return;

  authTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      authTabs.forEach((button) => button.classList.toggle('active', button === tab));
      document.querySelectorAll('.auth-form').forEach((form) => {
        form.classList.toggle('active', form.id === `${target}-form`);
      });
    });
  });

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value.trim();
      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }
      alert('Login successful. Welcome back!');
      loginForm.reset();
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value.trim();
      const confirm = document.getElementById('signup-confirm').value.trim();
      if (!name || !email || !password || !confirm) {
        alert('Please complete all fields.');
        return;
      }
      if (password !== confirm) {
        alert('Passwords do not match.');
        return;
      }
      alert('Signup successful! You can now log in.');
      signupForm.reset();
    });
  }
}

if (toggle && menu) {
  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = menu.classList.toggle('show');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('.icon-wrap').forEach((wrap) => {
  const button = wrap.querySelector('.icon-btn');
  if (!button) return;

  button.addEventListener('click', (event) => {
    event.stopPropagation();
    document.querySelectorAll('.icon-wrap.open').forEach((openWrap) => {
      if (openWrap !== wrap) {
        openWrap.classList.remove('open');
      }
    });
    wrap.classList.toggle('open');
  });
});

const searchForm = document.querySelector('.search-form');
if (searchForm) {
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = searchForm.querySelector('input');
    if (input) {
      alert(`Search for: ${input.value}`);
    }
  });
}

document.addEventListener('click', () => {
  document.querySelectorAll('.icon-wrap.open').forEach((wrap) => wrap.classList.remove('open'));
  if (menu) {
    menu.classList.remove('show');
  }
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
  }
});

if (menu) {
  menu.addEventListener('click', (event) => event.stopPropagation());
}

const buyNowButton = document.querySelector('.btn-buy-now');
const saveWishlistButton = document.querySelector('.btn-wishlist');

if (buyNowButton) {
  buyNowButton.addEventListener('click', () => {
    addToCart(sampleProduct);
    window.location.href = 'cart.html';
  });
}

if (saveWishlistButton) {
  saveWishlistButton.addEventListener('click', () => {
    addToWishlist(sampleProduct);
    alert('Product saved to your wishlist.');
  });
}

updateCartBadge();
updateWishlistBadge();
bindCartEvents();
bindWishlistEvents();
renderCartPage();
renderWishlistPage();
handleCheckout();
initAuthPage();


//card section

// ===============================
// Browse The Range - JavaScript
// ===============================

const rangeCards = document.querySelectorAll(".range-card");

rangeCards.forEach((card) => {

    card.addEventListener("click", () => {

        const category = card.dataset.category;

        console.log(`${category} selected`);

        // Temporary click effect
        card.classList.add("clicked");

        setTimeout(() => {
            card.classList.remove("clicked");
        }, 250);

    });

});