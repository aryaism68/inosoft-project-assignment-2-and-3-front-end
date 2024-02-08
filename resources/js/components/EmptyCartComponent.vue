<template>
    <div class="container floaters-cart" id="modal">
        <p>Oops, your cart is empty...</p>
        <p>Click 'Continue' to shop more</p>
        <img src="../../assets/images/cartIcon.png" alt="cart" />
        <div>
            <button @click="continueShopping">Continue</button>
        </div>
    </div>
</template>

<script>
export default {
    emits: ["emit-continue"],
    props: {},
    methods: {
        continueShopping() {
            this.$emit("emit-continue");
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
    height: 60%;
    width: 50%;
}

button {
    margin: 2%;
    margin-top: 7%;
    font-size: medium;
}

img {
    height: 60%;
    width: 50%;
}
</style>
