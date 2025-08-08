import { useAudioState } from "@/store/AudioState";

export const Theme=()=>{

    const {isProcessing, transcriptionData, audioFile, audioUrl } = useAudioState();

      if (!audioFile || !audioUrl || isProcessing) {
    return null; // If no audio URL is set, don't render the player
  }


  return (  <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    🎯 Temática
                  </h3>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-blue-800 font-medium">
                      {transcriptionData?.theme}
                    </p>
                  </div>
                </div>
  )
}
