import { useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextInput from "./components/Input";
import ClickButton from "./components/ClickButton";
import getScore from "./api/getScore";
import makePost from "./api/makePost";
import getPostLeaderboard from "./api/getPostLeaderboard";
import { callReplicate } from "./api/callReplicate";

// Create a theme instance
const theme = createTheme({
  palette: {
    background: {
      default: "blue", // This sets the background color for the entire app
    },
  },
});

const App = () => {
  const [inputText, setInputText] = useState("");
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);

  const handleScore = async () => {
    try {
      const response = await getScore(inputText);
      setScore(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching score:", error);
      setError("Error fetching score. Please try again.");
    }
  };

  // App.jsx

  const handlePost = async () => {
    // Ensure there is a score before attempting to post
    if (score !== null && inputText) {
      try {
        // Construct the userInput object based on the UserInput interface
        const userInput = {
          text: inputText,
          score: score.score, // Assuming score is an object with a 'score' property
        };

        // Call makePost with the constructed userInput object
        const response = await makePost(userInput);
        // Handle response or success state here, such as resetting the form
      } catch (error) {
        console.error("Error making post:", error);
        setError("Error making post. Please try again.");
      }
    } else {
      // Handle the case where score or inputText is not available
      setError(
        "Please ensure text is entered and a score is generated before posting."
      );
    }
  };

  const handleLeaderboard = async () => {
    try {
      const response = await getPostLeaderboard();
      setLeaderboard(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      setError("Error fetching leaderboard. Please try again.");
    }
  };

  const handleGenerate = async () => {
    try {
      const response = await callReplicate(inputText);
      setInputText(response);
      setError(null);
    } catch (error) {
      console.error("Error generating:", error);
      setError("Error generating. Please try again.");
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          display: "flex", // Enable flexbox
          justifyContent: "center", // Center children horizontally
          alignItems: "center", // Center children vertically
          minHeight: "100vh", // Full viewport height
          backgroundColor: "blue", // Add a background color
        }}
      >
        <Container maxWidth="sm">
          <TextInput
            label="Type post here!"
            variant="outlined"
            fullWidth
            value={inputText}
            onChange={handleInputChange}
          />
          <ClickButton onClick={handleScore}>Get Score</ClickButton>
          <ClickButton onClick={handlePost}>Post</ClickButton>
          <ClickButton onClick={handleLeaderboard}>Get Leaderboard</ClickButton>
          <ClickButton onClick={handleGenerate}>Help me Replicate!</ClickButton>
          {score && <p>Score: {score.score}</p>}
          {leaderboard && (
            <div>
              <h3>Leaderboard:</h3>
              <ul>
                {Object.entries(leaderboard).map(([name, score], index) => (
                  <li key={index}>
                    {name}: {score}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {error && <p>Error: {error}</p>}
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
