const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('🟢 App Online');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// Create csv with headers
const csvWriter = createCsvWriter({
    path: 'user-messages.csv',
    header: [
        {id: 'message', title: 'Message'}
    ]
});

app.post('/saveMessage', (req, res) => {
    const userMessage = req.body.user_message;
    console.log('Received message:', userMessage);

    const records = [
        {message: userMessage}
    ];

    // Save user message to csv
    csvWriter.writeRecords(records)// returns a promise
    .then(() => {
        console.log('...Done');
    });

    // Send a response back to the client
    res.status(200).send({ message: 'Message received successfully' });
});