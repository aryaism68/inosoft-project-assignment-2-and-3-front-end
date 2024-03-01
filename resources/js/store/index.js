import { createStore } from "vuex";

export default createStore({
    state: {
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
                description: "Whipped vanilla frosting cupcake",
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
        cart: [],
    },
    getters: {
        getList(state) {
            return state.list;
        },
        isCartEmpty(state) {
            return state.cart.length === 0;
        },
        getCart(state) {
            return state.cart;
        },
        getTotalQtyInCart(state) {
            return state.cart.reduce((total, item) => total + item.quantity, 0);
        },
        getCartSubtotalPrice() {
            return (cartItem) =>
                parseInt(cartItem.quantity) * parseInt(cartItem.price);
        },
        getCartTotalPrice(state) {
            return state.cart.reduce((total, cartItem) => {
                return total + cartItem.quantity * cartItem.price;
            }, 0);
        },
    },
    actions: {
        addToCart(context, payload) {
            context.commit("ADD_TO_CART", payload);
        },
        addAllToCart(context, payload) {
            context.commit("ADD_ALL_TO_CART", payload);
        },
        deleteFromCart(context, payload) {
            context.commit("DELETE_FROM_CART", payload);
        },
        deleteAllFromCart(context, payload) {
            context.commit("DELETE_ALL_FROM_CART", payload);
        },
    },
    mutations: {
        ADD_TO_CART(state, payload) {
            const { item, amountBought } = payload;
            const cartItemIndex = state.cart.findIndex(
                (cartItem) => cartItem.SKU === item.SKU
            );
            const cartItem = state.cart[cartItemIndex];
            if (amountBought > 0 && item.stock >= amountBought) {
                if (cartItemIndex !== -1) {
                    cartItem.quantity += amountBought;
                } else {
                    state.cart.push({
                        SKU: item.SKU,
                        name: item.name,
                        quantity: amountBought,
                        price: item.price,
                    });
                }
                item.stock -= amountBought;
                item.isOutOfStock = item.stock === 0;
            } else {
                window.alert("Please enter the correct quantity");
            }
        },
        ADD_ALL_TO_CART(state, payload) {
            const item = payload;
            const cartItemIndex = state.cart.findIndex(
                (cartItem) => cartItem.SKU === item.SKU
            );
            const cartItem = state.cart[cartItemIndex];
            if (cartItemIndex !== -1) {
                cartItem.quantity += item.stock;
            } else {
                state.cart.push({
                    SKU: item.SKU,
                    name: item.name,
                    quantity: item.stock,
                    price: item.price,
                });
            }
            item.stock = 0;
            item.isOutOfStock = true;
        },
        DELETE_FROM_CART(state, payload) {
            const { cartItem, amountCancelled } = payload;
            const itemIndex = state.list.findIndex(
                (item) => item.SKU === cartItem.SKU
            );
            const item = state.list[itemIndex];
            if (amountCancelled > 0 && amountCancelled <= cartItem.quantity) {
                item.stock += amountCancelled;
                cartItem.quantity -= amountCancelled;
                item.isOutOfStock = item.stock === 0;
            } else {
                window.alert("Please enter the correct quantity");
            }
        },
        DELETE_ALL_FROM_CART(state, payload) {
            const cartItem = payload;
            const itemIndex = state.list.findIndex(
                (item) => item.SKU === cartItem.SKU
            );
            const item = state.list[itemIndex];
            item.stock += cartItem.quantity;
            cartItem.quantity = 0;
            item.isOutOfStock = false;
        },
    },
});
