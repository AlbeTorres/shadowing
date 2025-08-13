// Crear el prompt para obtener transcripción detallada
export const prompt = `
    Analiza este audio y proporciona la siguiente información en formato JSON:
    {
      "transcription": string,
      "vocabulary": [
        {
          "word": "palabra o frase",
          "definition": "definición_en_ingles",
          "difficulty": "basic|intermediate|advanced"
        }
      ],
      "theme": "temática_principal_del_audio"
    }

    Instrucciones específicas:
    1. Para la transcripción incluyela de forma precisa en formato de texto, respetando los signos de puntuación y mayúsculas
    2. Extrae las 8-10 palabras más importantes del vocabulario
    3. Clasifica cada palabra por dificultad
    4. Identifica la temática principal
    5. Responde ÚNICAMENTE con el JSON, sin texto adicional
    6. Asegúrate de que la transcripcion este completa y no se corte
    `;

// Crear el prompt para obtener transcripción detallada
export const prompt2 = `
    Analiza este audio y proporciona la siguiente información en formato JSON:

    {
      "transcription": [
        {
          "start": tiempo_inicio_en_segundos,
          "text": "oracion hasta el .",
        }
      ],
      "vocabulary": [
        {
          "word": "palabra",
          "definition": "definición_en_español",
          "difficulty": "basic|intermediate|advanced"
        }
      ],
      "theme": "temática_principal_del_audio"
    }

    Instrucciones específicas:
    1. Para la transcripción, incluye timestamps precisos para cada inicio de oracion
    2. Extrae las 8-10 palabras más importantes del vocabulario
    3. Clasifica cada palabra por dificultad
    4. Identifica la temática principal
    5. Responde ÚNICAMENTE con el JSON, sin texto adicional
    `;
