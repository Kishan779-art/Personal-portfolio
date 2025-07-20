
'use client';

import { useCallback } from 'react';

type SoundType = 'click' | 'whoosh' | 'transition';
type UseClickSoundProps = {
  type?: SoundType;
};

export function useClickSound({ type = 'click' }: UseClickSoundProps = {}) {
  const playSound = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      // @ts-ignore
      const audioContext: AudioContext = window.audioContext || new (window.AudioContext || window.webkitAudioContext)();
      // @ts-ignore
      window.audioContext = audioContext;

      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      if (type === 'click') {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } else if (type === 'whoosh' || type === 'transition') {
        const bufferSize = audioContext.sampleRate * 0.5; // 0.5 second
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = audioContext.createBufferSource();
        whiteNoise.buffer = buffer;

        const bandpass = audioContext.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.setValueAtTime(400, audioContext.currentTime);
        bandpass.Q.value = 1;

        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        
        whiteNoise.connect(bandpass);
        bandpass.connect(gainNode);
        gainNode.connect(audioContext.destination);

        bandpass.frequency.exponentialRampToValueAtTime(4000, audioContext.currentTime + 0.4);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);

        whiteNoise.start(audioContext.currentTime);
        whiteNoise.stop(audioContext.currentTime + 0.5);
      }
    } catch (error) {
      console.error("Could not play sound:", error);
    }
  }, [type]);

  return playSound;
}
