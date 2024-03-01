<template>
    <img
        class="floaters"
        src="../../assets/images/cartIcon.png"
        alt="cartIcon"
    />
    <h1 class="floaters cart-qty" v-if="totalQtyInCart > 0">
        {{ totalQtyInCart }}
    </h1>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters({
            totalQtyInCart: "getTotalQtyInCart",
        }),
    },
};
</script>

<style scoped>
.floaters {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 40px;
    right: 40px;
}

.cart-qty {
    color: white;
    background-color: #ff802c;
    text-align: center;
    bottom: 50px;
    right: 20px;
    border: 2px solid orange;
    border-radius: 100%;
    min-width: 2%;
    width: fit-content;
    height: fit-content;
}
</style>
