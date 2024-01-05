<template>
  <div class="popup">
    <div class="popup_inner">
      <h1>Admin Product Creation</h1>
      <form @submit.prevent="addProduct">
        <div class="create_item">
          <div class="create_1">
            <div class="form-group">
              <label for="name">Product Name:</label>
              <input v-model="formData.name" type="text" placeholder="Enter product name..." id="name" required>
            </div>
            <div class="form-group">
              <label for="t1">CPU and GPU:</label>
              <input v-model="formData.title.t1" type="text" placeholder="Enter CPU and GPU..." id="cpu" required>
            </div>
            <div class="form-group">
              <label for="t2">Ram:</label>
              <input v-model="formData.title.t2" type="text" placeholder="Enter ram..." id="ram" required>
            </div>
            <div class="form-group">
              <label for="t3">Storage:</label>
              <input v-model="formData.title.t3" type="text" placeholder="Enter storage..." id="storage" required>
            </div>
            <div class="form-group">
              <label for="t4">Display:</label>
              <input v-model="formData.title.t4" type="text" placeholder="Enter display..." id="display" required>
            </div>
            <div class="form-group">
              <label for="t5">OS:</label>
              <input v-model="formData.title.t5" type="text" placeholder="Enter OS..." id="os" required>
            </div>
          </div>
          <div class="create_1">
            <div class="form-group">
              <label for="price">Price:</label>
              <input v-model.number="formData.price" type="number" placeholder="Enter price..." id="price" required>
            </div>

            <div class="form-group">
              <label for="year">Year:</label>
              <input v-model.number="formData.year" type="text" placeholder="Enter year..." id="year" required>
            </div>

            <div class="form-group">
              <label for="type">Type:</label>
              <input v-model="formData.type" type="text" placeholder="Enter type..." id="type" required>
            </div>

            <div class="form-group">
              <label for="image">Image URL:</label>
              <input v-model="formData.image" required placeholder="URL image........."><br>
              <div class="view_image">
                <img v-if="formData.image" :src="formData.image" alt="Product Image"><br>
              </div>
            </div>
          </div>
        </div>
        <div class="controll">
          <button class="btn bg-danger" @click="togleclose">Close</button>
          <button type="submit" :disabled="isLoading" class="btn bg-success">Create</button>
          <div v-if="isLoading" class="loading">Loading...</div>
        </div>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
const apiUrl = 'https://colorful-dog-teddy.cyclic.app';

export default {
  props: {
    togleclose: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      formData: {
        name: '',
        title: {
          t1: '',
          t2: '',
          t3: '',
          t4: '',
          t5: ''
        },
        price: null,
        year: '',
        image: ''
      },
      isLoading: false,
      error: null
    };
  },
  methods: {
    async addProduct() {
      try {
        this.isLoading = true;
        this.error = null;

        // Validate form before making the request
        if (!this.validateForm()) {
          this.isLoading = false;
          return;
        }

        // The actual HTTP request
        const response = await axios.post(`${apiUrl}/products`, this.formData);
        Swal.fire({
          icon: "success",
          title: "Done",
          text: "Create product is success!",
        });
        this.togleclose();
        console.log('Product added successfully:', response.data);

        // Optionally, reset the form or perform other actions

      } catch (error) {
        console.error('Error adding product:', error);

      } finally {
        this.isLoading = false;
      }
    },
    validateForm() {
      return Object.values(this.formData).every(value => {
        if (typeof value === 'object') {
          return Object.values(value).every(subValue => {
            console.log(subValue); // Add this line
            return subValue.trim() !== '';
          });
        }
        console.log(value); // Add this line
        return value !== null && value !== undefined && value.toString().trim() !== '';
      });
    }

  }
};
</script>
  