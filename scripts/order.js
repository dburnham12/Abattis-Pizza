/* 
Dylan Burnham
COMP 205
Assignment 3
*/

// Form Selection Elements
let pizzaSelect = document.getElementById("pizza-select");
let buildMenu = document.getElementById("build-your-own-selection");
let orderName = document.getElementById("order-name-field");
let orderPhone = document.getElementById("order-phone-field");
let toppingCheckBoxes = document.getElementsByName("toppings");
let crustSelection = document.getElementsByName("crust");

// Order warning field
let warningField = document.getElementById("order-warning");
let orderWarningList = document.getElementById("order-warning-list");

// Form Buttons
let clearButton = document.getElementById("order-clear-button");
let submitButton = document.getElementById("order-submit-button");

buildMenu.style.display = "none";

pizzaSelect.addEventListener("change", () => {
    if (pizzaSelect.value === "build") {
        buildMenu.style.display = "block";
    } else {
        buildMenu.style.display = "none";
    }
});

// Event listener to clear the form if the button is pressed
clearButton.addEventListener("click", (event) => {
    event.preventDefault();

    pizzaSelect.selectedIndex = 0;
    buildMenu.style.display = "none";
    toppingCheckBoxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
    crustSelection[0].checked = true;

    // Clear out form string fields
    orderName.value = "";
    orderPhone.value = "";

    warningField.style.display = "none";
});

// Event listener to display issues with form if there are any
submitButton.addEventListener("click", (event) => {
    let errorsFound = false;
    let nameRegex = /[A-Za-z\s]+$/g;
    let phoneRegex = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;

    // Clear out all of
    while (orderWarningList.lastElementChild) {
        orderWarningList.removeChild(orderWarningList.lastElementChild);
    }

    if (!nameRegex.test(orderName.value)) {
        errorsFound = true;
        const li = document.createElement("li");
        li.innerHTML = "Name must only contain letters and spaces";
        orderWarningList.appendChild(li);
    }
    if (!phoneRegex.test(orderPhone.value)) {
        errorsFound = true;
        const li = document.createElement("li");
        li.innerHTML = "Phone number must only contain numbers and be of the format ###-###-####";
        orderWarningList.appendChild(li);
    }
    if (errorsFound) {
        warningField.style.display = "block";
        event.preventDefault();
    }
});
