import axios from "axios";

const API_URL = "http://localhost:3000";

// Call this function to get Replicate to rephrase your tweet so u can go viral!
export async function paraphraseReplicate(userInput: string) {
    const response: string = await axios.post(
        `${API_URL}/api/paraphraseReplicate`, 
        {
            userInput
        },
    );
  
    return response["data"];
}