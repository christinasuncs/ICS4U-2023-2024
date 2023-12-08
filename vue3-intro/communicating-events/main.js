const app = Vue.createApp({
   data() {
      return {
         cart: [],
         premium: true
      }
   },
   methods: {
      // addToCart() {
      //    this.$emit('add-to-cart')
      //  },
       updateCart(id) {
         this.cart.push(id)
       }
   }
})