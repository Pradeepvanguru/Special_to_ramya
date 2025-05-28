import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import MagicalCursor from './MagicalCursor';
import fluteMusic from '../asserts/flute.mp3';

const CandleIntro = ({ onComplete }) => {
  const [isLit, setIsLit] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [hasBroken, setHasBroken] = useState(false);
  const audioRef = useRef(null);

  const funMessages = [
    "Click anywhere to start the magical journey! ✨",
    "What did the candle say to the cake? You're looking sweet!",
    "Roses are red, violets are blue, this birthday surprise is just for you!",
    "Warning:Excessive cuteness ahead!",
    "Loading happiness... Please wait! ⌛",
    "Preparing something special just for you... ✨",
    "Did you know? Birthdays are good for your health! Studies show people who have more birthdays live longer!"
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
    if (hasBroken) return;
    try {
      if (audioRef.current && !isPlaying) {
        audioRef.current.volume = 0.1;
        audioRef.current.loop = false;
        await audioRef.current.play();
        setIsPlaying(true);

        setTimeout(() => {
          if (!hasBroken) {
            handleBreakMagic();
          }
        }, 10000);
      }
    } catch (error) {
      console.error('Audio playback failed:', error);
    }
  };

  const handleBreakMagic = () => {
    setHasBroken(true);
    setIsLit(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setTimeout(() => {
      onComplete();
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
            {['♪', '♫', '♬', '♩', '', '💕', '', '💫', '✨', '🎵', '🎶', '', '', '', '🎉'][index % 17]}
          </motion.div>
        ))
      )}

      <div className="text-center max-w-2xl mx-auto px-4">
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

        {isPlaying && !hasBroken && (
          <motion.button
            onClick={handleBreakMagic}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full text-white font-bold shadow-lg text-lg"
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 0 20px rgba(255,255,255,0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            Play ✨
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default CandleIntro;
