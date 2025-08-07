'use client';
import { UploadAudio } from '@/components/UploadAudio';
import { useAudioState } from '@/store/AudioState';
import { Loanding } from '@/components/Loading';
import { AudioPlayer } from '@/components/AudioPlayer';
import { Transcription } from '@/components/Transcription';
import { Vocabulary } from '@/components/Vocabulary';
import { GenerateExercises } from '@/components/GenerateExcercises';
import { Exercises } from '@/components/Exercises';

 export default function AudioLearningApp  ()  {
    const {isProcessing, transcriptionData}=useAudioState()
 
  
 


  return (
  <>

        {/* Upload Section */}
       
        <UploadAudio />
       

        {/* Processing */}
        <Loanding message="Procesando tu archivo..." loading={isProcessing} />

        {/* Main Content */}
      
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Audio Player and Transcription */}
            <div className="lg:col-span-2 space-y-6">
              {/* Audio Player */}
              <AudioPlayer />

              {/* Transcription */}
             <Transcription/>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Theme */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  🎯 Temática
                </h3>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-blue-800 font-medium">
                    {transcriptionData?.theme}
                  </p>
                </div>
              </div>

              {/* Vocabulary */}
              <Vocabulary/>

              {/* Generate Exercises */}
             <GenerateExercises/>
            </div>
          </div>
        

       <Exercises/>
      </>
  );
};

