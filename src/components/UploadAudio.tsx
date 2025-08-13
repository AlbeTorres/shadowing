import { Upload, FileAudio, Youtube, Link } from 'lucide-react';
import { useAudioState } from '@/store/AudioState';
import { useRef, useState } from 'react';
import { aiGetAudioTranscription } from '@/AIHelper/aiAudioProcesser';

export const UploadAudio = () => {
  const { 
    audioFile, 
    youtubeUrl,
    setAudioFile, 
    setAudioUrl, 
    setIsProcessing, 
    setTranscriptionData,
    setYoutubeUrl

  } = useAudioState();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'file' | 'youtube'>('file');


  if (audioFile) {
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

    // Validar tamaño de archivo (opcional, ej: máximo 20MB)
    const maxSize = 20 * 1024 * 1024; // 20MB
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
      
    } catch (err) {
      console.error('Error procesando audio:', err);
      setError(`Error procesando el audio: ${err instanceof Error ? err.message : 'Error desconocido'}`);
      
      // Limpiar estados en caso de error
      setAudioFile(null);
      setAudioUrl('');
      
    } finally {
      setIsProcessing(false);
    }
  };

  const handleYouTubeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!youtubeUrl) {
      setError('Por favor ingresa una URL de YouTube válida');
      return;
    }
    
    if (!youtubeUrl.trim()) {
      setError('Por favor ingresa una URL de YouTube válida');
      return;
    }

    // Validar que sea una URL de YouTube
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (!youtubeRegex.test(youtubeUrl)) {
      setError('Por favor ingresa una URL de YouTube válida');
      return;
    }

    try {
      setError(null);
      setIsProcessing(true);
      
      // Aquí llamarías a tu función específica para procesar YouTube
      // const transcriptionResult = await aiGetYouTubeTranscription(youtubeUrl);
      // setTranscriptionData(transcriptionResult);
      
      // Por ahora, como placeholder:
      console.log('Procesando YouTube URL:', youtubeUrl);
      
      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Establecer datos de prueba
      setAudioFile(new File([], 'youtube-video'));
      setAudioUrl(youtubeUrl);
      
    } catch (err) {
      console.error('Error procesando video de YouTube:', err);
      setError(`Error procesando el video: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setYoutubeUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
      {/* Tabs */}
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('file')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'file'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FileAudio className="inline mr-2 h-4 w-4" />
          Subir archivo
        </button>
        <button
          onClick={() => setActiveTab('youtube')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'youtube'
              ? 'bg-white text-red-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Youtube className="inline mr-2 h-4 w-4" />
          YouTube
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600 text-sm mb-2">{error}</p>
          <button
            onClick={handleRetry}
            className="text-red-600 hover:text-red-800 text-sm underline"
          >
            Intentar nuevamente
          </button>
        </div>
      )}

      {/* File Upload Tab */}
      {activeTab === 'file' && (
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
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
            <Upload className="inline mr-2 h-4 w-4" />
            Seleccionar archivo
          </button>
        </div>
      )}

      {/* YouTube Tab */}
      {activeTab === 'youtube' && (
        <div className="border-2 border-dashed border-red-300 rounded-lg p-12 text-center">
          <Youtube className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Transcribir video de YouTube
          </h3>
          <p className="text-gray-500 mb-6">
            Pega el enlace del video que quieres transcribir
          </p>
          
          <form onSubmit={handleYouTubeSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="url"
                  value={youtubeUrl ?? ''}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
              >
                Transcribir
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,video/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};