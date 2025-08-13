import { Exercises } from "@/interface/ExcerciseResponse";
import { Transcription } from "@/interface/TranscriptionResponse";
import { create } from "zustand";
import { RefObject } from "react";

type AudioState = {
  audioFile: File | null;
  audioUrl: string | null;
  currentTime: number;
  currentWordIndex: number;
  exercises: Exercises;
  duration: number;
  isPlaying: boolean;
  isProcessing: boolean;
  transcriptionData: Transcription | null;
  isGeneratingExercises: boolean;
  youtubeUrl: string | null;
  audioRef: RefObject<HTMLAudioElement | null> | null;

  setExercises: (exercises: Exercises) => void;
  setIsGeneratingExercises: (isGenerating: boolean) => void;
  setTranscriptionData: (data: Transcription | null) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setAudioFile: (file: File | null) => void;
  setAudioUrl: (url: string | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentWordIndex: (index: number) => void;
  setYoutubeUrl: (url: string | null) => void;
  setAudioRef: (ref: RefObject<HTMLAudioElement | null>) => void;
  jumpToTime: (time: number) => void;
};

export const useAudioState = create<AudioState>((set, get) => ({
  audioFile: null,
  audioUrl: null,
  currentTime: 0,
  currentWordIndex: 0,
  duration: 0,
  isPlaying: false,
  isProcessing: false,
  transcriptionData: null,
  isGeneratingExercises: false,
  exercises: { grammar: [], writing: [] },
  youtubeUrl: null,
  audioRef: null,

  setExercises: (exercises) => set({ exercises }),
  setIsGeneratingExercises: (isGenerating) =>
    set({ isGeneratingExercises: isGenerating }),
  setTranscriptionData: (data) => set({ transcriptionData: data }),
  setCurrentWordIndex: (index) => set({ currentWordIndex: index }),
  setIsProcessing: (isProcessing) => set({ isProcessing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setAudioFile: (file) => set({ audioFile: file }),
  setAudioUrl: (url) => set({ audioUrl: url }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setAudioRef: (ref) => set({ audioRef: ref }),
  setYoutubeUrl: (url) => set({ youtubeUrl: url }),
  jumpToTime: (time) => {
    const { audioRef } = get();
    if (audioRef?.current) {
      audioRef.current.currentTime = time;
      set({ currentTime: time });
    }
  },
}));
