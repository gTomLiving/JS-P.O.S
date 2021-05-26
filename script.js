

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
let cartQuantityContainerNodeList = document.querySelectorAll(".cart-change-quantity-container");
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

// CC validation variables
let ccNumberInput = document.querySelector("#card");
let ccMonthInput = document.querySelector("#month");
let ccDayInput = document.querySelector("#day");
let ccYearInput = document.querySelector("#year");
let cvvInput = document.querySelector("#cvv");

//receipt 
let receipt = document.querySelector('.receipt-container');
let receiptName = document.querySelector('.receipt-item-name');
let receiptQuantity = document.querySelector('.receipt-item-quantity');
let receiptTotalContainer = document.querySelector(".receipt-total");
let receiptSubtotal = document.querySelector(".receipt-subtotal");
let receiptTax = document.querySelector(".receipt-tax");
let receiptTotal = document.querySelector(".receipt-total");
let receiptCashOrCard = document.querySelector(".on-cash-or-card");

// toggles checkoutmenu visibility
shoppingCart.addEventListener("click", (event) => {
    if (event.target.classList.contains("check-out-button")){
        checkoutMenu.classList.toggle("check-out-menu");
    };

    if (event.target.classList.contains("back-to-store")){
        console.log("cart");
        shoppingCart.classList.toggle("shopping-cart");
    };

    // TODO Figure out how to make add subtract quantity buttons work -- maybe change event target focus to larger?
    if (event.target.classList.contains("subtract")){
        // alert text copied from GC website
        alert("Newly Created Website, excuse our dust.");    
        console.log("trying to subtract");
    };

    if (event.target.classList.contains("add")){
        // alert text copied from GC website
        alert("Newly Created Website, excuse our dust.");
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
        };

        let cashGiven = checkOutCashInput.value;
        let changeDisplay = cashGiven - newTotal;
        checkOutChangeDisplay.innerText = `Change: $${changeDisplay.toFixed(2)}`;
            if (cashGiven < newTotal) {
                alert("Traveler better have my money.")
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
        let cardAccepted = () => receiptCashOrCard.innerText = `These numbers are accepted.`;
        function cardFailed(){
            receiptCashOrCard.innerText = `No coin, no wares, Traveler. Be gone with you.`;
            console.log("validation process failed");
        }
        
        // ternary to change bottom receipt display
        // cashGiven == 0 ? cardAccepted() : cashOption();
        const ccNums = [3, 4, 5, 6];
        cashGiven == 0 ? ccValidation() : cashOption();


        // fills in cart items to receipt overlay
        for(item of cart) {
            let itemReceipt = document.createElement('p');
            let itemQuantity = document.createElement('p');
            itemReceipt.innerText = `${item.name}`;
            receiptName.appendChild(itemReceipt);
            itemQuantity.innerText = `${item.quantity}`;
            receiptQuantity.appendChild(itemQuantity);
        };
        
        // CC validation function
        function ccValidation(){
            // cc num variable checks
            let firstCardNumPassed = false;
            let cardLengthPassed = false;
            let expDatePassed = false;
            let cvvPassed = false;
            let finalCheck = false;
            // check first num on cc
            if (ccNumberInput.value[0] == ccNums[0] || ccNums[1] || ccNums[2] || ccNums[3]){
                firstCardNumPassed = true;
                console.log(firstCardNumPassed);
            }else{
                alert("You've made a mistake, traveller.");
                cardFailed();
                return;
            };
            // check proper card length
            if (ccNumberInput.value.length >= 13 && ccNumberInput.value.length <= 16){
                cardLengthPassed = true;
                console.log("success")
            }else{
                console.log("fail")
               alert("Traveller, do you know how numbers work?");
               cardFailed();
               return;
            };
            // check date inputs
            if (ccMonthInput.value >= 1 &&  ccMonthInput.value <= 12){
                console.log("month correct");
                console.log(ccMonthInput.value);
                if (ccDayInput.value >= 1 && ccDayInput.value <= 31){
                    console.log("day correct");
                    if (ccYearInput.value.length == 4){
                        console.log("date sequence passed");
                        expDatePassed = true;
                    }
                };
            }else{
                alert("Traveler, hast thou coin instead?");
                cardFailed();
                return;
            }
            // check CVV inputs
            if (cvvInput.value.length >= 3 && cvvInput.value.length <= 4){
                console.log("cvv passed")
                cvvPassed = true;
                finalCheck = true;
            }else{
                console.log("cvv failed");
                alert("No wares if no coin, Traveler.");
                cardFailed();
                return;
            }
            // all values true?
            finalCheck == true ? cardAccepted() : cardFailed();
        }
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
                console.log(cartProductQuantityCreator);
                console.log(cartProductQuantityCreator.innerText);
                // above to be fixed later 

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
            newCartObject.quantity = 1;
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

        // all totals display
        subTotal.innerText = `Subtotal: $${newTotal.toFixed(2)}`;
        tax.innerText = `Tax: $${taxTotal.toFixed(2)}`;
        total.innerText = `Total: $${grandTotal.toFixed(2)}`;
        cartSubTotal.innerText = `Subtotal: $${newTotal.toFixed(2)}`;
        cartTax.innerText = `Tax: $${taxTotal.toFixed(2)}`;
        cartTotal.innerText = `Total: $${grandTotal.toFixed(2)}`;
        checkOutTotalDisplay.innerText = total.innerText;
        checkOutTaxDisplay.innerText = tax.innerText;
        checkOutSubtotalDisplay.innerText = subTotal.innerText; 

    };
    
    // toggles description overlay on product cards
    if (event.target.classList.contains("description-box")){
        event.target.classList.toggle("description-box-click");
        console.log("toggle works");
    };

        

        


});

// closes receipt and resets page
receipt.addEventListener("click", (event) => {
    if (event.target.classList.contains("receipt-close")){
        location.reload();
    }
})





