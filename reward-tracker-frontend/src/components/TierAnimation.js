// TierUnlockAnimation.js
import React from 'react';
import { motion } from 'framer-motion';

const TierUnlockAnimation = ({ currentTier }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: 'gold', padding: '20px', marginTop: '20px', borderRadius: '10px', textAlign: 'center' }}
    >
      <h2>🎉 You’ve unlocked Tier {currentTier}! 🎉</h2>
    </motion.div>
  );
};

export default TierUnlockAnimation;
