<template>
    <div class="center text-orange">
        <h1>404 Not Found</h1>
        <Button
            text="Back"
            @click="goBack"
            class="right custom-format"
        ></Button>
    </div>
</template>

<script>
import Button from "../components/ButtonComponent.vue";

export default {
    components: {
        Button,
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>

<style>
.center {
    border: 5px solid;
    margin: auto;
    width: 50%;
    padding: 10px;
}

.text-orange {
    color: orange;
}

.right {
    position: absolute;
    top: 14%;
    right: 25%;
}

.custom-format {
    color: orange;
    background-color: #fff5e3;
    border: 2px solid;
    border-radius: 10%;
}
</style>
