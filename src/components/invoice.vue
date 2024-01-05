<template>
    <section>
      <div class="invoice-container">
        <h2>Invoice</h2>
        <div v-for="item in cartItems" :key="item.productDetail._id" class="invoice-item">
          <input type="checkbox" v-model="selectedItems" :value="item.productDetail._id" />
          <div class="invoice-details">
            <p>{{ item.productDetail.name }}</p>
            <!-- Add other product details here -->
            <p>Quantity: {{ item.cartItem.quantity }}</p>
            <p>Price: ${{ item.productDetail.price * item.cartItem.quantity }}</p>
          </div>
        </div>
        <div class="invoice-total">
          <p>Total Price: ${{ calculateTotalPrice() }}</p>
          <button @click="placeOrder" :disabled="!haveSelectedItems">Place Order</button>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import axios from 'axios';
const apiUrl = 'https://colorful-dog-teddy.cyclic.app';
  
  export default {
    data() {
      return {
        cartItems: [], // Replace this with your actual cart items
        selectedItems: [],
      };
    },
    created() {
      this.fetchProducts();
    },
    computed: {
      haveSelectedItems() {
        return this.selectedItems.length > 0;
      },
    },
    methods: {
      calculateTotalPrice() {
        return this.cartItems
          .filter(item => this.selectedItems.includes(item.productDetail._id))
          .reduce((total, item) => total + item.productDetail.price * item.cartItem.quantity, 0)
          .toFixed(2);
      },
      async fetchProducts() {
        try {
          const token = localStorage.getItem('token');
          const userId = localStorage.getItem('userId');
  
          if (token && userId) {
            // Send a request to your server to fetch products based on the user's cart
            const response = await axios.get(`${apiUrl}/cart/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
  
            console.log('Response from /cart/:userId:', response.data);
  
            this.cartItems = response.data.map(product => ({ ...product, quantity: 0 }));
          } else {
            // If no token or userId is found, fetch products without considering the user's cart
            const response = await axios.get(`${apiUrl}/products`, {
              params: {
                // Add other parameters if needed
              },
            });
  
            this.cartItems = response.data.map(product => ({ ...product, quantity: 0 }));
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      },
      async placeOrder() {
        try {
          const userId = localStorage.getItem('userId');
  
          // Create an array of product IDs and quantities for the order
          const orderItems = this.cartItems
            .filter(item => this.selectedItems.includes(item.productDetail._id))
            .map(item => ({
              product: item.productDetail._id,
              price: item.productDetail.price,
              quantity: item.cartItem.quantity,
            }));
  
          // Send a POST request to your server to place the order
          const response = await axios.post(`${apiUrl}/orders/${userId}`, { orderItems });
  
          // Process the response as needed
          console.log('Order placed successfully!', response.data);
  
          // Optionally, clear the cart after placing the order
          // await this.clearCart();
  
          // Redirect to a confirmation or thank you page
          this.$router.push({ name: 'payment' });
        } catch (error) {
          console.error('Error placing order:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  