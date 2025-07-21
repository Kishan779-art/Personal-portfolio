
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

      const now = audioContext.currentTime;

      if (type === 'click') {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(900, now);
        oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.1);

        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
        
        oscillator.start(now);
        oscillator.stop(now + 0.1);

      } else if (type === 'whoosh' || type === 'transition') {
        const bufferSize = audioContext.sampleRate * 0.4; // 0.4 second
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = audioContext.createBufferSource();
        whiteNoise.buffer = buffer;

        const bandpass = audioContext.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.setValueAtTime(200, now);
        bandpass.Q.value = 1;

        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.2, now);
        
        whiteNoise.connect(bandpass);
        bandpass.connect(gainNode);
        gainNode.connect(audioContext.destination);

        bandpass.frequency.exponentialRampToValueAtTime(3000, now + 0.3);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        whiteNoise.start(now);
        whiteNoise.stop(now + 0.4);
      }
    } catch (error) {
      console.error("Could not play sound:", error);
    }
  }, [type]);

  return playSound;
}
