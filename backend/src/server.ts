import express, { Request, Response } from "express";
import callReplicate from "./replicate";

interface UserInput {
  text: string;
  score: number;
}

const app = express();
const cors = require("cors");

const port = 3000;

app.use(express.json());
app.use(cors());

let userInputScores: { [key: string]: number } = {
  "Aaron and Samuel are the best hackathon teammates in the world!": 10,
};

const server_check: string = "Server is running properly";

app.get("/", (req, res) => {
  try {
    res.status(200).json(server_check);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/getScore", (req, res) => {
  try {
    const user_input: string = req.body;
    
    // TODO: Get the score from inference side
    const score = 10;

    // Return the current score back to frontend
    res.status(201).json({ score });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/makePost", (req, res) => {
  try {
    const userInput: UserInput = req.body;
    // Store the record in our server
    const input_text: string = userInput.text;
    const score: number = userInput.score;
    userInputScores[input_text] = score;
    const successMessage: string =
      "Successfully stored the user input in server!";
    res.status(201).json({ successMessage });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/getPostLeaderboard", (req, res) => {
  try {
    res.status(200).json(userInputScores);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/callReplicate", async (req, res) => {
  try {
    const user_input: string = req.body.userInput;
    const better_input: string = await callReplicate(user_input);
    res.status(200).json(better_input);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// app.post('/api/inference', (req, res) => {

// });



// // DELETE deletes data from the server
// app.delete("/api/items/:id", (req, res) => {
//   // Logic to delete an item
//   res.send(`Item ${req.params.id} deleted`);
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
