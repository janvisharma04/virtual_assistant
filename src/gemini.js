import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} from "@google/generative-ai";

// ✅ Get the API key from env
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

// ✅ Create instance of GoogleGenerativeAI
const genAI = new GoogleGenerativeAI(apiKey);

// ✅ Get the model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});

const generationConfig = {
  responseMimeType: "text/plain",
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 25,
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: []
  });

  const result = await chatSession.sendMessage(prompt);
  const reply = result.response.text();
  console.log("Gemini response:", reply);
  return reply;
}

export default run;
