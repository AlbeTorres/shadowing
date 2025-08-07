import { Exercises } from "@/interface/ExcerciseResponse";
import { Transcription } from "@/interface/TranscriptionResponse";
import { create } from "zustand";
type AudioState = {
  audioFile: File | null;
  audioUrl: string | null;
  currentTime: number;
  exercises: Exercises; // Assuming exercises is an array, adjust type as needed
  duration: number;
  isPlaying: boolean;
  isProcessing: boolean;
  transcriptionData: Transcription | null;
  isGeneratingExercises: boolean;
  setExercises: (exercises: Exercises) => void; // Adjust type as needed
  setIsGeneratingExercises: (isGenerating: boolean) => void;
  setTranscriptionData: (data: Transcription | null) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setAudioFile: (file: File | null) => void;
  setAudioUrl: (url: string | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
};

export const useAudioState = create<AudioState>((set) => ({
  audioFile: null,
  audioUrl: null,
  currentTime: 0,
  duration: 0,
  isPlaying: false,
  isProcessing: false,
  transcriptionData: null,
  isGeneratingExercises: false,
  exercises: { grammar: [], writing: [] },
  setExercises: (exercises) => set({ exercises }),
  setIsGeneratingExercises: (isGenerating) =>
    set({ isGeneratingExercises: isGenerating }),
  setTranscriptionData: (data) => set({ transcriptionData: data }),

  setIsProcessing: (isProcessing) => set({ isProcessing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setAudioFile: (file) => set({ audioFile: file }),
  setAudioUrl: (url) => set({ audioUrl: url }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
}));
