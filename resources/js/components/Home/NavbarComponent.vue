<template>
    <div class="container">
        <ul class="custom-format-ul">
            <li v-for="(item, index) in list" :key="index">
                <a href="" class="custom-format-a">
                    <img
                        :src="
                            require('../../../assets/images/' +
                                item.iconUrl +
                                '.jpg').default
                        "
                        class=""
                        width="50"
                        height="50"
                    />
                    {{ item.category }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters({
            list: "getList",
        }),
    },
};
</script>

<style>
.custom-format-ul {
    list-style-type: none;
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    top: 0;
}

.custom-format-a {
    display: flex;
    flex-direction: column;
    text-align: center;
    color: orange;
    text-decoration: none;
    padding: 30px;
}

.custom-format-a img {
    padding: 5px;
}
</style>
