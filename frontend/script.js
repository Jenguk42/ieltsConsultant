const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

let userMessages = [];
let botMessages = [];

async function sendMessage() {
    try {

        displayUserMessage(userInput.value); // Display the user's message

        const response = await fetch("http://localhost:3000/ieltsConsultant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // message: userInput.value,
                userMessages: userMessages,
                botMessages: botMessages
            }),
        });

        console.log(userInput.value);
        const responseData = await response.json();
        console.log(responseData.assistant);
        displayBotMessage(responseData.assistant);
    } catch (error) {
        console.error(error);
    }

    // Clear the input field after sending message
    userInput.value = "";
}

function displayUserMessage(message) {
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('user-message');
    userMessageElement.innerText = message;

    chatBox.appendChild(userMessageElement);
    userMessages.push(message);
}

function displayBotMessage(message) {
    const botMessageElement = document.createElement('div');
    botMessageElement.classList.add('bot-message');
    botMessageElement.innerText = message;

    chatBox.appendChild(botMessageElement);
    botMessages.push(message);
}

// Display a welcome message when the page loads
displayBotMessage("Welcome! How can I assist you with your IELTS preparation today?");

function startChat() {
    document.body.classList.toggle('show-chat')
}

// Show select container if the user has taken an IELTS test before
const experienceCheckbox = document.getElementById('experience');
const selectContainer = document.querySelector('.select-container');
experienceCheckbox.addEventListener('change', function() {
  if (this.checked) {
    selectContainer.style.display = 'block';
  } else {
    selectContainer.style.display = 'none';
  }
});