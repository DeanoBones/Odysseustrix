// Matrix effect code
const matrix = document.getElementById("matrix");
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const columnCount = Math.floor(window.innerWidth / 20);  // Number of columns based on the width of the screen
const fallSpeed = 30;      // Speed of falling characters
const letterSpeed = 100;   // Delay between each character update (in ms)

let columns = [];
let maxColumnHeight = window.innerHeight / 10;  // Max height for a column to fill the screen

// Function to create the matrix effect
function createMatrix() {
    // Create columns based on window width
    for (let i = 0; i < columnCount; i++) {
        let column = document.createElement("div");
        column.classList.add("column");
        column.style.left = `${i * 20}px`; // Ensure columns are spaced out horizontally
        matrix.appendChild(column);

        let columnData = {
            chars: [],
            nextCharacterTime: Math.random() * 5000 + 2000,  // Random time between 2 and 5 seconds before a character falls
        };

        columns.push(columnData);

        // Remove the placeholder span that was initially added
        columnData.chars = [];
    }
}

// Update falling effect
function animateMatrix() {
    columns.forEach((columnData, columnIndex) => {
        // Randomize the time for each column to spawn a new character
        if (columnData.nextCharacterTime <= 0) {
            // Create a new character
            const char = document.createElement("span");
            char.textContent = characters[Math.floor(Math.random() * characters.length)];
            columns[columnIndex].chars.push(char);
            matrix.children[columnIndex].appendChild(char);

            // Set the initial top position (the character starts at the top of the column)
            char.style.top = "0px";
            char.style.transition = "top 1s linear"; // Smooth transition for fall

            // Animate the character falling
            let fallDistance = window.innerHeight * 1.5; // Make the fall longer to reach the bottom
            let fallDuration = fallDistance * fallSpeed;

            setTimeout(() => {
                char.style.transition = `top ${fallDuration}ms linear`;  // Adjust fall duration for each character
                char.style.top = `${fallDistance}px`;  // Move the character down
            }, 10);

            // Remove character after 25 seconds, not immediately after falling
            setTimeout(() => {
                columnData.chars.shift();  // Remove the character from the column array
                matrix.children[columnIndex].removeChild(char);  // Remove the character from DOM
            }, 25000); // 25 seconds

            // Randomize the next character spawn time (between 2-5 seconds)
            columnData.nextCharacterTime = Math.random() * 5000 + 2000;
        }

        // Decrease the next character fall time
        columnData.nextCharacterTime -= letterSpeed;
    });
}

// Create matrix and start animation
createMatrix();
setInterval(animateMatrix, letterSpeed);

// Password box functionality
const passwordBox = document.querySelector('.password-box input');

passwordBox.addEventListener('input', function () {
    const enteredPassword = passwordBox.value;
    if (enteredPassword.toLowerCase() === 'iamvenom') {  // Convert entered password to lowercase for case-insensitive comparison
        // Show a cool message when the password is correct
        showSuccessMessage();
    }
});

// Function to display a cool success message with the code below inside the same box
function showSuccessMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.style.position = "absolute";
    messageDiv.style.top = "20%";  // Move it higher up on the screen
    messageDiv.style.left = "50%";
    messageDiv.style.transform = "translateX(-50%)";
    messageDiv.style.fontSize = "40px";
    messageDiv.style.fontFamily = "'Courier New', Courier, monospace";
    messageDiv.style.color = "green";
    messageDiv.style.backgroundColor = "black";
    messageDiv.style.padding = "20px";
    messageDiv.style.borderRadius = "10px";
    messageDiv.style.boxShadow = "0px 0px 20px rgba(0, 255, 0, 0.8)";
    messageDiv.style.textAlign = "center";

    // Add both the success message and the code in the same box
    messageDiv.innerHTML = `
        ACCESS GRANTED. VENOM UNLEASHED.<br>
        CODE: QRT67H
    `;

    // Add the message box to the body
    document.body.appendChild(messageDiv);

    // Now the message will stay and will not fade out or disappear
}
