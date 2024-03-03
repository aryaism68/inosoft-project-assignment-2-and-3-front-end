<template>
    <div class="container floaters-cart" id="empty-cart">
        <p>Oops, everything is sold out...</p>
        <p>
            <a href="https://api.whatsapp.com/send?phone=628562343000"
                >Contact us</a
            >
            to order more
        </p>
        <img
            src="../../../assets/images/sold-out-shopping.gif"
            alt="Sold Out"
        />
        <div class="continue-button">
            <Button @click="closePopUp" text="Continue"></Button>
        </div>
    </div>
</template>

<script>
import Button from "../ButtonComponent.vue";

export default {
    components: {
        Button,
    },
    methods: {
        closePopUp() {
            this.$store.dispatch("closeSoldOutPopUp");
        },
    },
    mounted() {
        console.log("Sold out component mounted.");
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

a {
    color: orange;
}

img {
    height: 60%;
    width: 50%;
    margin-top: 2%;
}

.continue-button {
    margin: 2%;
    margin-top: 5%;
    font-size: medium;
}
</style>
