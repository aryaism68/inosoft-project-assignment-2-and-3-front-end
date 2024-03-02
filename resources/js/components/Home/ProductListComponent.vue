<template>
    <div class="container">
        <div class="card-wrapper">
            <div
                class="card text-orange"
                v-for="(item, index) in list"
                :key="index"
                :class="{ behind: item.stock === 0 }"
            >
                <div class="card-header">
                    <h3 class="card-title" :id="item.category">
                        {{ item.category }}
                    </h3>
                    <img
                        class="card-img-top featured-image"
                        :src="
                            require('../../../assets/images/' +
                                item.url +
                                '.png').default
                        "
                    />
                </div>

                <div class="card-body">
                    <div class="card-text">
                        <h3>{{ item.name }}</h3>
                        <p>
                            {{ item.description }}
                        </p>
                        <p>Stock = {{ item.stock }} pcs</p>
                        <p>Price = Rp.{{ item.price.toLocaleString() }}</p>
                    </div>

                    <div class="card-interactive">
                        <input
                            type="number"
                            v-model="amountBought"
                            min="1"
                            placeholder="1"
                            :disabled="item.isOutOfStock"
                        />
                        <Button
                            class="custom-mr"
                            text="Add to Cart"
                            @click="addToCart(item)"
                            :disabled="item.isOutOfStock"
                        ></Button>
                        <Button
                            class="custom-mr"
                            text="Add All to Cart"
                            @click="addAllToCart(item)"
                            :disabled="item.isOutOfStock"
                        ></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Button from "../ButtonComponent.vue";

export default {
    components: {
        Button,
    },
    data() {
        return {
            amountBought: 1,
        };
    },
    methods: {
        addToCart(item) {
            this.$store.dispatch("addToCart", {
                item,
                amountBought: this.amountBought,
            });
            this.amountBought = 1;
        },
        addAllToCart(item) {
            this.$store.dispatch("addAllToCart", item);
            this.amountBought = 1;
        },
    },
    computed: {
        ...mapGetters({
            list: "getList",
        }),
    },
    created() {
        if (this.$store.state.cart.length === 0) {
            this.$store.dispatch("setList");
        }
    },
};
</script>

<style scoped>
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
}

.card-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.card {
    flex: 0 0 calc(33.3333% - 20px);
    max-width: calc(33.3333% - 20px);
    margin: 0 10px;
    margin-bottom: 30px;
}

.behind {
    order: 5;
    filter: grayscale(100%);
}

.featured-image {
    width: 100%;
    max-height: 170px;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
}

input {
    width: 20%;
    margin-top: 5%;
    margin-right: 2%;
    font-size: medium;
}

.custom-mr {
    margin-right: 10px;
}
</style>
