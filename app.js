  const products = [
            { id: 1, name: "Eyelash Serum", price: "2000f", image: "public/serum.jpeg" },
            { id: 2, name: "Nue Pied", price: "1500f", image: "public/Nue_pied.jpeg" },
            { id: 3, name: "jean Baggy", price: "7000f", image: "public/ad6631e2-130d-4fca-a816-a22b623d7fa9.jpeg" },
            { id: 4, name: "Mascara", price: "1500f", image: "https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" },
            { id: 5, name: "Blush Powder", price: "1500f", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" },
            { id: 6, name: "Brush Set", price: "2000f", image: "https://images.unsplash.com/photo-1515688594390-b649af70d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" },
        ];

        let cart = [];

        function renderProducts() {
            const productGrid = document.getElementById('productGrid');
            productGrid.innerHTML = products.map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-price">$${product.price}</p>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `).join('');

            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', addToCart);
            });
        }

        function addToCart(event) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);

            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            updateCartButton();
            event.target.classList.add('added');
            event.target.textContent = 'Added!';
            setTimeout(() => {
                event.target.classList.remove('added');
                event.target.textContent = 'Add to Cart';
            }, 1000);
        }

        function updateCartButton() {
            const cartButton = document.getElementById('cartButton');
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartButton.textContent = `???? Cart (${totalItems})`;
        }

        function renderCart() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');

            if (cart.length === 0) {
                cartItems.innerHTML = '<p>Your cart is empty</p>';
                cartTotal.textContent = 'Total: $0.00';
                return;
            }

            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <div>
                        <p>$${(item.price * item.quantity).toFixed(2)}</p>
                        <button class="remove-item" data-id="${item.id}">❌</button>
                    </div>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            cartTotal.textContent = `Total: $${total.toFixed(2)}`;

            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', removeFromCart);
            });
        }

        function removeFromCart(event) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== productId);
            updateCartButton();
            renderCart();
        }

        function sendOrderToWhatsApp() {
            const phoneNumber = "221776561164"; // Country code followed by phone number without spaces or symbols
            let message = "New order:\n\n";
            cart.forEach(item => {
                message += `${item.name} - Quantity: ${item.quantity} - Price: $${(item.price * item.quantity).toFixed(2)}\n`;
            });
            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            message += `\nTotal: $${total.toFixed(2)}`;
            const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
            window.open(whatsappUrl, '_blank');
        }

        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();

            const cartButton = document.getElementById('cartButton');
            const cartModal = document.getElementById('cartModal');
            const closeCartButton = document.getElementById('closeCartButton');
            const orderButton = document.getElementById('orderButton');
            const ctaButton = document.getElementById('ctaButton');

            cartButton.addEventListener('click', () => {
                cartModal.style.display = 'flex';
                renderCart();
            });

            closeCartButton.addEventListener('click', () => {
                cartModal.style.display = 'none';
            });

            orderButton.addEventListener('click', sendOrderToWhatsApp);

            ctaButton.addEventListener('click', () => {
                document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
            });

            window.addEventListener('click', (event) => {
                if (event.target === cartModal) {
                    cartModal.style.display = 'none';
                }
            });
        });
        