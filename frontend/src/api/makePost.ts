import { BskyAgent } from '@atproto/api'
import axios from "axios";

const API_URL = "http://localhost:3000";

interface UserInput {
    text: string;
    score: number;
}

export default async function makePost(userInput: UserInput) {
    const agent = new BskyAgent({
        service: 'https://bsky.social'
    })
    
    await agent.login({
        identifier: 'samuellee.bsky.social',
        password: '&5cx^v4wO48m'
    })
    
    const user_text: string = userInput.text

    await agent.post({
        text: user_text,
        createdAt: new Date().toISOString()
    })

    await axios.post(
        `${API_URL}/api/makePost`, 
        {
            userInput
        },
    );
}
