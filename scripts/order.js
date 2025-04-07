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
let sodaQuantity = document.getElementById("soda-count");
let sodaOptions = document.getElementsByName("soda");
let wingQuantity = document.getElementById("wing-count");

// Order warning field
let warningField = document.getElementById("order-warning");
let orderWarningList = document.getElementById("order-warning-list");

// Form Buttons
let clearButton = document.getElementById("order-clear-button");
let submitButton = document.getElementById("order-submit-button");
let backToTopButton = document.getElementById("back-to-top-button");

// Upsell Modal
let upsellModal = document.getElementById("upsell-modal");
let upsellAddTopping = document.getElementById("upsell-add-topping");
let upsellAddSoda = document.getElementById("upsell-add-soda");
let upsellAddWings = document.getElementById("upsell-add-wings");

let orderForm = document.getElementById("order-form");

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

    orderForm.reset();

    buildMenu.style.display = "none";
    warningField.style.display = "none";
});

// Event listener to display issues with form if there are any
submitButton.addEventListener("click", (event) => {
    let errorsFound = false;
    let sodaChecked = false;
    let toppingsChecked = false;
    let displayUpsell = false;
    let nameRegex = /[A-Za-z\s]+$/g;
    let phoneRegex = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;

    toppingCheckBoxes.forEach((checkbox) => {
        if (checkbox.checked) toppingsChecked = true;
    });

    sodaOptions.forEach((soda) => {
        if (soda.checked) sodaChecked = true;
    });

    // ---- Warning Messages ----
    // Clear out all of the previous warning messages if they exist
    while (orderWarningList.lastElementChild) {
        orderWarningList.removeChild(orderWarningList.lastElementChild);
    }

    // Check conditions and populate warning fields if necessary
    if (sodaChecked && sodaQuantity.value === "0") {
        errorsFound = true;
        const li = document.createElement("li");
        li.innerHTML = "Sodas: You selected a soda but didn't select a quantity";
        orderWarningList.appendChild(li);
    } else if (!sodaChecked && sodaQuantity.value !== "0") {
        errorsFound = true;
        const li = document.createElement("li");
        li.innerHTML = "Sodas: You selected a soda quantity but didn't select your type of soda";
        orderWarningList.appendChild(li);
    }

    if (!nameRegex.test(orderName.value)) {
        errorsFound = true;
        const li = document.createElement("li");
        li.innerHTML = "Name: Must not be empty and only contain letters and spaces";
        orderWarningList.appendChild(li);
    }
    if (!phoneRegex.test(orderPhone.value)) {
        errorsFound = true;
        const li = document.createElement("li");
        li.innerHTML = "Phone Number: Must only contain numbers and be of the format ###-###-####";
        orderWarningList.appendChild(li);
    }

    // ---- Upsell Options ----
    if (!toppingsChecked && pizzaSelect.value === "build") {
        displayUpsell = true;
    } else {
        upsellAddTopping.style.display = "none";
    }

    if (wingQuantity.value === "0") {
        displayUpsell = true;
    } else {
        upsellAddWings.style.display = "none";
    }

    if (!sodaChecked) {
        displayUpsell = true;
    } else {
        upsellAddSoda.style.display = "none";
    }

    if (displayUpsell && !errorsFound) {
        upsellModal.style.display = "block";
    }

    // Display warning field if necessary
    if (errorsFound) {
        warningField.style.display = "block";
    } else {
        warningField.style.display = "none";
    }

    if (errorsFound || displayUpsell) event.preventDefault();
});

// Scroll back to top when button is pressed
backToTopButton.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
});
