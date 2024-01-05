<template>
    <div class="payment-container">
      <h1 class="payment-header">Payment Process</h1>
  
      <!-- Step 1: Display Invoice -->
      <div v-if="invoice" class="invoice-container">
        <h2>Invoice</h2>
        <p class="invoice-description">Description: {{ invoice.description }}</p>
        <p class="invoice-amount">Amount: ${{ invoice.amount }}</p>
      </div>
  
      <!-- Step 2: Payment Form -->
      <div v-if="showPaymentForm" class="payment-form-container">
        <h2>Payment Information</h2>
        <form @submit.prevent="processPayment" class="payment-form">
          <label for="cardNumber" class="form-label">Card Number:</label>
          <input type="text" id="cardNumber" v-model="paymentDetails.cardNumber" class="form-input" />
  
          <label for="expiryDate" class="form-label">Expiry Date:</label>
          <input type="text" id="expiryDate" v-model="paymentDetails.expiryDate" class="form-input" />
  
          <label for="cvv" class="form-label">CVV:</label>
          <input type="text" id="cvv" v-model="paymentDetails.cvv" class="form-input" />
  
          <button type="submit" class="submit-button">Submit Payment</button>
        </form>
      </div>
  
      <!-- Step 3: Payment Confirmation -->
      <div v-if="paymentSuccessful" class="confirmation-container">
        <h2>Payment Successful!</h2>
        <p class="confirmation-message">Thank you for your payment.</p>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        invoice: {
          description: "Product/Service Description",
          amount: 100, // Replace with actual amount
        },
        showPaymentForm: true,
        paymentDetails: {
          cardNumber: "",
          expiryDate: "",
          cvv: "",
        },
        paymentSuccessful: false,
      };
    },
    methods: {
      processPayment() {
        // Simulate payment processing
        // In a real-world scenario, you would make an API call to your backend for payment processing
        // and handle the response accordingly.
  
        // For simplicity, we'll just simulate a successful payment here.
        this.paymentSuccessful = true;
        this.showPaymentForm = false;
      },
    },
  };
  </script>
  