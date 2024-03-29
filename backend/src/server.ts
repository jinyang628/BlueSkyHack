import express, { Request, Response } from "express";
import axios from "axios";
import paraphraseReplicate from "./paraphraseReplicate";
import createReplicate from "./createReplicate";

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
  "Aaron and Samuel are the best hackathon teammates in the world!": 8.3,
  "Make something people want": 9.7,
  "HOLY SHI- BLUESKY IS FRICKIN AWESOMEEEEEEEE 🔥🔥🔥": 1000000,
};

const server_check: string = "Server is running properly";

const inferenceResult = async (user_input: string): Promise<number> => {
  // const randomNumber: number = Math.random() * 9 + 1;
  // return parseFloat(randomNumber.toFixed(2));
  const url: string = 'https://dynamic-condor-reliably.ngrok-free.app/llama2'

  const data = {
    "input": user_input 
  }
  try {
    const response = await axios.post(
      url, data
    );
    return response.data.result; 
  } catch (error ) {
    console.error("Error: ", error);
    return 0;
  }
  
};

app.get("/", (req, res) => {
  try {
    res.status(200).json(server_check);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/getScore", async (req, res) => {
  try {
    const user_input: string = req.body.userInput;

    const score: number = await inferenceResult(user_input);

    res.status(201).json({ score });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/makePost", (req, res) => {
  try {
    const userInput: UserInput = req.body;
    // Store the record in our server
    const { text, score } = req.body.userInput;
    userInputScores[text] = score;
    const successMessage: string =
      "Successfully stored the user input in server!";
    res.status(201).json({ successMessage });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/getPostLeaderboard", (req, res) => {
  try {
    let scoresArray = Object.entries(userInputScores);
    scoresArray.sort((a, b) => b[1] - a[1]);
    let sortedScores = Object.fromEntries(scoresArray);
    res.status(200).json(sortedScores);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/paraphraseReplicate", async (req, res) => {
  try {
    const user_input: string = req.body.userInput;
    const better_input: string = await paraphraseReplicate(user_input);
    res.status(200).json(better_input);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/createReplicate", async (req, res) => {
  try {
    const proposed_input: string = await createReplicate(
      req.body.userInstruction
    );
    res.status(200).json(proposed_input);
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
