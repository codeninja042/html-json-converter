const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const htmlToJson = require('convert-html-to-json');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Process data function
function processData(data) {
    // Process the data (example: convert to uppercase)
    return htmlToJson(data);
}

// Handle form submission
app.post('/process', (req, res) => {
    const inputData = req.body.data;
    const processedData = processData(inputData);

    res.send(`Processed Data: ${processedData}`);
});

// Process the file
function processFile(fileName) {
    try {
        const fileContent = fs.readFileSync(fileName, 'utf-8');
        // Process the file content (example: convert to uppercase)
        const processedFileContent = JSON.stringify(htmlToJson(fileContent));
        console.log(`Processed File Content: \n ${processedFileContent}`);
    } catch (error) {
        console.error('Error processing the file:', error.message);
    }
}

// Process the file when the server starts
if (process.argv.length >= 3) {
    const fileName = process.argv[2];
    processFile(fileName);
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
