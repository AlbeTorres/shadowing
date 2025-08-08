import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react';
import { useAudioState } from '@/store/AudioState';
import { useEffect, useRef } from 'react';


export const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    isProcessing,
    duration,
    audioFile,
    isPlaying,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    setAudioRef,
    currentTime,
    audioUrl,
  } = useAudioState();


    useEffect(() => {
    setAudioRef(audioRef);
  }, [setAudioRef]);

  if (!audioFile || !audioUrl || isProcessing) {
    return null; // If no audio URL is set, don't render the player
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipBackward = (seconds = 10) => {
    if (audioRef.current) {
      const newTime = Math.max(0, audioRef.current.currentTime - seconds);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipForward = (seconds = 10) => {
    if (audioRef.current) {
      const newTime = Math.min(duration, audioRef.current.currentTime + seconds);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const newTime = audioRef.current.currentTime;
      setCurrentTime(newTime);

    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-4 mb-4">
        <Volume2 className="h-6 w-6 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-800">
          Reproductor de Audio
        </h2>
      </div>

      <audio
        ref={audioRef}
        src={audioUrl || undefined}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => skipBackward(10)}
            className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-full transition-colors"
            title="Retroceder 10 segundos"
          >
            <SkipBack className="h-5 w-5" />
          </button>

          <button
            onClick={togglePlayPause}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full transition-colors"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
          </button>

          <button
            onClick={() => skipForward(10)}
            className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-full transition-colors"
            title="Avanzar 10 segundos"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500 w-16">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-500 w-16">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
};