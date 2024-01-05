<template>
  <div class="popup">
    <div class="cart_id">
      <h1>Delete Product</h1>
      <div>
        <label for="productId">Enter Product ID:</label>
        <input v-model="productId" type="text" id="productId" name="productId" required>
        <div class="controll">
          <button class="btn bg-danger" @click="togleclose()">Cancel</button>
        <button @click="deleteProduct" class="btn bg-success">Delete</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const apiUrl = 'https://colorful-dog-teddy.cyclic.app';

export default {
  props:{
    togleclose:{
      type:Function,
      required:true
    }
  },
  data() {
    return {
      productId: '',
      deleteError: false,
    };
  },
  methods: {
    async deleteProduct() {
      this.deleteError = false;

      try {
        const response = await axios.delete(`${apiUrl}/products/${this.productId}`);
        console.log('Product deleted successfully:', response.data);
        Swal.fire({
          icon: "success",
          title: "Done",
          text: "Delete product is success!",
        });
        this.togleclose();
      } catch (error) {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
      }
    },
  },
};
</script>
