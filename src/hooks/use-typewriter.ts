'use client';
import { useState, useEffect } from 'react';

export function useTypewriter(words: string[], typeSpeed: number = 50, deleteSpeed: number = 50, delay: number = 2000) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        if (charIndex > 0) {
          setText(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        if (charIndex < currentWord.length) {
          setText(currentWord.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), delay);
        }
      }
    };

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timeout = setTimeout(handleTyping, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, delay]);

  return text;
}
