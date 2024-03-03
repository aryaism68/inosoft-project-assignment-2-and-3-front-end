<template>
    <div class="container floaters-cart">
        <p>Scan QR Code below and pay Rp.{{ totalPrice.toLocaleString() }}.</p>
        <p>Click 'Finish' to confirm payment.</p>
        <img
            src="../../../assets/images/qrCode.png"
            alt="QR Code"
            class="qr-code"
        />
        <div>
            <Button
                class="checkout-confirmation-buttons"
                @click="finishCheckout"
                text="Finish"
            ></Button>
            <Button
                class="checkout-confirmation-buttons"
                @click="backToCart"
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
    methods: {
        finishCheckout() {
            this.$store.dispatch("finishCheckout", this.cart);
            this.$router.push("/");
        },
        backToCart() {
            this.$router.go(-1);
        },
    },
    computed: {
        ...mapGetters({
            totalPrice: "getCartTotalPrice",
            cart: "getCart",
        }),
    },
    mounted() {
        console.log("Checkout confirmation component mounted.");
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

.qr-code {
    height: 57%;
    width: 50%;
}

.checkout-confirmation-buttons {
    margin: 2%;
    font-size: medium;
}
</style>
