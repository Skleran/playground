export type Art = {
  id: number;
  painterName: string;
  avatarSrc: string;
  imageSrc: string;
};

export const artworksData: Art[] = [
  {
    id: 1,
    painterName: "Vincent van Gogh",
    avatarSrc: "/images/folder-interaction-images/Mistnova_square.avif",
    imageSrc: "/images/folder-interaction-images/Mistnova_square.avif",
  },
  {
    id: 2,
    painterName: "Claude Monet",
    avatarSrc: "/images/folder-interaction-images/Celestials_square.avif",
    imageSrc: "/images/folder-interaction-images/Celestials_square.avif",
  },
  {
    id: 3,
    painterName: "Leonardo da Vinci",
    avatarSrc: "/images/folder-interaction-images/BlueRays_square.avif",
    imageSrc: "/images/folder-interaction-images/BlueRays_square.avif",
  },
  {
    id: 4,
    painterName: "Salvador Dalí",
    avatarSrc: "/images/folder-interaction-images/SwiftGlow_square.avif",
    imageSrc: "/images/folder-interaction-images/SwiftGlow_square.avif",
  },
];
