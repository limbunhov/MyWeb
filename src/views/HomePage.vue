

<template>
    <div class="slider">
        <div id="carouselExampleAutoplaying" class="carousel slide mt-2" data-bs-ride="carousel">
            <div class="carousel-inner ">
                <div class="carousel-item active ">
                    <div class="carousel_image">
                        <img src="../assets/image/image 2.png" alt="...">
                    </div>
                    <div class="carousel-caption d-none d-md-block">
                        <RouterLink to="/Shop" type="button" class="btn btn-primary">Shop Now</RouterLink>
                        <p>Some representative placeholder content for the first slide.</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="carousel_image">
                        <img src="../assets/image/macbook-pro-2023.jpg" alt="...">
                    </div>
                    <div class="carousel-caption d-none d-md-block">
                        <RouterLink to="/Shop" type="button" class="btn btn-primary">Shop Now</RouterLink>
                        <p>Some representative placeholder content for the first slide.</p>
                    </div>
                </div>
                <div class="carousel-item ">
                    <div class="carousel_image">
                        <img src="../assets/image/banner2.jpg" alt="...">
                    </div>
                    <div class="carousel-caption d-none d-md-block">
                        <RouterLink to="/Shop" type="button" class="btn btn-primary">Shop Now</RouterLink>
                        <p>Some representative placeholder content for the first slide.</p>
                    </div>
                </div>
                <div class="carousel-item ">
                    <div class="carousel_image">
                        <img src="../assets/image/banner1.png" width=" 10px" alt="...">
                    </div>
                    <div class="carousel-caption d-none d-md-block">
                        <RouterLink to="/Shop" type="button" class="btn btn-primary">Shop Now</RouterLink>
                        <p>Some representative placeholder content for the first slide.</p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden ">Next</span>
            </button>
        </div>
    </div>
    <div class="list_product">
        <div class="list">
            <h2>Latest Product</h2>
        </div>
        <section>
            <div class="cart_home">
                <div v-for="product in products" :key="product._id" class="cart_product"
                    @mouseover="showGoShop(product._id)" @mouseleave="hideGoShop(product._id)">
                    <div class="home_pic">
                        <img :src="`${product.image}`" alt="Product Image"
                            :style="{ opacity: isHovered(product._id) ? 0.8 : 1 }" />
                        <div class="go-shop-text" v-show="hoveredProduct === product._id">
                            <RouterLink to="/Shop" class="btn btn-primary">Go Shop</RouterLink>
                            <p>{{ product.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
const apiUrl = 'https://colorful-dog-teddy.cyclic.app';

export default {
    data() {
        return {
            products: [], // Add a data property for storing products
            hoveredProduct: null,
        };
    },
    created() {
        this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            try {
                const response = await axios.get(`${apiUrl}/products`, {
                    // Add any necessary parameters for fetching data
                });
                this.products = response.data.reverse(); // Reverse the array to show newest first
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        addToCart(product) {
            // Implement your addToCart logic if needed
        },
        showGoShop(productId) {
            this.hoveredProduct = productId;
        },
        hideGoShop(productId) {
            this.hoveredProduct = null;
        },
        isHovered(productId) {
            return this.hoveredProduct === productId;
        },
    },
};
</script>
<style scoped>
  .slider {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .carousel {
    width: 95%;
  }

  .carousel-inner {
    width: 100%; /* Make sure the carousel items take full width */
  }

  .carousel-item {
    width: 100%;
  }

  .carousel_image {
    height: 350px;
  }

  .carousel-item img {
    height: 100%;
    width: 100%;
    border-radius: 0.5rem;
    object-fit: cover;
  }

  /* Add media query for mobile responsiveness */
  @media (max-width: 768px) {
    .carousel_image {
      height: 200px; /* Adjust the height for mobile devices */
    }
  }
</style>
