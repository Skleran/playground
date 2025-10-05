import { useState, useEffect, useCallback } from "react";

export interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  songUrl?: string;
  progress?: number;
  duration?: number;
}

export interface Track {
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  songUrl: string;
  playedAt: string;
}

export function useSpotify(enabled: boolean) {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);
  const [recentTracks, setRecentTracks] = useState<Track[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSpotifyData = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    try {
      const [nowPlayingRes, recentRes] = await Promise.all([
        fetch("/api/now-playing"),
        fetch("/api/recently-played?limit=5"),
      ]);

      const nowPlayingData = await nowPlayingRes.json();
      const recentData = await recentRes.json();

      setNowPlaying(nowPlayingData);
      setRecentTracks(recentData.tracks || []);
    } catch (error) {
      console.error("Failed to fetch Spotify data:", error);
      setNowPlaying({ isPlaying: false });
      setRecentTracks([]);
    } finally {
      setIsLoading(false);
    }
  }, [enabled]);

  // initial fetch and periodic refetch
  useEffect(() => {
    if (!enabled) return;

    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 30000);

    return () => clearInterval(interval);
  }, [enabled, fetchSpotifyData]);

  return {
    nowPlaying,
    recentTracks,
    isLoading,
    refetch: fetchSpotifyData,
  };
}
