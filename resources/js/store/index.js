import { createStore } from "vuex";
import axios from "axios";

export default createStore({
    state: {
        list: [],
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
    },
    mutations: {
        SET_LIST(state, payload) {
            state.list = payload;
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
