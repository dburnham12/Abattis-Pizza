let orderAccordianButton = document.getElementById("review-accordian-button");
let reviewAccordian = document.getElementById("review-accordian");

orderAccordianButton.addEventListener("click", () => {
    if (reviewAccordian.style.maxHeight) {
        reviewAccordian.style.maxHeight = null;
        orderAccordianButton.innerHTML = "Show More";
    } else {
        reviewAccordian.style.maxHeight = reviewAccordian.scrollHeight + "px";
        orderAccordianButton.innerHTML = "Show Less";
    }
});
