import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import MagicalCursor from './MagicalCursor';
import candleVideo from '../asserts/candle.mp4';
import fluteMusic from '../asserts/flute.mp3';

const CandleIntro = ({ onComplete }) => {
  const [isLit, setIsLit] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [hasBroken, setHasBroken] = useState(false); // <-- NEW FLAG
  const audioRef = useRef(null);

  const funMessages = [
    "Click anywhere to start the magical journey! ✨",
    "What did the candle say to the cake? You're looking sweet! 🕯️",
    "Roses are red, violets are blue, this birthday surprise is just for you! 🌹",
    "Warning: Excessive cuteness ahead! 🥰",
    "Loading happiness... Please wait! ⌛",
    "Preparing something special just for you... ✨",
    "Did you know? Birthdays are good for your health! Studies show people who have more birthdays live longer! 😄"
  ];

  useEffect(() => {
    if (isPlaying) {
      const messageInterval = setInterval(() => {
        setCurrentMessage(prev => (prev + 1) % funMessages.length);
      }, 1000);
      return () => clearInterval(messageInterval);
    }
  }, [isPlaying]);

  const startAudio = async () => {
  if (hasBroken) return; // <-- PREVENT clicks after breaking magic
  try {
    if (audioRef.current && !isPlaying) {
      audioRef.current.volume = 0.1;
      audioRef.current.loop = false;
      await audioRef.current.play();
      setIsPlaying(true);

      // Set timer to auto-break magic after 10 seconds if user doesn't click
      setTimeout(() => {
        if (!hasBroken) {
          handleBreakMagic();
        }
      }, 10000); // 10 seconds
    }
  } catch (error) {
    console.error('Audio playback failed:', error);
  }
};


  const handleBreakMagic = () => {
    setHasBroken(true); // <-- Set flag to block further clicks
    setIsLit(false);    // <-- Animate fade out

    // Stop music if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Wait for fade-out animation then redirect (trigger onComplete)
    setTimeout(() => {
      onComplete(); // <-- Usually used to route to <App />
    }, 1000);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50 cursor-pointer"
      animate={{ opacity: isLit ? 1 : 0 }}
      transition={{ duration: 2 }}
      onClick={startAudio}
    >
      <audio ref={audioRef} src={fluteMusic} />
      <MagicalCursor />

      {isPlaying && (
        funMessages.map((_, index) => (
          <motion.div
            key={index}
            className="absolute text-1xl text-white"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100
            }}
            animate={{
              y: [-100, window.innerHeight + 100],
              x: [null, Math.random() * window.innerWidth],
              rotate: [0, 360],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "linear"
            }}
          >
            {['♪', '♫', '♬', '♩', '♭', '♮', '❤️', '💕', '🥰', '💫', '✨', '🎵', '🎶', '🌟', '⭐', '🎊', '🎉'][index % 17]}
          </motion.div>
        ))
      )}

      <div className="text-center max-w-2xl mx-auto px-4">
        {/* Candle */}
        <motion.div
          className="relative w-72 mx-auto mb-8"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <video
            autoPlay
            loop
            muted
            className="w-full rounded-lg shadow-2xl"
            style={{ display: isLit ? 'block' : 'none' }}
          >
            <source src={candleVideo} type="video/mp4" />
          </video>
        </motion.div>

        <motion.p
          className="text-white text-lg mb-6 h-16 flex items-center justify-center"
          key={currentMessage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {funMessages[currentMessage]}
        </motion.p>

        {/* Break the Magic Button */}
        {isPlaying && !hasBroken && (
          <motion.button
            onClick={handleBreakMagic}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full text-white font-bold shadow-lg text-lg"
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 0 20px rgba(255,255,255,0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: ['0 0 10px rgba(255,255,255,0.2)', '0 0 20px rgba(255,255,255,0.5)', '0 0 10px rgba(255,255,255,0.2)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Break the Magic ✨
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default CandleIntro;
