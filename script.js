const products = [
  {
    id: 1,
    title: "Vestido Flapper Perlas 1924",
    category: "vestidos",
    price: 185.00,
    description: "Vestido de cóctel estilo Charleston con bordado artesanal de pedrería y flecos en seda negra.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    title: "Abrigo Largo Gatsby Camel",
    category: "vestidos",
    price: 230.00,
    description: "Gabardina clásica de lana peinada con solapa ancha y cinturón ajustable.",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    title: "Vestido Terciopelo Borgoña",
    category: "vestidos",
    price: 195.00,
    description: "Corte elegante midi en terciopelo suave ideal para veladas nocturnas.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    title: "Traje Sastre Tres Piezas 1920",
    category: "sastreria",
    price: 290.00,
    description: "Conjunto clásico de saco, chaleco y pantalón en tweed inglés gris carbón.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    title: "Blazer Estructurado Dorado",
    category: "sastreria",
    price: 175.00,
    description: "Chaqueta entallada con botones metálicos grabados estilo Art Déco.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    title: "Bolso de Mano Cuero Vintage",
    category: "accesorios",
    price: 125.00,
    description: "Cartera rígida de piel genuina con broche dorado envejecido.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentCategory = "all";
let activeProduct = null;

const catalogContainer = document.getElementById("catalogContainer");
const searchInput = document.getElementById("searchInput");
const cartBadge = document.getElementById("cartBadge");

function renderCatalog() {
  const query = searchInput.value.toLowerCase();
  const filtered = products.filter(item => {
    const matchCat = currentCategory === "all" || item.category === currentCategory;
    const matchText = item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
    return matchCat && matchText;
  });

  catalogContainer.innerHTML = filtered.map(item => `
    <div class="col">
      <div class="vintage-card h-100 d-flex flex-column">
        <div class="img-wrapper">
          <img src="${item.image}" class="product-img" alt="${item.title}">
        </div>
        <div class="p-4 flex-grow-1 d-flex flex-column">
          <span class="text-gold small text-uppercase mb-1">${item.category}</span>
          <h5 class="text-cream fw-bold mb-2">${item.title}</h5>
          <p class="small text-cream opacity-75 mb-3">${item.description}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <strong class="text-gold fs-5">$${item.price.toFixed(2)}</strong>
            <button class="btn btn-outline-warning btn-sm" onclick="openProductModal(${item.id})">Ver más</button>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

document.querySelectorAll("#categoryTabs .nav-link").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("#categoryTabs .nav-link.active").classList.remove("active");
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    renderCatalog();
  });
});

searchInput.addEventListener("input", renderCatalog);

window.openProductModal = (id) => {
  activeProduct = products.find(p => p.id === id);
  document.getElementById("modalProductTitle").textContent = activeProduct.title;
  document.getElementById("modalProductImg").src = activeProduct.image;
  document.getElementById("modalProductCategory").textContent = activeProduct.category;
  document.getElementById("modalProductDesc").textContent = activeProduct.description;
  document.getElementById("modalProductPrice").textContent = `$${activeProduct.price.toFixed(2)} USD`;
  document.getElementById("modalProductQty").value = 1;
  new bootstrap.Modal(document.getElementById("productModal")).show();
};

document.getElementById("modalAddToCartBtn").addEventListener("click", () => {
  const qty = parseInt(document.getElementById("modalProductQty").value) || 1;
  const existing = cart.find(item => item.id === activeProduct.id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ ...activeProduct, quantity: qty });
  }
  saveCart();
  bootstrap.Modal.getInstance(document.getElementById("productModal")).hide();
  Swal.fire({ icon: "success", title: "¡Prenda agregada!", timer: 1200, showConfirmButton: false });
});

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const totalCount = cart.reduce((acc, el) => acc + el.quantity, 0);
  cartBadge.textContent = totalCount;
  const container = document.getElementById("cartItemsContainer");

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-center text-cream my-4">Tu bolsa de compras está vacía.</p>`;
    return;
  }

  const total = cart.reduce((acc, el) => acc + (el.price * el.quantity), 0);
  container.innerHTML = cart.map((el, idx) => `
    <div class="d-flex justify-content-between align-items-center border-bottom border-gold py-2">
      <div>
        <strong class="text-gold">${el.title}</strong>
        <div class="small text-cream">Cant: ${el.quantity} x $${el.price.toFixed(2)}</div>
      </div>
      <div class="d-flex align-items-center gap-3">
        <strong class="text-cream">$${(el.price * el.quantity).toFixed(2)}</strong>
        <button class="btn btn-sm btn-outline-danger" onclick="removeCartItem(${idx})"><i class="fas fa-times"></i></button>
      </div>
    </div>
  `).join("") + `<div class="text-end mt-3 fs-5 text-gold fw-bold">Total: $${total.toFixed(2)} USD</div>`;
}

window.removeCartItem = (idx) => {
  cart.splice(idx, 1);
  saveCart();
};

document.getElementById("clearCartBtn").addEventListener("click", () => {
  cart = [];
  saveCart();
});

document.getElementById("proceedCheckoutBtn").addEventListener("click", () => {
  if (cart.length === 0) return Swal.fire("Bolsa vacía", "Agrega al menos una prenda.", "warning");
  bootstrap.Modal.getInstance(document.getElementById("cartModal")).hide();
  new bootstrap.Modal(document.getElementById("checkoutModal")).show();
});

document.getElementById("confirmPaymentBtn").addEventListener("click", () => {
  const modalEl = document.getElementById("checkoutModal");
  bootstrap.Modal.getInstance(modalEl).hide();
  document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());
  document.body.classList.remove("modal-open");
  document.body.style.removeProperty("overflow");

  const clientName = document.getElementById("clientName").value;
  const total = cart.reduce((acc, el) => acc + (el.price * el.quantity), 0);
  const now = new Date().toLocaleString();

  const ticketHTML = `
    <div style="font-family: monospace; font-size: 11px; width: 260px; padding: 10px; color: #000; background: #fff;">
      <div style="text-align: center; font-weight: bold; font-size: 13px;">ATELIER GENESIS 1920S</div>
      <div style="text-align: center; font-size: 10px;">Boutique Art Déco</div>
      <div style="text-align: center; font-size: 9px; margin-bottom: 8px;">${now}</div>
      <div style="border-top: 1px dashed #000; margin: 4px 0;"></div>
      <div>Cliente: ${clientName}</div>
      <div style="border-top: 1px dashed #000; margin: 4px 0;"></div>
      ${cart.map(item => `
        <div style="margin-bottom: 4px;">
          <div>${item.title}</div>
          <div style="display: flex; justify-content: space-between;">
            <span>${item.quantity} x $${item.price.toFixed(2)}</span>
            <span><strong>$${(item.quantity * item.price).toFixed(2)}</strong></span>
          </div>
        </div>
      `).join("")}
      <div style="border-top: 1px dashed #000; margin: 4px 0;"></div>
      <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: bold;">
        <span>TOTAL:</span>
        <span>$${total.toFixed(2)} USD</span>
      </div>
      <div style="border-top: 1px dashed #000; margin: 6px 0;"></div>
      <div style="text-align: center; font-size: 9px;">¡Gracias por su compra!</div>
      <div style="text-align: center; font-size: 8px; margin-top: 4px;">Diseñado por GENESIS CABA</div>
    </div>
  `;

  html2pdf().set({
    margin: 2,
    filename: 'ticket_atelier_genesis.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: [80, 150], orientation: 'portrait' }
  }).from(ticketHTML).save().then(() => {
    cart = [];
    saveCart();
    Swal.fire("¡Compra Exitosa!", "Se descargó tu ticket térmico en PDF.", "success");
  });
});

renderCatalog();
updateCartUI();