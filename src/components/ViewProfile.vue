<template>
    <div v-for="userData in user" class="bord_profile">
        <div  class="profile_p">
            <img src="../assets/image/profile.png" alt="">
        </div>
        <div class="detail_pro">
            <h1>Username : <span>{{ userData.fullName }}</span></h1>
            <h1>Email : <span>{{ userData.email }}</span></h1>
            <h1>Role : <span>{{ userData.role }}</span></h1>
        </div>
        <RouterLink to="/acount/register" class="btn bg-danger ">Logout</RouterLink>
        <RouterLink to="/order-history" class="btn">Order History</RouterLink>
    </div>
</template>
<script>
 import axios from 'axios';
import { RouterLink } from 'vue-router';
const apiUrl = 'https://colorful-dog-teddy.cyclic.app';

export default{
    data() {
        return {
            user: [],
            // userlist: [
            //     { id: 1, name: 'salin', email: 'salin@gmail.com', contact: '093471111' }
            // ]
        };
    },
    components: { RouterLink },
    created(){
        this.fetchUser();
    },
    methods: {
        async fetchUser(){
            try{
                const userId = localStorage.getItem('userId');
                console.log(userId);

                const response = await axios.get(`${apiUrl}/user/${userId}`);
                this.user  = response.data;  

                console.error(response.data);
            }
            catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    }
}

</script>