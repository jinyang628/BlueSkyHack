import { useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextInput from "./components/Input";
import ClickButton from "./components/ClickButton";
import { getScore } from "./api/getScore";
import makePost from "./api/makePost";
import { getPostLeaderboard } from "./api/getPostLeaderboard";

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
    try {
      const response = await makePost(inputText);
      console.log("Post", response);
      return response;
    } catch (error) {
      console.error("Error fetching score:", error);
      setError("Error fetching score. Please try again.");
    }
  };

  const handleLeaderboard = async () => {
    try {
      const response = await getScore(inputText);
      setScore(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching score:", error);
      setError("Error fetching score. Please try again.");
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
          {score && <p>Score: {score.score}</p>}
          {error && <p>Error: {error}</p>}
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
