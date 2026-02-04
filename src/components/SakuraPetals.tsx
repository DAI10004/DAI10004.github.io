'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SakuraPetals() {
  const [petals, setPetals] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  useEffect(() => {
    const petalCount = 30;
    const newPetals = Array.from({ length: petalCount }, (_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}vw`,
        animationDuration: `${8 + Math.random() * 10}s`,
        animationDelay: `${Math.random() * 10}s`,
        fontSize: `${14 + Math.random() * 12}px`,
      },
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="sakura-container">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="sakura-petal"
          style={petal.style}
          animate={{
            y: ['-10vh', '110vh'],
            rotate: [0, 720],
            x: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: parseFloat(petal.style.animationDuration! as string),
            delay: parseFloat(petal.style.animationDelay! as string),
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
}
