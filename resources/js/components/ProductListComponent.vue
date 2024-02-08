<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-lg-4 col-12 mb-4">
                <div
                    class="card background-custom text-orange h-100"
                    v-for="(item, index) in listdata"
                    :key="index"
                >
                    <div class="card-header p-4 border-0 background-custom">
                        <h3 class="card-title">{{ item.category }}</h3>
                        <img
                            class="card-img-top featured-image"
                            :src="
                                require('../../assets/images/' +
                                    item.url +
                                    '.png').default
                            "
                        />
                    </div>

                    <div class="card-body p-3 text-center">
                        <div class="card-text">
                            <h3>{{ item.name }}</h3>
                            <p>
                                {{ item.description }}
                            </p>
                        </div>

                        <div class="card-body p-3 text-center mb-3">
                            <p>Stok = {{ item.stock }} pcs</p>
                            <p>Harga = Rp.{{ item.price.toLocaleString() }}</p>
                            <input
                                type="number"
                                v-model="amountBought"
                                min="1"
                            />
                            <button
                                class="custom-mr"
                                @click="addToCart(index, amountBought)"
                                :disabled="checkStock(item.stock)"
                            >
                                Add to Cart
                            </button>
                            <button
                                class="custom-mr"
                                @click="addAllToCart(index)"
                                :disabled="checkStock(item.stock)"
                            >
                                Add All to Cart
                            </button>
                        </div>
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
        },
        addAllToCart(index) {
            this.$emit("emit-add-all-to-cart", index);
        },
        checkStock(stock) {
            return stock <= 0;
        },
    },
};
</script>

<style>
input {
    width: 10%;
    margin-right: 5%;
}
</style>
