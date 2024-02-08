<template>
    <div class="container floaters-cart" id="modal">
        <p>Scan QR Code below and pay Rp.{{ totalPaid }}</p>
        <p>Click 'Finish' to confirm payment and reload</p>
        <img src="../../assets/images/qrCode.png" alt="QR Code" id="qr-code" />
        <div>
            <button @click="finishCheckout">Finish</button>
            <button @click="cancelCheckout">Cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    emits: ["emit-finish", "emit-cancel"],
    props: {
        totalPaid: {
            type: String,
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

#qr-code {
    height: 65%;
    width: 50%;
}

button {
    margin: 2%;
    font-size: medium;
}
</style>
