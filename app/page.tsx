"use client";

import React, { useState, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Play, ChevronRight } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts"; // Đã sửa đường dẫn import bằng alias @

const SECTIONS = {
  INTRO: "intro",
  ENVELOPE: "envelope",
  GIFT: "gift",
  VIDEO: "video",
};

/* --- Sub-component: Flower Garden (CSS based) --- */
const FlowerGarden = memo(() => {
  const leaves = useMemo(() => {
    return [...Array(10)].map((_, i) => i);
  }, []);

  return (
    <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-[10vh]">
      <div className="flowers opacity-40">
        <div className="flower flower--1">
          <div className="flower__leafs">
            <div className="flower__leaf"></div>
            <div className="flower__white-circle"></div>
          </div>
          <div className="flower__line"></div>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flower__light"
              style={{
                left: `${(i - 3) * 2}vmin`,
                animationDelay: `${i * 0.5}s`,
              }}
            ></div>
          ))}
        </div>
        <div className="flower flower--2">
          <div className="flower__leafs">
            <div className="flower__leaf"></div>
            <div className="flower__white-circle"></div>
          </div>
          <div className="flower__line"></div>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flower__light"
              style={{
                left: `${(i - 3) * 2}vmin`,
                animationDelay: `${i * 0.7}s`,
              }}
            ></div>
          ))}
        </div>
        <div className="flower flower--3">
          <div className="flower__leafs">
            <div className="flower__leaf"></div>
            <div className="flower__white-circle"></div>
          </div>
          <div className="flower__line"></div>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flower__light"
              style={{
                left: `${(i - 3) * 2}vmin`,
                animationDelay: `${i * 0.3}s`,
              }}
            ></div>
          ))}
        </div>
        <div className="long-g">
          {leaves.map((i) => (
            <div
              key={i}
              className="leaf"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
});

FlowerGarden.displayName = "FlowerGarden";

export default function InternationalWomensDay() {
  const [stage, setStage] = useState(SECTIONS.INTRO);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [textVisible, setTextVisible] = useState("");
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);

  const fullMessage =
    "Chào em! 🌸\n\nNgày 8.3 này, mong em luôn rực rỡ và tươi tắn như những đóa hoa trong vườn. Chúc em mỗi ngày đều tràn ngập niềm vui, cười thật tươi và mãi giữ được sự tử tế, đáng yêu vốn có nhé.\n\nCảm ơn em vì đã là một phần tuyệt vời của thế giới này. Love you! ❤️";

  // stage intro automatically transition to envelope after 6s
  useEffect(() => {
    if (stage === SECTIONS.INTRO) {
      const timer = setTimeout(() => setStage(SECTIONS.ENVELOPE), 6000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Typing effect
  useEffect(() => {
    if (stage === SECTIONS.ENVELOPE && envelopeOpen) {
      let i = 0;
      setTextVisible("");
      const typingInterval = setInterval(() => {
        setTextVisible(fullMessage.substring(0, i));
        i++;
        if (i > fullMessage.length) {
          clearInterval(typingInterval);
          setShowNextBtn(true);
        }
      }, 50); // Adjust typing speed here
      return () => clearInterval(typingInterval);
    }
  }, [stage, envelopeOpen, fullMessage]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-4 font-sans text-white">
      <FloatingHearts /> {/* Sử dụng component FloatingHearts đã tối ưu */}
      <FlowerGarden />
      {/* STAGE: INTRO */}
      {stage === SECTIONS.INTRO && (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="z-10 flex h-full w-full flex-col items-center justify-center text-center"
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-4 text-4xl font-bold lg:text-6xl"
          >
            Happy Women's Day!
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg lg:text-xl"
          >
            Một món quà nhỏ dành tặng bạn
          </motion.p>
        </motion.div>
      )}
      {/* STAGE: ENVELOPE */}
      {stage === SECTIONS.ENVELOPE && (
        <motion.div
          key="envelope"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="z-10 flex h-full w-full flex-col items-center justify-center"
        >
          <motion.div
            className={`relative w-[300px] cursor-pointer rounded-lg shadow-xl transition-all duration-500 lg:w-[400px] ${envelopeOpen ? "h-[400px] bg-white" : "h-[200px] bg-red-500"}`}
            onClick={() => setEnvelopeOpen(!envelopeOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`absolute inset-0 flex items-center justify-center p-4 text-center text-white transition-opacity duration-500 ${envelopeOpen ? "opacity-0" : "opacity-100"}`}
            >
              <p className="text-2xl font-bold">Mở thư này nhé!</p>
            </div>

            <AnimatePresence>
              {envelopeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 text-gray-800"
                >
                  <p className="whitespace-pre-line text-center text-base leading-relaxed lg:text-lg">
                    {textVisible}
                  </p>
                  {showNextBtn && (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      onClick={() => setStage(SECTIONS.GIFT)}
                      className="mt-6 flex items-center gap-2 rounded-full bg-pink-500 px-6 py-3 text-white shadow-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                    >
                      Tiếp theo <ChevronRight className="h-5 w-5" />
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
      {/* STAGE: GIFT REVEAL */}
      {stage === SECTIONS.GIFT && (
        <motion.div
          key="gift"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="z-10 flex h-full w-full flex-col items-center justify-center"
        >
          <motion.div
            className={`relative flex h-[250px] w-[250px] cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 to-orange-500 shadow-2xl transition-all duration-500 lg:h-[300px] lg:w-[300px] ${giftOpened ? "rotate-45 scale-75 opacity-0" : ""}`}
            onClick={() => setGiftOpened(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Gift className="h-32 w-32 text-white" />
            <div
              className={`absolute inset-0 flex items-center justify-center text-center text-white transition-opacity duration-500 ${giftOpened ? "opacity-0" : "opacity-100"}`}
            >
              <p className="text-2xl font-bold">Nhấn để mở quà!</p>
            </div>

            <div className="absolute inset-0">
              <AnimatePresence>
                {giftOpened && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                    className="absolute inset-0 flex items-center justify-center -top-20"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setStage(SECTIONS.VIDEO)}
                      className="w-48 h-48 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex flex-col items-center justify-center gap-4 text-white hover:bg-white/20 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                    >
                      <Play className="w-16 h-16 fill-current" />
                      <span className="font-bold tracking-widest uppercase text-xs">
                        Phóng to video
                      </span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!giftOpened && (
              <p className="text-zinc-500 animate-pulse tracking-widest uppercase text-sm">
                Chạm vào hộp quà để mở
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
      {/* STAGE: VIDEO REVEAL */}
      {stage === SECTIONS.VIDEO && (
        <motion.div
          key="video"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black p-4 lg:p-20"
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative aspect-video w-full max-w-4xl rounded-lg shadow-2xl"
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&showinfo=0&rel=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
            <button
              onClick={() => setStage(SECTIONS.INTRO)}
              className="absolute -right-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              <ChevronRight className="h-6 w-6 rotate-180" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
