import { GoogleGenAI } from "@google/genai";
import { systemInstruction } from "./systeminstruction";

export async function geminiAi(
  apiKey: string | undefined,
  prompt: string,
  content: string
): Promise<string | null> {
  if (!apiKey) {
    console.error("geminiAi: missing apiKey");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // ensure contents is an array to be tolerant with SDK versions
    const payload = {
      model: "gemini-2.5-flash",
      // send as array of content blocks for broader compatibility
      contents: [{ text: `${prompt}\n\n ${content}` }],
      config: {
        systemInstruction,
      },
    };

    const response: any = await ai.models.generateContent(payload);

    // robust extraction: try several possible shapes returned by SDK
    let text: string | undefined;

    console.log(JSON.stringify(response));

    if (response?.candidates?.length) {
      text =
        response.candidates[0]?.content?.parts?.[0]?.text ??
        response.candidates[0]?.content?.parts
          ?.map((p: any) => p?.text)
          .join("\n") ??
        response.candidates[0]?.text;
    }

    // fallback shapes
    if (!text && Array.isArray(response?.content)) {
      text = response.content
        .map((c: any) => c?.text ?? "")
        .join("\n")
        .trim();
    }

    if (!text && typeof response?.text === "string") {
      text = response.text;
    }

    if (!text) {
      console.warn("geminiAi: no text candidate in response", { response });
      return null;
    }

    return String(text).trim();
  } catch (err: any) {
    console.error("geminiAi error:", err?.message ?? err, err);
    return null;
  }
}
