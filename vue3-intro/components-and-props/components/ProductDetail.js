app.component('product-detail', {
    props: {
        premium: {
          type: String,
          required: true
        }
      },
    template:
        /*html*/
        `<p>{{details}}</p>`
    })
app.mount('#app');