export function parseTranscription(responseText: string) {
  try {
    const cleanedResponse = responseText
      .replace(/```json\s*/gi, "")
      .replace(/```\s*$/gm, "")
      .replace(/^```/gm, "")
      .replace(/```$/gm, "")
      .replace(/^\s*```json/gm, "")
      .replace(/```\s*$/gm, "")
      // Eliminar trailing commas
      .replace(/,(\s*[}\]])/g, "$1")
      // Eliminar comentarios si los hubiera
      .replace(/\/\/.*$/gm, "")
      .trim();

    const parsedResponse = JSON.parse(cleanedResponse);

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
    console.error("Error parsing transcription response:", error);
    // Fallback: devolver estructura básica
    return {
      transcription: "Transcripción no disponible",
      vocabulary: [
        { word: "audio", definition: "sonido grabado", difficulty: "basic" },
      ],
      theme: "Audio procesado",
    };
  }
}

export function formatTranscription(
  transcription: string
): { start: number; text: string }[] {
  // Promedio de palabras por minuto en inglés (conversacional): ~150-160 WPM
  // Esto significa aproximadamente 0.4 segundos por palabra
  const AVERAGE_SECONDS_PER_WORD = 0.4;

  // Limpiar el texto y dividir en palabras
  const words = transcription
    .replace(/\s+/g, " ") // Normalizar espacios
    .trim()
    .split(" ")
    .filter((word) => word.length > 0);

  const result: { start: number; text: string }[] = [];
  let currentTime = 0.01; // Comenzar en 0.01 segundos

  words.forEach((word) => {
    // Agregar la palabra con el timestamp actual
    result.push({
      start: Math.round(currentTime * 100) / 100, // Redondear a 2 decimales
      text: word,
    });

    // Calcular duración base de la palabra
    let wordDuration = AVERAGE_SECONDS_PER_WORD;

    // Ajustar duración según la longitud de la palabra
    if (word.length <= 3) {
      wordDuration *= 0.8; // Palabras cortas son más rápidas
    } else if (word.length >= 8) {
      wordDuration *= 1.3; // Palabras largas toman más tiempo
    }

    // Agregar pequeña pausa extra después de puntuación
    if (/[.!?;:]$/.test(word)) {
      wordDuration += 0.2 + Math.random() * 0.3; // Pausa de 0.2-0.5 segundos
    } else if (/[,]$/.test(word)) {
      wordDuration += 0.1 + Math.random() * 0.2; // Pausa menor para comas
    }

    // Agregar variación natural (+/- 20%)
    const variation = 1 + (Math.random() - 0.5) * 0.4;
    wordDuration *= variation;

    // Actualizar el tiempo actual
    currentTime += wordDuration;
  });

  return result;
}
