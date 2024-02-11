<template>
    <div class="container floaters-cart">
        <h1 class="cart">Cart</h1>
        <img src="../../assets/images/gourmand-gateaux.gif" />
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
                    v-model="amountCancelled"
                    min="1"
                    placeholder="1"
                />
                <button-component
                    class="custom-mr"
                    @emit-click="deleteFromCart(cartItemIndex, amountCancelled)"
                    text="Delete"
                />
                <button-component
                    class="custom-mr"
                    @emit-click="deleteAllFromCart(cartItemIndex)"
                    text="Delete All"
                />
            </tr>
        </table>
        <table class="total-price">
            <tr>
                <td>Total: Rp.{{ totalPrice }}</td>
            </tr>
        </table>
        <div>
            <button-component
                class="custom-mr checkout-button"
                @emit-click="showCheckoutConfirmationPopup"
                text="Checkout"
            />
            <button-component
                class="custom-mr shop-more-button"
                @emit-click="closeCart"
                text="Shop more"
            />
            <checkout-confirmation-component
                v-if="isCheckoutConfirmationPopupVisible"
                @close="hideCheckoutConfirmationPopup"
                @emit-finish="finishCheckout"
                @emit-cancel="cancelCheckout"
                :totalPaid="totalPrice"
            ></checkout-confirmation-component>
        </div>
    </div>
</template>

<script>
export default {
    emits: [
        "emit-delete-from-cart",
        "emit-delete-all-from-cart",
        "emit-close-cart",
        "emit-finish",
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
            isCheckoutConfirmationPopupVisible: false,
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
            this.amountCancelled = 1;
        },
        deleteAllFromCart(cartItemIndex) {
            this.$emit("emit-delete-all-from-cart", cartItemIndex);
            this.amountCancelled = 1;
        },
        showCheckoutConfirmationPopup() {
            this.isCheckoutConfirmationPopupVisible = true;
        },
        closeCart() {
            this.$emit("emit-close-cart");
        },
        hideCheckoutConfirmationPopup() {
            this.isCheckoutConfirmationPopupVisible = false;
        },
        finishCheckout() {
            this.isCheckoutConfirmationPopupVisible = false;
            this.$emit("emit-finish");
        },
        cancelCheckout() {
            this.isCheckoutConfirmationPopupVisible = false;
        },
    },
    mounted() {
        console.log("Cart component mounted.");
    },
};
</script>

<style scoped>
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

img {
    height: 25%;
    width: 25%;
    position: absolute;
    top: 6%;
    right: 10%;
}

hr {
    color: darkorange;
}

.custom-mr {
    margin-left: 5%;
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

.total-price {
    position: absolute;
    bottom: 8%;
    right: 0;
    font-size: x-large;
}

input {
    width: 25%;
    font-size: medium;
    margin-right: 2%;
}

.checkout-button {
    position: absolute;
    bottom: 9%;
    right: 18%;
    margin-right: 3%;
}

.shop-more-button {
    position: absolute;
    bottom: 9%;
    right: 9%;
}
</style>
