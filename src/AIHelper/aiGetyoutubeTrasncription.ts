import { GoogleGenerativeAI } from "@google/generative-ai";
import { prompt } from "./AIPromp/audioTranscriptionProm";

const ai = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY!
);

export async function getYoutubeVideoTrasncription(url: string) {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-pro" }); // Specify the model you want to use

    const response = await model.generateContent([
      prompt,
      {
        fileData: {
          mimeType: "", // Specify the MIME type of the video
          fileUri: url,
        },
      },
    ]);

    const responseText = response.response.text();

    if (!responseText) {
      throw new Error("La IA no devolvió una respuesta válida");
    }

    console.log("Response:", response.response.text()); // Log the response for debugging

    const cleanedResponse = responseText
      .replace(/```json\s*/gi, "") // Eliminar ```json al inicio (case insensitive)
      .replace(/```\s*$/gm, "") // Eliminar ``` al final
      .replace(/^```/gm, "") // Eliminar ``` al inicio de línea
      .replace(/```$/gm, "") // Eliminar ``` al final de línea
      .replace(/^\s*```json/gm, "") // Patrones adicionales
      .replace(/```\s*$/gm, "") // Patrones adicionales
      .trim();

    console.log("Respuesta de la IA:", cleanedResponse);

    const parsedResponse = JSON.parse(cleanedResponse);

    if (!parsedResponse.transcription) {
      throw new Error("La respuesta de la IA no tiene el formato esperado");
    }

    return parsedResponse;
  } catch (error) {
    console.error("Error obteniendo trasncription de youtube:", error);

    // Fallback: devolver estructura básica
    return {
      transcription: [
        { start: 0, end: 1, text: "Transcripción", word: "Transcripción" },
        { start: 1, end: 2, text: "no", word: "no" },
        { start: 2, end: 3, text: "disponible", word: "disponible" },
      ],
    };
  }
}
