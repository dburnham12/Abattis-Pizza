/* 
Dylan Burnham
COMP 205
Assignment 2 
*/
let pizzaSelect = document.getElementById("pizza-select");
let buildMenu = document.getElementById("build-your-own-selection");

buildMenu.style.display = "none";

pizzaSelect.addEventListener("change", () => {
    if (pizzaSelect.value === "build") {
        buildMenu.style.display = "block";
    } else {
        buildMenu.style.display = "none";
    }
});
