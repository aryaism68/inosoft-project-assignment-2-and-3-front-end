<template>
    <router-view></router-view>
    <router-link to="/">
        <FloatingCart></FloatingCart>
    </router-link>
</template>

<script>
import { mapGetters } from "vuex";
import FloatingCart from "../FloatingCartComponent.vue";

export default {
    components: {
        FloatingCart,
    },
    computed: {
        ...mapGetters(["isCartEmpty"]),
    },
    watch: {
        isCartEmpty: {
            immediate: true,
            handler(newValue) {
                const route = newValue ? "/cart/empty" : "/cart/details";
                this.$router.push(route);
            },
        },
    },
    mounted() {
        console.log("Cart component mounted.");
    },
};
</script>
