<template>
    <header>
        <div class="px-3 py-2 border-bottom border-warning">
            <div class="container-fluid">
                <div class="d-flex custom-flex justify-content-between">
                    <a href="#" class="d-flex text-decoration-none">
                        <img
                            src="../../assets/images/logoTitle.png"
                            class="logoHeader"
                            alt="logoHeader"
                        />
                    </a>
                    <span
                        ><h1 class="text-orange custom-brand">
                            Aurelia Bakery
                        </h1></span
                    >
                </div>
            </div>
        </div>
    </header>

    <main>
        <product-list-component
            :listdata="list"
            @emit-add-to-cart="addToCart"
            @emit-add-all-to-cart="addAllToCart"
        ></product-list-component>
        <img
            v-on:click="isHidden = !isHidden"
            class="floaters"
            src="../../assets/images/cartIcon.png"
            alt=""
        />
        <cart-component
            :listdatacart="cart"
            @emit-delete-from-cart="deleteFromCart"
            @emit-delete-all-from-cart="deleteAllFromCart"
            @emit-close-cart="closeCart"
            @emit-finish="finishCheckout"
            v-if="!isHidden && totalQuantityInCart > 0"
        ></cart-component>
        <h1
            class="floaters cart-qty"
            v-if="totalQuantityInCart > 0"
            @emit-close-cart="closeCart"
        >
            {{ totalQuantityInCart }}
        </h1>
        <empty-cart-component
            v-if="!isHidden && totalQuantityInCart == 0"
            @emit-continue="continueShopping"
        ></empty-cart-component>
    </main>

    <footer>
        <div
            class="center text-center text-orange footer-custom"
            id="copyright"
        >
            <img
                src="../../assets/images/logoTitle.png"
                class="logoFooter"
                alt="logoFooter"
            />
            <p class="brand">Aurelia&nbsp;Bakery&nbsp;&#169;&nbsp;2024</p>
        </div>
    </footer>
</template>

<script>
import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons";

