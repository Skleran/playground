"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "motion/react";

type Game = {
  title: string;
  description: string;
  longDescription: string;
  image: string;
};

export default function GameStoreInteraction() {
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveGame(null);
    }
    window.addEventListener("keydown", onKeyDown);

    function onClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setActiveGame(null);
      }
    }
    if (activeGame) {
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [activeGame]);

  return (
    <>
      <AnimatePresence>
        {activeGame ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed px-6 inset-0 z-50 flex items-center justify-center bg-accent/50 dark:bg-black/40"
          >
            <motion.div
              layoutId={`game-${activeGame.title}`}
              className="flex flex-col gap-4 bg-primary-foreground dark:bg-accent border rounded-xl p-4 max-w-130 relative"
              ref={ref}
            >
              <div className="flex gap-4">
                <motion.img
                  layoutId={`img-${activeGame.title}`}
                  src={activeGame.image}
                  alt={activeGame.title}
                  width={56}
                  height={56}
                  className="rounded-xl"
                />
                <div className="w-full flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <motion.h2
                      layoutId={`header-${activeGame.title}`}
                      className="font-semibold"
                    >
                      {activeGame.title}
                    </motion.h2>
                    <motion.p
                      layoutId={`desc-${activeGame.title}`}
                      className="text-sm text-muted-foreground"
                    >
                      {activeGame.description}
                    </motion.p>
                  </div>
                  <motion.span layoutId={`btn-${activeGame.title}`}>
                    {" "}
                    <Button
                      onClick={() => setActiveGame(null)}
                      variant={"ghost"}
                      size={"sm"}
                      className="rounded-full bg-sky-100/50 hover:bg-sky-100 dark:bg-sky-400/10 hover:dark:bg-sky-400/20 text-sky-600 hover:text-sky-600 dark:text-sky-500 dark:hover:text-sky-400"
                    >
                      Get
                    </Button>
                  </motion.span>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                // layoutId={`longDesc-${activeGame.title}`}
                className="text-sm text-muted-foreground"
              >
                {activeGame.longDescription}
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <ul className="flex flex-col w-full max-w-100 divide-y divide-muted-foreground/10 dark:divide-accent">
        {GAMES.map((game) => (
          <motion.li
            layoutId={`game-${game.title}`}
            key={game.title}
            onClick={() => setActiveGame(game)}
            className="flex gap-4 py-2 hover:cursor-pointer"
          >
            <motion.img
              layoutId={`img-${game.title}`}
              src={game.image}
              alt={game.title}
              width={56}
              height={56}
              className="rounded-xl"
            />
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <motion.h2
                  layoutId={`header-${game.title}`}
                  className="font-semibold"
                >
                  {game.title}
                </motion.h2>
                <motion.p
                  layoutId={`desc-${game.title}`}
                  className="text-sm text-muted-foreground"
                >
                  {game.description}
                </motion.p>
              </div>
              <motion.span layoutId={`btn-${game.title}`}>
                {" "}
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="rounded-full bg-sky-100/50 hover:bg-sky-100 dark:bg-sky-400/10 hover:dark:bg-sky-400/20 text-sky-600 hover:text-sky-600 dark:text-sky-500 dark:hover:text-sky-400"
                >
                  Get
                </Button>
              </motion.span>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}

const GAMES = [
  {
    title: "Cryo Chamber",
    description: "Survive in a frozen world.",
    longDescription:
      "Awaken from stasis and navigate a hostile, icy environment. Manage resources and uncover secrets buried beneath the ice.",
    image: "/images/game-icons/cryo-chamber.svg",
  },
  {
    title: "Orbit",
    description: "Master the cosmos.",
    longDescription:
      "Pilot your spacecraft through treacherous orbits, avoid asteroids, and discover new planets in this space exploration adventure.",
    image: "/images/game-icons/orbit.svg",
  },
  {
    title: "Robot Golem",
    description: "Build and battle robots.",
    longDescription:
      "Assemble powerful golems from scrap, upgrade their abilities, and challenge rivals in a futuristic arena.",
    image: "/images/game-icons/robot-golem.svg",
  },
  {
    title: "Shambling Zombie",
    description: "Escape the undead.",
    longDescription:
      "Navigate a post-apocalyptic city, outsmart hordes of zombies, and find safe haven before time runs out.",
    image: "/images/game-icons/shambling-zombie.svg",
  },
  {
    title: "Ship Wheel",
    description: "Command your own vessel.",
    longDescription:
      "Set sail across dangerous seas, trade goods, battle pirates, and become a legendary captain.",
    image: "/images/game-icons/ship-wheel.svg",
  },
];
