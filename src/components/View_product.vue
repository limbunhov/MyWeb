<template>
    <div class="popup">
        <div class="popup_inners">
            <span><i @click="togle_view()" class="fa-solid fa-xmark"></i></span>
            <div v-if="product" class="view_product">
                <div class="product">
                    <img :src="`${product.image}`" alt="" width="100px">
                </div>
                <div class="product_detail">
                    <h1 >{{ product.name }}</h1>
                    <div class="title">
                        <p>{{ product.title.t1 }}</p>
                        <p>{{ product.title.t2 }}</p>
                        <p>{{ product.title.t3 }}</p>
                        <p>{{ product.title.t4 }}</p>
                        <p>{{ product.title.t5 }}</p>
                        <p>{{ product.title.t6 }}</p>
                        <p>{{ product.title.t7 }}</p>
                    </div>
                    <span>price: {{ product.price }}</span>
                    <button @click="view_add_cart(product.id)" class="btn bg-primary view_btn"> Add to cart</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        togle_view: {
            type: Function,
            required: true,
        },
        product:{
            type: Object,
            required: true,
        },
        view_add_cart:{
            type: Function,
            required:true
        }
    },
}



</script>
<style ></style>