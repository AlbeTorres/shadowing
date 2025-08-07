import {  Upload, FileAudio } from 'lucide-react';
import { useAudioState } from '@/store/AudioState';
import { mockTranscriptionResponse} from '@/util/data';
import { useRef } from 'react';


export const UploadAudio = () => {

  const { audioFile,setAudioFile, setAudioUrl, setIsProcessing, setTranscriptionData } = useAudioState();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if(audioFile){
    return null; // If audio file is already set, don't show the upload component
  }


    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file && (file.type.startsWith('audio/') || file.type.startsWith('video/'))) {
      setAudioFile(file);
      setAudioUrl(URL.createObjectURL(file));
      setIsProcessing(true);
      
      // Simular procesamiento de IA
      setTimeout(() => {
        setTranscriptionData(mockTranscriptionResponse);
        setIsProcessing(false);
      }, 2000);
    }
  };

    return(
         <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div 
              className="border-2 border-dashed border-blue-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileAudio className="mx-auto h-16 w-16 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Sube tu archivo de audio
              </h3>
              <p className="text-gray-500 mb-4">
                Formatos soportados: MP3, MP4, WAV
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
                <Upload className="inline mr-2 h-4 w-4" />
                Seleccionar archivo
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
    )
}