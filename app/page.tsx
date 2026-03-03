"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Gift, Play, ChevronRight } from "lucide-react";

const SECTIONS = {
  INTRO: "intro",
  ENVELOPE: "envelope",
  GIFT: "gift",
  VIDEO: "video",
};

/* --- Sub-component: Floating Hearts --- */
const FloatingHearts = () => {
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    const generated = [...Array(20)].map((_, i) => ({
      id: i,
      xInit: -100,
      yInit: Math.random() * 1000,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * 20,
      size: 20 + Math.random() * 40,
    }));
    setHearts(generated);
  }, []);

  if (hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ x: h.xInit, y: h.yInit, opacity: 0, scale: 0 }}
          animate={{
            x: 1500,
            y: -500,
            opacity: [0, 0.4, 0],
            scale: [0.5, 1.2, 0.5],
            rotate: 360,
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "linear",
          }}
          className="absolute"
        >
          <Heart
            className="text-pink-500 fill-current"
            size={h.size}
            style={{ filter: "blur(2px)" }}
          />
        </motion.div>
      ))}
    </div>
  );
};

/* --- Sub-component: Flower Garden (CSS based) --- */
const FlowerGarden = () => {
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
};

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
    if (envelopeOpen) {
      let i = 0;
      const interval = setInterval(() => {
        setTextVisible((prev) => prev + fullMessage.charAt(i));
        i++;
        if (i >= fullMessage.length) {
          clearInterval(interval);
          setTimeout(() => setShowNextBtn(true), 1000);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [envelopeOpen, fullMessage]);

  return (
    <main className="relative min-h-screen w-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center font-outfit">
      <FloatingHearts />
      <FlowerGarden />

      <AnimatePresence mode="wait">
        {/* STAGE: INTRO */}
        {stage === SECTIONS.INTRO && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            className="z-10 text-center space-y-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="inline-block p-6 glass-card border-none bg-pink-500/20"
            >
              <Heart className="w-16 h-16 text-pink-500 fill-current" />
            </motion.div>
            <h1 className="text-6xl lg:text-[7rem] font-playfair font-black tracking-tight leading-none text-white drop-shadow-2xl">
              Happy <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600">
                8.3 Day
              </span>
            </h1>
            <p className="text-zinc-500 tracking-[0.3em] uppercase text-sm font-bold">
              Hãy để những mầm xanh lớn lên...
            </p>
          </motion.div>
        )}

        {/* STAGE: ENVELOPE */}
        {stage === SECTIONS.ENVELOPE && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="z-10 flex flex-col items-center gap-12"
          >
            <h2 className="text-2xl font-dancing text-pink-300 italic">
              Chạm vào phong thư phía dưới nhé...
            </h2>

            <div
              className={`envelope-wrapper ${envelopeOpen ? "pt-40" : ""} transition-all duration-1000`}
              onClick={() => setEnvelopeOpen(true)}
            >
              <div
                className={`envelope ${envelopeOpen ? "open" : "animate-float shadow-2xl shadow-pink-500/20"}`}
              >
                <div className="flap"></div>
                <div className="letter glass-card border-none !bg-white !shadow-none p-8 flex flex-col">
                  <p className="text-zinc-800 text-lg leading-relaxed font-dancing font-bold whitespace-pre-wrap typing-cursor">
                    {textVisible}
                  </p>
                </div>
                <div className="front"></div>
              </div>
            </div>

            <AnimatePresence>
              {showNextBtn && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStage(SECTIONS.GIFT)}
                  className="mt-12 px-10 py-5 bg-gradient-to-r from-pink-600 to-rose-500 rounded-full font-bold text-white shadow-xl flex items-center gap-3 group"
                >
                  Mở quà thôi nào{" "}
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* STAGE: GIFT BOX */}
        {stage === SECTIONS.GIFT && (
          <motion.div
            key="gift"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="z-10 flex flex-col items-center gap-12"
          >
            <h2 className="text-4xl font-playfair font-black text-rose-300">
              A Surprise for You!
            </h2>

            <div
              className="relative group cursor-pointer"
              onClick={() => setGiftOpened(true)}
            >
              {/* Gift Box Animation */}
              <motion.div
                animate={
                  giftOpened
                    ? { y: -200, opacity: 0, rotate: 20 }
                    : { y: 0, scale: [1, 1.05, 1] }
                }
                transition={{ duration: 0.8, y: { ease: "circIn" } }}
                className="z-20 relative"
              >
                <Gift className="w-64 h-64 text-rose-500 fill-current drop-shadow-[0_0_30px_rgba(244,63,94,0.5)]" />
                <div className="absolute inset-0 bg-white/10 blur-xl scale-125 rounded-full -z-10 group-hover:bg-white/20 transition-colors" />
              </motion.div>

              {/* Content revealed inside box */}
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
        )}

        {/* STAGE: VIDEO REVEAL */}
        {stage === SECTIONS.VIDEO && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4 lg:p-20"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative w-full max-w-5xl aspect-video glass-card border-none overflow-hidden rounded-[40px] shadow-[0_0_100px_rgba(255,75,43,0.3)] bg-zinc-900"
            >
              <video
                src="https://assets.mixkit.co/videos/preview/mixkit-valentines-day-gift-box-with-a-red-ribbon-4414-large.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                controls
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 right-8 flex gap-4"
              >
                <button
                  onClick={() => setStage(SECTIONS.INTRO)}
                  className="px-8 py-3 glass-card bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all"
                >
                  Xem lại từ đầu
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 text-zinc-600 text-xs tracking-widest uppercase font-bold pointer-events-none">
        Special Gift • International Women&apos;s Day • MMXXV
      </footer> */}
    </main>
  );
}
