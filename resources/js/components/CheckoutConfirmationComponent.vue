<template>
    <div class="container floaters-cart">
        <p>Scan QR Code below and pay Rp.{{ totalPaid }}</p>
        <p>Click 'Finish' to confirm payment and reload</p>
        <img
            src="../../assets/images/qrCode.png"
            alt="QR Code"
            class="qr-code"
        />
        <div>
            <button-component
                class="checkout-confirmation-buttons"
                @emit-click="finishCheckout"
                text="Finish"
            />
            <button-component
                class="checkout-confirmation-buttons"
                @emit-click="cancelCheckout"
                text="Cancel"
            />
        </div>
    </div>
</template>

<script>
export default {
    emits: ["emit-finish", "emit-cancel"],
    props: {
        totalPaid: {
            type: Number,
            required: true,
        },
    },
    methods: {
        finishCheckout() {
            this.$emit("emit-finish");
        },
        cancelCheckout() {
            this.$emit("emit-cancel");
        },
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
