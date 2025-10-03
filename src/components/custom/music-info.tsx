"use client";

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
}

export default function MusicInfo({ nowPlaying }: MusicInfoProps) {
  // loading state if needed
  if (nowPlaying === null) {
    return (
      <div className="mt-3 flex items-center gap-2">
        <div className="animate-pulse h-12 w-12 rounded" />
        <div className="flex-1">
          <div className="animate-pulse h-4 rounded w-3/4 mb-2" />
          <div className="animate-pulse h-3 rounded w-1/2" />
        </div>
      </div>
    );
  }

  // not playing state
  // TO-DO add prev played tracks
  if (!nowPlaying.isPlaying) {
    return (
      <p className="scroll-m-20 mt-2 text-lg text-muted-foreground">
        Not listening to anything right now
      </p>
    );
  }

  // now playing
  return (
    <div className="p-3 rounded-xl">
      <p className="text-sm text-muted-foreground">currently listening</p>
      <a
        href={nowPlaying.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        {nowPlaying.albumArt && (
          <img
            src={nowPlaying.albumArt}
            alt={nowPlaying.album}
            className="h-12 w-12 rounded shadow-md"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-base truncate">{nowPlaying.title}</p>
          <p className="text-sm text-muted-foreground truncate">
            {nowPlaying.artist}
          </p>
        </div>
      </a>
    </div>
  );
}
