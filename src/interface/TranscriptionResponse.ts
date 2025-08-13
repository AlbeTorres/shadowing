export interface Transcription {
  transcription: {
    start: number;
    text: string;
  }[];
  vocabulary: {
    word: string;
    definition: string;
    difficulty: string;
  }[];
  theme: string;
}
