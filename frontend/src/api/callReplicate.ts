import axios from "axios";

const API_URL = "http://localhost:3000";

// Call this function to get Replicate to rephrase your tweet so u can go viral!
export async function callReplicate(userInput: string) {
    const response: number = await axios.post(
        `${API_URL}/api/callReplicate`, 
        {
            userInput
        },
    );

    return response;
}