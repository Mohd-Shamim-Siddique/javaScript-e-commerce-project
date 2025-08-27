
const cartItems = JSON.parse(localStorage.getItem('product')) || []
const cartItemContainer = document.querySelector('.cartItemContainer')
const cartTotal = document.querySelector('.cartTotal')

function countCartItems() {
   const countLSitems = JSON.parse(localStorage.getItem('product')) || []
   const cartCount = document.querySelector('#LS-count')
   cartCount.innerHTML = countLSitems.length
}

function updateCartTotal() {
   const cartItems = JSON.parse(localStorage.getItem('product')) || []
   const Total = cartItems.reduce((acc, curr) => acc + curr.totalPrice
      , 0)
   if (cartItems.length === 0) {
      cartTotal.textContent = ''
      return []
   }
   cartTotal.textContent = `$${Total.toFixed(2)}`
}

cartItems.forEach(LsItems => {
   const cartProductLSItems = document.createElement('div')
   cartProductLSItems.innerHTML = `
            <div class='cartContainer flex'>
               <div class="category">${LsItems.category}</div>
                  <div class'cartDiv flex'>
                    <div class="cartImg">
                       <img src=${LsItems.image} alt="">
                    </div>
                    <div class="cartDetail">
                       <h2 class="cartTitle">${LsItems.title}</h2>
                       <p class=" flex cartRatings">
                       <i class="fa-solid fa-star"></i>
                       <i class="fa-solid fa-star"></i>
                       <i class="fa-solid fa-star"></i>
                       <i class="fa-solid fa-star"></i>
                       <i class="fa-solid fa-star"></i></p>
                     </div>
                  </div>
                  <div class="flex cartQuantity">
                  <div class='flex buttons'>
                  <button class='increment cartIncre'>+</button>
                  <p class='cartCount'>${LsItems.quantity}</p>
                  <button class='decrement cartDecre'>-</button>
                  </div>
                  </div>
                  <div class="removeToCart">
                  <button>Remove</button>
                  </div>
                  <div class="cartPrice">$${LsItems.totalPrice}</div>
            </div>
                `
   cartItemContainer.append(cartProductLSItems)
   const cartCount = cartProductLSItems.querySelector('.cartCount')
   const increment = cartProductLSItems.querySelector('.buttons .increment')
   const cartPrice = cartProductLSItems.querySelector('.cartPrice')
   const remove = cartProductLSItems.querySelector('.removeToCart button')

   increment.addEventListener('click', (e) => {
      if (e.target.classList.contains('increment')) {
         if (LsItems.quantity >= 0) {
            LsItems.quantity = LsItems.quantity + 1
            cartCount.innerText = LsItems.quantity
            cartPrice.innerText = `$${(LsItems.unitPrice * LsItems.quantity).toFixed(2)}`
            storeInLs()
            updateCartTotal()
            return LsItems.quantity
         }
      }
   })

   const decrement = cartProductLSItems.querySelector('.buttons .decrement')
   decrement.addEventListener('click', (e) => {
      if (e.target.classList.contains('decrement')) {
         if (LsItems.quantity > 1) {
            LsItems.quantity = LsItems.quantity - 1
            cartCount.innerText = LsItems.quantity
            cartPrice.innerText = `$${(LsItems.unitPrice * LsItems.quantity).toFixed(2)}`
            storeInLs()
            updateCartTotal()
            return LsItems.quantity
         }
         if (LsItems.quantity <= 1) {
            const LsCart = JSON.parse(localStorage.getItem('product')) || []
            const removeData = LsCart.filter((item) => item.id !== LsItems.id)
            localStorage.setItem('product', JSON.stringify(removeData))
            cartProductLSItems.remove()
            countCartItems()
            updateCartTotal()
         }
      }
   })

   function storeInLs() {
      let lsExistingCart = JSON.parse(localStorage.getItem('product')) || []

      const lsFilterItems = lsExistingCart.filter((items) => items.id === LsItems.id)

      if (lsFilterItems.length > 0) {
         lsExistingCart = lsExistingCart.map((item) => {
            if (item.id === LsItems.id) {
               return {
                  ...item,
                  quantity: LsItems.quantity,
                  totalPrice: LsItems.unitPrice * LsItems.quantity,
               }
            }
            return item;
         })
      }

      localStorage.setItem('product', JSON.stringify(lsExistingCart))
      updateCartTotal()
   }
   function removeToCart() {
      remove.addEventListener('click', () => {
         const latestCart = JSON.parse(localStorage.getItem('product')) || []
         const removeItem = latestCart.filter((item) => item.id !== LsItems.id)
         localStorage.setItem('product', JSON.stringify(removeItem))
         cartProductLSItems.remove()
         countCartItems()
         updateCartTotal()
      })
   }
   removeToCart()
});


window.addEventListener('DOMContentLoaded', () => {
   countCartItems()
   updateCartTotal()
})



