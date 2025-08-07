import { BookOpen} from 'lucide-react';
import { useAudioState } from '@/store/AudioState';

export const Transcription = () => { 

    const { transcriptionData, currentTime } = useAudioState();

    if(!transcriptionData) {
        return null; // If no transcription data, don't render anything
    }

     const getCurrentWord = () => {
    if (!transcriptionData) return -1;
    return transcriptionData.transcription.findIndex(item => 
      currentTime >= item.start && currentTime <= item.end
    );
  };

    const currentWordIndex = getCurrentWord();

    return ( <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-blue-500" />
                  Transcripción
                </h2>
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed">
                    {transcriptionData?.transcription.map((item, index) => (
                      <span
                        key={index}
                        className={`transition-all duration-300 ${
                          index === currentWordIndex
                            ? 'bg-yellow-200 font-semibold text-blue-800 px-1 py-0.5 rounded'
                            : ''
                        }`}
                      >
                        {item.text}{' '}
                      </span>
                    ))}
                  </p>
                </div>
              </div>)
}