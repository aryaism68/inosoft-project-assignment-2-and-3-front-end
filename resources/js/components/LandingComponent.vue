<template>
    <header-component></header-component>
    <navbar-component :listdatanavbar="list"></navbar-component>

    <main>
        <product-list-component
            :listdata="list"
            @emit-add-to-cart="addToCart"
            @emit-add-all-to-cart="addAllToCart"
        ></product-list-component>
        <floating-cart-component
            @emit-hide-unhide="hideUnhide"
            :totalQtyInCart="totalQuantityInCart"
        ></floating-cart-component>
        <cart-component
            :listdatacart="cart"
            @emit-delete-from-cart="deleteFromCart"
            @emit-delete-all-from-cart="deleteAllFromCart"
            @emit-close-cart="closeCart"
            @emit-finish="finishCheckout"
            v-if="!isHidden && totalQuantityInCart > 0"
        ></cart-component>
        <empty-cart-component
            v-if="!isHidden && totalQuantityInCart == 0"
            @emit-continue="continueShopping"
        ></empty-cart-component>
    </main>

    <footer-component></footer-component>
</template>

<script>
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
                    iconUrl: "cakesIcon",
                },
                {
                    SKU: 2,
                    category: "Cookies",
                    name: "Raisins Cookie",
                    description: "Classic ginger Raisins Cookies",
                    stock: 20,
                    price: 10000,
                    url: "cookiesArticle",
                    iconUrl: "cookiesIcon",
                },
                {
                    SKU: 3,
                    category: "Cupcakes",
                    name: "Vanilla Cupcake",
                    description: "Whipped vanilla frosting on top",
                    stock: 30,
                    price: 20000,
                    url: "cupcakesArticle",
                    iconUrl: "cupcakesIcon",
                },
                {
                    SKU: 4,
                    category: "Donuts",
                    name: "Sweets Donut",
                    description: "Donut worry and be happy",
                    stock: 40,
                    price: 30000,
                    url: "donutsArticle",
                    iconUrl: "donutsIcon",
                },
                {
                    SKU: 5,
                    category: "Pastries",
                    name: "Macaron",
                    description: "Crunchy on shells, mildly moist inside",
                    stock: 60,
                    price: 50000,
                    url: "pastriesArticle",
                    iconUrl: "pastriesIcon",
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
                window.alert("Please enter the correct quantity");
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
                window.alert("Please enter the correct quantity");
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
        hideUnhide() {
            this.isHidden = !this.isHidden;
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
    font-size: large;
}

.text-orange {
    color: orange;
}

.featured-image {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
}
</style>
