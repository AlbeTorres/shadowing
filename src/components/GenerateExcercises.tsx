import { useAudioState } from "@/store/AudioState";
import { mockExercises } from "@/util/data";
import { PenTool } from 'lucide-react';

export const GenerateExercises=()=>{
    
    const {isProcessing, setExercises, audioFile, audioUrl ,setIsGeneratingExercises,isGeneratingExercises, transcriptionData } = useAudioState();

      if (!audioFile || !audioUrl || isProcessing) {
    return null; // If no audio URL is set, don't render the player
  }


    const generateExercises = async () => {
    if (!transcriptionData) return;
    
    setIsGeneratingExercises(true);
    
    // Simular llamada a IA para generar ejercicios
    setTimeout(() => {
      setExercises(mockExercises);
      setIsGeneratingExercises(false);
    }, 1500);
  };
    return(
          <div className="bg-white rounded-xl shadow-lg p-6">
                <button
                  onClick={generateExercises}
                  disabled={isGeneratingExercises}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PenTool className="inline mr-2 h-5 w-5" />
                  {isGeneratingExercises ? 'Generando...' : 'Generar Ejercicios'}
                </button>
              </div>
    )
}