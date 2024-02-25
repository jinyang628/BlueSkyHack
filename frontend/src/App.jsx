import { useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextInput from "./components/Input";
import ClickButton from "./components/ClickButton";
import getScore from "./api/getScore";
import makePost from "./api/makePost";
import getPostLeaderboard from "./api/getPostLeaderboard";
import { paraphraseReplicate } from "./api/paraphraseReplicate";
import { createReplicate } from "./api/createReplicate";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import TitleComponent from "./components/TitleComponent";

// Create a theme instance
const theme = createTheme({
  palette: {
    background: {
      default: "#1DA1F2",
    },
    // Consider adding a primary or secondary color here if needed
  },
  typography: {
    // Customize the typography as needed
    h1: {
      fontSize: "2.125rem", // Example size adjustment
      fontWeight: 600, // Example weight adjustment
      // Add more properties as needed
    },
  },
});

const App = () => {
  const [inputText, setInputText] = useState("");
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        console.log("Post response:", response);
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
      console.log("Leaderboard:", response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      setError("Error fetching leaderboard. Please try again.");
    }
  };

  const handleCreate = async () => {
    try {
      setIsLoading(true); // Start loading
      const response = await createReplicate(inputText);
      setInputText(response);
      setIsLoading(false); // Stop loading when the request is completed
      setError(null);
    } catch (error) {
      console.error("Error generating:", error);
      setIsLoading(false); // Stop loading in case of an error
      setError("Error generating. Please try again.");
    }
  }

  const handleParaphrase = async () => {
    try {
      setIsLoading(true); // Start loading
      const response = await paraphraseReplicate(inputText);
      setInputText(response);
      setIsLoading(false); // Stop loading when the request is completed
      setError(null);
    } catch (error) {
      console.error("Error generating:", error);
      setIsLoading(false); // Stop loading in case of an error
      setError("Error generating. Please try again.");
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TitleComponent />
      <Box
        style={{
          display: "flex", // Enable flexbox
          flexDirection: "row", // Stack children vertically
          justifyContent: "space-between", // Center children horizontally
          alignItems: "flex-start", // Center children vertically
          minHeight: "100vh",
          minWidth: "100vw",
        }}
      >
        <Box
          sx={{
            flex: 1, // Allows this box to grow, taking up half the space
            p: 3, // Add padding for spacing from the edges
            marginLeft: "10rem",
          }}
        >
          <div
            style={{
              display: "flex", // Enable flexbox
              flexDirection: "column", // Stack children vertically
              alignItems: "center", // Center children vertically
              minHeight: "100vh", // Full viewport height
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
              <ClickButton onClick={handleLeaderboard}>
                Get Leaderboard
              </ClickButton>
              <ClickButton onClick={handleCreate}>
                Generate for me Replicate!
              </ClickButton>
              <ClickButton onClick={handleParaphrase}>
                Paraphrase for me Replicate!
              </ClickButton>
              {isLoading && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
              </div>
            )}
            {score && <p>Score: {score.score}</p>}

              {error && <p>Error: {error}</p>}
            </Container>
          </div>
        </Box>

        <Box
          sx={{
            flex: 1, // Allows this box to grow, taking up half the space
            p: 3, // Add padding for spacing from the edges
          }}
        >
          {leaderboard && (
            <div>
              <h3>Your Leaderboard:</h3>
              <ul>
                {Object.entries(leaderboard).map(([name, score], index) => (
                  <li key={index}>
                    <div>Post: {name}</div>
                    <div>Score: {score}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
