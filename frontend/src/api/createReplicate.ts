import axios from "axios";

const API_URL = "http://localhost:3000";

// Call this function to get Replicate to give you a tweet. Kickstart ur bid for stardom!
export async function createReplicate() {
    const response: string = await axios.post(
        `${API_URL}/api/paraphraseReplicate` 
    );
  
    return response["data"];
}