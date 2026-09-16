"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { AvatarFallback } from "./avatar/AvatarFallback";

const Avatar3D = dynamic(() => import("./avatar/Avatar3D"), {
  ssr: false,
  loading: () => <AvatarFallback />,
});

export default function HeroAvatar({
  isFirstVisit,
  reduced,
}: {
  isFirstVisit: boolean;
  reduced: boolean;
}) {
  const showBubble = isFirstVisit && !reduced;

  return (
    <div className="relative h-72 w-64 sm:h-[24rem] sm:w-80 lg:h-[27rem] lg:w-[22rem]">
      {showBubble && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [8, 0, 0, -4],
            scale: [0.9, 1, 1, 1],
          }}
          transition={{ duration: 2.4, times: [0, 0.16, 0.72, 1], delay: 0.7 }}
          className="absolute right-0 top-6 z-10 rounded-2xl rounded-br-sm border border-border bg-surface px-4 py-2 text-base font-medium text-foreground shadow-lg sm:text-lg"
        >
          Hi! 👋
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="h-full w-full"
      >
        {reduced ? (
          <AvatarFallback />
        ) : (
          <Avatar3D introWave={isFirstVisit ? 3.4 : 1.8} />
        )}
      </motion.div>
    </div>
  );
}
