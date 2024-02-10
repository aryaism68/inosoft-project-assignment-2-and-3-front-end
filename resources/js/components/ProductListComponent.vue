<template>
    <div class="container">
        <div class="card-wrapper">
            <div
                class="card text-orange"
                v-for="(item, index) in listdata"
                :key="index"
            >
                <div class="card-header">
                    <h3 class="card-title">{{ item.category }}</h3>
                    <img
                        class="card-img-top featured-image"
                        :src="
                            require('../../assets/images/' + item.url + '.png')
                                .default
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
                        />
                        <button-component
                            class="custom-mr"
                            @emit-click="addToCart(index, amountBought)"
                            :disabled="checkStock(item.stock)"
                            text="Add to Cart"
                        />
                        <button-component
                            class="custom-mr"
                            @emit-click="addAllToCart(index)"
                            :disabled="checkStock(item.stock)"
                            text="Add All to Cart"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ["emit-add-to-cart", "emit-add-all-to-cart"],
    props: {
        listdata: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    data() {
        return {
            amountBought: 1,
        };
    },
    methods: {
        addToCart(index, amountBought) {
            this.$emit("emit-add-to-cart", index, amountBought);
            this.amountBought = 1;
        },
        addAllToCart(index) {
            this.$emit("emit-add-all-to-cart", index);
            this.amountBought = 1;
        },
        checkStock(stock) {
            return stock <= 0;
        },
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
