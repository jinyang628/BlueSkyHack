import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextInput from "./components/Input";
import ClickButton from "./components/ClickButton";

// Create a theme instance
const theme = createTheme({
  palette: {
    background: {
      default: "blue", // This sets the background color for the entire app
    },
  },
});

const App = () => {
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
          <TextInput label="Type post here!" variant="outlined" fullWidth />
          <ClickButton onClick={() => console.log("Button clicked")}>
            Score
          </ClickButton>
          <ClickButton onClick={() => console.log("Button clicked")}>
            Post
          </ClickButton>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
