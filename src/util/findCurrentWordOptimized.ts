// Búsqueda binaria optimizada

export const findCurrentWordSmart = (
  currentTime: number,
  currentWordIndex: number,
  transcription: {
    start: number;
    end: number;
    text: string;
    word: string;
  }[]
) => {
  let lastFoundIndex = currentWordIndex;
  // Optimización: Probablemente está cerca de la última palabra
  if (lastFoundIndex < transcription.length) {
    const item = transcription[lastFoundIndex];
    if (currentTime >= item.start && currentTime <= item.end) {
      return lastFoundIndex; // ¡Bingo! Misma palabra
    }

    // ¿Está en la siguiente palabra?
    if (lastFoundIndex + 1 < transcription.length) {
      const nextItem = transcription[lastFoundIndex + 1];
      if (currentTime >= nextItem.start && currentTime <= nextItem.end) {
        lastFoundIndex++;
        return lastFoundIndex; // Palabra siguiente
      }
    }
  }

  // Si no, usar búsqueda binaria
  const result = findCurrentWordBinary(currentTime, transcription);
  lastFoundIndex = result;
  return result;
};

export const findCurrentWordBinary = (
  currentTime: number,
  transcription: {
    start: number;
    end: number;
    text: string;
    word: string;
  }[]
) => {
  if (!transcription.length) return -1;

  let left = 0;
  let right = transcription.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const item = transcription[mid];

    if (currentTime >= item.start && currentTime <= item.end) {
      return mid; // ¡Encontrado!
    }

    if (currentTime < item.start) {
      right = mid - 1; // Buscar en la mitad izquierda
    } else {
      left = mid + 1; // Buscar en la mitad derecha
    }
  }

  return -1; // No encontrado
};
