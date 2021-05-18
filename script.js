//Grab items from the page .document

//When product is clicked description leaves and the product is placed is the cart 
//and added to the total

// grab left side things
let subtotal = document.querySelector(".sub-total");
let tax = document.querySelector(".tax");
let total = document.querySelector(".total")
let viewCart = document.querySelector(".view-cart");
let addToCart = document.querySelectorAll(".addToCart");

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
let cart = [{name: "thing",
             quantity: 1,
             price: 1
}];
// console.log(cart);

right.addEventListener("click", (event) => {
    // grab selected item
    if (event.target.classList.contains("addToCart")){
        console.log(event.target.getAttribute("data-price"));
    }
    // add slected item Name & price to cart

})


