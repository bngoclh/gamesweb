import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function translateSentence(inputSentence) {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",
                "content": "You will be provided with a sentence in English, and your task is to translate it into French."
            },
            {
                "role": "user",
                "content": inputSentence
            }
        ],
        temperature: 0.7,
        max_tokens: 64,
        top_p: 1,
    });

    // Process the response and return the translated sentence
    const translatedSentence = response.choices[0].message.content;
    return translatedSentence;
}

const inputSentence = "Hello, how are you?";
const translatedResult = await translateSentence(inputSentence);
console.log(translatedResult);


export { translateSentence };



/*
const openai = require('openai');

openai.apiKey = 'votre-clé-api-openai';

let textToTranslate = "Hello, world!"; // Initialisation du texte à traduire

async function generateText(prompt) {
    const response = await openai.Completion.create({
        engine: 'text-davinci-002',
        prompt: prompt,
        max_tokens: 100
    });
    return response.choices[0].text.strip();
}

generateText(`Translate the following English text to French: "${textToTranslate}"`)
    .then(response => console.log(response))
    .catch(err => console.error(err));
*/