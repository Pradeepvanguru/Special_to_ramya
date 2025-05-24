import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagicalCursor from './MagicalCursor';
import candleVideo from '../asserts/candle.mp4';
import fluteMusic from '../asserts/flute.mp3';

const CandleIntro = ({ onComplete }) => {
  const [isLit, setIsLit] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const startAudio = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.volume = 0.1;
        audioRef.current.loop = false; // Play only once
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio playback failed:', error);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    
    if (audio) {
      audio.addEventListener('ended', () => {
        setIsLit(false);
        setTimeout(() => {
          onComplete();
        }, 1500); // Fade out transition before redirecting
      });
    }

    return () => {
      if (audio) {
        audio.removeEventListener('ended', () => {});
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [onComplete]);

  const handleBreakFire = () => {
    if (audioRef.current && !isPlaying) {
      startAudio();
    }
  };

  const musicalSymbols = ['♪', '♫', '♬', '♩', '♭', '♮','❤️','💕','🥰','💫','✨'];

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      animate={{ opacity: isLit ? 1 : 0 }}
      transition={{ duration: 1.5 }}
      onClick={!isPlaying ? startAudio : undefined}
    >
      <audio ref={audioRef} src={fluteMusic} />
      <MagicalCursor />
      {isPlaying && musicalSymbols.map((symbol, index) => (
        <motion.div
          key={index}
          className="absolute text-white text-1sm"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeInOut"
          }}
        >
          {symbol}
        </motion.div>
      ))}
      <div className="text-center">
        <motion.div
          className="relative w-64 mx-auto mb-8"
          animate={{
            scale: isLit ? 1 : 0.8,
            opacity: isLit ? 1 : 0
          }}
          transition={{ duration: 0.5 }}
        >
          <video
            autoPlay
            loop
            muted
            className="w-full rounded-lg"
            style={{ display: isLit ? 'block' : 'none' }}
          >
            <source src={candleVideo} type="video/mp4" />
          </video>
        </motion.div>

        <motion.button
          onClick={handleBreakFire}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-white font-bold shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? "Enjoy the Music ✨" : "Start the Magic ✨"}
        </motion.button>
        {!isPlaying && (
          <p className="text-white mt-4 opacity-70">Click to start the magical journey</p>
        )}
      </div>
    </motion.div>
  );
};

export default CandleIntro;