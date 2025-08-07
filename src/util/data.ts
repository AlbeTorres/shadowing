export const mockTranscriptionResponse = {
  transcription: [
    { start: 0, end: 2, text: "Hello", word: "Hello" },
    { start: 2, end: 3.5, text: "everyone,", word: "everyone" },
    { start: 3.5, end: 4.5, text: "welcome", word: "welcome" },
    { start: 4.5, end: 5, text: "to", word: "to" },
    { start: 5, end: 5.5, text: "our", word: "our" },
    { start: 5.5, end: 6.5, text: "cooking", word: "cooking" },
    { start: 6.5, end: 7.5, text: "class.", word: "class" },
    { start: 8, end: 9, text: "Today", word: "Today" },
    { start: 9, end: 10, text: "we", word: "we" },
    { start: 10, end: 11, text: "will", word: "will" },
    { start: 11, end: 12, text: "learn", word: "learn" },
    { start: 12, end: 13, text: "how", word: "how" },
    { start: 13, end: 14, text: "to", word: "to" },
    { start: 14, end: 15, text: "make", word: "make" },
    { start: 15, end: 16.5, text: "delicious", word: "delicious" },
    { start: 16.5, end: 17.5, text: "pasta", word: "pasta" },
    { start: 17.5, end: 18, text: "with", word: "with" },
    { start: 18, end: 19, text: "fresh", word: "fresh" },
    { start: 19, end: 20.5, text: "ingredients.", word: "ingredients" },
  ],
  vocabulary: [
    {
      word: "cooking",
      definition: "the practice of preparing food",
      difficulty: "basic",
    },
    {
      word: "delicious",
      definition: "having a pleasant taste",
      difficulty: "intermediate",
    },
    {
      word: "ingredients",
      definition: "components used in cooking",
      difficulty: "intermediate",
    },
    {
      word: "fresh",
      definition: "recently made or obtained",
      difficulty: "basic",
    },
    {
      word: "pasta",
      definition: "Italian food made from wheat",
      difficulty: "basic",
    },
  ],
  theme: "Cooking and Food Preparation",
};

export const mockExercises = {
  grammar: [
    {
      question:
        "Complete the sentence: 'Today we _____ learn how to make pasta.'",
      options: ["will", "would", "can", "must"],
      correct: 0,
    },
    {
      question: "What tense is used in 'we will learn'?",
      options: ["Present", "Past", "Future", "Conditional"],
      correct: 2,
    },
  ],
  writing: [
    {
      prompt:
        "Write a short paragraph describing your favorite cooking experience using at least 3 words from the vocabulary list.",
      minWords: 50,
    },
    {
      prompt:
        "Create a recipe using the cooking vocabulary from the audio. Include ingredients and steps.",
      minWords: 100,
    },
  ],
};
