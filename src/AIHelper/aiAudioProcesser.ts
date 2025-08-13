import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

import { prompt } from "./AIPromp/audioTranscriptionProm";
import { formatTranscription, parseTranscription } from "./transcriptionUtils";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY,
});

/**
 * Obtiene la transcripción de un archivo de audio usando Google GenAI
 * @param {File} audioFile - El archivo de audio subido por el usuario
 * @returns {Promise<Object>} - Objeto con transcripción, vocabulario y temática
 */

export async function aiGetAudioTranscription(audioFile: File) {
  try {
    if (
      !audioFile.type.startsWith("audio/") &&
      !audioFile.type.startsWith("video/")
    ) {
      throw new Error("El archivo debe ser de tipo audio o video");
    }

    console.log("Subiendo archivo a Google GenAI...");
    const myfile = await ai.files.upload({
      file: audioFile, // Ahora recibe el File object directamente
      config: {
        mimeType: audioFile.type, // Usa el tipo MIME del archivo
        displayName: audioFile.name, // Opcional: nombre del archivo
      },
    });

    console.log("Archivo subido exitosamente:", myfile.uri);

    const response = await ai.models.generateContent({
      // model: "gemini-2.5-flash",
      model: "gemini-2.0-flash-lite",
      contents: createUserContent([
        createPartFromUri(myfile.uri!, myfile.mimeType!),
        prompt,
      ]),
    });

    const responseText = response.text;

    if (!responseText) {
      throw new Error("La IA no devolvió una respuesta válida");
    }

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
    console.error("Error en aiGetAudioTranscription:", error);

    throw new Error(
      `Error procesando audio: ${
        error instanceof Error ? error.message : "Error desconocido"
      }`
    );

    // En caso de error, devolver datos mock para no romper la UI
  }
}
