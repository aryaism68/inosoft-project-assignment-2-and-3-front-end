<template>
    <button type="button" @click="functionClick">{{ text }}</button>
</template>

<script>
export default {
    emits: ["emit-click"],
    props: {
        text: {
            type: String,
            default: "",
        },
    },
    methods: {
        functionClick() {
            this.$emit("emit-click");
        },
    },
};
</script>
