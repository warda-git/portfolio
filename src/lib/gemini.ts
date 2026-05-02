import { GoogleGenAI } from "@google/genai";
import { RESUME_DATA } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const SYSTEM_PROMPT = `
You are the AI Assistant for Warda Aslam, a professional portfolio assistant. 
Your goal is to answer questions about Warda Aslam's background, skills, and projects in a professional, helpful, and concise manner.

Warda's Information:
${JSON.stringify(RESUME_DATA, null, 2)}

Instructions:
1. Be professional and enthusiastic.
2. If asked about contact info, provide her email and LinkedIn.
3. Keep answers under 3-4 sentences unless a deep dive is requested.
4. If asked about topics not related to Warda, politely steer back to her portfolio.
5. Highlight her Cybersecurity and Full-Stack background.
6. Use "Warda" or "she" to refer to her.
`;

export async function chatWithResume(message: string, chatHistory: { role: "user" | "model"; text: string }[], currentData: any) {
  const customPrompt = `
You are the AI Assistant for ${currentData.name}, a professional portfolio assistant. 
Your goal is to answer questions about ${currentData.name}'s background, skills, and projects in a professional, helpful, and concise manner.

Information:
${JSON.stringify(currentData, null, 2)}

Instructions:
1. Be professional and enthusiastic.
2. If asked about contact info, provide her email and LinkedIn.
3. Keep answers under 3-4 sentences unless a deep dive is requested.
4. If asked about topics not related to the person, politely steer back to the portfolio.
5. Highlight her Cybersecurity and Full-Stack background.
6. Use her name or "she" to refer to her.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...chatHistory.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: customPrompt,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI assistant is currently resting. Please try again in a moment.";
  }
}
