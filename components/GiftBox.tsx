"use client";

import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Play } from "lucide-react";

const SECTIONS = {
  INTRO: "intro",
  ENVELOPE: "envelope",
  GIFT: "gift",
  VIDEO: "video",
};

interface GiftBoxProps {
  giftOpened: boolean;
  setGiftOpened: (opened: boolean) => void;
  setStage: (stage: string) => void;
}

const GiftBox = memo(
  ({ giftOpened, setGiftOpened, setStage }: GiftBoxProps) => {
    return (
      <motion.div
        className={`relative flex h-[250px] w-[250px] cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 to-orange-500 shadow-2xl transition-all duration-300 lg:h-[300px] lg:w-[300px] ${giftOpened ? "scale-75 opacity-0" : ""}`}
        onClick={() => setGiftOpened(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Gift className="h-32 w-32 text-white" />
        <div
          className={`absolute inset-0 flex items-center justify-center text-center text-white transition-opacity duration-300 ${giftOpened ? "opacity-0" : "opacity-100"}`}
        >
          <p className="text-2xl font-bold">Nhấn để mở quà!</p>
        </div>

        <div className="absolute inset-0">
          <AnimatePresence>
            {giftOpened && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 150 }} // Giảm delay và tăng stiffness
                className="absolute inset-0 flex items-center justify-center -top-20"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setStage(SECTIONS.VIDEO)}
                  className="w-48 h-48 rounded-full bg-white/10 border border-white/20 flex flex-col items-center justify-center gap-4 text-white hover:bg-white/20 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]"
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
    );
  },
);

GiftBox.displayName = "GiftBox";

export default GiftBox;
