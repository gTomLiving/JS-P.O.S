//Grab items from the page .document

//When product is clicked description leaves and the product is placed is the cart 
//and added to the total

// grab left side things
let subTotal = document.querySelector(".sub-total");
let tax = document.querySelector(".tax");
let total = document.querySelector(".total")
let viewCart = document.querySelector(".view-cart");
let addToCart = document.querySelectorAll(".addToCart");
let newTotal = 0;


// add to cart process
let right = document.querySelector(".right");
let productCards = document.querySelectorAll(".products-card");

// add to cart visual representation variables
let cart = [];
let cartSubTotal = document.querySelector(".cart-sub-total");
let cartTax = document.querySelector(".cart-tax");
let cartTotal = document.querySelector(".cart-total")
let cartWrapper = document.querySelector(".cart-wrapper");
let cartNameHolder = document.querySelector(".cart-product-name");
let cartQuantityHolder = document. querySelector(".cart-change-quanity");
let cartProductPriceHolder = document.querySelector(".cart-product-price");
const shoppingCart = document.querySelector(".hidden");
// add to cart visual representation wiring

// toggles shopping cart view
viewCart.addEventListener("click", (event) => {
    event.preventDefault();
    let cartToggle = () => shoppingCart.classList.toggle("shopping-cart");
    cartToggle();
});


// add to cart event
right.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")){
        const addPrice = event.target.getAttribute("data-price")
        const addName = event.target.getAttribute("data-name");
        let newCartObject = {}
            newCartObject.name = addName;
            newCartObject.price = addPrice;
            // placeholder below --- needs wiring
            newCartObject.quanity = 1;
            cart.push(newCartObject);
            console.log(cart);
    
        // increase quantity for item multiples
        if (addName === cart[newCartObject.name]){
            console.log("same name");
            newCartObject.quantity++;
            // add newCartQuantity to newCartObject?
        }

        // generate name box
        let cartItemNameDisplay = document.createElement("p");
        cartItemNameDisplay.innerText = addName;
        cartNameHolder.appendChild(cartItemNameDisplay);

         // generate quantity box
         let cartQuantityContainer = document.querySelector(".cart-change-quantity-container");
         let cartQuantity = document.querySelector(".cart-change-quantity");
         let quantityBox = cartQuantity.cloneNode(true);
         cartQuantityContainer.appendChild(quantityBox);

        // generate price box
        let cartPriceDisplay = document.createElement("p");
        cartPriceDisplay.innerText = `$${addPrice / 100}`;
        cartProductPriceHolder.appendChild(cartPriceDisplay); 

        newTotal += parseInt(addPrice) / 100;
        let taxTotal = .06 * newTotal;
        let grandTotal = newTotal + taxTotal;

        // All totals display
        subTotal.innerText = `Subtotal: $${newTotal}`;
        tax.innerText = `Tax: $${taxTotal}`;
        total.innerText = `Total $${grandTotal}`;
        cartSubTotal.innerText = `Subtotal: $${newTotal}`;
        cartTax.innerText = `Tax: $${taxTotal}`;
        cartTotal.innerText = `Total $${grandTotal}`;


    
    
        

    }
    // add slected item Name & price to cart

})


