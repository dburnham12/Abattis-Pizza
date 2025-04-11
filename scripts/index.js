let orderAccordianButton = document.getElementById("review-accordian-button");
let reviewAccordian = document.getElementById("review-accordian");

let gameStartButton = document.getElementById("game-start-button");
let gameStartOverlay = document.getElementById("game-start-overlay");
let gameTiles = document.getElementsByClassName("game-tile");
let gameOverScreen = document.getElementById("game-lost-overlay");
let gameWonSection = document.getElementById("game-won-section");
let gameTimer = document.getElementById("game-timer");

let gameBoardInfo;
let clickCount = 0;
let checkedTileIndex;
let canClick = true;
let gameSeconds = 45;
let timer;
let reloadGame = false;

orderAccordianButton.addEventListener("click", () => {
    if (reviewAccordian.style.maxHeight) {
        reviewAccordian.style.maxHeight = null;
        orderAccordianButton.innerHTML = "Show More";
    } else {
        reviewAccordian.style.maxHeight = reviewAccordian.scrollHeight + "px";
        orderAccordianButton.innerHTML = "Show Less";
    }
});

gameStartButton.addEventListener("click", (event) => {
    gameStartOverlay.style.display = "none";

    let gameBoardSetup = [
        { image: "images/pizza.jpg", alt: "A pepperoni pizza", found: false },
        { image: "images/soda.jpg", alt: "Two soda cans", found: false },
        { image: "images/pepperoni.jpg", alt: "Sliced pepperoni", found: false },
        { image: "images/chickenwings.jpg", alt: "A plate with 6 wings", found: false },
        { image: "images/steakBits.jpg", alt: "A bowl of steak bits", found: false },
        { image: "images/shreddedChicken.jpg", alt: "A bowl of shredded chicken", found: false },
        { image: "images/friedMushrooms.jpg", alt: "A bowl of fried mushrooms", found: false },
        { image: "images/greenPepper.jpg", alt: "Sliced green pepper", found: false },
    ];

    // Set up the game boards info
    gameBoardInfo = [...gameBoardSetup, ...gameBoardSetup];

    // Shuffle the board so that it is not the same every time
    for (let i = 0; i < gameBoardInfo.length; i++) {
        let randomValue = Math.floor(Math.random() * gameBoardInfo.length);
        let gameInfoHold = gameBoardInfo[i];
        gameBoardInfo[i] = gameBoardInfo[randomValue];
        gameBoardInfo[randomValue] = gameInfoHold;
    }

    // If the game has been restarted
    if (reloadGame) {
        for (let i = 0; i < gameTiles.length; i++) {
            gameTiles[i].src = "images/questionMark.png";
            gameTiles[i].alt = "A question mark tile";
        }
    }

    // Update the game timer
    gameSeconds = 45;
    gameTimer.innerHTML = "" + gameSeconds + "s";
    timer = setInterval(function () {
        gameSeconds--;
        gameTimer.innerHTML = "" + gameSeconds + "s";
        if (gameSeconds <= 0) {
            clickCount = 0;
            reloadGame = true;
            gameStartButton.innerHTML = "Retry";
            gameStartOverlay.style.display = "flex";
            clearInterval(timer);
        }
    }, 1000);
});

for (let i = 0; i < gameTiles.length; i++) {
    gameTiles[i].addEventListener("click", () => {
        if (canClick && !gameBoardInfo[i].found) {
            gameTiles[i].src = gameBoardInfo[i].image;
            gameTiles[i].alt = gameBoardInfo[i].alt;

            // If this is the first square we are clicking on
            if (clickCount == 0) {
                clickCount++;
                checkedTileIndex = i;
            } else if (i !== checkedTileIndex) {
                // If we have a tile to match with
                clickCount = 0;
                // if the tile is not a match
                if (gameBoardInfo[i].image !== gameBoardInfo[checkedTileIndex].image) {
                    canClick = false;
                    // Wait 1 second then reset the game tiles
                    setTimeout(function () {
                        canClick = true;
                        gameTiles[i].src = "images/questionMark.png";
                        gameTiles[i].alt = "A question mark tile";
                        gameTiles[checkedTileIndex].src = "images/questionMark.png";
                        gameTiles[checkedTileIndex].alt = "A question mark tile";
                    }, 1000);
                } else {
                    // if the tile is a match
                    gameBoardInfo[i].found = true;
                    gameBoardInfo[checkedTileIndex].found = true;
                }
            }
        }

        // Check if the game has been won
        let gameWon = true;
        gameBoardInfo.forEach((info) => {
            if (info.found === false) gameWon = false;
        });
        // If the game has been won display the discount code with a message
        if (gameWon) {
            clearInterval(timer);
            gameWonSection.style.display = "flex";
        }
    });
}