export default {
    data: function () {
        return {
            list: [
                {
                    SKU: 1,
                    category: "Cakes",
                    name: "Choco Cake",
                    description: "A melt-in-mouth Choco Cake",
                    stock: 50,
                    price: 40000,
                    url: "cakesArticle",
                },
                {
                    SKU: 2,
                    category: "Cookies",
                    name: "Raisins Cookie",
                    description: "Classic ginger Raisins Cookies",
                    stock: 20,
                    price: 10000,
                    url: "cookiesArticle",
                },
                {
                    SKU: 3,
                    category: "Cupcakes",
                    name: "Vanilla Cupcake",
                    description: "Whipped vanilla frosting on top",
                    stock: 30,
                    price: 20000,
                    url: "cupcakesArticle",
                },
                {
                    SKU: 4,
                    category: "Donuts",
                    name: "Sweets Donut",
                    description: "Donut worry and be happy",
                    stock: 40,
                    price: 30000,
                    url: "donutsArticle",
                },
                {
                    SKU: 5,
                    category: "Pastries",
                    name: "Macaron",
                    description: "Crunchy on shells, mildly moist inside",
                    stock: 60,
                    price: 50000,
                    url: "pastriesArticle",
                },
            ],
            input: 1,
            cart: [],
            isHidden: true,
        };
    },
    methods: {
        addToCart(index, amountBought) {
            const item = this.list[index];
            const cartItemIndex = this.cart.findIndex(
                (cartItem) => cartItem.SKU === item.SKU
            );
            const cartItem = this.cart[cartItemIndex];
            if (amountBought > 0 && item.stock >= amountBought) {
                if (cartItemIndex !== -1) {
                    cartItem.quantity += amountBought;
                } else {
                    this.cart.push({
                        SKU: item.SKU,
                        name: item.name,
                        quantity: amountBought,
                        price: item.price,
                    });
                }
                item.stock -= amountBought;
            } else {
                window.alert("Masukkan jumlah yang sesuai");
            }
            console.log("Cart contents:", this.cart);
        },
        addAllToCart(index) {
            const item = this.list[index];
            const cartItemIndex = this.cart.findIndex(
                (cartItem) => cartItem.SKU === item.SKU
            );
            const cartItem = this.cart[cartItemIndex];
            if (cartItemIndex !== -1) {
                cartItem.quantity += item.stock;
            } else {
                this.cart.push({
                    SKU: item.SKU,
                    name: item.name,
                    quantity: item.stock,
                    price: item.price,
                });
            }
            item.stock = 0;
        },
        deleteFromCart(cartItemIndex, amountCancelled) {
            const cartItem = this.cart[cartItemIndex];
            const itemIndex = this.list.findIndex(
                (item) => item.SKU === cartItem.SKU
            );
            const item = this.list[itemIndex];
            if (amountCancelled > 0 && amountCancelled <= cartItem.quantity) {
                item.stock += amountCancelled;
                cartItem.quantity -= amountCancelled;
            } else {
                window.alert("Masukkan jumlah yang sesuai");
            }
        },
        deleteAllFromCart(cartItemIndex) {
            const cartItem = this.cart[cartItemIndex];
            const itemIndex = this.list.findIndex(
                (item) => item.SKU === cartItem.SKU
            );
            const item = this.list[itemIndex];
            item.stock += cartItem.quantity;
            cartItem.quantity = 0;
        },
        closeCart() {
            this.isHidden = true;
        },
        continueShopping() {
            this.isHidden = true;
        },
        finishCheckout() {
            window.location.reload();
        },
    },
    computed: {
        totalQuantityInCart() {
            return this.cart.reduce((total, item) => total + item.quantity, 0);
        },
    },
    mounted() {
        console.log("Component mounted.");
    },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Acme&display=swap");
@import url("https://fonts.googleapis.com/css?family=Quicksand:400,700&display=swap");

body {
    font-family: "Acme", "Quicksand", sans-serif;
    background-color: #fff5e3;
}

@media screen and (max-width: 992px) {
    .custom-flex {
        flex-wrap: wrap;
    }
}

.custom-flex {
    flex-direction: row;
}

.text-orange {
    color: orange;
}

.custom-margin-brand {
    margin-top: 10px;
    margin-bottom: -5px;
}

.custom-margin-slogan {
    margin-top: -5px;
}

.navbar-hover-color {
    --bs-nav-link-hover-color: #ff4d01;
}

.background-custom {
    background-color: #fff5e3;
}

@media screen and (max-width: 992px) {
    .background-custom-navbar-md {
        background-color: #f1e4cc;
    }
}

div.scroll-container {
    padding: 10px;
    background-color: #fff5e3;
    overflow: auto;
    white-space: nowrap;
}

div.scroll-container img {
    padding-right: 7px;
    width: 50%;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
}

@media screen and (max-width: 768px) {
    .slide-custom-height {
        max-height: 400px;
    }
}

.slide-custom-height {
    max-height: 500px;
}

.featured-image {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
}

.background-custom-darker {
    background-color: #f8e29d;
}

.footer-custom {
    bottom: 0;
    width: 100%;
    text-align: center;
    margin-top: 5%;
}

.text-brown {
    color: #d47c2e;
}
.custom-size-btn {
    width: 50%;
}

@media screen and (max-width: 992px) {
    .custom-size-btn {
        width: 100%;
    }
}

.custom-mr {
    margin-right: 10px;
}

.floaters {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 40px;
    right: 40px;
}

.cart-qty {
    color: white;
    background-color: #ff802c;
    text-align: center;
    bottom: 50px;
    right: 20px;
    border: 2px solid orange;
    border-radius: 100%;
    min-width: 2%;
    width: fit-content;
    height: fit-content;
}

.brand {
    margin-top: 0;
}

.custom-brand {
    font-size: large;
    margin-top: 0;
}
</style>
