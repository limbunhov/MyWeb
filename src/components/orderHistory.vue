<template>
    <div>
      <h2>Order History</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Order Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orderedItems" :key="order._id">
            <td>{{ order.orderID }}</td>
            <td>{{ order.product.name }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ order.totalPrice }}</td>
            <td>{{ formatDate(order.orderDate) }}</td>
            <td>{{ order.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
const apiUrl = 'https://colorful-dog-teddy.cyclic.app';

  export default {
    data() {
      return {
        orderedItems: [], // The ordered items will be fetched and stored here
      };
    },
    created() {
      // Fetch the user's ordered history when the component is created
      this.fetchOrderedHistory();
    },
    methods: {
      async fetchOrderedHistory() {
        try {
            const userId = localStorage.getItem('userId');
          // Make an API request to fetch the user's ordered history
          // Replace 'userId' with the actual user ID or fetch it from your authentication system
          const response = await axios.get(`${apiUrl}/orders/${userId}`);
          console.log(response.data);
          // Update the data with the fetched ordered items
          this.orderedItems = response.data;
        } catch (error) {
          console.error('Error fetching ordered history:', error);
          // Handle error, show message to the user
        }
      },
      formatDate(dateString) {
        // You can use a library like moment.js to format the date, or implement your own logic
        return new Date(dateString).toLocaleDateString();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  