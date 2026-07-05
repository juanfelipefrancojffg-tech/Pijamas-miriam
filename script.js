const contenedor = document.querySelector(".contenedor-productos");
const botones = document.querySelectorAll(".filtros button");

// Mostrar productos
function mostrarProductos(lista) {
    contenedor.innerHTML = "";

    lista.forEach(producto => {

        contenedor.innerHTML += `
        <div class="card">

            <img class="foto-producto"
                 src="${producto.imagen}"
                 alt="${producto.nombre}">

            <div class="info">

                <h3>${producto.nombre}</h3>

                <p>${producto.categoria}</p>

                <p><strong>Tallas:</strong> ${producto.tallas}</p>

                <button
                    class="btn-detalles"
                    data-id="${producto.id}">
                    Ver detalles
                </button>

            </div>

        </div>
        `;

    });
}

// Mostrar todos al iniciar
mostrarProductos(productos);

// =====================
// FILTROS
// =====================

botones.forEach(boton => {

    boton.addEventListener("click", () => {

        botones.forEach(btn => btn.classList.remove("activo"));

        boton.classList.add("activo");

        const categoria = boton.dataset.categoria;

        if (categoria === "Todos") {

            mostrarProductos(productos);

        } else {

            const filtrados = productos.filter(producto => producto.categoria === categoria);

            mostrarProductos(filtrados);

        }

    });

});

// =====================
// LIGHTBOX
// =====================

const lightbox = document.getElementById("lightbox");
const imagenGrande = document.getElementById("imagen-grande");
const cerrar = document.querySelector(".cerrar");

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("foto-producto")) {

        imagenGrande.src = e.target.src;

        lightbox.classList.add("activo");

    }

});

if (cerrar) {
    cerrar.addEventListener("click", () => {
        lightbox.classList.remove("activo");
    });
}

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.classList.remove("activo");

    }

});

// =====================
// MODAL
// =====================

const modal = document.getElementById("modal");
const cerrarModal = document.querySelector(".cerrar-modal");

document.addEventListener("click", (e) => {

    if (!e.target.classList.contains("btn-detalles")) return;

    const id = Number(e.target.dataset.id);

    const producto = productos.find(p => p.id === id);

    if (!producto) return;

    document.getElementById("modal-img").src = producto.imagen;
    document.getElementById("modal-nombre").textContent = producto.nombre;
    document.getElementById("modal-categoria").textContent = "Categoría: " + producto.categoria;
    document.getElementById("modal-tallas").textContent = "Tallas: " + producto.tallas;
    document.getElementById("modal-tela").textContent = "Tela: " + producto.tela;
    document.getElementById("modal-descripcion").textContent = producto.descripcion;

    document.getElementById("modal-whatsapp").href =
        `https://wa.me/573103929708?text=Hola, me interesa la ${producto.nombre}`;

    modal.classList.add("activo");

});

cerrarModal.addEventListener("click", () => {

    modal.classList.remove("activo");

});

modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.classList.remove("activo");

    }

});

// =====================
// ESC
// =====================

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        modal.classList.remove("activo");

        lightbox.classList.remove("activo");

    }

});
// =====================
// MENÚ HAMBURGUESA
// =====================

const hamburguesa = document.querySelector(".hamburguesa");
const menu = document.querySelector(".menu");

hamburguesa.addEventListener("click", () => {
    menu.classList.toggle("activo");
});