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

// grabbing description box for animation
let descriptionBox = document.querySelector(".description-box");



// add to cart process
let right = document.querySelector(".right");
let productCards = document.querySelectorAll(".products-card");

// add to cart visual representation variables for overlay
let cart = [];
let cartSubTotal = document.querySelector(".cart-sub-total");
let cartTax = document.querySelector(".cart-tax");
let cartTotal = document.querySelector(".cart-total")
let cartWrapper = document.querySelector(".cart-wrapper");
let cartNameHolder = document.querySelector(".cart-product-name");
let cartNameHolderArray = document.querySelectorAll(".cart-product-name");
let cartQuantityHolder = document. querySelector(".cart-change-quanity");
let cartProductPriceHolder = document.querySelector(".cart-product-price");
let cartProductQuantity = document.querySelector(".cart-product-quantity");
let cartPriceDisplay = document.createElement("p");

// cart quantity container variables
let cartQuantityContainer = document.querySelector(".cart-change-quantity-container");
const shoppingCart = document.querySelector(".hidden");
let cartQuantity = document.querySelector(".cart-change-quantity");

// checkout menu total displays
const checkoutMenu = document.querySelector(".checkout-hidden");
let checkOutTotalDisplay = document.querySelector(".final-check-out-total");
let checkOutTaxDisplay = document.querySelector(".final-check-out-tax");
let checkOutSubtotalDisplay = document.querySelector(".final-check-out-subtotal");
let checkOutCashInput = document.querySelector("#cash");
let checkOutChangeDisplay = document.querySelector(".change");
let checkOutBtn = document.querySelector('.final-check-out-button');

//receipt 
let receipt = document.querySelector('.receipt-container');
let receiptName = document.querySelector('.receipt-item-name');
let receiptQuantity = document.querySelector('.receipt-item-quantity');
let receiptTotalContainer = document.querySelector(".receipt-total");
let receiptSubtotal = document.querySelector(".receipt-subtotal");
let receiptTax = document.querySelector(".receipt-tax");
let receiptTotal = document.querySelector(".receipt-total");
let receiptCashOrCard = document.querySelector(".on-cash-or-card");


// toggle description box animations on click
// descriptionBox.addEventListener("click", (event) => {
    // if (event.target.classList.contains("description-animation")){
    //     console.log("listener works");
    //     descriptionBox.classList.toggle("description-box-click");
    //     console.log("toggle works");
    // };
// })




// toggles checkoutmenu visibility
shoppingCart.addEventListener("click", (event) => {
    if (event.target.classList.contains("check-out-button")){
        checkoutMenu.classList.toggle("check-out-menu");
    };

    if (event.target.classList.contains("back-to-store")){
        console.log("cart");
        shoppingCart.classList.toggle("shopping-cart");
    };

    // TODO Figure out how to make add subtract quantity buttons work -- maybe change event target focus to larger? does shopping cart z index affect?
    if (event.target.classList.contains("subtract")){
            
        console.log("trying to subtract");
    };

    if (event.target.classList.contains("add")){
        console.log("trying to add")
    };
})

// toggles shopping cart visibility
viewCart.addEventListener("click", (event) => {
    event.preventDefault();
    let cartToggle = () => shoppingCart.classList.toggle("shopping-cart");
    cartToggle();
});

