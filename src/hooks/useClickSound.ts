'use client';

import { useCallback } from 'react';

export function useClickSound() {
  const playClickSound = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      // Use a shared AudioContext
      // @ts-ignore
      const audioContext: AudioContext = window.audioContext || new (window.AudioContext || window.webkitAudioContext)();
      // @ts-ignore
      window.audioContext = audioContext;

      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Sound parameters
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // High pitch for a 'tick'
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Start with low volume

      // Ramp up and down quickly
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.error("Could not play sound:", error);
    }
  }, []);

  return playClickSound;
}
