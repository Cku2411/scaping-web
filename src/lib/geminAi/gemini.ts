import { GoogleGenAI } from "@google/genai";

export async function geminiAi(apiKey: string, prompt: string) {
  const ai = new GoogleGenAI({ apiKey: apiKey });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response;
}
