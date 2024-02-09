<template>
    <div class="container floaters-cart">
        <h1 class="cart">Cart</h1>
        <hr />
        <table>
            <tr>
                <th><h3>Name</h3></th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
            <tr
                class="list"
                v-for="(cartItem, cartItemIndex) in listdatacart"
                :key="cartItemIndex"
                v-show="cartItem.quantity > 0"
            >
                <td>{{ cartItem.name }}</td>
                <td id="quantity">{{ cartItem.quantity }}</td>
                <td id="price">Rp.{{ cartItem.price.toLocaleString() }}</td>
                <input
                    type="number"
                    v-model="amountCancelled[cartItemIndex]"
                    min="1"
                    max="999"
                    placeholder="1"
                />
                <button
                    class="custom-mr"
                    @click="deleteFromCart(cartItemIndex, amountCancelled)"
                >
                    Delete
                </button>
                <button
                    class="custom-mr"
                    @click="deleteAllFromCart(cartItemIndex)"
                >
                    Delete All
                </button>
            </tr>
        </table>
        <table class="total">
            <tr class="custom-total">
                <td>Total: Rp.{{ totalPrice }}</td>
            </tr>
        </table>
        <div>
            <button
                class="custom-mr checkout-button"
                @click="showCheckoutPopup"
            >
                Checkout
            </button>
            <button class="custom-mr shop-more-button" @click="closeCart">
                Shop more
            </button>
            <modal-component
                v-if="isCheckoutPopupVisible"
                @close="hideCheckoutPopup"
                @emit-finish="finishCheckout"
                @emit-cancel="cancelCheckout"
                :totalPaid="totalPrice"
            ></modal-component>
        </div>
    </div>
</template>

<script>
import { faTeletype } from "@fortawesome/free-solid-svg-icons";

export default {
    emits: [
        "emit-delete-from-cart",
        "emit-delete-all-from-cart",
        "emit-close-cart",
    ],
    props: {
        listdatacart: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    data() {
        return {
            amountCancelled: 1,
            isCheckoutPopupVisible: false,
        };
    },
    computed: {
        totalPrice() {
            let totalPrice = 0;
            this.listdatacart.forEach((cartItem) => {
                totalPrice +=
                    parseInt(cartItem.quantity) * parseInt(cartItem.price);
            });
            return Number(totalPrice).toLocaleString();
        },
    },
    methods: {
        deleteFromCart(cartItemIndex, amountCancelled) {
            this.$emit("emit-delete-from-cart", cartItemIndex, amountCancelled);
        },
        deleteAllFromCart(cartItemIndex) {
            this.$emit("emit-delete-all-from-cart", cartItemIndex);
        },
        showCheckoutPopup() {
            this.isCheckoutPopupVisible = true;
        },
        hideCheckoutPopup() {
            this.isCheckoutPopupVisible = false;
        },
        finishCheckout() {
            this.isCheckoutPopupVisible = false;
            this.$emit("emit-finish");
        },
        cancelCheckout() {
            this.isCheckoutPopupVisible = false;
        },
        closeCart() {
            this.$emit("emit-close-cart");
        },
    },
    mounted() {
        console.log("Cart component mounted.");
    },
};
</script>

<style>
.floaters-cart {
    position: fixed;
    width: 50%;
    height: 60%;
    scroll-behavior: auto;
    top: 10%;
    left: 20%;
    border: 3px solid #f1f1f1;
    z-index: 9;
    background-color: bisque;
    padding: 5%;
    text-align: center;
    font-size: larger;
    color: orange;
}

.cart {
    text-align: left;
}

table {
    table-layout: fixed;
    width: 100%;
}

th,
td {
    width: 20%;
    height: 20%;
    overflow: hidden;
}

.total {
    position: absolute;
    bottom: 10%;
    right: 0;
}

.checkout-button {
    position: absolute;
    bottom: 10%;
    right: 20%;
    margin-right: 3% !important;
}

.shop-more-button {
    position: absolute;
    bottom: 10%;
    right: 10%;
}

input {
    width: 25%;
}

button {
    font-size: medium;
}

hr {
    color: darkorange;
}
</style>
