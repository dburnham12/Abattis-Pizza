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
let wingSauce = document.getElementById("wing-sauce");

// Order warning field
let sodaQuantityWarning = document.getElementById("soda-quantity-warning");
let sodaCheckedWarning = document.getElementById("soda-checked-warning");
let wingWarning = document.getElementById("wing-warning");
let nameWarning = document.getElementById("name-warning");
let phoneNumberWarning = document.getElementById("phone-number-warning");
let warningField = document.getElementById("order-general-warning");

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

let errorsFound = false;

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

function displaySodaWarning() {
    let sodaChecked = false;

    sodaOptions.forEach((soda) => {
        if (soda.checked) sodaChecked = true;
    });

    if (!sodaChecked && Number(sodaQuantity.value) > 0) {
        errorsFound = true;
        sodaQuantityWarning.style.display = "block";
    } else {
        errorsFound = false;
        sodaQuantityWarning.style.display = "none";
    }

    if (sodaChecked && Number(sodaQuantity.value) === 0) {
        errorsFound = true;
        sodaCheckedWarning.style.display = "block";
    } else {
        errorsFound = false;
        sodaCheckedWarning.style.display = "none";
    }
}

// Event listeners for soda quantity and checked vlaues
sodaQuantity.addEventListener("change", displaySodaWarning);

for (let i = 0; i < sodaOptions.length; i++) {
    sodaOptions[i].addEventListener("click", displaySodaWarning);
}

function displayWingWarning() {
    if (wingQuantity.value === "0" && wingSauce.value != "none") {
        errorsFound = true;
        wingWarning.style.display = "block";
    } else {
        errorsFound = false;
        wingWarning.style.display = "none";
    }
}

wingQuantity.addEventListener("change", displayWingWarning);

wingSauce.addEventListener("change", displayWingWarning);

orderName.addEventListener("keyup", () => {
    let nameRegex = /[A-Za-z\s]+$/g;
    if (!nameRegex.test(orderName.value)) {
        errorsFound = true;
        nameWarning.style.display = "block";
    } else {
        errorsFound = false;
        nameWarning.style.display = "none";
    }
});

orderPhone.addEventListener("keyup", () => {
    let phoneRegex = /[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (!phoneRegex.test(orderPhone.value)) {
        errorsFound = true;
        phoneNumberWarning.style.display = "block";
    } else {
        errorsFound = false;
        phoneNumberWarning.style.display = "none";
    }
});

// Event listener to display issues with form if there are any
submitButton.addEventListener("click", (event) => {
    let sodaChecked = false;
    let toppingsChecked = false;
    let displayUpsell = false;

    toppingCheckBoxes.forEach((checkbox) => {
        if (checkbox.checked) toppingsChecked = true;
    });

    sodaOptions.forEach((soda) => {
        if (soda.checked) sodaChecked = true;
    });

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

    if (errorsFound) {
        warningField.style.display = "block";
    }

    // Display warning field if necessary
    if (errorsFound || displayUpsell) event.preventDefault();
});

// Scroll back to top when button is pressed
backToTopButton.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
});
