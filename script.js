const cartBtn = document.getElementById('cartBtn');
const cartPopup = document.querySelector('.cart-popup');
const cartOverlay = document.querySelector('.cart-overlay');
const authLink = document.getElementById('authLink');
const profileLink = document.getElementById('profileLink');

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
}

function showCartPopup() {
    updateCartItems();
    cartPopup.classList.add('active');
    cartOverlay.classList.add('active');
}

function closeCartPopup() {
    cartPopup.classList.remove('active');
    cartOverlay.classList.remove('active');
}

function checkAuthentication() {
    const token = localStorage.getItem('token');
    if (token) {
        authLink.style.display = 'none';
        profileLink.style.display = 'inline';
    } else {
        authLink.style.display = 'inline';
        profileLink.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    checkAuthentication();

    cartBtn.addEventListener('click', showCartPopup);
    cartOverlay.addEventListener('click', closeCartPopup);

    // Close cart popup when close button is clicked
    cartPopup.addEventListener('click', function(event) {
        if (event.target.classList.contains('cart-close')) {
            closeCartPopup();
        }
    });

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productData = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: parseFloat(this.dataset.price)
            };
            addToCart(productData);
            showCartPopup();
        });
    });
});

// Product Details Window functionality
function openProductDetails(product) {
    const detailsWindow = document.createElement('div');
    detailsWindow.className = 'product-details-window active';
    
    const shoeSizes = Array.from({ length: 13 }, (_, i) => i + 6); // Sizes 6-18
    
    detailsWindow.innerHTML = `
        <button class="product-details-close">&times;</button>
        <div class="product-details-content">
            <img src="${product.querySelector('img').src}" alt="Product" class="product-details-image">
            <div class="product-details-info">
                <h3>${product.querySelector('h3').textContent}</h3>
                <div class="product-details-price">${product.querySelector('p').textContent}</div>
                <div class="size-selector">
                    <label for="shoe-size">Select Size:</label>
                    <select id="shoe-size">
                        ${shoeSizes.map(size => `<option value="${size}">US ${size}</option>`).join('')}
                    </select>
                </div>
                <button class="btn-primary add-to-cart" 
                    data-id="${product.querySelector('.add-to-cart').dataset.id}"
                    data-name="${product.querySelector('.add-to-cart').dataset.name}"
                    data-price="${product.querySelector('.add-to-cart').dataset.price}">
                    Add to Cart
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(detailsWindow);
    
    // Close button functionality
    detailsWindow.querySelector('.product-details-close').addEventListener('click', () => {
        detailsWindow.remove();
    });
    
    // Add to cart functionality within the details window
    detailsWindow.querySelector('.add-to-cart').addEventListener('click', function() {
        const selectedSize = detailsWindow.querySelector('#shoe-size').value;
        const productData = {
            id: this.dataset.id,
            name: this.dataset.name,
            price: parseFloat(this.dataset.price),
            size: selectedSize
        };
        
        addToCart(productData);
        detailsWindow.remove();
        showCartPopup();
    });

    // Close on overlay click
    detailsWindow.addEventListener('click', (e) => {
        if (e.target === detailsWindow) {
            detailsWindow.remove();
        }
    });
}

// Add click event listeners to all product cards
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent opening details when clicking the add to cart button directly
            if (!e.target.classList.contains('add-to-cart')) {
                e.preventDefault();
                openProductDetails(card);
            }
        });
    });

    updateCartCount();
    checkAuthentication();

    cartBtn.addEventListener('click', showCartPopup);
    cartOverlay.addEventListener('click', closeCartPopup);

    // Close cart popup when close button is clicked
    cartPopup.addEventListener('click', function(event) {
        if (event.target.classList.contains('cart-close')) {
            closeCartPopup();
        }
    });

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productData = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: parseFloat(this.dataset.price)
            };
            addToCart(productData);
            showCartPopup();
        });
    });
});

// Update addToCart function to handle size
function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id && item.size === product.size);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            size: product.size,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update the cart item display to show size
function updateCartItems() {
    const cartItemsContainer = document.querySelector('.cart-popup');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let cartHTML = `
        <div class="cart-header">
            <h3>Shopping Cart</h3>
            <button class="cart-close">&times;</button>
        </div>
    `;
    
    cart.forEach(item => {
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div>Size: US ${item.size}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.size}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.size}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.id}', ${item.size})">×</button>
            </div>
        `;
    });
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartHTML += `
        <div class="cart-total">
            Total: $${total.toFixed(2)}
        </div>
    `;
    
    cartItemsContainer.innerHTML = cartHTML;
}

// Update quantity management to handle sizes
function updateQuantity(productId, size, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId && item.size === size);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId, size);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartItems();
            updateCartCount();
        }
    }
}

// Update remove from cart to handle sizes
function removeFromCart(productId, size) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => !(item.id === productId && item.size === size));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartItems();
    updateCartCount();
}
