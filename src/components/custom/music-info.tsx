"use client";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { ArrowDown, Pause } from "lucide-react";
import { Progress } from "../ui/progress";
import { useState, useEffect } from "react";
interface NowPlayingData {
  isPlaying: boolean | null;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  songUrl?: string;
  progress?: number;
  duration?: number;
}
interface MusicInfoProps {
  nowPlaying: NowPlayingData | null;
  isExpand: boolean;
  setExpand: (value: boolean) => void;
  onSongEnd?: () => void;
}

export default function MusicInfo({
  nowPlaying,
  isExpand,
  setExpand,
  onSongEnd,
}: MusicInfoProps) {
  const t = useTranslations();
  const [currentProgress, setCurrentProgress] = useState(
    nowPlaying?.progress || 0
  );

  useEffect(() => {
    if (nowPlaying?.progress !== undefined) {
      setCurrentProgress(nowPlaying.progress);
    }
  }, [nowPlaying?.progress]);

  // increment progress
  useEffect(() => {
    if (!nowPlaying?.isPlaying || nowPlaying.duration === undefined) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        const next = prev + 1000;
        // check if song ended
        if (next >= nowPlaying.duration!) {
          // timeout for error fix
          setTimeout(() => {
            if (onSongEnd) {
              onSongEnd();
            }
          }, 0);
          return nowPlaying.duration!;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [nowPlaying?.isPlaying, nowPlaying?.duration, onSongEnd]);

  if (nowPlaying === null) {
    return (
      <div className="py-3 space-y-3 mx-3">
        <div className="">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground mb-2 text-nowrap"></p>
            <div className="h-4 w-24 bg-neutral-200 dark:bg-muted-foreground/30 animate-pulse rounded-md" />
          </div>
          <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="size-12 bg-neutral-200 dark:bg-muted-foreground/30 animate-pulse text-muted-foreground rounded-sm" />
            <div className="flex-1 min-w-0">
              <div className="h-4 w-[200px] mb-1 bg-neutral-200 dark:bg-muted-foreground/30 animate-pulse rounded-md text-muted-foreground" />
              <div className="h-4 w-[80px] bg-neutral-200 dark:bg-muted-foreground/30 animate-pulse rounded-md text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="py-3 space-y-3 mx-3">
      {nowPlaying.isPlaying === null ? (
        <div className="">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground mb-2 text-nowrap"></p>
            <Button
              className="h-4 hover:opacity-80 translate-x-2"
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
      ) : nowPlaying.isPlaying === true ? (
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground mb-2 text-nowrap">
              {t("HomePage.music.currently_playing")}
            </p>
            <Button
              className="h-4 hover:opacity-80 translate-x-2"
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
            className="w-full flex flex-col gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-3">
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
            </div>
            {nowPlaying.duration !== undefined && (
              <div className="space-y-1">
                <Progress
                  value={(currentProgress / nowPlaying.duration) * 100}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="tabular-nums">
                    {formatTime(currentProgress)}
                  </span>
                  <span className="tabular-nums">
                    {formatTime(nowPlaying.duration)}
                  </span>
                </div>
              </div>
            )}
          </a>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground mb-2 text-nowrap">
              {t("HomePage.music.currently_playing")}
            </p>
            <Button
              className="h-4 hover:opacity-80 translate-x-2"
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
            className="w-full flex flex-col gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-3">
              {nowPlaying.albumArt && (
                <img
                  src={nowPlaying.albumArt}
                  alt={nowPlaying.album}
                  className="h-12 w-12 rounded shadow-md"
                />
              )}
              <div className="flex w-full items-center">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {nowPlaying.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {nowPlaying.artist}
                  </p>
                </div>
                <Pause className="fill-primary stroke-primary mt-2 opacity-50" />
              </div>
            </div>
            {nowPlaying.duration !== undefined && (
              <div className="space-y-1">
                <Progress
                  value={(currentProgress / nowPlaying.duration) * 100}
                  className="opacity-50"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatTime(currentProgress)}</span>
                  <span>{formatTime(nowPlaying.duration)}</span>
                </div>
              </div>
            )}
          </a>
        </div>
      )}
    </div>
  );
}
