import Replicate from "replicate";

export default async function paraphraseReplicate(user_input: string) {
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    });

    const prefix_instruction: string = "Rephrase this social media post to be more engaging - I want to be famous! Make sure that the paraphrased content stays true to the original input. Keep it within 300 characters. Make sure the generated content is ready to be posted immediately without auxilliary information."

    user_input = `${prefix_instruction}\n${user_input}`;

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

// import OpenAI from "openai";

// export default async function callReplicate(user_input: string) {

//     console.log(user_input["user_input"])
//     try {
//         const openai = new OpenAI({
//             apiKey: process.env.OPENAI_API_KEY,
//         });

//         const response = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [
//             {
//                 "role": "system",
//                 "content": "You will be provided with a social media post, and your task is to rephrase it to be more engaging. Make the user famous!"
//             },
//             {
//                 "role": "user",
//                 "content": user_input
//             }
//             ],
//             temperature: 0.7,
//             max_tokens: 64,
//             top_p: 1,
//         });

//         const lastMessageIndex: number = response.choices.length - 1;
//         const generatedText: string | null = response.choices[lastMessageIndex].message.content;
//         if (generatedText) {
//             return generatedText;
//         }
//         return "NOOOOOOOOO REPLICATE IS NOT REPHRASING FOR MEEE :("
//     } catch (error: any) {   
//         console.log(error);
//         return "Error";
//     }

// }
