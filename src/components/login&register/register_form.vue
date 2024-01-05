<template>
  <div class="container" id="signup">
    <div class="cart_form">
      <h2>Register Now</h2>
      <form @submit.prevent="saveData">
        <label for="fullName">Full Name:</label>
        <i class="fa-solid fa-user"></i>
        <input type="text" id="fullName" v-model="registerData.fullName" placeholder="Full Name..." required>

        <label for="emailReg">Email address:</label>
        <i class="fa-regular fa-envelope"></i>
        <input type="email" id="emailReg" v-model="registerData.email" placeholder="Email..." required>

        <label for="passwordReg">Password:</label>
        <i class="fa-solid fa-lock"></i>
        <input type="password" id="passwordReg" v-model="registerData.password" placeholder="Password..." required>

        <label for="confirmPassword">Confirm Password:</label>
        <i class="fa-solid fa-lock"></i>
        <input type="password" id="confirmPassword" v-model="registerData.confirmPassword"
          placeholder="Confirm Password..." required>

        <div class="z-1 d-flex flex-column justify-content-center align-items-center">
          <button type="submit" :disabled="loading">Register</button>
          <span v-if="loading">Registering...</span>
          <span>Or</span>
          <div class="google">
            <div>
              <img src="../../assets/image/google.png" alt="" width="20px">
            </div>
            <a href="#">Register with Google</a>
          </div>
          <span class="text-secondary">Already have an account?</span>
          <p class="li" @click="islogin()">Log in</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import zxcvbn from 'zxcvbn';
const apiUrl = 'https://colorful-dog-teddy.cyclic.app';

export default {
  data() {
    return {
      registerData: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      loading: false,
      passwordStrength: {
        score: 0,
        feedback: '',
      },
    };
  },
  methods: {
    async saveData() {
      try {
        this.loading = true;

        // Check password strength before submitting
        this.checkPasswordStrength();

        if (this.passwordStrength.score < 3) {
          // Inform the user that the password is weak
          Swal.fire({
            icon: 'warning',
            title: 'Weak Password',
            text: 'Please choose a stronger password.',
          });
          return;
        }

        // Check if passwords match
        if (this.registerData.password !== this.registerData.confirmPassword) {
          Swal.fire({
            icon: 'error',
            title: 'Password Mismatch',
            text: 'Passwords do not match. Please confirm your password.',
          });
          return;
        }

        // Continue with registration logic
        const response = await axios.post(`${apiUrl}/register`, this.registerData);

        console.log('Data saved:', response.data);
        this.$router.push('/');
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Register is success!',
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        this.$router.push('/').then(() => {
          // Reload the page after successful login
          window.location.reload();
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Registration failed. Please try again.',
        });
        console.error('Error saving data:', error);
      } finally {
        this.loading = false;
      }
    },

    checkPasswordStrength() {
      const result = zxcvbn(this.registerData.password);

      this.passwordStrength.score = result.score;
      this.passwordStrength.feedback = result.feedback.suggestions.join(' ');
    },

    islogin() {
      this.$router.push('/acount/login');
    },
  },
};
</script>
