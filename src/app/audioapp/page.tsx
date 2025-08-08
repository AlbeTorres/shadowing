'use client';
import { UploadAudio } from '@/components/UploadAudio';
import { useAudioState } from '@/store/AudioState';
import { Loanding } from '@/components/Loading';
import { AudioPlayer } from '@/components/AudioPlayer';
import { Transcription } from '@/components/Transcription';
import { Vocabulary } from '@/components/Vocabulary';
import { GenerateExercises } from '@/components/GenerateExcercises';
import { Exercises } from '@/components/Exercises';
import { Theme } from '@/components/Theme';

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

<Theme/>
            
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

