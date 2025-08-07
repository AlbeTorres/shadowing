export interface Exercises {
  grammar: {
    question: string;
    options: string[];
    correct: number;
  }[];
  writing: {
    prompt: string;
    minWords: number;
  }[];
}