//checkout menu functionality
checkoutMenu.addEventListener("click", (event) => {
    // displays accurate change in checkout menu based on user input
    if (event.target.classList.contains("change-button")){
        let newTotal = 0;
        for (item of cart){
            newTotal += (((parseInt(item.price) * item.quantity) / 100) * 1.06);
            let cashGiven = checkOutCashInput.value;
            let changeDisplay = cashGiven - newTotal;
            checkOutChangeDisplay.innerText = `Change: $${changeDisplay.toFixed(2)}`;

        };
    };

    // back to store 
    if (event.target.classList.contains("back-to-cart")){
        checkoutMenu.classList.toggle("check-out-menu");
        shoppingCart.classList.toggle("shopping-cart");
    };

    // finishes checkout process & generates receipt
    if(event.target.classList.contains('final-check-out-button')) {
        event.preventDefault();
        // generates receipt overlay
        receipt.classList.add('receipt');
        
        // begins totals compilation for receipt
        let formData = new FormData();
        formData.append('Grand Total', `${total.innerText}`);
        formData.append('tax', `${tax.innerText}`);
        formData.append('total', `${newTotal.toFixed(2)}`);

        // fills in totals on receipt
        receiptSubtotal.innerText = `Subtotal: ${formData.get('total')}`;
        receiptTax.innerText = `${formData.get('tax')}`;
        receiptTotal.innerText = `${formData.get('Grand Total')}`;
        // for cash or card display switch
        let cashGiven = checkOutCashInput.value;
        let receiptChange = cashGiven - (newTotal * 1.06);
        // cash or card functions
        let cashOption = () => receiptCashOrCard.innerText = `Change: ${receiptChange.toFixed(2)}`;
        let cardOption = () => receiptCashOrCard.innerText = `These numbers are accepted.`
        // ternary to change bottom receipt display
        cashGiven == 0 ? cardOption() : cashOption();
       
        // fills in cart items to receipt overlay
        for(item of cart) {
            let itemReceipt = document.createElement('p');
            let itemQuantity = document.createElement('p');
            itemReceipt.innerText = `${item.name}`;
            receiptName.appendChild(itemReceipt);
            itemQuantity.innerText = `${item.quantity}`;
            receiptQuantity.appendChild(itemQuantity);
        };
    }
});

// ADD TO CART EVENT
right.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart-button")){
        let addPrice = parseInt(event.target.getAttribute("data-price"));
        let addName = event.target.getAttribute("data-name");
       
        // creating new object for cart array
        let newCartObject = {}
        newCartObject.name = addName;
        newCartObject.price = addPrice;
        newCartObject.quantity = 1;
        
        // increase quantity for item multiples in cart array
        // also prevents from creating new cart array object
        let alreadyInCart = false;

        // GENERATE QUANTITY BOXES FOR SHOPPING CART
        // create quantity box variables && appends for shopping cart display
         let createBox = document.createElement("div");
         createBox.setAttribute("class", "cart-change-quantity");
        // add left arrow to box
        let leftArrow = document.createElement("i");
        leftArrow.setAttribute("class", "ib ib-mdi-arrow-left-circle subtract");
        createBox.appendChild(leftArrow);
        // add quantity box to box
        let cartProductQuantityCreator = document.createElement("span");
        cartProductQuantityCreator.setAttribute("class", "cart-product-quantity");
        cartProductQuantityCreator.innerText = newCartObject.quantity;
        createBox.appendChild(cartProductQuantityCreator);
        // add right arrow to box
        let rightArrow = document.createElement("i");
        rightArrow.setAttribute("class", "ib ib-mdi-arrow-right-circle add");
        createBox.appendChild(rightArrow);    

        // updates cart values for repeat items without creating new line
        for (item of cart){
            if (addName === item.name){
                alreadyInCart = true
                item.quantity++;
                let newItemPrice = parseInt(item.quantity) * parseInt(addPrice).toFixed(2) / 100;
                cartProductQuantityCreator.innerText = item.quantity;

                // ****CART QUANTITY BOX WON"T UPDATE BUT aspects are working in background****
                // create NodeList to correlate and match with item.quantity? --- see paper note
                console.log(cartProductQuantityCreator);
                
                console.log(cartProductQuantityCreator.innerText);
                // cartProductQuantity.innerText = item.quantity;
                let boxQuantity = event.target.querySelector(".cart-product-quantity");
                // console.log(boxQuantity.innerText);
                // boxQuantity.innerText = item.quantity;
                    
                
                cartPriceDisplay.innerText = `$${newItemPrice.toFixed(2)}`;
                // updating total on checkout display
                checkOutTotalDisplay.innerText = cartPriceDisplay.innerText;
                break;
            };        
        }; 

        // updates cart values for new objects and creates new shopping cart overlay displays
        if (alreadyInCart == false){
            // insert quantity boxes into shopping cart
            cartQuantityContainer.appendChild(createBox);      
            // cartProductQuantity = document.querySelector(".cart-product-quantity");
            newCartObject.quantity = 1;
            // cartProductQuantity.innerText = newCartObject.quantity;
            // console.log(cartProductQuantity.innerText);
            cart.push(newCartObject);
            // generate price box in shopping cart overlay
            cartPriceDisplay = document.createElement("p");
            cartPriceDisplay.innerText = `$${(addPrice / 100).toFixed(2)}`;
            cartProductPriceHolder.appendChild(cartPriceDisplay);
            // updating total on checkout display
            checkOutTotalDisplay.innerText = cartPriceDisplay.innerText;
            // generate name box
            let cartItemNameDisplay = document.createElement("p");
            cartItemNameDisplay.setAttribute("class", "name-in-cart")
            cartItemNameDisplay.innerText = addName;
            cartNameHolder.appendChild(cartItemNameDisplay);
        };      
       
        console.log(cart);
    
        // totals math
        newTotal += addPrice / 100;
        let taxTotal = .06 * newTotal;
        let grandTotal = newTotal + taxTotal;

        // All totals display
        subTotal.innerText = `Subtotal: $${newTotal.toFixed(2)}`;
        tax.innerText = `Tax: $${taxTotal.toFixed(2)}`;
        total.innerText = `Total: $${grandTotal.toFixed(2)}`;
        cartSubTotal.innerText = `Subtotal: $${newTotal.toFixed(2)}`;
        cartTax.innerText = `Tax: $${taxTotal.toFixed(2)}`;
        cartTotal.innerText = `Total: $${grandTotal.toFixed(2)}`;
        checkOutTotalDisplay.innerText = total.innerText;
        checkOutTaxDisplay.innerText = tax.innerText;
        checkOutSubtotalDisplay.innerText = subTotal.innerText; 

        // let formData = new FormData();

        // formData.append('total', `${newTotal}`);
        // formData.append('tax', `${taxTotal}`);
        // formData.append('Grand Total', `${grandTotal}`);
        
        // console.log(formData.get('total'));
        // console.log(formData.get('tax'));
        // console.log(formData.get('Grand Total'));

        
        
    };
    
    if (event.target.classList.contains("description-box")){
        event.target.classList.toggle("description-box-click");
        console.log("toggle works");
    };

        

        


});

