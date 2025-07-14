import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} from "@google/generative-ai";

const api_key = "AIzaSyBKUVConm7PTIoAbre5fg73VfiQxrbcEyY";
const genAI = new GoogleGenerativeAI(api_key);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});

const generationConfig = {
  responseMimeType: "text/plain",
  temperature:1,
  topP:0.95,
  topK:40,
  maxOutputTokens:25,
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: []
  });

  const result = await chatSession.sendMessage(prompt);
  const reply = result.response.text(); // ✅ FIXED
  console.log("Gemini response:", reply);
  return reply;
}

export default run;
