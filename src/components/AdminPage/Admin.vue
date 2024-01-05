<template>
    <section>
        <div class="board_admin">
            <div class="item_admin">
                <div class="add">
                  <span @click="toglecreate"><i class="fa-solid fa-square-plus"></i></span>
                  <h5>Add item</h5>
                  <postproduct v-if="openproduct" :togleclose="toglecreate"/>
                </div>
                <!-- <div class="edit">
                  <span @click="togleUpdate"><i class="fa-solid fa-pen-to-square"></i></span>
                  <h5>Edit item</h5>
                  <Updateproduct v-if="openUpdate" :togleclose="togleUpdate"/>
                </div>
                <div class="delete">
                  <span @click="togleDelete"><i class="fa-solid fa-trash-can"></i></span>
                  <h5>delete</h5>
                  <deleteproduct  v-if="openDelete" :togleclose="togleDelete"/>
                </div> -->
                <div class="see_all" @click="SeeAllProduct">
                    <span><i class="fa-regular fa-eye"></i></span>
                      <h5>See all item</h5> 
                    <!-- <h5>See all item</h5> -->
                </div>
            </div>
            <div>
                <h5 class="text-decoration-underline w-auto mb-4">Ordered list</h5>
            </div>
            <table class="table w-75">
            <thead class="table-primary">
                <tr class="fw-bolder">
                <th scope="col">ID</th>
                <th scope="col">User</th>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th></th>
                </tr>
            </thead>
            <tbody class="table-group-divider fw-medium">
                <tr v-for="order in orders" :key="order._id">
                <th scope="row">{{ order.orderID }}</th>
                <td>{{ order.user.fullName }}</td>
                <td>{{ order.product.name }}</td> <!-- Adjust based on your data structure -->
                <td>{{ order.quantity }}</td>
                <td class="text-danger">{{ order.totalPrice }}</td> <!-- Assuming totalPrice is the price of the order -->
                <td>{{ order.orderDate }}</td>
                <td>{{ order.status }}</td>
                <td>
                    <button type="button" class="btn btn-success" @click="approveOrder(order._id)">Approve</button>
                    <button type="button" class="btn btn-danger" @click="rejectOrder(order._id)">Reject</button>
                </td>
                </tr>
            </tbody>
            </table>

        </div>
    </section>

</template>

<script>
import axios from 'axios';
import postproduct from './crudpage/postproduct.vue';
import Updateproduct from './crudpage/Updateproduct.vue';
import deleteproduct from './crudpage/deleteproduct.vue';
import Seeallproduct from './crudpage/seeallproduct.vue';
const apiUrl = 'https://colorful-dog-teddy.cyclic.app';

export default {
  components:{
    postproduct,
    Updateproduct,
    deleteproduct,
    Seeallproduct
  },
  data() {
    return {
      orders: [], // Holds the dynamic data
      openproduct:false,
      openUpdate:false,
      openDelete:false,
      openView: false,
    };
  },
  mounted() {
    // Fetch data when the component is mounted
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        // Replace 'http://your-api-endpoint' with your actual API endpoint
        const response = await axios.get(`${apiUrl}/orderedItems`);
        console.log(response.data);
        this.orders = response.data;
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
    async approveOrder(orderId) {
      try {
        // Send a PUT request to update the order status to 'approved'
        await axios.put(`${apiUrl}/orders/${orderId}/status`, {
          status: 'approved',
          adminComments: 'Order approved by admin.',
        });

        // After updating the order status, refresh the list of orders
        this.fetchOrders();
      } catch (error) {
        console.error(`Error approving order with ID ${orderId}:`, error);
      }
    },

    async rejectOrder(orderId) {
      try {
        // Send a PUT request to update the order status to 'rejected'
        await axios.put(`${apiUrl}/orders/${orderId}/status`, {
          status: 'rejected',
          adminComments: 'Order rejected by admin.',
        });

        // After updating the order status, refresh the list of orders
        this.fetchOrders();
      } catch (error) {
        console.error(`Error rejecting order with ID ${orderId}:`, error);
      }
    },
    toglecreate(){
        this.openproduct =!this.openproduct;
    },
    togleUpdate(){
        this.openUpdate =!this.openUpdate
    },
    togleDelete(){
        this.openDelete =!this.openDelete
    },
    togleSeeProduct(){
        this.openView =!this.openView
    },
    SeeAllProduct(){
      this.$router.push('/product-list')
    }
  },
};
</script>

<style scoped></style>