"use client";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { ArrowDown } from "lucide-react";

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  songUrl?: string;
}
interface MusicInfoProps {
  nowPlaying: NowPlayingData | null;
  isExpand: boolean;
  setExpand: (value: boolean) => void;
}

export default function MusicInfo({
  nowPlaying,
  isExpand,
  setExpand,
}: MusicInfoProps) {
  const t = useTranslations();

  if (nowPlaying === null) {
    return (
      <div className="pt-3 space-y-2">
        <div className="flex items-center gap-3 hvoer:opacity-80 transition-opacity">
          <div className="size-12"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-3 space0-y-3 mx-3">
      {nowPlaying.isPlaying ? (
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground mb-2 text-nowrap">
              {t("HomePage.music.currently_playing")}
            </p>
            <Button
              className="h-4 hover:opacity-80"
              variant={"none"}
              size={"sm"}
              onClick={() => setExpand(!isExpand)}
            >
              <p>
                {isExpand
                  ? t("HomePage.music.collapse")
                  : t("HomePage.music.expand")}
              </p>
              <ArrowDown
                className={`transition-transform ease-out ${
                  isExpand ? "rotate-180" : "rotate-0"
                }`}
              />
            </Button>
          </div>
          <a
            href={nowPlaying.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            {nowPlaying.albumArt && (
              <img
                src={nowPlaying.albumArt}
                alt={nowPlaying.album}
                className="h-12 w-12 rounded shadow-md"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">
                {nowPlaying.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {nowPlaying.artist}
              </p>
            </div>
          </a>
        </div>
      ) : (
        <div className="">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground mb-2 text-nowrap"></p>
            <Button
              className="h-4 hover:opacity-80"
              variant={"none"}
              size={"sm"}
              onClick={() => setExpand(!isExpand)}
            >
              <p>
                {isExpand
                  ? t("HomePage.music.collapse")
                  : t("HomePage.music.expand")}
              </p>
              <ArrowDown
                className={`transition-transform ease-out ${
                  isExpand ? "rotate-180" : "rotate-0"
                }`}
              />
            </Button>
          </div>
          <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="size-12 bg-muted-foreground/20 rounded-sm" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate text-muted-foreground">
                {t("HomePage.music.not_listening")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("HomePage.music.sad")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
