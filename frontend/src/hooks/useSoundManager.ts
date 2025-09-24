import { useRef } from "react";

export function useSoundManager() {
  const sounds = useRef<Record<string, HTMLAudioElement>>({});

  const loadSound = (key: string, src: string) => {
    const audio = new Audio(src);
    sounds.current[key] = audio;
  };

  const play = (key: string) => {
    sounds.current[key]?.play();
  };

  const pause = (key: string) => {
    sounds.current[key]?.pause();
  };

  const stop = (key: string) => {
    const audio = sounds.current[key];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return { loadSound, play, pause, stop };
}
