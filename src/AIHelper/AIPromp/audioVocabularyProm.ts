// Crear el prompt para obtener transcripción detallada
export const prompt = `
    Analiza este audio y proporciona la siguiente información en formato JSON:

    {
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
    2. Extrae las 8-10 palabras más importantes del vocabulario
    3. Clasifica cada palabra por dificultad
    4. Identifica la temática principal
    5. Responde ÚNICAMENTE con el JSON, sin texto adicional
    `;
