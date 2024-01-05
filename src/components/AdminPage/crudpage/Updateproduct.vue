<template>
  <div class="popup">
    <!-- v-if="formDataLoaded" -->
    <div class="popup_inner">
      <h1>Update Product</h1>
      <form @submit.prevent="submitForm">
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
              <input v-model="formData.image" required><br>
              <div class="view_image">
                <img v-if="formData.image" :src="formData.image" alt="Product Image"><br>
              </div>
            </div>

          </div>
        </div>
        <div class="controll">
          <button @click="togleclose" class="btn bg-danger">Close</button>
          <button type="submit" :disabled="isSubmitting" class="btn bg-success">
            <span v-if="isSubmitting">Updating...</span>
            <span v-else>Update</span>
          </button>
        </div>
        <!-- <span v-if="updateSuccess">Product updated successfully!</span>
        <span v-if="updateError">Error updating product. Please try again.</span> -->
      </form>
    </div>
    <!-- <div v-else class="cart_id">
      <label for="productId">Enter Product ID:</label>
      <input v-model="productId" type="text" id="productId" name="productId" required>
      <div class="controll">
        <button @click="togleclose" class="btn bg-danger">Cancel</button>
        <button @click="fetchProduct" class="btn bg-success">Find</button>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios';
const apiUrl = 'https://colorful-dog-teddy.cyclic.app';

export default {
  props: {
    togleclose: {
      type: Function,
      required: true,
    },
    productData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      productId: '',
      formData: {
        _id: '',
        name: '',
        price: null,
        year: "",
        image: '',
        type: '',
        title: {
          t1: '',
          t2: '',
          t3: '',
          t4: '',
          t5: '',
        }
      },
      isSubmitting: false,
      updateSuccess: false,
      updateError: false,
      formDataLoaded: false
    };
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await axios.get(`${apiUrl}/products/${this.productId}`);

        if (response && response.data) {
          const { id, name, title, year, price, image, type } = response.data;
          this.formData = {
            id,
            name,
            price,
            year,
            image,
            type,
            title: {
              t1: title.t1,
              t2: title.t2,
              t3: title.t3,
              t4: title.t4,
              t5: title.t5,
            },
          };
          this.formDataLoaded = true;
          console.log(this.formData);
        } else {
          console.error('Invalid API response:', response);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Product not found with the provided ID. Please enter a valid ID.',
          });
        }
      } catch (error) {
        this.handleFetchError(error);
      }
    },

    async submitForm() {
      this.isSubmitting = true;
      this.updateSuccess = false;
      this.updateError = false;

      try {
        console.log(this.formData);
        const response = await axios.put(`${apiUrl}/products/${this.formData._id}`, this.formData);
        console.log('Product updated successfully:', response.data);
        Swal.fire({
          icon: "success",
          title: "Done",
          text: "Update product is success!",
        });
        this.togleclose();
        // Optionally, clear the form or perform other actions after a successful update
      } catch (error) {
        console.error('Error updating product:', error.response ? error.response.data : error.message);
        this.updateError = true;
      } finally {
        this.isSubmitting = false;
      }
    },
    handleFetchError(error) {
      if (error.response && error.response.status === 404) {
        console.error('Product not found with the provided ID:', error.response.data.message);
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Can't find product ID !!",
        });
      } else {
        console.error('Error fetching product:', error.response ? error.response.data : error.message);
        alert('Error fetching product. Please try again.');
      }
    }
  },
  created() {
    this.formData = { ...this.productData }; // Pre-fill form data
  },
  togleclose() {
    this.togleclose(); // Invoke the provided toggleClose method from the parent component
  },
};
</script>

<style scoped>
/* Add your component-specific styles here if needed */
</style>
