<template>
    <div class="contact_us d-flex align-item-center gap-5">
        <div class="contact_image">
            <img src="../assets/image/contact_us1.jpg" alt="">
        </div>
      <div class="form_contact">
        <h3 style="text-align: center;">Contact Form</h3>
        <form @submit.prevent="submitForm">
          <div>
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="formData.name" required />
          </div>
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="formData.email" required />
          </div>
          <div>
            <label for="message">Message:</label>
            <textarea id="message" v-model="formData.message" required></textarea>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        formData: {
          name: '',
          email: '',
          message: '',
        },
      };
    },
    methods: {
      submitForm() {
        console.log('Form submitted:', this.formData);
        alert("submit is successfully !!")
        this.formData={
             name: '',
             email: '',
            message: '',
        }
        // For a real application, you may want to use a library like Axios to send the form data to a server.
      },
    },
  };
  </script>