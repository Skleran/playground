// app/api/recently-played/route.ts
import { NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

const getAccessToken = async () => {
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

  const data = await response.json();

  const tracks = data.items.map((item: any) => ({
    title: item.track.name,
    artist: item.track.artists.map((artist: any) => artist.name).join(", "),
    album: item.track.album.name,
    albumArt: item.track.album.images[0]?.url,
    songUrl: item.track.external_urls.spotify,
    playedAt: item.played_at,
  }));

  return NextResponse.json({ tracks });
}
