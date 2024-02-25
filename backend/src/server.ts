import express, { Request, Response } from 'express';

interface UserInput {
  text: string;
  score: number;
}

const app = express();
const cors = require('cors');

const port = 3000;

app.use(express.json())
app.use(cors());

const userInputScores: { [key: string]: number } = {};

const data: string = "Server is running properly"


// GET retrieves data FROM the server (TESTING function, delete later)
app.get('/', (req, res) => {
    try {
        res.status(200).json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/getScore', (req, res) => {
  try {
    const user_input: string = req.body;
    console.log(user_input);
  
    // TODO: Get the score from inference side
    const score = 10; 
  
    // Return the current score back to frontend 
    res.status(201).send(score);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/makePost', (req, res) => {
  try {
    const userInput: UserInput = req.body;
    // Store the record in our server
    const input_text: string = userInput.text;
    const score: number = userInput.score;
    userInputScores[input_text] = score;
    res.status(201).send("Successfully stored the user input in server!");
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/getPostLeaderboard', (req, res) => {
  try {
    res.status(200).json(userInputScores);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// app.post('/api/inference', (req, res) => {

// });

// PUT updates existing data on server ENTIRELY
app.put('/api/items/:id', (req, res) => {
  // Logic to update an item ENTIRELY
  // Access the item id with req.params.id
  res.send(`Item ${req.params.id} updated`);
});

// PATCH updates existing data on server PARTIALLY
app.patch('/api/items/:id', (req, res) => {
  // Logic to partially update an item
  res.send(`Item ${req.params.id} partially updated`);
});

// DELETE deletes data from the server
app.delete('/api/items/:id', (req, res) => {
  // Logic to delete an item
  res.send(`Item ${req.params.id} deleted`);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
