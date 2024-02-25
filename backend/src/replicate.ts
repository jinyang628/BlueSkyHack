import Replicate from "replicate";

export default async function callReplicate(user_input: string) {
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    });

    const prefix_instruction: string = "Rephrase this social media post to be more engaging! I want to be famous!"

    user_input = prefix_instruction + user_input;

    const input = {
        top_k: 50,
        top_p: 0.9,
        prompt: user_input,
        temperature: 0.6,
        max_new_tokens: 1024,
        prompt_template: "<s>[INST] {prompt} [/INST] ",
        presence_penalty: 0,
        frequency_penalty: 0
    };
    
    let response = '';
    for await (const event of replicate.stream("mistralai/mixtral-8x7b-instruct-v0.1", { input })) {
        response += event.toString();
    };

    return response;
}