import { createStore } from "vuex";
import axios from "axios";

export default createStore({
    state: {
        list: [],
        cart: [],
    },
    getters: {
        getLoadingStatus(state) {
            return state.isLoaded;
        },
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
        getCheckOutStatus(state) {
            return state.isCheckout;
        },
        getTotalStockInList(state) {
            return state.list.reduce((total, item) => total + item.stock, 0);
        },
        getZeroStockZeroQuantity(state, getters) {
            const zeroStock = getters.getTotalStockInList === 0;
            const zeroQuantity = getters.isCartEmpty;
            return zeroStock && zeroQuantity;
        },
    },
    actions: {
        setList: async (context) => {
            let response = await axios.get("api/getList");
            context.commit("SET_LIST", response.data);
        },
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
        finishCheckout: async (context, payload) => {
            let response = await axios.post(
                // if using back-end, the address should be changed accordingly
                "http://127.0.0.1:8000/api/postBoughtStocks",
                payload
            );
            // so the mutation can send the data of product and amount bought to the back-end (server) for updating stock in server
            context.commit("POST_BOUGHT_STOCKS", response.data);
            // if using back-end, we should dispatch a new request to get the updated stock back to front-end by using the commented code below
            // await context.dispatch("setList");
            context.commit("SHOW_SOLD_OUT_POP_UP");
            context.commit("CLEAR_CART");
        },
        closeSoldOutPopUp(context) {
            context.commit("CLOSE_SOLD_OUT_POP_UP");
        },
    },
    mutations: {
        SET_LIST(state, payload) {
            state.list = payload;
            state.isLoaded = true;
        },
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
            const { cartItem, cartItemIndex, amountCancelled } = payload;
            const itemIndex = state.list.findIndex(
                (item) => item.SKU === cartItem.SKU
            );
            const item = state.list[itemIndex];
            if (amountCancelled > 0 && amountCancelled <= cartItem.quantity) {
                item.stock += amountCancelled;
                cartItem.quantity -= amountCancelled;
                if (cartItem.quantity === 0) {
                    state.cart.splice(cartItemIndex, 1);
                }
                item.isOutOfStock = item.stock === 0;
            } else {
                window.alert("Please enter the correct quantity");
            }
        },
        DELETE_ALL_FROM_CART(state, payload) {
            const { cartItem, cartItemIndex } = payload;
            const itemIndex = state.list.findIndex(
                (item) => item.SKU === cartItem.SKU
            );
            const item = state.list[itemIndex];
            item.stock += cartItem.quantity;
            state.cart.splice(cartItemIndex, 1);
            item.isOutOfStock = false;
        },
        POST_BOUGHT_STOCKS(state, payload) {
            const cart = payload;
            state.data = cart;
        },
        SHOW_SOLD_OUT_POP_UP(state) {
            state.isCheckout = true;
        },
        CLEAR_CART(state) {
            state.cart = [];
        },
        CLOSE_SOLD_OUT_POP_UP(state) {
            state.isCheckout = false;
        },
    },
});
