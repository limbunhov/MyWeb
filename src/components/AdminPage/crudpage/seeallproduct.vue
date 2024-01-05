<template>
    <div>
      <h1>Product List</h1>
      <div class="search-bar">
        <label for="search">Search:</label>
        <input v-model="searchQuery" type="text" id="search" @input="filterProducts" />
      </div>
      <div class="line"></div>
      <div class="shop-product">
        <div class="scroll">
            <div v-for="product in filteredProducts" :key="product._id" class="product-item">
            <div class="p1">
              <img :src="product.image" alt="Product Image" />
            </div>
            <div class="details-p1">
              <h2>{{ product.name }}</h2>
              <p>CPU and GPU: {{ product.title.t1 }}</p>
              <p>Ram: {{ product.title.t2 }}</p>
              <p>Storage: {{ product.title.t3 }}</p>
              <p>Display: {{ product.title.t4 }}</p>
              <p>OS: {{ product.title.t5 }}</p>
              <p>Price: ${{ product.price }}</p>
              <p>Year: {{ product.year }}</p>
            </div>
            <div class="prices-p1">
                <button @click="toggleUpdate(product)">Update</button>
                <Updateproduct
                v-if="openUpdate"
                :productData="selectedProductForUpdate"
                :togleclose="toggleUpdate"
                />
              <button @click="deleteProduct(product._id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
import Updateproduct from './Updateproduct.vue';
const apiUrl = 'https://colorful-dog-teddy.cyclic.app';
  
  export default {
    components: {
        Updateproduct,
    },
    data() {
      return {
        products: [],
        searchQuery: '',
        openUpdate:false,
        selectedProductForUpdate: null,
      };
    },
    computed: {
      filteredProducts() {
        // Implement search logic based on your requirements
        const query = this.searchQuery.toLowerCase();
        return this.products.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.title.t1.toLowerCase().includes(query) ||
            product.title.t2.toLowerCase().includes(query) ||
            product.title.t3.toLowerCase().includes(query) ||
            product.title.t4.toLowerCase().includes(query) ||
            product.title.t5.toLowerCase().includes(query)
        );
      },
    },
    mounted() {
      this.fetchProducts();
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await axios.get(`${apiUrl}/products`);
          this.products = response.data;
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      },

      toggleUpdate(product) {
        this.selectedProductForUpdate = { ...product }; // Ensure you create a copy of the product data
        this.openUpdate = !this.openUpdate;
    },


    //   async updateProduct(productId) {
    //   try {
    //     // Implement your logic to navigate to the update product page or modal
    //     console.log('Update product with ID:', productId);

    //     // If you want to update the product data on the server, send a PUT request
    //     const updatedProductData = { /* Your updated product data */ };
    //     const response = await axios.put(`http://localhost:3000/products/${productId}`, updatedProductData);

    //     console.log('Product updated successfully:', response.data);

    //     // Optionally, update the product list after updating
    //     this.fetchProducts();
    //   } catch (error) {
    //     console.error('Error updating product:', error);
    //   }
    // },

      async deleteProduct(productId) {
        try {
          // Implement your logic to confirm deletion and send a DELETE request
          const confirmed = confirm('Are you sure you want to delete this product?');
          if (confirmed) {
            await axios.delete(`${apiUrl}/products/${productId}`);
            // Optionally, update the product list after deletion
            this.fetchProducts();
          }
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      },
      filterProducts() {
        // Triggered on each input change, you can debounce if needed
        // For simplicity, the filtering is done on the client side
        // You can also implement server-side search based on your backend capabilities
        // Update the filteredProducts computed property based on your search logic
      },
    },
  };
  </script>
 
 <style scoped>
 h1 {
   text-align: center;
   margin-bottom: 20px;
 }

 .search-bar {
   text-align: center;
   margin-bottom: 20px;
 }

 .line {
   border-bottom: 1px solid #ccc;
   margin-bottom: 20px;
 }

 .shop-product {
   display: flex;
   justify-content: center;
 }

 .scroll {
   max-width: 800px; /* Adjust based on your design */
   overflow-y: auto;
 }

 .product-item {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 20px;
   padding: 10px;
   border: 1px solid #ccc;
 }

 .p1 img {
   max-width: 250px; /* Set your preferred max-width for the product images */
   margin-right: 10px; /* Add margin to separate the image from product details */
 }

 .details-p1 {
   flex-grow: 1;
   padding-right: 10px;
 }

 .prices-p1 {
    display: flex;
    flex-direction: column; /* Change to column */
    align-items: flex-start; /* Align items to the start of the container */
    margin-top: 10px; /* Adjust margin for spacing between buttons */
  }

  .prices-p1 button {
    margin-bottom: 5px; /* Adjust margin for spacing between buttons */
    padding: 8px 12px; /* Adjust padding for button size */
    font-size: 14px; /* Adjust font size */
  }
</style>