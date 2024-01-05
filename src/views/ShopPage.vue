<template>
  <section>
    <div class="filter_p">
      <div class="Searching">
        <input type="text" v-model="searchProduct" @input="applySearch" placeholder="Search products...">
        <span @click="applySearch"><i class="fa-solid fa-magnifying-glass"></i></span>
      </div>
    </div>
    <div class="sort_by">
      <div class="sort">
        <label>Sort by:</label>
        <select v-model="selectedSortOption" @change="applySort">
          <option value="default">Default</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="year-asc">Year (Old to New)</option>
          <option value="year-desc">Year (New to Old)</option>
        </select>
      </div>
    </div>
  </section>
  <section>
    <div style="margin-bottom: 1rem;">
      <div>
        <div class="name_brand">
          <p>New Arrive</p>
        </div>
        <div class="line"></div>
        <div class="cart_items">
          <div v-for="product in filteredProducts" :key="product._id" class="cart">
            <div class="item_pic">
              <img :src="`${product.image}`" alt="Product Image" />
              <div class="social">
                <i class="fa-regular fa-heart" @click="toggleFavorite(product._id)"></i>
                <!-- send data to view_product-->
                <div>
                  <i @click="View_product(product)" class="fa-regular fa-eye"></i>
                  <View_product v-if="popup_product && selectProduct" :togle_view="View_product" :product="selectProduct"
                    :view_add_cart="addToCart" />
                  <!-- ////// -->
                </div>
              </div>
            </div>
            <div class="detail">
              <h1>{{ product.name }}</h1>
              <p>&#10004;{{ product.name }}</p>
              <p>&#10004; {{ product.title.t2 }}</p>
              <p>&#10004;{{ product.title.t3 }}</p>
              <p>&#10004; {{ product.title.t4 }}</p>
              <p>&#10004; {{ product.title.t5 }}</p>
            </div>
            <div class="price_pro">
              <h1>$ {{ product.price }}</h1>
              <span @click="addToCart(product)"><i class="fa-solid fa-cart-shopping"></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios';
import View_product from '@/components/View_product.vue';
import Favorite from '@/components/Favorite.vue';
import ViewProfile from '@/components/ViewProfile.vue';
const apiUrl = 'https://colorful-dog-teddy.cyclic.app';

export default {
  components: {
    View_product,
    Favorite,
    ViewProfile
  },
  data() {
    return {
      products: [],
      loading: true,
      searchProduct: '',
      selectedSortOption: 'default',
      selectedFilters: [],
      cartItemCount: 0,
      popup_product: false,
      selectProduct: null,
      favoriteProducts: [],
      clickfavorite: false,
    };
  },
  created() {
    this.fetchProducts();
  },
  computed: {
    filteredProducts() {
      let filtered = this.products.filter((product) => {
        const nameMatch = product.name && product.name.toLowerCase().includes(this.searchProduct.toLowerCase());
        const titleMatches = product.title && (
          ((product.title.t && product.title.t.toLowerCase().includes(this.searchProduct.toLowerCase())) || '') ||
          (product.title.t1 && product.title.t1.toLowerCase().includes(this.searchProduct.toLowerCase())) ||
          (product.title.t2 && product.title.t2.toLowerCase().includes(this.searchProduct.toLowerCase())) ||
          (product.title.t3 && product.title.t3.toLowerCase().includes(this.searchProduct.toLowerCase())) ||
          (product.title.t4 && product.title.t4.toLowerCase().includes(this.searchProduct.toLowerCase())) ||
          (product.title.t5 && product.title.t5.toLowerCase().includes(this.searchProduct.toLowerCase()))
        );
        return nameMatch || titleMatches;
      });

      if (this.selectedSortOption === 'price-asc') {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (this.selectedSortOption === 'price-desc') {
        filtered = filtered.sort((a, b) => b.price - a.price);
      } else if (this.selectedSortOption === 'year-asc') {
        filtered = filtered.sort((a, b) => (a.year || 0) - (b.year || 0));
      } else if (this.selectedSortOption === 'year-desc') {
        filtered = filtered.sort((a, b) => (b.year || 0) - (a.year || 0));
      }

      if (this.selectedFilters.length > 0) {
        filtered = filtered.filter((product) =>
          this.selectedFilters.some((filter) => product.attributes.includes(filter))
        );
      }

      return filtered;
    },
  },
  methods: {
    View_product(product) {
      this.selectProduct = product
      this.popup_product = true
    },
    async fetchProducts() {
      try {
        // Assume you have a Node.js server running with Express and Mongoose
        const response = await axios.get(`${apiUrl}/products`, {
          params: {
            search: this.searchProduct,
            sort: this.selectedSortOption === 'default' ? '' : this.selectedSortOption.toLowerCase(),
          },
        });

        this.products = response.data.map(product => ({ ...product, quantity: 0 })).reverse();
        this.loading = false;
      } catch (error) {
        console.error('Error fetching products:', error);
        this.loading = false;
      }
    },
    async applySearch() {
      this.loading = true;
      try {
        await this.fetchProducts();
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        this.loading = false;
      }
    },


    async addToCart(product) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      console.log('Token:', token);
      console.log('UserId:', userId);
      if (!token || !userId) {
        // User is not logged in, prompt them to log in or redirect to the login page
        Swal.fire({
          icon: "error",
          title: "Faill",
          text: "please login or register !!",
        });
        // Redirect to the login page
        this.$router.push('/acount/login');
        return;
      }
      const quantity = 1; // Define the quantity variable here or adjust as needed

      try {
        // Check if the product is defined before accessing its properties
        if (product && product._id) {
          // Make a POST request to add the product to the user's cart
          const response = await axios.post(`${apiUrl}/add-to-cart`, {
            userId: userId,
            productId: product._id,
            quantity: quantity, // Use the defined quantity variable
          });
          Swal.fire({
            icon: "success",
            title: "Done",
            text: "Add to cart is successfully!!",
          });
          console.log('Added to cart:', response.data);
          // Optionally, you can update the local cart state or take other actions
        } else {
          console.error('Invalid product:', product);
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    },


    // Fetch cart items when the component is created
    async fetchCartItems() {
      const userId = 'your-user-id'; // Replace with the actual user ID

      try {
        const response = await axios.get(`${apiUrl}/cart/${userId}`);
        this.cart = response.data;
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },

    // New method for sorting
    applySort() {
      this.loading = true;
      try {
        this.fetchProducts();
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        this.loading = false;
      }
    },

    async toggleFavorite(productId) {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        console.log('User ID:', userId);
        console.log('Product ID:', productId);

        if (!token || !userId) {
          Swal.fire({
            icon: 'error',
            title: 'Fail',
            text: 'Please login or register!',
          });
          this.$router.push('/acount/login');
          return;
        }

        // Check if the product is already in favorites
        const isFavorite = this.isProductFavorite(productId);

        console.log('Is Favorite:', isFavorite);

        if (isFavorite) {
          Swal.fire({
            icon: 'info',
            title: 'Info',
            text: 'This product is already in your favorites!',
          });
        } else {
          // Product is not in favorites, proceed with adding it
          const response = await axios.post(`${apiUrl}/add/favorites`, {
            userId: userId,
            productId: productId,
          });
          Swal.fire({
              icon: 'success',
              title: 'Done',
              text: 'Added to favorites successfully!',
            });
          console.log('Response from server:', response.data);

          // Update your local state or perform other actions

        }
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    },

    isProductFavorite(productId) {
      // Assuming you have a list of favorite productIds in this.favoriteProducts
      return this.favoriteProducts.some((favoriteId) => favoriteId === productId);
    }

  }
};
</script>
