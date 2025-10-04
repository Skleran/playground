import { NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface SpotifyArtist {
  name: string;
}

interface SpotifyAlbum {
  name: string;
  images: { url: string }[];
}

interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  external_urls: {
    spotify: string;
  };
}

interface SpotifyRecentlyPlayedItem {
  track: SpotifyTrack;
  played_at: string;
}

interface SpotifyRecentlyPlayedResponse {
  items: SpotifyRecentlyPlayedItem[];
}

const getAccessToken = async (): Promise<SpotifyTokenResponse> => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

const getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken();

  return fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=5`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export async function GET() {
  const response = await getRecentlyPlayed();

  if (response.status > 400) {
    return NextResponse.json(
      { error: "Failed to fetch" },
      { status: response.status }
    );
  }

  const data: SpotifyRecentlyPlayedResponse = await response.json();

  const tracks = data.items.map((item) => ({
    title: item.track.name,
    artist: item.track.artists.map((artist) => artist.name).join(", "),
    album: item.track.album.name,
    albumArt: item.track.album.images[0]?.url,
    songUrl: item.track.external_urls.spotify,
    playedAt: item.played_at,
  }));

  return NextResponse.json({ tracks });
}
