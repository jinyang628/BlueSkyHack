import axios from "axios";

const API_URL = "http://localhost:3000";

// The response is simply a success message. You can see it in the inspector. Do not need to display it.
export async function getPostLeaderboard() {
    const response: string = await axios.get(
        `${API_URL}/api/getPostLeaderboard`
    );
    return response;
}