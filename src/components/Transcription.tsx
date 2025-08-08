import { BookOpen} from 'lucide-react';
import { useAudioState } from '@/store/AudioState';

export const Transcription = () => { 

    const { transcriptionData,  jumpToTime } = useAudioState();

    if(!transcriptionData) {
        return null; // If no transcription data, don't render anything
    }

    const handleWordClick = (startTime:number) => {
  // Función que actualice el tiempo del audio y el estado
  jumpToTime(startTime);
}
    


    return ( <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-blue-500" />
                  Transcripción
                </h2>
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed text-gray-800">
                    {transcriptionData?.transcription.map((item, index) => (
                      <span
                        key={index}
                         onClick={() => handleWordClick(item.start)}
  className="cursor-pointer hover:bg-blue-100 hover:text-blue-600 rounded px-1"
                      >
                        {item.text}{' '}
                      </span>
                    ))}
                  </p>
                </div>
              </div>)
}