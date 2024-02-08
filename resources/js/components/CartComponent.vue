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
                v-for="(item, index) in listdatacart"
                :key="index"
                v-show="item.stock < item.initialStock"
            >
                <td>{{ item.name }}</td>
                <td id="quantity">{{ item.initialStock - item.stock }}</td>
                <td id="price">Rp.{{ item.price.toLocaleString() }}</td>
                <input
                    type="number"
                    v-model="amountCancelled"
                    min="1"
                    max="999"
                />
                <button
                    class="custom-mr"
                    @click="deleteFromCart(index, amountCancelled)"
                >
                    Delete
                </button>
                <button class="custom-mr" @click="deleteAllFromCart(index)">
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
            <button class="custom-mr buy-more-button" @click="closeCart">
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
        "emit-close-all",
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
            let total = 0;
            this.listdatacart.forEach((item) => {
                total +=
                    (parseInt(item.initialStock) - parseInt(item.stock)) *
                    parseInt(item.price);
            });
            return Number(total).toLocaleString();
        },
    },
    methods: {
        deleteFromCart(index, amountCancelled) {
            this.$emit("emit-delete-from-cart", index, amountCancelled);
        },
        deleteAllFromCart(index) {
            this.$emit("emit-delete-all-from-cart", index);
        },
        showCheckoutPopup() {
            this.isCheckoutPopupVisible = true;
        },
        hideCheckoutPopup() {
            this.isCheckoutPopupVisible = false;
        },
        finishCheckout() {
            this.isCheckoutPopupVisible = false;
            this.$emit("emit-close-cart");
            this.listdatacart.forEach((item) => {
                item.stock = item.initialStock;
            });
        },
        cancelCheckout() {
            this.isCheckoutPopupVisible = false;
        },
        closeCart() {
            this.$emit("emit-close-cart");
        },
    },
    mounted() {},
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
    margin-right: 3%;
}

.buy-more-button {
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
