const { exec } = require('child_process');
const open = require('open');

// Start the server
const server = exec('node "Chatbot v1/server.js"', (err, stdout, stderr) => {
    if (err) {
        console.error(`Error starting server: ${stderr}`);
        return;
    }
    console.log(`Server started: ${stdout}`);
});

// Listen for server output to confirm it's running
server.stdout.on('data', (data) => {
    console.log(data); // Log server output for debugging
    if (data.includes('Server is running at http://localhost:3002')) {
        // Open the index.html in the default browser
        open('loginPageLinkedMainPage/index.html');
    }
});
