<template>
  <div class="main-login">
    <div class="container" id="login">
      <div class="cart_form">
        <h2>Login Form</h2>
        <form @submit.prevent="handleLogin">
          <label>Email address:</label>
          <i class="fa-regular fa-envelope"></i>
          <input type="email" id="loginEmail" v-model="loginData.email" placeholder="Email..." required>
          <label for="loginPassword">Password:</label>
          <i class="fa-solid fa-lock"></i>

          <input type="password" id="loginPassword" v-model="loginData.password" placeholder="Password..." required>

          <div class="z-1 d-flex flex-column justify-content-center align-items-center">
            <button type="submit" class="btn btn-primary">Login</button>
            <span>Not a member? <a @click="toggleForm">Register</a></span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
const apiUrl = 'https://colorful-dog-teddy.cyclic.app';

export default {
  data() {
    return {
      isLoggedIn: true,
      loginData: {
        email: '',
        password: '',
      },
      fetchedUserData: null,
    };
  },
  methods: {
    handleLogin() {
      axios.post(`${apiUrl}/login`, this.loginData)
        .then(response => {
          console.log('Login successful', response.data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('userRole', response.data.userRole);
          this.$router.push('/').then(() => {
            window.location.reload();
          });
        })
        .catch(error => {
          console.error('Login failed', error.response.data);
          Swal.fire({
            icon: "error",
            title: "Fail",
            text: "Please login again!",
          });
        });
    },
    handleLogin() {
      axios.post(`${apiUrl}/login`, this.loginData)
        .then(response => {
          console.log('Login successful', response.data);
          // alert('Login successful!');
          Swal.fire({
            icon: "success",
            title: "Done",
            text: "Login is success!",
          });
          // Store the token in localStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('userRole', response.data.userRole);
          console.log('Login successful. Token:', response.data.token);
          console.log('User ID:', response.data.userId);
          console.log('User Role:', response.data.userRole);
          this.$router.push('/').then(() => {
            // Reload the page after successful login
            window.location.reload();
          });
        })
        .catch(error => {
          console.error('Login failed', error.response.data);
          Swal.fire({
            icon: "error",
            title: "Fail",
            text: "please login again!",
          });
        });
    },

    mounted() {
      const isLoggedIn = localStorage.getItem('token');
      if (isLoggedIn) {
        this.$router.push('/');
      }
    },

    toggleForm() {
      this.isRegister = !this.isRegister;
      this.$router.push('/acount/register')
    },
  },
};
</script>
<style scoped></style>