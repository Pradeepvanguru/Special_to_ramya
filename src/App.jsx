import React, { useRef, useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cake, Users, Sparkles, Mic, Stethoscope, Heart, Eye, Smile, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import MagicalCursor from '@/components/MagicalCursor';
import CandleIntro from './components/CandleIntro';
import { ChevronRight } from "lucide-react";

import friend from './asserts/friends.png';
import ramya from './asserts/ramya_05.jpg';
import pic1 from './asserts/pic1.png';
import fav from './asserts/fav.jpg';
import image14 from './asserts/image14.jpg';
import image20 from './asserts/image20.jpg';
import pencil from './asserts/pencil.jpg';
import bgMusic from './asserts/Audio_bgm.mp3';

const App = () => {
  const [showApp, setShowApp] = useState(false);
  const girlName = "Ramya ✨ ";
  const scrollContainerRef = useRef(null);
  const audioRef = useRef(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleShowApp = () => {
    setShowApp(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.play();
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (showApp && currentCardIndex < sections.length - 1) {
      const timer = setInterval(() => {
        setCurrentCardIndex(prevIndex => {
          if (prevIndex < sections.length - 1) {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollTo({
                left: (prevIndex + 1) * window.innerWidth,
                behavior: 'smooth'
              });
            }
            return prevIndex + 1;
          } else {
            clearInterval(timer);
            return prevIndex;
          }
        });
      }, 10000);

      return () => clearInterval(timer);
    }
  }, [showApp, currentCardIndex]);

  // Add scroll event listener to update currentCardIndex
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollLeft;
      const cardWidth = window.innerWidth;
      const newIndex = Math.round(scrollPosition / cardWidth);
      if (newIndex !== currentCardIndex) {
        setCurrentCardIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentCardIndex]);

  // Add touch event handlers for swipe detection
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const difference = touchStartX - touchEndX;
      if (difference > 50) {
        // Swipe left - go to next card
        if (currentCardIndex < sections.length - 1) {
          setCurrentCardIndex(prev => prev + 1);
          scroll('right');
        }
      } else if (difference < -50) {
        // Swipe right - go to previous card
        if (currentCardIndex > 0) {
          setCurrentCardIndex(prev => prev - 1);
          scroll('left');
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentCardIndex]);

  const sections = [
    // hero section
    {
      id: 'hero',
      title: `Happy Birthday ${girlName}`,
      Icon: Cake,
      gradient: 'from-purple-600 via-pink-600 to-red-600',
      content: (
        <>
          <p className="text-lg sm:text-xl mb-6 text-center text-gray-200">
            Wishing you the most amazing day, filled with love, laughter, and everything that makes you happy ✨
          </p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="my-8 relative"
          >
            <img
              alt="Joyful birthday celebration"
              className="w-full max-w-xl mx-auto rounded-xl shadow-2xl object-cover h-100  opacity-80"
              src={ramya}
            />
            <motion.div
              className="absolute -top-0 -right-1 text-1xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              💖
            </motion.div>
          </motion.div>
           <div className="fixed bottom-4 right-4 animate-pulse text-white text-3xl z-50">
          →
        </div>
        </>
      )
    },
    // about section
    {
      id: 'about',
      title: 'Shining Star ✨',
      Icon: Sparkles,
      gradient: 'from-indigo-500 via-purple-600 to-pink-600',
      content: (
        <div className="space-y-4 text-center text-gray-300">
          <p className="flex items-center justify-center"><Heart className="w-5 h-5 mr-2 text-red-400" /> An independent spirit, brave, inspiring and fire brand🔥.</p>
          <p className="flex items-center justify-center"><Eye className="w-5 h-5 mr-2 text-sky-400" /> Those attractive eyes that light up any room!</p>
          <p className="flex items-center justify-center"><Mic className="w-5 h-5 mr-2 text-teal-300" /> A talented dancer and a captivating singer.</p>
          <p className="flex items-center justify-center"><Stethoscope className="w-5 h-5 mr-2 text-green-400" /> Future amazing Dentist in the making!</p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-4"
          >
            <img
              alt="Portrait"
              className="w-full max-w-[220px] mx-auto rounded-lg shadow-lg object-cover h-100"
              src={pic1}
            />
          </motion.div>

          <div className="fixed bottom-4 right-4 animate-pulse text-white text-3xl z-50">
          →
        </div>
        </div>
      )
    },
    // friends section
    {
      id: 'friends',
      title: 'Amazing Friends 🤝',
      Icon: Users,
      gradient: 'from-orange-500 via-red-600 to-pink-700',
      content: (
        <div className="text-center space-y-3 text-gray-300">
          <p>Blessed with wonderful friends like Divya and Amrutha!</p>
          <p>Their bond is full of support, joy, and understanding.</p>
          <p>You enjoy with friends Especially loves delicious Biryani party!</p>
          <p>Best Dancing partner ever !</p>
          <div className="flex justify-center space-x-4 pt-4">
            <img
              alt="Friend group"
              className="w-full max-w-xs mx-auto rounded-xl shadow-2xl object-cover h-64"
              src={friend}
            />
          </div>

          <div className="fixed bottom-4 right-4 animate-pulse text-white text-3xl z-50">
          →
        </div>
        </div>
      )
    },
    // special moments section
    {
      id: 'gallery',
      title: ' Best Moments with You ✨',
      Icon: Camera,
      gradient: 'from-sky-500 via-blue-600 to-indigo-700',
      content: (
        <>
          <div className="grid grid-cols-4 gap-4 pt-2">
            {[fav, image14, image20, pencil].map((src, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <img alt={`Memory ${idx}`} className="w-full h-42 object-cover rounded-lg shadow-md" src={src} />
              </motion.div>
            ))}
          </div>
          <div className='mt-4 text-sm italic text-gray-400'>
          <i>"Hey, I just wanted to say something honestly... I really hope you'll always stay close. I'd like for us to keep making memories — countless ones — and share many more moments with you, just like we always do with your permission."</i>
          <br></br><i>"These moments are  more than enough for me.I understand that your heart belongs to someone special, and I respect the boundaries that come with that. I want nothing more than your happiness, so I'll always honor your choices with the deepest respect.that's why I'm not disturbing you anymore.Finally I wish you both a lifetime filled with love ❤️,happiness and endless togetherness. May your bond grow stronger each day and last forever!"</i>
          </div>
          <div className="fixed bottom-4 right-4 animate-pulse text-white text-3xl z-50">
          →
        </div>
        </>
      )
    },
    // wishes section
    {
      id: 'wishes',
      title: 'My Wishes For You 💖',
      Icon: Smile,
      gradient: 'from-pink-600 via-purple-700 to-indigo-700',
      content: (
        <div className="space-y-4 text-center italic text-gray-300">
          <p>"May your birthday be as bright as your smile and as lovely as you are."</p>
          <p>"Keep shining, dreaming, and being the incredible person you are."</p>
          <p>"Sending you all love on your special day and always!"</p>
          <p>Once again, Happy Birthday! No matter the past, you've always had a special place to me.</p>
          <p> Sorry for taking the picture without your permission, I will delete the pics after this. </p>
          <p>I plan a lot of things,but in the end,life follows the script written by destiny.</p>
          <section><i>Thank you for making beautiful Captures in my life,I never forgot it..!</i></section>
           {/* Exit Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => window.history.back()}
              className="px-7 py-2 border border-blue-500 text-white-500 rounded-lg  hover:text-red-500 transition-all"
            >
              Click to watch  More surprice for you ⬇️
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <audio ref={audioRef} src={bgMusic} loop />
      <AnimatePresence>
        {!showApp && <CandleIntro onComplete={handleShowApp} />}
      </AnimatePresence>

      <motion.div
        className="min-h-screen bg-black text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: showApp ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <AnimatedBackground />
        <MagicalCursor />

        <div className="relative z-10 py-8 px-4">
          {/* Navigation toggles with numbers */}
          <div className="flex justify-center gap-3 mb-4">
            {sections.map((section, idx) => (
              <motion.div
                key={section.id}
                className={`w-6 h-6 rounded-full cursor-pointer transition-all flex items-center justify-center ${currentCardIndex === idx ? 'bg-white text-black' : 'bg-white/30 text-white'}`}
                whileHover={{ scale: 1.2 }}
                onClick={() => {
                  setCurrentCardIndex(idx);
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({
                      left: idx * window.innerWidth,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                <span className="text-xs font-medium">{idx + 1}</span>
              </motion.div>
            ))}
          </div>
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 scroll-smooth"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {sections.map((section, index) => {
              const Icon = section.Icon;
              const gradient = section.gradient;

              return (
                <motion.div
                  key={section.id}
                  className="min-w-full snap-center px-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Card className="bg-white/[0.01] backdrop-blur-[1px] border border-white/5 transition-all duration-300 hover:bg-white/[0.05] overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-center gap-1 text-2xl">
                        <Icon className={`w-6 h-6 bg-gradient-to-r ${gradient} rounded-full p-1`} />
                        <span className={`bg-gradient-to-r ${gradient} inline-block text-transparent bg-clip-text`}>
                          {section.title}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>{section.content}</CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default App;
