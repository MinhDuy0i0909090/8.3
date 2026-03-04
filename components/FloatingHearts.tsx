"use client";

import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface HeartProps {
  id: number;
  xInit: number;
  yInit: number;
  duration: number;
  delay: number;
  size: number;
}

const FloatingHeart = memo(({ heart }: { heart: HeartProps }) => {
  return (
    <motion.div
      key={heart.id}
      initial={{ x: heart.xInit, y: heart.yInit, opacity: 0, scale: 0 }}
      animate={{
        x: 1500,
        y: -500,
        opacity: [0, 0.4, 0],
        scale: [0.5, 1.2, 0.5],
        rotate: 360,
      }}
      transition={{
        duration: heart.duration,
        repeat: Infinity,
        delay: heart.delay,
        ease: "linear",
      }}
      className="absolute will-change-transform"
    >
      <Heart
        className="text-pink-500 fill-current"
        size={heart.size}
        style={{ filter: "blur(2px)" }}
      />
    </motion.div>
  );
});

FloatingHeart.displayName = "FloatingHeart";

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  useEffect(() => {
    const generated = [...Array(10)].map((_, i) => ({
      id: i,
      xInit: -100,
      yInit: Math.random() * 1000,
      duration: 10 + Math.random() * 10, // Giảm duration để tăng tốc độ và giảm số lượng heart trên màn hình cùng lúc
      delay: Math.random() * 10, // Giảm delay để tăng tốc độ
      size: 20 + Math.random() * 30, // Giảm kích thước tối đa
    }));
    setHearts(generated);
  }, []);

  if (hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {hearts.map((h) => (
          <FloatingHeart key={h.id} heart={h} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts;
