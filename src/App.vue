
<template>
  <NavBar />
  <RouterView />
  <Footer_page />
</template>
<script>
import { RouterLink, RouterView } from 'vue-router';
import NavBar from './views/navbar_page.vue';
import Footer_page from './components/Footer.vue';
export default {
  components:{
    NavBar,
    Footer_page
  }
};
</script>