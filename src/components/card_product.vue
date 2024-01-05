<template>
    <section>
      <div class="card_item_pro">
        <div class="list">
          <h5>Shopping cart</h5>
        </div>
        <div class="clear">
          <h5 @click="clearall()">Clear all</h5>
        </div>
        <div class="line"></div>
        <div class="shop_product">
          <div>
            <div class="scroll">
                <div v-for="cartItem in products" :key="cartItem.productDetail._id" class="shop_p1">
                <div class="p1">
                    <img :src="`${cartItem.productDetail.image}`" alt="Product Image" />
                </div>
                <div class="details_p1">
                <p>{{ cartItem.productDetail.name }}</p>
                <!-- Add other.as needed -->
                <p>{{ cartItem.productDetail.title.t1 }}</p>
                <p>{{ cartItem.productDetail.year }}</p>
                </div>
                <div class="add_remove">
                  <i class="fa-solid fa-minus" @click="removeOneFromCart(cartItem.productDetail._id)"></i>
                  <div class="num_p1">
                    <span>{{ cartItem.cartItem.quantity }}</span>
                  </div>
                  <i class="fa-solid fa-plus" @click="addOneToCart(cartItem.productDetail._id)"></i>
                </div>
                <div class="prices_p1">
                <i class="fa-solid fa-trash" @click="remove_product(cartItem.productDetail._id)"></i>
                <h1>{{ `$${cartItem.productDetail.price * cartItem.cartItem.quantity}` }}</h1>
                </div>
              </div>
            </div>
          </div>
          <div v-if="haveproduct" class="addTopay" @click="proceedToPay">
            <h4>PROCEED TO PAY</h4>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  
<script>
import axios from 'axios';
const apiUrl = 'https://colorful-dog-teddy.cyclic.app';

export default {
    data() {
    return {
        products: [],
        haveproduct: true,
        selectedSortOption: 'default', // Add this line
    };
},

    created() {
        this.fetchProducts()

    },

    methods: {
        async fetchProducts() {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                if (token && userId) {
                // Send a request to your server to fetch products based on the user's cart
                const response = await axios.get(`${apiUrl}/cart/${userId}`, {
                    params: {
                    search: this.searchProduct,
                    sort: this.selectedSortOption === 'default' ? '' : this.selectedSortOption.toLowerCase(),
                    },
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                });

                console.log('Response from /cart/:userId:', response.data);

                this.products = response.data.map(product => ({ ...product, quantity: 0 }));
                this.loading = false;
                } else {
                // If no token or userId is found, fetch products without considering the user's cart
                const response = await axios.get(`${apiUrl}/products`, {
                    params: {
                    search: this.searchProduct,
                    sort: this.selectedSortOption === 'default' ? '' : this.selectedSortOption.toLowerCase(),
                    },
                });

                this.products = response.data.map(product => ({ ...product, quantity: 0 }));
                this.loading = false;
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                this.loading = false;
            }
        },
        async remove_product(productId) {

            try {
                const userId = localStorage.getItem('userId');
                // Make a DELETE request to your API endpoint to remove the item by ID
                await axios.delete(`${apiUrl}/cart/${userId}/${productId}`);

                // Update the local state after removing the item
                this.products = this.products.filter(product => product.productDetail._id !== productId);
                this.haveproduct = this.products.length > 0;

                console.log(`Item with ID ${productId} removed from the cart successfully!`);
            } catch (error) {
                console.error(`Error removing item with ID ${productId} from the cart:`, error);
            }
        },

        async clearall() {
            try {
                // Assuming you have a way to get the user ID (replace 'getUserId()' with the actual function)
                const userId = localStorage.getItem('userId');

                // Send a DELETE request to clear the cart for the specific user on the server
                await axios.delete(`${apiUrl}/cart/${userId}`);

                // Update the local state
                this.products = [];
                this.haveproduct = false;

                console.log('Cart cleared successfully!');
            } catch (error) {
                // Handle errors
                console.error('Error clearing cart:', error.message);
                // You might want to show a user-friendly error message here
            }
        },


        removeOneFromCart(productId) {
            const product = this.products.find(item => item.productDetail._id === productId);

            if (product && product.cartItem.quantity > 1) {
                // If the quantity is more than 1, decrement it
                this.updateCartItemQuantity(productId, product.cartItem.quantity - 1);
            } else {
                // If the quantity is 1, remove the product from the cart
                this.remove_product(productId);
            }
        },

        addOneToCart(productId) {
            const product = this.products.find(item => item.productDetail._id === productId);

            // Increment the quantity
            this.updateCartItemQuantity(productId, product.cartItem.quantity + 1);
        },

        async updateCartItemQuantity(productId, quantity) {
            try {
                const userId = localStorage.getItem("userId");
                await axios.put(`${apiUrl}/cart/${userId}/${productId}`, { quantity });

                // Update the local state after updating the quantity
                const updatedProduct = this.products.find(item => item.productDetail._id === productId);
                if (updatedProduct) {
                updatedProduct.cartItem.quantity = quantity;
                }

                console.log(`Quantity updated for item with ID ${productId}: ${quantity}`);
            } catch (error) {
                console.error(`Error updating quantity for item with ID ${productId}:`, error);
                // Handle error, show message to the user
            }
        },

        async placeOrder() {
            try {
                const userId = localStorage.getItem('userId');

                // Create an array of product IDs and quantities for the order
                const orderItems = this.products.map(item => ({
                    product: item.productDetail._id,
                    price: item.productDetail.price,
                    quantity: item.cartItem.quantity,
                }));

                // Send a POST request to your server to place the order
                const response = await axios.post(`${apiUrl}/orders/${userId}`, { orderItems });

                // Process the response as needed
                console.log('Order placed successfully!', response.data);

                // Optionally, clear the cart after placing the order
                // await this.clearCart();

                // Redirect to a confirmation or thank you page
                this.$router.push({ name: 'payment' });
            } catch (error) {
                console.error('Error placing order:', error);
                // Handle error, show message to the user
            }
        },

        proceedToPay() {
            this.$router.push({ name: 'invoice' });
            console.log('Proceeding to payment...');
        },
    },
};
</script>
  
<style scoped>
/* Add your component-specific styles here */
</style>
  