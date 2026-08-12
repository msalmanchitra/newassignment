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

/* =========================================
   RELATED PRODUCTS
   SHOW MORE FUNCTIONALITY
========================================= */


const showMoreButton =
    document.getElementById("showMoreBtn");


const hiddenProducts =
    document.querySelectorAll(".hidden-product");


let productsVisible = false;


/* =========================================
   SHOW MORE
========================================= */

showMoreButton.addEventListener("click", function () {

    if (!productsVisible) {

        hiddenProducts.forEach(function (product, index) {

            setTimeout(function () {

                product.classList.add("show");

            }, index * 100);

        });


        showMoreButton.textContent =
            "Show Less";


        productsVisible = true;


        /* Smooth scroll slightly down */

        setTimeout(function () {

            const lastProduct =
                hiddenProducts[hiddenProducts.length - 1];

            lastProduct.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        }, 300);

    }

    else {

        hiddenProducts.forEach(function (product) {

            product.classList.remove("show");

        });


        showMoreButton.textContent =
            "Show More";


        productsVisible = false;


        /* Scroll back to products heading */

        document
            .querySelector(".section-title")
            .scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

    }

});