// closes receipt and resets page
receipt.addEventListener("click", (event) => {
    if (event.target.classList.contains("receipt-close")){
        // event.target.classList.add("hidden");
        location.reload();
    }
})


// add to cart event
// right.addEventListener("click", (event) => {
//     if (event.target.classList.contains("add-to-cart")){
//         const addPrice = event.target.getAttribute("data-price")
//         const addName = event.target.getAttribute("data-name");
//         let newCartObject = {}
//             newCartObject.name = addName;
//             newCartObject.price = addPrice;
//             // placeholder below --- needs wiring
//             let alreadyInCart = false;
//             for (item of cart){
//                 if (addName === item.name){
//                     alreadyInCart = true
//                     item.quantity++;
//                     break;
//                 };
//             }
            
//             if (alreadyInCart == false){
//                 newCartObject.quantity = 1;
//                 cart.push(newCartObject);
                
//             };
//             console.log(cart);
//         // increase quantity for item multiples
        

//         // NEEDS FURTHER WIRING AND INSPECTION
//     //     let i = document.getElementByClass("cart-product-quantity").innerText;
//     //     function addtocart() {
//     //       i++;
//     //     document.getElementByClass(' cart-product-quantity ').innerText = i;
//     // }


//         // generate name box
//         let cartItemNameDisplay = document.createElement("p");
//         cartItemNameDisplay.innerText = addName;
//         cartNameHolder.appendChild(cartItemNameDisplay);

//          // generate quantity box
//          let cartQuantityContainer = document.querySelector(".cart-change-quantity-container");
//          let cartQuantity = document.querySelector(".cart-change-quantity");
//          let quantityBox = cartQuantity.cloneNode(true);
//          cartQuantityContainer.appendChild(quantityBox);

//         // generate price box
//         let cartPriceDisplay = document.createElement("p");
//         cartPriceDisplay.innerText = `$${addPrice / 100}`;
//         cartProductPriceHolder.appendChild(cartPriceDisplay); 

//         newTotal += parseInt(addPrice) / 100;
//         let taxTotal = .06 * newTotal;
//         let grandTotal = newTotal + taxTotal;

//         // All totals display
//         subTotal.innerText = `Subtotal: $${newTotal}`;
//         tax.innerText = `Tax: $${taxTotal.toFixed(2)}`;
//         total.innerText = `Total $${grandTotal}`;
//         cartSubTotal.innerText = `Subtotal: $${newTotal}`;
//         cartTax.innerText = `Tax: $${taxTotal}`;
//         cartTotal.innerText = `Total $${grandTotal}`;


    
    
        

//     }
//     // add slected item Name & price to cart

// })

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




