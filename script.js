const passwordInput = document.getElementById("passwordInput");
const fallingLettersContainer = document.getElementById("falling-letters-container");
const accessGrantedMessage = document.getElementById("access-granted");

// Function to generate a random letter
function getRandomLetter() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return characters[Math.floor(Math.random() * characters.length)];
}

// Function to create a new falling letter at a random horizontal position
function createFallingLetter() {
    const fallingLetterElement = document.createElement("div");
    fallingLetterElement.classList.add("falling-letter");
    fallingLetterElement.textContent = getRandomLetter();

    // Random horizontal position (within the width of the window)
    const randomLeft = Math.random() * (window.innerWidth - 50); // Adjusted for letter width (50px)

    // Apply the random horizontal position
    fallingLetterElement.style.left = `${randomLeft}px`;

    // Initial position and speed for the falling letter
    let currentPosition = 0;
    const fallSpeed = Math.random() * 3 + 1; // Random speed between 1px and 4px for variation
    const endPosition = window.innerHeight - 100;

    // Function to animate the falling letter
    function animateFallingLetter() {
        const fallingInterval = setInterval(() => {
            currentPosition += fallSpeed;
            fallingLetterElement.style.top = `${currentPosition}px`;

            // When it reaches the bottom, stop the animation
            if (currentPosition >= endPosition) {
                clearInterval(fallingInterval);
                fallingLetterElement.remove(); // Remove the letter when it reaches the bottom
            }
        }, 20); // Update the position every 20 milliseconds
    }

    // Add an event listener to the falling letter
    fallingLetterElement.addEventListener("click", () => {
        passwordInput.value += fallingLetterElement.textContent;  // Add clicked letter to the password input box
        checkPassword(); // Check password each time a letter is clicked
    });

    // Append the falling letter to the container and start the animation
    fallingLettersContainer.appendChild(fallingLetterElement);
    animateFallingLetter();
}

// Function to create multiple falling letters at random intervals
function startFallingLetters() {
    setInterval(() => {
        // Generate multiple falling letters at once, but with a slight vertical offset for each
        for (let i = 0; i < 5; i++) {
            createFallingLetter();
        }
    }, 500); // Create 5 new letters every 500 milliseconds
}

// Function to handle backspace key press
function handleBackspace(event) {
    if (event.key === "Backspace" && passwordInput.value.length > 0) {
        // Remove the last character from the password input
        passwordInput.value = passwordInput.value.slice(0, -1);
    }
}

// Function to check if the password matches "IAMVENOM"
function checkPassword() {
    const enteredPassword = passwordInput.value.trim().toUpperCase();
    if (enteredPassword === "IAMVENOM") {
        accessGrantedMessage.style.display = "block";  // Show the access granted message
    }
}

// Start the falling letters effect
startFallingLetters();

// Add event listener for backspace key press
document.addEventListener("keydown", handleBackspace);
