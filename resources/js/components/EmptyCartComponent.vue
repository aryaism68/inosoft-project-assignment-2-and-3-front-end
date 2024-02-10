<template>
    <div class="container floaters-cart" id="empty-cart">
        <p>Oops, your cart is empty...</p>
        <p>Click 'Continue' to shop.</p>
        <img
            src="../../assets/images/tkthao219-bubududu.gif"
            alt="goShopping"
        />
        <div class="continue-button">
            <button-component @emit-click="continueShopping" text="Continue" />
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

img {
    height: 60%;
    width: 50%;
}

.continue-button {
    margin: 2%;
    margin-top: 5%;
    font-size: medium;
}
</style>
