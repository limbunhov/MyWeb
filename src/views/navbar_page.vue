<template>
  <div class="navbar navbar-light narbar-expand-lg">
    <div>
      <div @click="toggleMenuBar()" class="menu">
        <i class="fa-solid fa-bars"></i>
        <span>Categories</span>
      </div>
      <menubar v-if="isOpen" />
    </div>
    <div class="catagary">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/Shop">Shop </RouterLink>
      <RouterLink to="/about">About </RouterLink>
      <RouterLink v-if="isLoggedInFromStorage && userRole === 'admin'" to="/adminpage">DeskBoard</RouterLink>
      <RouterLink v-else to="/Contact">Contact Us</RouterLink>

      <!-- <RouterLink to="/crudproduct">CrudProduct</RouterLink> -->
    </div>
    <div class="information">
      <RouterLink to="/favorite">
        <i class="fa-solid fa-heart"></i>
      </RouterLink>
      <RouterLink to="/card">
        <div class="cart_count">
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
      </RouterLink>
      <!-- Conditional rendering based on user login state -->
      <i @click="acount_profile()" class="fa-solid fa-user">
        <div v-if="Account">
          <div v-if="!isLoggedInFromStorage">
            <div class="card_member">
              <div class="d-flex justify-content-center align-items-center gap-1">
                <RouterLink to="/acount/login" class="btn bg-info">Log in</RouterLink>
                <h5>OR</h5>
                <RouterLink to="/acount/register" class="btn bg-success">Register</RouterLink>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="card_member">
              <div class="d-flex justify-content-center align-items-center gap-1">
                <RouterLink to="/profile" class="btn bg-info">View Profile</RouterLink>
                <h5>OR</h5>
                <button class="btn bg-danger" @click="handleLogout">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </i>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
const apiUrl = 'https://colorful-dog-teddy.cyclic.app';

export default {
  data() {
    return {
      isOpen: false,
      Account: false,
      isLoggedInFromStorage: false,
      userRole: 'user',
      userId: null,
    };
  },
  created() {
    const storedToken = localStorage.getItem('token');
    this.isLoggedInFromStorage = !!storedToken;

    if (this.isLoggedInFromStorage) {
      this.userRole = localStorage.getItem('userRole');
      this.userId = localStorage.getItem('userId');
      this.fetchUserRole();
    }
  },
  methods: {
    async fetchUserRole() {
      try {
        const response = await axios.get(`${apiUrl}/user/${this.userId}`);
        this.userRole = response.data.user.role;
        this.userID= response.data.user.userID;
        console.log('hello',this.userRole)
        console.log('userID =',this.userID)
      } catch (error) {
        console.error('Error fetching user role:', error.response.data);
      }
    },

    toggleMenuBar() {
      this.isOpen = !this.isOpen;
      console.log('you clicked me');
    },

    acount_profile() {
      this.Account = !this.Account;
    },

    async handleLogout() {
      try {
        await axios.post(`${apiUrl}/logout`);
        console.log('Logout successful');
        // Clear the token and user-related data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        // Redirect to the login page
        this.$router.push('/acount/login');
        this.Account = false;
        this.isLoggedInFromStorage = false;
      } catch (error) {
        console.error('Logout failed', error.response.data);
        // Handle logout failure (optional)
      }
    },
  },
};
</script>

