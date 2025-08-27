import { addToCart } from "./addToCart";

const cartProductContainer = document.querySelector('.cartProductContainer')
const itemAdded = document.querySelector('.item-added')

export function updateCartItemCount() {
    const cartCountElement = document.getElementById('cart-count');
    const cartItems = JSON.parse(localStorage.getItem('product')) || [];
    cartCountElement.innerText = cartItems.length;
}

const fetchProducts = async () => {
    const res = await fetch(`https://fakestoreapi.com/products?limit=9`)
    const data = await res.json()

    data.forEach((element) => {
        let count = 0
        let originalPrice = Number(element.price)

        const productsContainer = document.createElement('div')
        productsContainer.innerHTML = `
            <div class='productsContain'>
                 <div class="category">${element.category}</div>
                 <div class="cartProductImg">
                   <img src=${element.image} alt="">
                </div>
                <div class="cartProductsDetails">
                   <h2 class="cartTitle">${element.title}</h2>
                   <p class=" flex cartRatings">
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i></p>
                </div>
                <div class="cartPrice">$${originalPrice}</div>
                <div class="cartStocks">Total Stocks Available: ${element.rating.count}</div>
                <div class="flex cartQuantity">
                   <p>Quantity(Pieces): </p>
                   <div class='flex buttons'>
                      <button class='increment'>+</button>
                      <p class='cartCount'>${count}</p>
                      <button class='decrement'>-</button>
                   </div>
                </div>
                <div class="addToCart">
                   <button>Add To Cart</button>
                </div>
            </div>
                `
        cartProductContainer.append(productsContainer)
        const cart = productsContainer.querySelector('.addToCart button')
        const cartCount = productsContainer.querySelector('.cartCount')
        const cartStocks = productsContainer.querySelector('.cartStocks')
        const increment = productsContainer.querySelector('.buttons .increment')

        increment.addEventListener('click', (e) => {
            if (e.target.classList.contains('increment')) {
                if (element.rating.count > 0) {
                    count = count + 1
                    element.rating.count--
                    cartCount.innerText = count
                    cartStocks.innerText = `Total Stocks Available: ${element.rating.count}`
                    return count
                }
            }
        })

        const decrement = productsContainer.querySelector('.buttons .decrement')
        decrement.addEventListener('click', (e) => {
            if (e.target.classList.contains('decrement')) {
                if (count > 0) {
                    count = count - 1
                    element.rating.count++
                    cartCount.innerText = count
                    cartStocks.innerText = `Total Stocks Available: ${element.rating.count}`
                    cartCount.innerText = count
                    return count
                }
            }
        })

        function displayItemAdded() {
            if (count === 0) return;
            itemAdded.style.display = 'block'
            setTimeout(() => {
                itemAdded.style.display = 'none'
            }, 1000)
        }

        cart.addEventListener('click', () => {
            displayItemAdded()
            addToCart(element, count, originalPrice, cartCount)
        })

    });
}

window.addEventListener('DOMContentLoaded', () => {
    updateCartItemCount();
    fetchProducts();
});

