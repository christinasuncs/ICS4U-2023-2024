const app = Vue.createApp({
   data() {
      return {
         cart: [],
         premium: true,
         catagory: 'None' //(document.getElementById('filterByCatagoryButton').value)
      }
   },
   methods: {
      // addToCart() {
      //    this.$emit('add-to-cart')
      //  },
      updateCart(id) {
         this.cart.push(id)
      },
      removeFromCart(id) {
         if (this.cart.includes(id)){
            const index = this.cart.indexOf(id)
            this.cart.splice(index, 1)
         }
      },
      filterByCatagory() {
         const catagory = (document.getElementById('filterByCatagoryButton').value)
         this.catagory = catagory
      }
   }
})