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

// Take info from the user and start the chat
function startChat() {
    // Get the values of the input fields and select options
    const hasTakenTest = document.getElementById('experience').checked;
    const listeningBand = document.getElementById('bandListening').value;
    const readingBand = document.getElementById('bandReading').value;
    const writingBand = document.getElementById('bandWriting').value;
    const speakingBand = document.getElementById('bandSpeaking').value;
    const elaboration = document.getElementById('elaboration').value;

    // Hide the intro container and show the chat container
    document.querySelector('.intro-container').style.display = 'none'; 
    document.querySelector('.chat-container').style.display = 'flex';

    // Display the response from the server in the chat box
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = response.message;
  
    // Create an AJAX request to send this data to the server
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/ieltsConsultant');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
  
        // Hide the intro container and show the chat container
        const introContainer = document.querySelector('.intro-container');
        const chatContainer = document.querySelector('.chat-container');
        introContainer.style.display = 'none'; 
        chatContainer.style.display = 'flex';
  
        // Display the response from the server in the chat box
        const chatBox = document.getElementById('chat-box');
        chatBox.innerHTML = response.message;
      }
    };
    const data = JSON.stringify({
      hasTakenTest,
      listeningBand,
      readingBand,
      writingBand,
      speakingBand,
      elaboration,
    });
    xhr.send(data);
  }
  

// Show select container if the user has taken an IELTS test before
const experienceCheckbox = document.getElementById('experience');
const selectContainer = document.querySelector('.select-container');
experienceCheckbox.addEventListener('change', function() {
  if (this.checked) {
    selectContainer.style.display = 'flex';
  } else {
    selectContainer.style.display = 'none';
  }
});