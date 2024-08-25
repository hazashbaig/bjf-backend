const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// POST route
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Example user information (replace with actual values)
    const userId = "hazashbaig";  // Format: full_name_ddmmyyyy
    const email = "hazash.21bce7503@vitapstudent.ac.in";
    const rollNumber = "21BCE7503";

    // Validate input
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            "is_success": false,
            "user_id": userId,
            "email": email,
            "roll_number": rollNumber,
            "numbers": [],
            "alphabets": [],
            "highest_lowercase_alphabet": []
        });
    }

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase() && item.length === 1);

    // Find the highest lowercase alphabet
    const highestLowercaseAlphabet = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().reverse()[0]] : [];

    // Respond with the processed data
    res.json({
        "is_success": true,
        "user_id": userId,
        "email": email,
        "roll_number": rollNumber,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highestLowercaseAlphabet
    });
});

// GET route
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        "operation_code": 1
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
