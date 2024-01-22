app.component('product-display', {
   props: {
      premium: {
         type: Boolean,
         required: true
      },
      cart: {
         type: Array,
         required: true
      }
   },
   template:
      /*html*/
      `<div class="product-display">
         <div class="product-container">
            <div class="product-image">
            <img v-bind:src="image">
            </div>
            <div class="product-info">
            <h1>{{ title }}</h1>

            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>

            <p>Shipping: {{ shipping }}</p>

            <ul>
               <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div 
               v-for="(variant, index) in variants" 
               :key="variant.id" 
               @mouseover="updateVariant(index)" 
               class="color-circle" 
               :style="{ backgroundColor: variant.color }">
            </div>
            
            <button 
               class="button" 
               :class="{ disabledButton: disableAddButton }" 
               :disabled="!inStock" 
               v-on:click="addToCart">
               Add to Cart
            </button>
            <button 
               class="button"
               :class="{ disabledButton: disableRemoveButton }" 
               :disabled="disableRemoveButton"
               v-on:click="removeCart">
               Remove Cart
            </button>
            </div>
         </div>
      </div>`,
   data() {
      return {
         product: 'Socks',
         brand: 'Vue Mastery',
         selectedVariant: 0,
         details: ['50% cotton', '30% wool', '20% polyester'],
         variants: [
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 5 },
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 2 },
         ]
      }
   },
   methods: {
      addToCart() {
         this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
         this.variants[this.selectedVariant].quantity--
      },
      removeCart() {
         this.$emit('remove-cart', this.variants[this.selectedVariant].id)
         this.variants[this.selectedVariant].quantity++
      },
      updateVariant(index) {
         this.selectedVariant = index
      }

   },
   computed: {
      title() {
         return this.brand + ' ' + this.product
      },
      image() {
         return this.variants[this.selectedVariant].image
       },
       inStock() {
       return this.variants[this.selectedVariant].quantity
       },
      shipping() {
         if (this.premium) {
            return 'Free'
         }
         return 2.99
      },
      disableRemoveButton() {
         let count = 0;
         this.cart.forEach(element => {
            if(element == this.variants[this.selectedVariant].id)
               count++
         })
         return count == 0
      },
      disableAddButton() {
         return this.variants[this.selectedVariant].quantity == 0
      }
   }
})