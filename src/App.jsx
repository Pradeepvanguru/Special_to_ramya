import React, { useRef } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Gift, Cake, Users, Sparkles, Mic, Stethoscope, Heart, Eye, Smile, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import MagicalCursor from '@/components/MagicalCursor';
// Update the import statements at the top of the file
import friend from './asserts/friends.png'
import ramya from './asserts/Ramya.png'
import pic1 from './asserts/pic1.png'
import fav from './asserts/fav.jpg'
import image14 from './asserts/image14.jpg'
import image20 from './asserts/image20.jpg'
import pencil from './asserts/pencil.jpg'
import bgMusic from './asserts/Audio_bgm.mp3';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import CandleIntro from './components/CandleIntro';

const App = () => {
  const [showApp, setShowApp] = useState(false);
  const girlName = "Asha Ramya ✨ ";
  const scrollContainerRef = React.useRef(null);
  const audioRef = useRef(null);

  const handleShowApp = () => {
    setShowApp(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.1; // Set volume to 50%
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

  const sections = [
    {
      id: 'hero',
      title: `Happy Birthday, ${girlName}!`,
      Icon: Cake,
      gradient: 'from-purple-600 via-pink-600 to-red-600',
      content: (
        <>
          <p className="text-lg sm:text-xl mb-6 text-center text-gray-200">Wishing you the most amazing day, filled with love, laughter, and everything that makes you happy!</p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="my-8 relative"
          >
            <img
              alt="Joyful birthday celebration with confetti"
              className="w-full max-w-xs mx-auto rounded-xl shadow-2xl object-cover h-64"
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
        </>
      )
    },
    {
      id: 'about',
      title: 'Shining Star ✨',
      Icon: Sparkles,
      gradient: 'from-indigo-500 via-purple-600 to-pink-600',
      content: (
        <div className="space-y-4 text-center text-gray-300">
          <p className="flex items-center justify-center"><Heart className="w-5 h-5 mr-2 text-red-400" /> An independent spirit, brave and inspiring.</p>
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
              className="w-full max-w-[180px] mx-auto rounded-lg shadow-lg object-cover h-48"
              src={pic1}
            />
          </motion.div>
        </div>
      )
    },
    // {
    //   id: 'favorites',
    //   title: 'A Few of Her Favorite Things 🍽️',
    //   Icon: Gift,
    //   gradient: 'from-teal-500 via-cyan-600 to-sky-700',
    //   content: (
    //     <div className="text-center text-gray-300">
    //       <p className="text-lg mb-4">Especially loves delicious France Biryani!</p>
    //       <motion.div
    //         initial={{ y: 20, opacity: 0 }}
    //         animate={{ y: 0, opacity: 1 }}
    //         transition={{ duration: 0.5, delay: 0.4 }}
    //       >
    //         <img
    //           alt="Delicious plate of French Biryani"
    //           className="w-full max-w-xs mx-auto rounded-lg shadow-lg object-cover h-56"
    //           src="https://images.unsplash.com/photo-1697155406055-2db32d47ca07"
    //         />
    //       </motion.div>
    //     </div>
    //   )
    // },
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
          <div className="flex justify-center space-x-4 pt-4">
            <img  alt="Joyful birthday celebration with confetti"
              className="w-full max-w-xs mx-auto rounded-xl shadow-2xl object-cover h-64" src={friend} />
            {/* <img alt="Friendship 2" className="w-24 h-24 rounded-full shadow-md object-cover border-4 border-gray-700" src="https://images.unsplash.com/photo-1691162498490-d21a6684c0c7" /> */}
          </div>
        </div>
      )
    },
    {
      id: 'gallery',
      title: 'One of my Golden Moments with You 📸 ✨ ',
      Icon: Camera,
      gradient: 'from-sky-500 via-blue-600 to-indigo-700',
      content: (
        <div className="grid grid-cols-2 gap-4 pt-2">
          {[
            fav,
            image14,
            image20,
            pencil,
            
          ].map((src, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
              <img alt={`Memory ${idx}`} className="w-full h-42 object-cover rounded-lg shadow-md" src={src} />
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: 'wishes',
      title: 'My Wishes For You 💖',
      Icon: Smile,
      gradient: 'from-pink-600 via-purple-700 to-indigo-700',
      content: (
        <div className="space-y-4 text-center italic text-gray-300">
          <p>"May your birthday be as bright as your smile and as lovely as you are."</p>
          <p>"Keep shining, keep dreaming, and keep being the incredible person you are."</p>
          <p>"Sending you all love on your special day and always!"</p>
          <p>once again,Happy Birthday! No matter what happened in the past, I want you to know you’ve always held a special place in my heart.</p>
          <section><i>Thank You for making me a wonderful Memories ❤️!</i></section>
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
          <div className="flex items-center justify-between max-w-6xl mx-auto mb-4">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto hide-scrollbar gap-6 pb-4 max-w-6xl mx-auto"
            style={{ scrollSnapType: 'x mandatory' }}>
            // Inside your App component's return statement, update the sections.map:
            {sections.map(({ id, title, Icon, gradient, content }) => (
            // Inside your sections.map
            <div 
              key={id}
              className="flex-none w-full max-w-xs sm:max-w-[280px] mx-auto"
              style={{ scrollSnapAlign: 'start' }}>
              <Card className="bg-white/[0.01] backdrop-blur-[1px] border border-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/[0.05] p-4">
                <CardHeader className="p-3">
                  <CardTitle className={`text-xl font-bold text-center bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 text-sm">
                  {content}
                </CardContent>
              </Card>
            </div>
            ))}
          </div>
        </div>
        <Toaster />
      </motion.div>
    </>
  );
};

export default App;
