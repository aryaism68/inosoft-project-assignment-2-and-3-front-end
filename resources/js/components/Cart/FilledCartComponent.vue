<template>
    <div class="container floaters-cart">
        <h1 class="cart">Cart</h1>
        <img src="../../../assets/images/gourmand-gateaux.gif" />
        <hr />
        <table>
            <tr>
                <th><h3>Name</h3></th>
                <th>Quantity</th>
                <th>Subtotal</th>
            </tr>
            <tr
                class="list"
                v-for="(cartItem, cartItemIndex) in cart"
                :key="cartItemIndex"
                v-show="cartItem.quantity > 0"
            >
                <td>{{ cartItem.name }}</td>
                <td id="quantity">{{ cartItem.quantity }}</td>
                <td id="subtotal-price">
                    Rp.{{ subtotalPrice(cartItem).toLocaleString() }}
                </td>
                <input
                    type="number"
                    v-model="amountCancelled"
                    min="1"
                    placeholder="1"
                />
                <Button
                    class="custom-mr"
                    @click="deleteFromCart(cartItemIndex)"
                    text="Delete"
                ></Button>
                <Button
                    class="custom-mr"
                    @click="deleteAllFromCart(cartItemIndex)"
                    text="Delete All"
                >
                </Button>
            </tr>
        </table>
        <table class="total-price">
            <tr>
                <td>Total: Rp.{{ totalPrice.toLocaleString() }}</td>
            </tr>
        </table>
        <div>
            <Button
                class="custom-mr checkout-button"
                @click="goToCheckout"
                text="Checkout"
            ></Button>
            <Button
                class="custom-mr cancel-button"
                @click="backToHome"
                text="Cancel"
            ></Button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Button from "../ButtonComponent.vue";

export default {
    components: {
        Button,
    },
    data() {
        return {
            amountCancelled: 1,
        };
    },
    computed: {
        ...mapGetters({
            cart: "getCart",
            subtotalPrice: "getCartSubtotalPrice",
            totalPrice: "getCartTotalPrice",
        }),
    },
    watch: {
        totalPrice: {
            immediate: true,
            handler(newValue) {
                if (newValue === 0) {
                    this.$router.push("/cart/empty");
                }
            },
        },
    },
    methods: {
        deleteFromCart(cartItemIndex) {
            const cartItem = this.cart[cartItemIndex];
            this.$store.dispatch("deleteFromCart", {
                cartItem,
                amountCancelled: this.amountCancelled,
            });
            this.amountCancelled = 1;
        },
        deleteAllFromCart(cartItemIndex) {
            const cartItem = this.cart[cartItemIndex];
            this.$store.dispatch("deleteAllFromCart", cartItem);
            this.amountCancelled = 1;
        },
        goToCheckout() {
            this.$router.push("/cart/checkout");
        },
        backToHome() {
            this.$router.push("/");
        },
    },
    mounted() {
        console.log("Filled cart component mounted.");
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
    right: 16%;
    margin-right: 3%;
}

.cancel-button {
    position: absolute;
    bottom: 9%;
    right: 11%;
}
</style>
