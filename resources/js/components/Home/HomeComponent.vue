<template>
    <Header></Header>
    <Navbar></Navbar>

    <main>
        <ProductList></ProductList>
        <router-link to="/cart">
            <FloatingCart></FloatingCart>
        </router-link>
    </main>

    <Footer></Footer>
</template>

<script>
import Header from "../Home/HeaderComponent.vue";
import Navbar from "../Home/NavbarComponent.vue";
import ProductList from "../Home/ProductListComponent.vue";
import FloatingCart from "../FloatingCartComponent.vue";
import Footer from "../Home/FooterComponent.vue";

export default {
    components: {
        Header,
        Navbar,
        ProductList,
        FloatingCart,
        Footer,
    },
    mounted() {
        console.log("Home component mounted.");
    },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Acme&display=swap");
@import url("https://fonts.googleapis.com/css?family=Quicksand:400,700&display=swap");

body {
    font-family: "Acme", "Quicksand", sans-serif;
    background-color: #fff5e3;
    font-size: large;
}

.text-orange {
    color: orange;
}

.featured-image {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
}
</style>
