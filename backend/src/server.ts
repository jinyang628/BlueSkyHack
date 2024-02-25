import express, { Request, Response } from "express";
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
    console.log("userInput", userInput);
    // Store the record in our server
    const { text, score } = req.body.userInput;
    console.log(text, score);
    userInputScores[text] = score;
    const successMessage: string =
      "Successfully stored the user input in server!";
    res.status(201).json({ successMessage });
    console.log("userinputscores", userInputScores);
    console.log(successMessage);
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
    const proposed_input: string = await createReplicate(req.body.userInstruction);
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
