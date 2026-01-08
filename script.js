//DOM ELEMENTS 
const choices = document.querySelectorAll(".choice");
const userScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");

const choicesScreen = document.getElementById("choices-screen");
const resultScreen = document.getElementById("result-screen");
const hurrayScreen = document.getElementById("hurray-screen");

const userChoiceEl = document.getElementById("user-choice");
const pcChoiceEl = document.getElementById("pc-choice");

const resultMessage = document.getElementById("result-message");
const resultSubtext = document.getElementById("result-subtext");

const playAgainBtn = document.getElementById("play-again");
const nextBtn = document.getElementById("next-btn");

const rulesBtn = document.querySelector(".rules-btn");
const rulesPopup = document.getElementById("rules-popup");
const closeRulesBtn = document.getElementById("close-rules");

// RULES
rulesBtn.addEventListener("click", () => {
    rulesPopup.classList.remove("hidden");
});

closeRulesBtn.addEventListener("click", () => {
    rulesPopup.classList.add("hidden");
});


//SCORE (LOCAL STORAGE)
let userScore = localStorage.getItem("userScore")
    ? parseInt(localStorage.getItem("userScore"))
    : 0;

let computerScore = localStorage.getItem("computerScore")
    ? parseInt(localStorage.getItem("computerScore"))
    : 0;

userScoreEl.textContent = userScore;
computerScoreEl.textContent = computerScore;

//  GAME OPTIONS 
const options = ["rock", "paper", "scissors"];

//  HELPER FUNCTIONS 
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

function getResult(userChoice, computerChoice) {
    if (userChoice === computerChoice) return "tie";

    if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {
        return "win";
    }
    return "lose";
}

function getIcon(choice) {
    if (choice === "rock") return "✊";
    if (choice === "paper") return "✋";
    return "✌️";
}

//  GAME LOGIC 
choices.forEach(choice => {
    choice.addEventListener("click", () => {
        const userChoice = choice.dataset.choice;
        const computerChoice = getComputerChoice();
        const result = getResult(userChoice, computerChoice);

        // Update scores
        if (result === "win") userScore++;
        if (result === "lose") computerScore++;

        userScoreEl.textContent = userScore;
        computerScoreEl.textContent = computerScore;

        // Save scores
        localStorage.setItem("userScore", userScore);
        localStorage.setItem("computerScore", computerScore);

        // Switch screens
        choicesScreen.classList.add("hidden");
        resultScreen.classList.remove("hidden");

        // Show choices
        userChoiceEl.textContent = getIcon(userChoice);
        pcChoiceEl.textContent = getIcon(computerChoice);

        // Reset glow & borders
        userChoiceEl.classList.remove(
            "winner",
            "border-rock",
            "border-paper",
            "border-scissors"
        );

        pcChoiceEl.classList.remove(
            "winner",
            "border-rock",
            "border-paper",
            "border-scissors"
        );


        // Result handling
        if (result === "win") {
            resultMessage.textContent = "YOU WIN";
            resultSubtext.textContent = "AGAINST PC";
            userChoiceEl.classList.add("winner",`border-${userChoice}`);
            playAgainBtn.textContent = "NEXT";
        }
        else if (result === "lose") {
            resultMessage.textContent = "YOU LOST";
            resultSubtext.textContent = "AGAINST PC";
            pcChoiceEl.classList.add("winner",`border-${computerChoice}`);
            playAgainBtn.textContent = "PLAY AGAIN";
        }
        else {
            resultMessage.textContent = "TIE UP";
            resultSubtext.textContent = "";
            playAgainBtn.textContent = "REPLAY";
        }
    });
});

//  PLAY AGAIN / NEXT 
playAgainBtn.addEventListener("click", () => {

    // If user won → go to HURRAY screen
    if (playAgainBtn.textContent === "NEXT") {
        resultScreen.classList.add("hidden");
        hurrayScreen.classList.remove("hidden");
        return;
    }

    // Otherwise → back to game
    resultScreen.classList.add("hidden");
    choicesScreen.classList.remove("hidden");
    resultSubtext.textContent = "AGAINST PC";
});

//  HURRAY NEXT 
nextBtn.addEventListener("click", () => {
    hurrayScreen.classList.add("hidden");
    choicesScreen.classList.remove("hidden");
});
