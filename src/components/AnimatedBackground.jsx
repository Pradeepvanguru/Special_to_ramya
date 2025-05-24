import React from 'react';
    import { motion } from 'framer-motion';
    import { Star, Zap, Sparkles as LucideSparkles, Gift, Heart, Smile, Meh, Angry } from 'lucide-react';
    import bgImage from '../asserts/my_pallavi.jpg'; // Adjust the path accordingly



    const AnimatedBackground = () => {
      const items = [
        { id: 'star1', Icon: Star, color: 'text-yellow-400', size: 'w-4 h-4', duration: 12, delay: 0 },
        { id: 'star2', Icon: Star, color: 'text-yellow-300', size: 'w-3 h-3', duration: 18, delay: 1.5 },
        { id: 'star3', Icon: Star, color: 'text-yellow-500', size: 'w-5 h-5', duration: 10, delay: 3 },
        { id: 'star4', Icon: Star, color: 'text-indigo-300', size: 'w-3 h-3', duration: 20, delay: 5 },
        { id: 'star5', Icon: Star, color: 'text-pink-400', size: 'w-4 h-4', duration: 14, delay: 7 },
        
        { id: 'zap1', Icon: Zap, color: 'text-cyan-300', size: 'w-4 h-4', duration: 15, delay: 0.5 },
        { id: 'zap2', Icon: Zap, color: 'text-purple-400', size: 'w-5 h-5', duration: 12, delay: 4 },
        { id: 'zap3', Icon: Zap, color: 'text-yellow-300', size: 'w-3 h-3', duration: 19, delay: 8 },

        { id: 'sparkle1', Icon: LucideSparkles, color: 'text-pink-400', size: 'w-3 h-3', duration: 13, delay: 2.5 },
        { id: 'sparkle2', Icon: LucideSparkles, color: 'text-teal-300', size: 'w-2 h-2', duration: 19, delay: 6.5 },

        { id: 'emojiGift1', Icon: () => <Gift className="text-red-400 w-5 h-5" />, duration: 20, delay: 1 },
        { id: 'emojiHeart1', Icon: () => <Heart className="text-pink-500 w-6 h-6" />, duration: 15, delay: 2.2 },
        { id: 'emojiSmile1', Icon: () => <Smile className="text-yellow-400 w-5 h-5" />, duration: 18, delay: 3.8 },
        { id: 'emojiCute1', Icon: () => <span className="text-2xl">🥰</span>, duration: 16, delay: 5.5 },
        { id: 'emojiAngry1', Icon: () => <Angry className="text-orange-500 w-5 h-5" />, duration: 22, delay: 7.2 },
        
        { id: 'emojiParty1', Icon: () => <span className="text-2xl">🥳</span>, duration: 17, delay: 0.8 },
        { id: 'emojiCake1', Icon: () => <span className="text-xl">🎂</span>, duration: 21, delay: 4.5 },
        { id: 'emojiLove2', Icon: () => <span className="text-xl">💖</span>, duration: 19, delay: 6 },
        { id: 'emojiGift2', Icon: () => <Gift className="text-green-400 w-6 h-6" />, duration: 14, delay: 8.5 },
      ];

      return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0" 
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.4)', // This reduces the intensity of the background
          }}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              className={`absolute ${item.color || ''} ${item.size || ''} opacity-60`}
              initial={{ 
                x: `${Math.random() * 100}vw`, 
                y: `${Math.random() * 100}vh`,
                scale: Math.random() * 0.6 + 0.6,
              }}
              animate={{
                y: ['0vh', '100vh', '0vh'],
                x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
                rotate: [0, (Math.random() - 0.5) * 720, 0],
              }}
              transition={{
                duration: item.duration + Math.random() * 8,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
                delay: item.delay + Math.random() * 3,
              }}
            >
              <item.Icon />
            </motion.div>
          ))}
        </div>
      );
    };

    export default AnimatedBackground;