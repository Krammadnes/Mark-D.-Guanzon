import { GoogleGenAI } from "@google/genai";

export async function generateCVSummary(): Promise<string> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Generate a professional, concise summary for a curriculum vitae.
    The person is a self-employed Data Entry and Retyping Specialist with 3 years of experience.
    They are a college student pursuing a Bachelor of Science in Information Technology (BSIT).
    They are very passionate about data entry, viewing it as a core passion due to a love for accuracy and efficiency.
    The summary should be suitable for a professional profile or an employee ID card context.
    Highlight their dedication, technical background from their studies, and hands-on experience.
    Write it in the first person. Do not use markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate CV summary from Gemini API.");
  }
}
