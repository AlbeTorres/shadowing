import { useAudioState } from "@/store/AudioState";

export const Vocabulary=()=>{

    const { transcriptionData } = useAudioState();

    if (!transcriptionData || !transcriptionData.vocabulary || transcriptionData.vocabulary.length === 0) {
        return null; // If no vocabulary data, don't render anything
    }

    return(
        <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  📚 Vocabulario
                </h3>
                <div className="space-y-3">
                  {transcriptionData?.vocabulary.map((item, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                      <div className="font-medium text-gray-800">
                        {item.word}
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          item.difficulty === 'basic' ? 'bg-green-100 text-green-800' :
                          item.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
    )
}