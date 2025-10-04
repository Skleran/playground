"use client";

import { useTranslations } from "next-intl";

export interface Track {
  title: string;
  artist: string;
  album: string;
  albumArt?: string;
  songUrl: string;
  playedAt: string;
}

interface RecentlyPlayedProps {
  recentTracks: Track[] | null;
}

export default function RecentlyPlayedInfo({
  recentTracks,
}: RecentlyPlayedProps) {
  const t = useTranslations();

  if (recentTracks === null) {
    return (
      <div className="mt-3 space-y-2">
        <div className="animate-pulse h-12 w-full bg-muted rounded" />
        <div className="animate-pulse h-12 w-full bg-muted rounded" />
      </div>
    );
  }

  return (
    <div className="pt-3 space-y-3 mx-3">
      {recentTracks.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground mb-2">
            {t("HomePage.music.recently_played")}
          </p>
          <div className="space-y-3 h-auto">
            {recentTracks.map((track, index) => (
              <a
                key={`${track.songUrl}-${index}`}
                href={track.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                {track.albumArt && (
                  <img
                    src={track.albumArt}
                    alt={track.album}
                    className="size-12 rounded shadow-md"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {track.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {track.artist}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
