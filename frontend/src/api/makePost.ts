import { BskyAgent } from '@atproto/api'

export default async function makePost(user_input: string) {
    const agent = new BskyAgent({
        service: 'https://bsky.social'
    })
    
    await agent.login({
        identifier: 'samuellee.bsky.social',
        password: '&5cx^v4wO48m'
    })
    
    await agent.post({
        text: user_input,
        createdAt: new Date().toISOString()
    })
}
