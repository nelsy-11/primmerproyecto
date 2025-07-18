console.log("Hola, mi script.js está conectado ✅");

// 1. Creamos carrito vacío o lo traemos de localStorage si ya existe
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

// 2. Función para agregar productos al carrito
function addToCart(productName, price) {
  const existingProduct = cart.find(p => p.name === productName);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ name: productName, price: price, quantity: 1 });
  }

  saveCart();
  updateCartCount();
  showNotification(`${productName} agregado al carrito`);
}

// 3. Guardamos el carrito en localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// 4. Actualizamos el contador del carrito
function updateCartCount() {
  const count = cart.reduce((sum, p) => sum + p.quantity, 0);
  document.getElementById('cartCount').textContent = count;
}

// 5. Mostrar carrito en modal
function toggleCart() {
  const modal = document.getElementById('cartModal');
  const cartItemsList = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  // Limpiar contenido previo
  cartItemsList.innerHTML = '';

  if (cart.length === 0) {
    cartItemsList.innerHTML = '<li>Tu carrito está vacío</li>';
    cartTotal.textContent = '';
  } else {
    let total = 0;

    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
      cartItemsList.appendChild(li);
      total += item.price * item.quantity;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Mostrar modal
  modal.style.display = 'block';
}

// 6. Mostrar notificación de producto agregado
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    padding: 1rem 2rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 1000;
    font-weight: bold;
    animation: slideIn 0.3s ease;
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// 7. Validar el formulario de contacto antes de enviar
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', function (event) {
    const email = form.querySelector('input[name="email"]').value;
    const message = form.querySelector('textarea[name="message"]').value;

    if (!email.includes('@')) {
      alert('Por favor, ingresa un correo válido.');
      event.preventDefault();
    }

    if (message.trim() === '') {
      alert('Por favor, escribe un mensaje.');
      event.preventDefault();
    }
  });

  // Cerrar modal carrito
  const modal = document.getElementById('cartModal');
  const span = document.getElementsByClassName('close')[0];

  span.onclick = function() {
    modal.style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }

  // ✅ NUEVO: agregar event listener al icono del carrito
  const cartIcon = document.getElementById('cartIcon');
  cartIcon.addEventListener('click', toggleCart);
});

// 8. Fetch API para traer productos desde una API y mostrarlos
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => renderProducts(data));

function renderProducts(products) {
  const container = document.querySelector('.imagen-container');

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" class="imagen">
      <div class="product-info">
        <div class="product-name">${p.title}</div>
        <div class="product-price">$${p.price.toFixed(2)}</div>
        <button class="add-to-cart" onclick="addToCart('${p.title}', ${p.price})">Agregar al Carrito</button>
      </div>
    `;

    container.appendChild(card);
  });
}



