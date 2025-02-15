document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation logic
    if (username === 'admin' && password === 'password') {
        document.getElementById('message').textContent = 'Login successful!';
        document.getElementById('message').style.color = 'green';
    } else {
        document.getElementById('message').textContent = 'Invalid username or password.';
    }
});

async function sendMessage() {
    const input = document.querySelector('.chat-footer input[type="text"]');
    const message = input.value;
    if (!message) return;

    // Display the user's message
    const chatBody = document.querySelector('.chat-body');
    const userMessage = document.createElement('p');
    userMessage.textContent = `You: ${message}`;
    chatBody.appendChild(userMessage);

    // Clear the input
    input.value = '';

    // Call the Gemini API
    try {
        const { GoogleGenerativeAI } = require("@google/generative-ai");
        const genAI = new GoogleGenerativeAI("AIzaSyA_rF9TDZruVbZC-XtQS71LAfphQLE6i7o");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(message);
        const botMessage = document.createElement('p');
        botMessage.textContent = `Bot: ${result.response.text()}`;
        chatBody.appendChild(botMessage);
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Bot: Sorry, something went wrong.';
        chatBody.appendChild(errorMessage);
    }
}

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'block';
    } else {
        chatWindow.style.display = 'none';
    }
}

document.querySelector('.chat-footer button').addEventListener('click', sendMessage);

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            alert(`Connected account: ${account}`);
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            alert('Failed to connect to MetaMask.');
        }
    } else {
        alert('MetaMask is not installed. Please install it to use this feature.');
    }
}

// Attempt to connect wallet on page load
window.addEventListener('load', async () => {
    try {
        await connectWallet();
    } catch (error) {
        console.error('Error during automatic connection:', error);
    }
});

// Function to disconnect MetaMask account
function disconnectMetaMask() {
    // Clear stored account information
    localStorage.removeItem('connectedAccount'); // Example if you're using localStorage

    // Reset application state
    // Assuming you have a function to update the UI or state
    updateUIForDisconnectedState();

    console.log('MetaMask account disconnected');
}

// Example function to update UI for disconnected state
function updateUIForDisconnectedState() {
    // Update your UI to reflect the disconnected state
    // For example, hide account info, show connect button, etc.
    document.getElementById('accountInfo').style.display = 'none';
    document.getElementById('connectButton').style.display = 'block';
} 