// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Simple search functionality (front-end only)
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.toLowerCase();
            if (query) {
                alert(`Searching for: ${query}\n\nNote: This is a demo search. In a real application, this would connect to a backend or filter products.`);
            } else {
                alert('Please enter a search term.');
            }
        });

        // Allow search on Enter key press
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }

    // Smooth scrolling for anchor links (if any)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Shopping cart functionality
    let cart = [];
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ₹${item.price}`;
            cartItems.appendChild(li);
            total += item.price;
        });
        cartTotal.textContent = total;
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            cart.push({ name, price });
            updateCart();
            alert(`${name} added to cart!`);
        });
    });

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            // Create order form modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
            `;

            const form = document.createElement('div');
            form.style.cssText = `
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            `;

            form.innerHTML = `
                <h2 style="color: #4CAF50; margin-bottom: 20px;">Complete Your Order</h2>
                <form id="orderForm">
                    <div style="margin-bottom: 15px;">
                        <label for="customerName" style="display: block; margin-bottom: 5px; font-weight: bold;">Full Name:</label>
                        <input type="text" id="customerName" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="customerPhone" style="display: block; margin-bottom: 5px; font-weight: bold;">Phone Number:</label>
                        <input type="tel" id="customerPhone" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="customerEmail" style="display: block; margin-bottom: 5px; font-weight: bold;">Email (Optional):</label>
                        <input type="email" id="customerEmail" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label for="customerAddress" style="display: block; margin-bottom: 5px; font-weight: bold;">Address:</label>
                        <textarea id="customerAddress" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; resize: vertical; min-height: 80px;"></textarea>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button type="submit" style="flex: 1; padding: 12px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Place Order</button>
                        <button type="button" id="cancelOrder" style="flex: 1; padding: 12px; background-color: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer;">Cancel</button>
                    </div>
                </form>
            `;

            modal.appendChild(form);
            document.body.appendChild(modal);

            // Handle form submission
            document.getElementById('orderForm').addEventListener('submit', function(e) {
                e.preventDefault();

                const name = document.getElementById('customerName').value;
                const phone = document.getElementById('customerPhone').value;
                const email = document.getElementById('customerEmail').value;
                const address = document.getElementById('customerAddress').value;

                const orderDetails = cart.map(item => `${item.name} - ₹${item.price}`).join('\n');
                const total = cart.reduce((sum, item) => sum + item.price, 0);
                const message = `New Order:\n\n${orderDetails}\n\nTotal: ₹${total}\n\nCustomer Details:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nAddress: ${address}`;

                // Send via WhatsApp
                const whatsappUrl = `https://wa.me/9288129460?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');

                // Also send via email (fallback)
                const emailSubject = 'New Order from Anand Superstore';
                const emailBody = message;
                const emailUrl = `mailto:info@anandsuperstore.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                window.open(emailUrl);

                alert('Order placed successfully! You will be redirected to WhatsApp and email to confirm your order.');
                document.body.removeChild(modal);
                cart = [];
                updateCart();
            });

            // Handle cancel
            document.getElementById('cancelOrder').addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    }

    // Share link functionality
    const shareBtn = document.createElement('button');
    shareBtn.textContent = 'Share Website';
    shareBtn.className = 'btn';
    shareBtn.style.position = 'fixed';
    shareBtn.style.top = '20px';
    shareBtn.style.right = '20px';
    shareBtn.style.zIndex = '1001';

    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'Anand Superstore',
                text: 'Check out Anand Superstore for all your daily essentials!',
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                alert('Website link copied to clipboard!');
            });
        }
    });

    document.body.appendChild(shareBtn);
});
