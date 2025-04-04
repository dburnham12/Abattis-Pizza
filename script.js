/* 
Dylan Burnham
COMP 205
Assignment 3
*/
let pizzaSelect = document.getElementById("pizza-select");
let buildMenu = document.getElementById("build-your-own-selection");
let orderName = document.getElementById("order-name-field");

let toppingCheckBoxes = document.getElementsByName("toppings");
let crustSelection = document.getElementsByName("crust");

let clearButton = document.getElementById("order-clear-button");

buildMenu.style.display = "none";

pizzaSelect.addEventListener("change", () => {
    if (pizzaSelect.value === "build") {
        buildMenu.style.display = "block";
    } else {
        buildMenu.style.display = "none";
    }
});

clearButton.addEventListener("click", (event) => {
    event.preventDefault();

    pizzaSelect.selectedIndex = 0;
    buildMenu.style.display = "none";
    toppingCheckBoxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
    crustSelection[0].checked = true;
    orderName.value = "";
});
