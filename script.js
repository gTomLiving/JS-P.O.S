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
            let alreadyInCart = false;
            for (item of cart){
                if (addName === item.name){
                    alreadyInCart = true
                    item.quantity++;
                    break;
                };
            }
            
            if (alreadyInCart == false){
                newCartObject.quantity = 1;
                cart.push(newCartObject);
                
            };
            console.log(cart);
        // increase quantity for item multiples
        

        // NEEDS FURTHER WIRING AND INSPECTION
    //     let i = document.getElementByClass("cart-product-quantity").innerText;
    //     function addtocart() {
    //       i++;
    //     document.getElementByClass(' cart-product-quantity ').innerText = i;
    // }


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
        tax.innerText = `Tax: $${taxTotal.toFixed(2)}`;
        total.innerText = `Total $${grandTotal}`;
        cartSubTotal.innerText = `Subtotal: $${newTotal}`;
        cartTax.innerText = `Tax: $${taxTotal}`;
        cartTotal.innerText = `Total $${grandTotal}`;


    
    
        

    }
    // add slected item Name & price to cart

})

// CARD VALIDATION???
// function validateCardNumber(number) {
//     var regex = new RegExp("^[0-9]{16}$");
//     if (!regex.test(number))
//         return false;

//     return luhnCheck(number);
// }

// function luhnCheck(val) {
//     var sum = 0;
//     for (var i = 0; i < val.length; i++) {
//         var intVal = parseInt(val.substr(i, 1));
//         if (i % 2 == 0) {
//             intVal *= 2;
//             if (intVal > 9) {
//                 intVal = 1 + (intVal % 10);
//             }
//         }
//         sum += intVal;
//     }
//     return (sum % 10) == 0;
// }

// ALTERNATE CC VAL?
// function validate_creditcardnumber()
// {

// let re16digit=/^\d{16}$/
// if (document.myform.CreditCardNumber.value.search(re16digit)==-1)
// alert("Please enter your 16 digit credit card numbers");
// return false;

// }

// document.myform.CreditCardNumber.onchange = validate_creditcardnumber;

// <form name="myform">
//     <input name="CreditCardNumber" />
// </form>




