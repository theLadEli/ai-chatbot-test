// FRONTEND

function saveInput(userMessage) {

    const sendUserMessage = {
        userMessage
      };

    // Make a POST request to the Node.js application
    fetch('https://ccsync.buildbuddy.co/save-message/', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendUserMessage), // convert the userMessage object to a JSON string
        })
        .then((response) => {
            if (response.ok) {
                return response.json(); // or response.text() if the server sends a non-JSON response
            } else {
                // If the server response was not ok, read and return the response text for more details
                return response.text().then(text => { throw new Error('Request failed: ' + text) });
            }
        })
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}



// BACKEND
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cors = require('cors');

app.use(cors());

// Set up body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Define a POST route to handle incoming user messages
app.post('/saveMessage', (req, res) => {
  const userMessage = req.body.userMessage;

  // Append the user message to a CSV file
  const csvWriter = createCsvWriter({
    path: 'user-input.csv',
    header: [{ id: 'message', title: 'Message' }]
  });

  csvWriter
    .writeRecords([{ message: userMessage }])
    .then(() => {
      console.log('User message saved to user-input.csv');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error saving user message:', error);
      res.sendStatus(500);
    });
});

// Start the server on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
