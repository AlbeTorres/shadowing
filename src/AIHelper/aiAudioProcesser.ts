import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

import { prompt } from "./AIPromp/audioTranscriptionProm";

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
      model: "gemini-2.5-flash",
      contents: createUserContent([
        createPartFromUri(myfile.uri!, myfile.mimeType!),
        prompt,
      ]),
    });

    const responseText = response.text;

    if (!responseText) {
      throw new Error("La IA no devolvió una respuesta válida");
    }

    // Intentar parsear la respuesta JSON
    let parsedResponse;
    try {
      // Limpiar la respuesta en caso de que tenga markdown
      const cleanedResponse = responseText
        .replace(/```json\s*/gi, "") // Eliminar ```json al inicio (case insensitive)
        .replace(/```\s*$/gm, "") // Eliminar ``` al final
        .replace(/^```/gm, "") // Eliminar ``` al inicio de línea
        .replace(/```$/gm, "") // Eliminar ``` al final de línea
        .replace(/^\s*```json/gm, "") // Patrones adicionales
        .replace(/```\s*$/gm, "") // Patrones adicionales
        .trim();

      console.log("Respuesta de la IA:", cleanedResponse);

      parsedResponse = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("Error parseando JSON:", parseError);
      console.log("Respuesta original:", responseText);

      // Fallback: devolver estructura básica
      return {
        transcription: [
          { start: 0, end: 1, text: "Transcripción", word: "Transcripción" },
          { start: 1, end: 2, text: "no", word: "no" },
          { start: 2, end: 3, text: "disponible", word: "disponible" },
        ],
        vocabulary: [
          { word: "audio", definition: "sonido grabado", difficulty: "basic" },
        ],
        theme: "Audio procesado",
      };
    }

    // Validar estructura de la respuesta
    if (
      !parsedResponse.transcription ||
      !parsedResponse.vocabulary ||
      !parsedResponse.theme
    ) {
      throw new Error("La respuesta de la IA no tiene el formato esperado");
    }

    return parsedResponse;
  } catch (error) {
    console.error("Error en aiGetAudioTranscription:", error);

    // En caso de error, devolver datos mock para no romper la UI
    throw new Error(
      `Error procesando audio: ${
        error instanceof Error ? error.message : "Error desconocido"
      }`
    );
  }
}
