import { motion } from "framer-motion";
import PropTypes from "prop-types";

const CongratsAnimation = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{
        scale: [1, 2], // Simplified to two keyframes
        rotate: [0, 360], // Simplified to two keyframes
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 2,
      }}
      style={{
        position: "absolute",
        top: "50%",
        left: "27%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, rgba(255,215,0,1) 0%, rgba(255,165,0,1) 100%)",
        color: "white",
        textShadow: "0px 0px 8px rgba(0,0,0,0.5)",
        padding: "2rem",
        borderRadius: "20%", // Keeping a constant value
        border: "3px solid white",
      }}
    >
      <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
        🎉 Congrats, you're on your way to STARDOM! 🎉
      </div>
    </motion.div>
  );
};

CongratsAnimation.propTypes = {
  isVisible: PropTypes.bool.isRequired, // Define isVisible as a required boolean prop
};

export default CongratsAnimation;
