<template>
    <div class="container">
        <ul class="custom-format-ul">
            <li
                v-for="(navbarItem, navbarIndex) in listdatanavbar"
                :key="navbarIndex"
            >
                <a href="#" class="custom-format-a">
                    <img
                        :src="
                            require('../../assets/images/' +
                                navbarItem.iconUrl +
                                '.jpg').default
                        "
                        class=""
                        width="50"
                        height="50"
                    />
                    {{ navbarItem.category }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        listdatanavbar: {
            type: Array,
            default: () => {
                return [];
            },
        },
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
