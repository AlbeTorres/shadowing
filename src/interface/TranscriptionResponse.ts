export interface Transcription {
  transcription: {
    start: number;
    end: number;
    text: string;
    word: string;
  }[];
  vocabulary: {
    word: string;
    definition: string;
    difficulty: string;
  }[];
  theme: string;
}
