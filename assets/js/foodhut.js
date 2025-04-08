/*!
=========================================================
* FoodHut Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

new WOW().init();

function initMap() {
    var uluru = {lat: 37.227837, lng: -95.700513};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
 }

const cart = [];

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity}
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1); 
    }
    updateCartDisplay();
}

function clearCart() {
    cart.length = 0;
    updateCartDisplay();
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCartDisplay();
    });
});

document.getElementById('clear-cart').addEventListener('click', clearCart);

// Toggle cart sidebar
const cartSidebar = document.getElementById('cart-sidebar');
const toggleCartBtn = document.getElementById('toggle-cart-btn');

toggleCartBtn.addEventListener('click', function (e) {
    e.preventDefault();
    cartSidebar.classList.toggle('open');
});
