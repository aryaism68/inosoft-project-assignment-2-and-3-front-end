<template>
    <button type="button">{{ text }}</button>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: "",
        },
    },
};
</script>

<style>
button {
    font-size: medium;
}
</style>
