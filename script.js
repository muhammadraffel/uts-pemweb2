const container =
    document.getElementById("productContainer");

const loading =
    document.getElementById("loading");

const errorDiv =
    document.getElementById("error");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const modal =
    document.getElementById("modal");

const modalBody =
    document.getElementById("modalBody");

const closeModal =
    document.getElementById("closeModal");

const darkBtn =
    document.getElementById("darkBtn");

const cartCount =
    document.getElementById("cart-count");

const heroButton =
    document.querySelector(".hero-content button");

/* ========================= */
/* CART */
/* ========================= */

const cartBtn =
    document.getElementById("cartBtn");

const cartModal =
    document.getElementById("cartModal");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const totalPrice =
    document.getElementById("totalPrice");

const checkoutBtn =
    document.getElementById("checkoutBtn");

let allProducts = [];

let cart = 0;

let cartData = [];


/* ========================= */
/* FETCH API */
/* ========================= */

async function getProducts(){

    try{

        loading.style.display = "block";

        const response = await fetch(
            "https://fakestoreapi.com/products"
        );

        if(!response.ok){

            throw new Error(
                "Gagal mengambil data produk API"
            );

        }

        const data = await response.json();

        allProducts = data;

        showProducts(data);

        showCategories(data);

    }catch(error){

        errorDiv.innerHTML =
            "Error: " + error.message;

    }finally{

        loading.style.display = "none";

    }

}


/* ========================= */
/* TAMPILKAN PRODUK */
/* ========================= */

function showProducts(products){

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `

            <div class="card">

                <img
                    src="${product.image}"
                    alt="${product.title}"
                >

                <div class="card-body">

                    <div class="card-title">
                        ${product.title}
                    </div>

                    <div class="price">
                        $${product.price}
                    </div>

                    <div class="rating">
                        ⭐ ${product.rating.rate}
                    </div>

                    <button
                        onclick="showDetail(${product.id})"
                    >
                        Detail Produk
                    </button>

                </div>

            </div>

        `;

    });

}


/* ========================= */
/* KATEGORI */
/* ========================= */

function showCategories(data){

    const categories = [

        ...new Set(
            data.map(item => item.category)
        )

    ];

    categories.forEach(category => {

        categoryFilter.innerHTML += `

            <option value="${category}">
                ${category}
            </option>

        `;

    });

}


/* ========================= */
/* SEARCH */
/* ========================= */

searchInput.addEventListener("keyup", () => {

    const keyword =
        searchInput.value.toLowerCase();

    const filtered =
        allProducts.filter(product =>

            product.title
            .toLowerCase()
            .includes(keyword)

        );

    showProducts(filtered);

});


/* ========================= */
/* FILTER KATEGORI */
/* ========================= */

categoryFilter.addEventListener("change", () => {

    const value =
        categoryFilter.value;

    if(value === "all"){

        showProducts(allProducts);

    }else{

        const filtered =
            allProducts.filter(product =>

                product.category === value

            );

        showProducts(filtered);

    }

});


/* ========================= */
/* DETAIL MODAL */
/* ========================= */

function showDetail(id){

    const product =
        allProducts.find(
            item => item.id === id
        );

    modal.style.display = "flex";

    modalBody.innerHTML = `

        <div class="modal-product">

            <img src="${product.image}">

            <div class="modal-info">

                <h2>
                    ${product.title}
                </h2>

                <div class="price">
                    $${product.price}
                </div>

                <p>
                    ${product.description}
                </p>

                <p>
                    ⭐ Rating:
                    ${product.rating.rate}
                </p>

                <button onclick="addCart(${product.id})">
                    Tambah Keranjang
                </button>

            </div>

        </div>

    `;

}


/* ========================= */
/* CLOSE MODAL */
/* ========================= */

closeModal.addEventListener("click", () => {

    modal.style.display = "none";

});


window.addEventListener("click", (e) => {

    if(e.target === modal){

        modal.style.display = "none";

    }

});


/* ========================= */
/* ADD CART */
/* ========================= */

function addCart(productId){

    const product =
        allProducts.find(
            item => item.id === productId
        );

    cartData.push(product);

    cart++;

    cartCount.innerHTML = cart;

    renderCart();

    alert("Produk berhasil ditambahkan!");

}


/* ========================= */
/* RENDER CART */
/* ========================= */

function renderCart(){

    cartItems.innerHTML = "";

    let total = 0;

    cartData.forEach(item => {

        total += item.price;

        cartItems.innerHTML += `

            <div class="cart-item">

                <img src="${item.image}">

                <div>

                    <h4>
                        ${item.title}
                    </h4>

                    <p>
                        $${item.price}
                    </p>

                </div>

            </div>

        `;

    });

    totalPrice.innerHTML =
        `Total: $${total.toFixed(2)}`;

}


/* ========================= */
/* OPEN CART */
/* ========================= */

cartBtn.addEventListener("click", () => {

    cartModal.style.display = "flex";

});


/* ========================= */
/* CLOSE CART */
/* ========================= */

closeCart.addEventListener("click", () => {

    cartModal.style.display = "none";

});


window.addEventListener("click", (e) => {

    if(e.target === cartModal){

        cartModal.style.display = "none";

    }

});


/* ========================= */
/* CHECKOUT */
/* ========================= */

checkoutBtn.addEventListener("click", () => {

    if(cartData.length === 0){

        alert("Keranjang masih kosong!");

        return;

    }

    alert("Checkout berhasil!");

    cartData = [];

    cart = 0;

    cartCount.innerHTML = 0;

    renderCart();

    cartModal.style.display = "none";

});


/* ========================= */
/* DARK MODE */
/* ========================= */

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const icon =
        darkBtn.querySelector("i");

    if(document.body.classList.contains("light")){

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

    }else{

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

    }

});


/* ========================= */
/* HERO BUTTON */
/* ========================= */

heroButton.addEventListener("click", () => {

    container.scrollIntoView({

        behavior: "smooth"

    });

});


/* ========================= */
/* RUN */
/* ========================= */

getProducts();