// =========================================
        // 🛒 CARRITO DE COMPRAS
        // =========================================
        let cart = [];
        let cartCount = 0;
        let cartTotal = 0;

        // Función para agregar productos al carrito
        function addToCart(productName, price) {
            // Verificar si el producto ya existe en el carrito
            const existingProductIndex = cart.findIndex(item => item.name === productName);
            
            if (existingProductIndex > -1) {
                // Si existe, incrementar cantidad
                cart[existingProductIndex].quantity += 1;
                cart[existingProductIndex].total = cart[existingProductIndex].quantity * cart[existingProductIndex].price;
            } else {
                // Si no existe, agregar nuevo producto
                cart.push({
                    name: productName,
                    price: price,
                    quantity: 1,
                    total: price
                });
            }
            
            updateCartDisplay();
            showNotification(`${productName} agregado al carrito!`);
        }

        // Función para actualizar la visualización del carrito
        function updateCartDisplay() {
            cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            cartTotal = cart.reduce((total, item) => total + item.total, 0);
            
            document.getElementById('cartCount').textContent = cartCount;
            document.getElementById('cartTotal').textContent = `Total: ${cartTotal.toFixed(2)}`;
            
            // Actualizar items del carrito
            const cartItemsContainer = document.getElementById('cartItems');
            cartItemsContainer.innerHTML = '';
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="text-align: center; color: #666; margin: 2rem 0;">Tu carrito está vacío</p>';
                return;
            }
            
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price.toFixed(2)} c/u</div>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                        <span style="font-weight: bold; margin: 0 1rem;">${item.quantity}</span>
                        <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${index})">Eliminar</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }

        // Función para incrementar cantidad
        function increaseQuantity(index) {
            cart[index].quantity += 1;
            cart[index].total = cart[index].quantity * cart[index].price;
            updateCartDisplay();
        }

        // Función para decrementar cantidad
        function decreaseQuantity(index) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
                cart[index].total = cart[index].quantity * cart[index].price;
                updateCartDisplay();
            }
        }

        // Función para eliminar producto del carrito
        function removeFromCart(index) {
            const productName = cart[index].name;
            cart.splice(index, 1);
            updateCartDisplay();
            showNotification(`${productName} eliminado del carrito`);
        }

        // Función para mostrar/ocultar el carrito
        function toggleCart() {
            const modal = document.getElementById('cartModal');
            modal.classList.toggle('show');
        }

        // Función para finalizar compra
        function checkout() {
            if (cart.length === 0) {
                showNotification('Tu carrito está vacío');
                return;
            }
            
            showNotification('¡Gracias por tu compra! Procesando pedido...');
            
            // Simular procesamiento
            setTimeout(() => {
                cart = [];
                updateCartDisplay();
                toggleCart();
                showNotification('¡Compra realizada con éxito!');
            }, 2000);
        }

        // Función para mostrar notificaciones
        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Cerrar modal al hacer clic fuera
        window.onclick = function(event) {
            const modal = document.getElementById('cartModal');
            if (event.target === modal) {
                modal.classList.remove('show');
            }
        }

        // =========================================
        // 🎨 ANIMACIONES DE SCROLL
        // =========================================
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, observerOptions);

        // Observar elementos con animación
        document.addEventListener('DOMContentLoaded', () => {
            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach(el => observer.observe(el));
        });

        // =========================================
        // 🚀 FUNCIONES ADICIONALES
        // =========================================
        
        // Smooth scroll para navegación
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Inicializar carrito al cargar la página
        document.addEventListener('DOMContentLoaded', () => {
            updateCartDisplay();
        });

        console.log("🌊 Summer Collection E-commerce cargado correctamente! 🌊");
    