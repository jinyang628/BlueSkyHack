import { motion } from 'framer-motion';

const CongratsAnimation = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ scale: 0, rotate: 0 }}
      animate={{ scale: 1.5, rotate: 360 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    >
      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'gold' }}>
        🎉 Congrats! 🎉
      </div>
    </motion.div>
  );
};

export default CongratsAnimation;