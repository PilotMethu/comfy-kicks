
// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartTotal = 0;

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems.toString();
}

function updateCartTotal() {
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartTotalElement = document.querySelector('.cart-total');
    if (cartTotalElement) {
        cartTotalElement.textContent = `Total: $${cartTotal.toFixed(2)}`;
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartTotal();
}

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price: parseFloat(price),
            quantity: 1
        });
    }
    
    saveCart();
    showCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
            renderCart();
        }
    }
}

function renderCart() {
    const cartContent = document.querySelector('.cart-items');
    if (!cartContent) return;

    cartContent.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart('${item.id}')">×</button>
        `;
        cartContent.appendChild(cartItem);
    });
    
    updateCartTotal();
}

function showCart() {
    const cartPopup = document.querySelector('.cart-popup');
    const cartOverlay = document.querySelector('.cart-overlay');
    if (cartPopup && cartOverlay) {
        cartPopup.classList.add('active');
        cartOverlay.classList.add('active');
        renderCart();
    }
}

function hideCart() {
    const cartPopup = document.querySelector('.cart-popup');
    const cartOverlay = document.querySelector('.cart-overlay');
    if (cartPopup && cartOverlay) {
        cartPopup.classList.remove('active');
        cartOverlay.classList.remove('active');
    }
}

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add cart popup HTML to the body
    const cartHTML = `
        <div class="cart-overlay"></div>
        <div class="cart-popup">
            <div class="cart-header">
                <h3>Shopping Cart</h3>
                <button class="cart-close" onclick="hideCart()">×</button>
            </div>
            <div class="cart-items"></div>
            <div class="cart-total">Total: $0.00</div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', cartHTML);

    // Setup event listeners
    const cartBtn = document.getElementById('cartBtn');
    const cartOverlay = document.querySelector('.cart-overlay');
    
    if (cartBtn) {
        cartBtn.addEventListener('click', showCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', hideCart);
    }

    // Setup add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const { id, name, price } = e.target.dataset;
            addToCart(id, name, price);
        });
    });

    // Initialize cart count
    updateCartCount();
});
