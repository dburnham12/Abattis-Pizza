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
let backToOrderButton = document.getElementById("back-to-order-button");

// Upsell Modal
let upsellModal = document.getElementById("upsell-modal");
let upsellAddTopping = document.getElementById("upsell-add-topping");
let upsellAddSoda = document.getElementById("upsell-add-soda");
let upsellAddWings = document.getElementById("upsell-add-wings");
let upsellAddPizza = document.getElementById("upsell-add-pizza");

let upsellAddToppingCheck = document.getElementById("upsell-toppings");
let upsellAddSodaCheck = document.getElementById("upsell-soda");
let upsellAddWingsCheck = document.getElementById("upsell-wings");
let upsellAddPizzaCheck = document.getElementById("upsell-pizza");

// Order form for reset
let orderForm = document.getElementById("order-form");

// Warning fields
let sodaWarningFound = false;
let wingWarningFound = false;
let nameWarningFound = true;
let phoneWarningFound = true;

// Event listener to display toppings if in build menu
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

// function to display specific warning based on soda input
function displaySodaWarning() {
    let sodaChecked = false;

    sodaOptions.forEach((soda) => {
        if (soda.checked) sodaChecked = true;
    });

    if (!sodaChecked && Number(sodaQuantity.value) > 0) {
        sodaWarningFound = true;
        sodaQuantityWarning.style.display = "block";
    } else {
        sodaWarningFound = false;
        sodaQuantityWarning.style.display = "none";
    }

    if (sodaChecked && Number(sodaQuantity.value) === 0) {
        sodaWarningFound = true;
        sodaCheckedWarning.style.display = "block";
    } else {
        sodaWarningFound = false;
        sodaCheckedWarning.style.display = "none";
    }
}

// Event listeners for soda quantity and checked vlaues
sodaQuantity.addEventListener("change", displaySodaWarning);

// Event listeners for each checkbox to determine if we need to display the warning or not
for (let i = 0; i < sodaOptions.length; i++) {
    sodaOptions[i].addEventListener("click", displaySodaWarning);
}

// Function used to display warning message if wing selectin invalid
function displayWingWarning() {
    if (wingQuantity.value === "0" && wingSauce.value != "none") {
        wingWarningFound = true;
        wingWarning.style.display = "block";
    } else {
        wingWarningFound = false;
        wingWarning.style.display = "none";
    }
}

// Event handler to use function if wing selection is invalid
wingQuantity.addEventListener("change", displayWingWarning);

// Event handler to use function if wing selection is invalid
wingSauce.addEventListener("change", displayWingWarning);

// Event listener to check if name has been input correctly
orderName.addEventListener("keyup", () => {
    let nameRegex = /[A-Za-z\s]+$/g;
    if (!nameRegex.test(orderName.value) || orderName.value.length < 5) {
        nameWarningFound = true;
        nameWarning.style.display = "block";
    } else {
        nameWarningFound = false;
        nameWarning.style.display = "none";
    }
});

// Event listener to check if phone number is properly input
orderPhone.addEventListener("keyup", () => {
    let phoneRegex = /[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (!phoneRegex.test(orderPhone.value)) {
        phoneWarningFound = true;
        phoneNumberWarning.style.display = "block";
    } else {
        phoneWarningFound = false;
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
        upsellAddTopping.style.display = "flex";
    } else {
        upsellAddTopping.style.display = "none";
    }

    if (wingQuantity.value === "0") {
        displayUpsell = true;
        upsellAddWings.style.display = "flex";
    } else {
        upsellAddWings.style.display = "none";
    }

    if (!sodaChecked) {
        displayUpsell = true;
        upsellAddSoda.style.display = "flex";
    } else {
        upsellAddSoda.style.display = "none";
    }

    // if none of our upsell options trigger offer a second pizza
    if (!displayUpsell) {
        displayUpsell = true;
        upsellAddPizza.style.display = "flex";
    } else {
        upsellAddPizza.style.display = "none";
    }

    // Check if we have errors with the form
    let errorsFound = wingWarningFound || sodaWarningFound || nameWarningFound || phoneWarningFound;

    // if errorys are found display the warning
    if (errorsFound) {
        warningField.style.display = "block";
    }

    // If we have upselling options display them instead
    if (displayUpsell && !errorsFound) {
        upsellModal.style.display = "block";
    }

    event.preventDefault();
});

// Scroll back to top when button is pressed
backToTopButton.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
});

// Event listener to go back to order from upsell modal
backToOrderButton.addEventListener("click", (event) => {
    event.preventDefault();

    upsellAddToppingCheck.checked = false;
    upsellAddSodaCheck.checked = false;
    upsellAddWingsCheck.checked = false;
    upsellAddPizzaCheck.checked = false;

    upsellModal.style.display = "none";
});
