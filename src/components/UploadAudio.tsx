import {  Upload, FileAudio } from 'lucide-react';
import { useAudioState } from '@/store/AudioState';
import { useRef, useState } from 'react';
import { aiGetAudioTranscription } from '@/AIHelper/aiAudioProcesser';


export const UploadAudio = () => {

  const { audioFile,setAudioFile, setAudioUrl, setIsProcessing, setTranscriptionData, } = useAudioState();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  if(audioFile ){
    return null; // If audio file is already set, don't show the upload component
  }


    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];

     if (!file) return;
    
    // Validar tipo de archivo
    if (!file.type.startsWith('audio/') && !file.type.startsWith('video/')) {
      setError('Por favor selecciona un archivo de audio válido');
      return;
    }

    // Validar tamaño de archivo (opcional, ej: máximo 50MB)
    const maxSize = 20 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      setError('El archivo es demasiado grande. Máximo 20MB permitido.');
      return;
    }

    try {
setError(null);
      setAudioFile(file);
      setAudioUrl(URL.createObjectURL(file));
      setIsProcessing(true);
      
      const transcriptionResult = await aiGetAudioTranscription(file);

      setTranscriptionData(transcriptionResult);

     

    }catch (err) {
      console.error('Error procesando audio:', error);
      setError(`Error procesando el audio: ${err instanceof Error ? err.message : 'Error desconocido'}`);
      
      // Limpiar estados en caso de error
      setAudioFile(null);
      setAudioUrl('');
      
    } finally {
      setIsProcessing(false);
    }
    }

      const handleRetry = () => {
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
               <p className="text-sm text-gray-400 mb-4">
          Tamaño máximo: 20MB
        </p>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600 text-sm mb-2">{error}</p>
            <button
              onClick={handleRetry}
              className="text-red-600 hover:text-red-800 text-sm underline"
            >
              Intentar nuevamente
            </button>
          </div>
        )}
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