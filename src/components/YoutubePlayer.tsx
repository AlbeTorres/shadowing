// // components/YoutubePlayer.tsx
// "use client";

// import dynamic from "next/dynamic";
// import { useEffect } from "react";

// function YoutubePlayer() {
//   useEffect(() => {
//     import("@justinribeiro/lite-youtube");
//   }, []);

//   return (
//     <lite-youtube
//       videoid="guJLfqTFfIw"
//       videotitle="Sample Video"
//       autoload
//     />  
//   );
// }

// export default dynamic(() => Promise.resolve(YoutubePlayer), { ssr: false });

import { useAudioState } from '@/store/AudioState';
import { getYouTubeVideoId } from '@/util/getYoutubeUrlId';
import { YouTubeEmbed } from '@next/third-parties/google'




export function YoutubePlayer() {
   const {
      isProcessing,
      youtubeUrl,
      transcriptionData
    } = useAudioState();

    if ( !youtubeUrl || !transcriptionData || isProcessing) {
    return null; // If no youtube URL is set, don't render the player
  }

  const videoId = getYouTubeVideoId(youtubeUrl);
    if (!videoId) {
        return <div className="text-red-500">URL de YouTube inválida</div>;
    }

   


  return (
     <div className="bg-white rounded-xl shadow-lg p-6">
     <YouTubeEmbed videoid={videoId} height={400} />
    </div>
   
  );
}

