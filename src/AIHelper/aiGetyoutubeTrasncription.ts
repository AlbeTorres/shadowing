import { GoogleGenerativeAI } from "@google/generative-ai";
import { prompt } from "./AIPromp/audioTranscriptionProm";
import { formatTranscription, parseTranscription } from "./transcriptionUtils";

const ai = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY!
);

export async function getYoutubeVideoTrasncription(url: string) {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" }); // Specify the model you want to use

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

    console.log("youtube Response:", response.response.text()); // Log the response for debugging

    const parsedResponse = parseTranscription(responseText);

    const formattedTranscription = formatTranscription(
      parsedResponse.transcription
    );

    return {
      transcription: formattedTranscription,
      vocabulary: parsedResponse.vocabulary,
      theme: parsedResponse.theme,
    };
  } catch (error) {
    console.error("Error obteniendo trasncription de youtube:", error);

    throw new Error(
      `Error procesando youtube url: ${
        error instanceof Error ? error.message : "Error desconocido"
      }`
    );
  }
}
