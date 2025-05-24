import React, { useState, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Sparkles } from 'lucide-react';

    const MagicalCursor = () => {
      const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
      const [particles, setParticles] = useState([]);
      const [cursorVariant, setCursorVariant] = useState('default');

      useEffect(() => {
        const mouseMove = (e) => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          if (Math.random() < 0.15) { 
            createParticle(e.clientX, e.clientY, false);
          }
        };

        const clickHandler = (e) => {
          for (let i = 0; i < 12; i++) { 
            createParticle(e.clientX, e.clientY, true);
          }
           setCursorVariant('clicked');
           setTimeout(() => setCursorVariant('default'), 200);
        };
        
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('click', clickHandler);

        return () => {
          window.removeEventListener('mousemove', mouseMove);
          window.removeEventListener('click', clickHandler);
        };
      }, []);

      const createParticle = (x, y, isClick) => {
        const newParticle = {
          id: Math.random(),
          x,
          y,
          size: Math.random() * (isClick ? 14 : 10) + 5,
          color: `hsl(${Math.random() * 60 + 280}, 100%, ${Math.random() * 30 + 50}%)`, // Purples, Pinks, Blues
          duration: Math.random() * 1 + 0.5,
          isClickParticle: isClick,
        };
        setParticles((prevParticles) => [...prevParticles, newParticle]);
        setTimeout(() => {
          setParticles((prevParticles) => prevParticles.filter(p => p.id !== newParticle.id));
        }, newParticle.duration * 1000);
      };

      const cursorVariants = {
        default: {
          height: 32,
          width: 32,
          backgroundColor: "rgba(128, 0, 128, 0.2)", // Purpleish
          border: "2px solid rgba(224, 176, 255, 0.7)", // Light purple border
          transition: { type: "spring", stiffness: 500, damping: 30 }
        },
        clicked: {
          height: 28,
          width: 28,
          backgroundColor: "rgba(224, 176, 255, 0.5)", // Lighter purple
          border: "3px solid rgba(191, 64, 191, 0.9)", // Medium purple border
          transition: { type: "spring", stiffness: 400, damping: 20 }
        }
      };
      
      return (
        <>
          <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center"
            style={{
              translateX: mousePosition.x -16, 
              translateY: mousePosition.y -16,
            }}
            variants={cursorVariants}
            animate={cursorVariant}
          >
             <Sparkles size={16} className="text-purple-300 opacity-80" />
          </motion.div>
          
          <AnimatePresence>
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                className="fixed rounded-full pointer-events-none z-50"
                style={{
                  left: particle.x,
                  top: particle.y,
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  x: "-50%", 
                  y: "-50%",
                  boxShadow: `0 0 ${particle.size / 2}px ${particle.color}`,
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ 
                  opacity: 0, 
                  scale: 0,
                  x: particle.isClickParticle ? `${(Math.random() - 0.5) * 100 - 50}%` : `${(Math.random() - 0.5) * 50 - 50}%`,
                  y: particle.isClickParticle ? `${(Math.random() - 0.5) * 100 - 50}%` : `${(Math.random() - 0.5) * 50 - 50}%`,
                }}
                transition={{ duration: particle.duration, ease: "easeOut" }}
              />
            ))}
          </AnimatePresence>
        </>
      );
    };

    export default MagicalCursor;