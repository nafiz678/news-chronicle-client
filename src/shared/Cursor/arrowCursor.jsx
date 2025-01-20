import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const ArrowCursor = () => {
  const [lastY, setLastY] = useState(null);
  const [direction, setDirection] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (lastY !== null) {
        if (e.clientY < lastY) {
          setDirection('up');
        } else if (e.clientY > lastY) {
          setDirection('down');
        }
      }
      setLastY(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastY]);
  const arrowVariants = {
    initial: {
      opacity: 0,
      scale: 0.5,
      rotate: direction === 'up' ? 0 : 180,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: direction === 'up' ? 0 : 180,
    },
    exit: {
      opacity: 0,
      scale: 0.5,
    },
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 hidden lg:inline">
      <AnimatePresence>
        {direction && (
          <motion.div
            key={`${direction}-arrow`}
            style={{
              position: 'fixed',
              top: mousePosition.y - 25,
              left: mousePosition.x + 15,
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={arrowVariants}>
            <div className="w-[30px] h-[30px] bg-black/80 dark:bg-white rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white dark:text-black">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ArrowCursor;
