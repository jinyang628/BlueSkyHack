import axios from "axios";

const API_URL = "http://localhost:3000";

// Call this function to get a score from 1-10 based on the user's input
// User input must be string, and the returned value is a number
export default async function getScore(userInput: string) {
  const response: number = await axios.post(`${API_URL}/api/getScore`, {
    userInput,
  });

  return response;
}
