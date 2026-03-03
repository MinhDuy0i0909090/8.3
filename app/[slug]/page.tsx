"use client";
import React, { useState, useEffect } from "react";
import wishes from "@/data/wishes.json";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Gift, ChevronRight } from "lucide-react";

const SECTIONS = {
  INTRO: "intro",
  ENVELOPE: "envelope",
  GIFT: "gift",
  VIDEO: "video",
};

/* --- Sub-component: Floating Hearts --- */
const FloatingHearts = ({ primaryColor }: { primaryColor: string }) => {
  const [mounted, setMounted] = useState(false);
  const [hearts] = useState<
    {
      id: number;
      xInit: number;
      yInit: number;
      duration: number;
      delay: number;
      size: number;
    }[]
  >(() =>
    [...Array(20)].map((_, i) => ({
      id: i,
      xInit: -100,
      yInit: Math.random() * 1000,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * 20,
      size: 20 + Math.random() * 40,
    })),
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || hearts.length === 0) return null;

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
            className="fill-current"
            size={h.size}
            style={{ color: primaryColor, filter: "blur(2px)" }}
          />
        </motion.div>
      ))}
    </div>
  );
};

/* --- Sub-component: Flower Garden (FULL REPLICA) --- */
const FlowerGarden = ({ primaryColor }: { primaryColor: string }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-visible">
      <div className="flowers scale-[1.2] lg:scale-[2.5] mt-[10vh] lg:mt-[20vh] translate-y-[30vh]">
        {/* Flower 1 */}
        <div className="flower flower--1">
          <div className="flower__leafs">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`flower__leaf flower__leaf--${i}`}
                style={
                  i === 4
                    ? {
                        backgroundImage: `linear-gradient(to top, ${primaryColor}, #ffe066)`,
                      }
                    : {
                        backgroundImage: `linear-gradient(to top, ${primaryColor}, #ffe066)`,
                      }
                }
              ></div>
            ))}
            <div className="flower__white-circle"></div>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`flower__light flower__light--${i + 1}`}
                style={{ animationDelay: `${i * 0.4}s` }}
              ></div>
            ))}
          </div>
          <div className="flower__line">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`flower__line__leaf flower__line__leaf--${i}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Flower 2 */}
        <div className="flower flower--2">
          <div className="flower__leafs">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`flower__leaf flower__leaf--${i}`}
                style={{
                  backgroundImage: `linear-gradient(to top, ${primaryColor}, #ffe066)`,
                }}
              ></div>
            ))}
            <div className="flower__white-circle"></div>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`flower__light flower__light--${i + 1}`}
                style={{ animationDelay: `${i * 0.6}s` }}
              ></div>
            ))}
          </div>
          <div className="flower__line">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`flower__line__leaf flower__line__leaf--${i}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Flower 3 */}
        <div className="flower flower--3">
          <div className="flower__leafs">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`flower__leaf flower__leaf--${i}`}
                style={{
                  backgroundImage: `linear-gradient(to top, ${primaryColor}, #ffe066)`,
                }}
              ></div>
            ))}
            <div className="flower__white-circle"></div>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`flower__light flower__light--${i + 1}`}
                style={{ animationDelay: `${i * 0.3}s` }}
              ></div>
            ))}
          </div>
          <div className="flower__line">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`flower__line__leaf flower__line__leaf--${i}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div
          className="grow-ans"
          style={{ "--d": "1.2s" } as React.CSSProperties}
        >
          <div className="flower__g-long">
            <div
              className="flower__g-long__top"
              style={{ borderRightColor: "#159faa" }}
            ></div>
            <div className="flower__g-long__bottom"></div>
          </div>
        </div>

        {[1, 2].map((i) => (
          <div
            key={i}
            className="growing-grass"
            style={{ animationDelay: `${2 + i * 0.5}s` }}
          >
            <div className={`flower__grass flower__grass--${i}`}>
              <div className="flower__grass--top"></div>
              <div className="flower__grass--bottom"></div>
              {[...Array(8)].map((_, j) => (
                <div
                  key={j}
                  className={`flower__grass__leaf flower__grass__leaf--${j + 1}`}
                ></div>
              ))}
              <div className="flower__grass__overlay"></div>
            </div>
          </div>
        ))}

        {/* --- ADDITIONAL GRASS ELEMENTS FROM REFERENCE --- */}
        <div
          className="grow-ans"
          style={{ "--d": "2.4s" } as React.CSSProperties}
        >
          <div className="flower__g-right flower__g-right--1">
            <div className="leaf"></div>
          </div>
        </div>

        <div
          className="grow-ans"
          style={{ "--d": "2.8s" } as React.CSSProperties}
        >
          <div className="flower__g-right flower__g-right--2">
            <div className="leaf"></div>
          </div>
        </div>

        <div
          className="grow-ans"
          style={{ "--d": "2.8s" } as React.CSSProperties}
        >
          <div className="flower__g-front">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className={`flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--${i}`}
              >
                <div className="flower__g-front__leaf"></div>
              </div>
            ))}
            <div className="flower__g-front__line"></div>
          </div>
        </div>

        <div
          className="grow-ans"
          style={{ "--d": "3.2s" } as React.CSSProperties}
        >
          <div className="flower__g-fr">
            <div className="leaf"></div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className={`flower__g-fr__leaf flower__g-fr__leaf--${i}`}
              ></div>
            ))}
          </div>
        </div>

        <div className="long-g long-g--0">
          <div
            className="grow-ans"
            style={{ "--d": "3s" } as React.CSSProperties}
          >
            <div className="leaf leaf--0"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "2.2s" } as React.CSSProperties}
          >
            <div className="leaf leaf--1"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "3.4s" } as React.CSSProperties}
          >
            <div className="leaf leaf--2"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "3.6s" } as React.CSSProperties}
          >
            <div className="leaf leaf--3"></div>
          </div>
        </div>

        <div className="long-g long-g--1">
          <div
            className="grow-ans"
            style={{ "--d": "3.6s" } as React.CSSProperties}
          >
            <div className="leaf leaf--0"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "3.8s" } as React.CSSProperties}
          >
            <div className="leaf leaf--1"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4s" } as React.CSSProperties}
          >
            <div className="leaf leaf--2"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4.2s" } as React.CSSProperties}
          >
            <div className="leaf leaf--3"></div>
          </div>
        </div>

        <div className="long-g long-g--2">
          <div
            className="grow-ans"
            style={{ "--d": "4s" } as React.CSSProperties}
          >
            <div className="leaf leaf--0"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4.2s" } as React.CSSProperties}
          >
            <div className="leaf leaf--1"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4.4s" } as React.CSSProperties}
          >
            <div className="leaf leaf--2"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4.6s" } as React.CSSProperties}
          >
            <div className="leaf leaf--3"></div>
          </div>
        </div>

        <div className="long-g long-g--3">
          <div
            className="grow-ans"
            style={{ "--d": "4s" } as React.CSSProperties}
          >
            <div className="leaf leaf--0"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4.2s" } as React.CSSProperties}
          >
            <div className="leaf leaf--1"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "3s" } as React.CSSProperties}
          >
            <div className="leaf leaf--2"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "3.6s" } as React.CSSProperties}
          >
            <div className="leaf leaf--3"></div>
          </div>
        </div>

        <div className="long-g long-g--4">
          <div
            className="grow-ans"
            style={{ "--d": "4s" } as React.CSSProperties}
          >
            <div className="leaf leaf--0"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4.2s" } as React.CSSProperties}
          >
            <div className="leaf leaf--1"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "3s" } as React.CSSProperties}
          >
            <div className="leaf leaf--2"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "3.6s" } as React.CSSProperties}
          >
            <div className="leaf leaf--3"></div>
          </div>
        </div>

        <div className="long-g long-g--5">
          <div
            className="grow-ans"
            style={{ "--d": "4s" } as React.CSSProperties}
          >
            <div className="leaf leaf--0"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4.2s" } as React.CSSProperties}
          >
            <div className="leaf leaf--1"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "3s" } as React.CSSProperties}
          >
            <div className="leaf leaf--2"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "3.6s" } as React.CSSProperties}
          >
            <div className="leaf leaf--3"></div>
          </div>
        </div>

        <div className="long-g long-g--6">
          <div
            className="grow-ans"
            style={{ "--d": "4.2s" } as React.CSSProperties}
          >
            <div className="leaf leaf--0"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4.4s" } as React.CSSProperties}
          >
            <div className="leaf leaf--1"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4.6s" } as React.CSSProperties}
          >
            <div className="leaf leaf--2"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4.8s" } as React.CSSProperties}
          >
            <div className="leaf leaf--3"></div>
          </div>
        </div>

        <div className="long-g long-g--7">
          <div
            className="grow-ans"
            style={{ "--d": "3s" } as React.CSSProperties}
          >
            <div className="leaf leaf--0"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "3.2s" } as React.CSSProperties}
          >
            <div className="leaf leaf--1"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "3.5s" } as React.CSSProperties}
          >
            <div className="leaf leaf--2"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "3.6s" } as React.CSSProperties}
          >
            <div className="leaf leaf--3"></div>
          </div>
        </div>

        {/* Extra grass groups for a fuller garden */}
        <div className="long-g long-g--8">
          <div
            className="grow-ans"
            style={{ "--d": "3.4s" } as React.CSSProperties}
          >
            <div className="leaf leaf--0"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "3.6s" } as React.CSSProperties}
          >
            <div className="leaf leaf--1"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "3.8s" } as React.CSSProperties}
          >
            <div className="leaf leaf--2"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4s" } as React.CSSProperties}
          >
            <div className="leaf leaf--3"></div>
          </div>
        </div>

        <div className="long-g long-g--9">
          <div
            className="grow-ans"
            style={{ "--d": "3.8s" } as React.CSSProperties}
          >
            <div className="leaf leaf--0"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4s" } as React.CSSProperties}
          >
            <div className="leaf leaf--1"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4.2s" } as React.CSSProperties}
          >
            <div className="leaf leaf--2"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4.4s" } as React.CSSProperties}
          >
            <div className="leaf leaf--3"></div>
          </div>
        </div>

        <div className="long-g long-g--10">
          <div
            className="grow-ans"
            style={{ "--d": "4.2s" } as React.CSSProperties}
          >
            <div className="leaf leaf--0"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4.4s" } as React.CSSProperties}
          >
            <div className="leaf leaf--1"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4.6s" } as React.CSSProperties}
          >
            <div className="leaf leaf--2"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4.8s" } as React.CSSProperties}
          >
            <div className="leaf leaf--3"></div>
          </div>
        </div>

        <div className="long-g long-g--11">
          <div
            className="grow-ans"
            style={{ "--d": "4s" } as React.CSSProperties}
          >
            <div className="leaf leaf--0"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4.2s" } as React.CSSProperties}
          >
            <div className="leaf leaf--1"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4.4s" } as React.CSSProperties}
          >
            <div className="leaf leaf--2"></div>
          </div>
          <div
            className="grow-ans"
            style={{ "--d": "4.6s" } as React.CSSProperties}
          >
            <div className="leaf leaf--3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DynamicWishPage() {
  const params = useParams();
  const slug = params ? params.slug : null;
  const wishData = wishes.find((w: { slug: string }) => w.slug === slug);

  const [stage, setStage] = useState(SECTIONS.INTRO);
  const [canSkip, setCanSkip] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [textVisible, setTextVisible] = useState("");
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);

  // Default theme if no data found
  const theme = wishData?.theme || {
    background: "linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)",
    primary: "#ff4d6d",
    secondary: "#ff758c",
    textColor: "#ffffff",
    cardBg: "rgba(255, 255, 255, 0.1)",
  };

  const name = wishData?.name || "Người ấy";
  const wish = wishData?.wish || "Chúc bạn một ngày thật tuyệt vời!";
  const video =
    wishData?.video ||
    "https://assets.mixkit.co/videos/preview/mixkit-valentines-day-gift-box-with-a-red-ribbon-4414-large.mp4";

  // Flow control
  useEffect(() => {
    if (stage === SECTIONS.INTRO) {
      // Allow skip only after 5s
      const skipTimer = setTimeout(() => setCanSkip(true), 5000);
      // Auto transition after 8s
      const autoTimer = setTimeout(() => setStage(SECTIONS.ENVELOPE), 8000);
      // Hard fallback: force transition if somehow stuck after 12s
      const fallback = setTimeout(() => {
        setStage((prev: string) =>
          prev === SECTIONS.INTRO ? SECTIONS.ENVELOPE : prev,
        );
      }, 12000);
      return () => {
        clearTimeout(skipTimer);
        clearTimeout(autoTimer);
        clearTimeout(fallback);
      };
    }
  }, [stage]);

  // Typing effect
  useEffect(() => {
    if (envelopeOpen) {
      setTextVisible(""); // Reset text when opening
      let i = 0;
      const interval = setInterval(() => {
        setTextVisible((prev) => {
          if (i < wish.length) {
            return wish.slice(0, i + 1);
          }
          return prev;
        });
        i++;
        if (i >= wish.length) {
          clearInterval(interval);
          setTimeout(() => setShowNextBtn(true), 1000);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [envelopeOpen, wish]);

  if (!wishData)
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-white font-playfair">
        <h1 className="text-4xl">404 - Không tìm thấy mã này</h1>
      </div>
    );

  return (
    <main
      className={`relative min-h-screen w-full overflow-hidden flex items-center justify-center font-outfit transition-all duration-1000 ${canSkip && stage === SECTIONS.INTRO ? "cursor-pointer" : ""}`}
      style={{ background: theme.background }}
      onClick={() => {
        if (stage === SECTIONS.INTRO && canSkip) setStage(SECTIONS.ENVELOPE);
      }}
    >
      <FloatingHearts primaryColor={theme.primary} />

      <AnimatePresence mode="wait">
        {/* STAGE: INTRO */}
        {stage === SECTIONS.INTRO && (
          <motion.div
            key="flower-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            }}
            className="absolute inset-0 z-20"
          >
            <FlowerGarden primaryColor={theme.primary} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-6xl lg:text-8xl font-playfair font-black text-white text-center drop-shadow-2xl z-50  translate-y-[-20vh]"
              >
                Dành cho <br />
                <span style={{ color: theme.primary }}>{name}</span>
              </motion.h1>
            </div>
          </motion.div>
        )}

        {/* STAGE: ENVELOPE */}
        {stage === SECTIONS.ENVELOPE && (
          <motion.div
            key="envelope-stage"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="z-30 flex flex-col items-center gap-12"
          >
            <h2 className="text-3xl font-dancing text-white drop-shadow-lg italic">
              Có một phong thư gửi đến {name}...
            </h2>

            <div
              className={`envelope-wrapper ${envelopeOpen ? "pt-40" : ""} transition-all duration-1000`}
              onClick={(e) => {
                e.stopPropagation();
                setEnvelopeOpen(true);
              }}
              style={
                {
                  "--env-bg": theme.secondary,
                  "--env-flap": theme.primary,
                  "--env-side": theme.secondary,
                  "--env-pocket": theme.primary,
                  "--env-dots": theme.primary,
                } as React.CSSProperties
              }
            >
              <div
                className={`envelope ${envelopeOpen ? "open" : "animate-float shadow-2xl"}`}
              >
                <div className="flap"></div>
                <div className="envelope__side-left"></div>
                <div className="envelope__side-right"></div>
                <div className="letter p-15 flex flex-col">
                  <p className="text-zinc-800 text-xl leading-relaxed font-dancing font-bold whitespace-pre-wrap typing-cursor">
                    {textVisible}
                  </p>
                </div>
                <div className="pocket"></div>
              </div>
            </div>

            <AnimatePresence>
              {showNextBtn && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setStage(SECTIONS.GIFT);
                  }}
                  className="mt-5 px-12 py-5 rounded-full font-bold text-white shadow-2xl flex items-center gap-3 group"
                  style={{
                    background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
                  }}
                >
                  Nhận quà bất ngờ{" "}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "easeInOut",
                    }}
                  >
                    <ChevronRight />
                  </motion.div>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* STAGE: GIFT BOX */}
        {stage === SECTIONS.GIFT && (
          <motion.div
            key="gift-stage"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="z-30 flex flex-col items-center gap-12"
          >
            <h2 className="text-4xl font-playfair font-black text-white drop-shadow-2xl text-center px-4">
              Món quà từ trái tim
            </h2>

            <div
              className="relative group cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setGiftOpened(true);
                setTimeout(() => setStage(SECTIONS.VIDEO), 800);
              }}
            >
              <motion.div
                animate={
                  giftOpened
                    ? { y: -300, opacity: 0, rotate: 25 }
                    : {
                        y: [0, -20, 0],
                        scale: [1, 1.05, 1],
                      }
                }
                transition={
                  giftOpened
                    ? { duration: 0.8, ease: "circIn" }
                    : {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
                className="z-20 relative"
              >
                <Gift
                  className="w-56 h-56 lg:w-72 lg:h-72 stroke-[1.5] drop-shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all duration-300"
                  style={{ color: theme.primary, fill: theme.secondary }}
                />
                <div className="absolute inset-0 bg-white/20 blur-2xl scale-125 rounded-full -z-10" />
              </motion.div>
            </div>
            {!giftOpened && (
              <p className="text-white tracking-widest uppercase text-lg">
                Chạm để mở hộp quà
              </p>
            )}
          </motion.div>
        )}

        {/* STAGE: VIDEO REVEAL */}
        {stage === SECTIONS.VIDEO && (
          <motion.div
            key="video-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 lg:p-20"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative w-full max-w-6xl glass-card border-none overflow-hidden rounded-[30px] lg:rounded-[50px] shadow-[0_0_120px_rgba(0,0,0,0.5)] bg-black "
            >
              <video
                src={video}
                className="w-full h-full object-cover"
                autoPlay
                loop
                controls
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setStage(SECTIONS.ENVELOPE);
                }}
                className="absolute top-4 right-4 lg:top-8 lg:right-8 px-4 py-2 lg:px-6 lg:py-3 glass-card bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all text-sm lg:text-base"
              >
                Đóng
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
