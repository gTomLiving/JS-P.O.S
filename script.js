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


// make objects based on addToCart clicks
// let name
// function makeItemForCart(name, quantity, price){
//     name = this.name;
//     quantity = 1;
//     price = this.price
// }


// things on cards that we'll need
// let price = 

// add to cart process
let right = document.querySelector(".right");
let productCards = document.querySelectorAll(".products-card");
//let cart = [];
// let cartObject = {name: "thing",
//                   quantity: 1,
//                   price: 0
// }
// console.log(cart);
// let cart = [];

// function Item(name, price, count) {
//     this.name = name;
//     this.price = price;
//     this.count = count;
//   }

//   obj.addItemToCart = function(name, price, count) {
//     for(var item in cart) {
//       if(cart[item].name === name) {
//         cart[item].count ++;
//         return;
//       }
//     }
//     var item = new Item(name, price, count);
//     cart.push(item);
//   }


right.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")){
        const addPrice = event.target.getAttribute("data-price")
        const addName = event.target.getAttribute("data-name");
    
    //new cartObject

    newTotal += parseInt(addPrice) / 100;
    let taxTotal = .06 * newTotal;
    let grandTotal = newTotal + taxTotal;


    // grab selected item
    
        subTotal.innerText = `subtotal: ${newTotal}`;
        tax.innerText = `Tax: ${taxTotal}`;
        total.innerText = `Total ${grandTotal}`;

    }
    // add slected item Name & price to cart

})


