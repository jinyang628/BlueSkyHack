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

const userInputScores: { [key: string]: number } = {"Aaron and Samuel are the best hackathon teammates in the world!": 10};

const server_check: string = "Server is running properly"

app.get('/', (req, res) => {
    try {
        res.status(200).json(server_check);
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
    res.status(201).json({ score });
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
    const successMessage: string = "Successfully stored the user input in server!";
    res.status(201).json({ successMessage });

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
