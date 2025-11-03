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
    avatarSrc:
      "/images/art-showcase/artists/Vincent_van_Gogh,_Self-portrait,_1887_(Google_Arts_&_Culture).avif",
    imageSrc:
      "/images/art-showcase/paintings/Van_Gogh_-_Starry_Night_-_Google_Art_Project.avif",
  },
  {
    id: 2,
    painterName: "Michelangelo",
    avatarSrc:
      "/images/art-showcase/artists/Michelangelo_Daniele_da_Volterra_(dettaglio).avif",
    imageSrc:
      "/images/art-showcase/paintings/Michelangelo_Buonarroti_-_The_Torment_of_Saint_Anthony_-_Google_Art_Project.avif",
  },

  {
    id: 3,
    painterName: "Leonardo da Vinci",
    avatarSrc: "/images/art-showcase/artists/leonardo-da-vinci-portrait.avif",
    imageSrc:
      "/images/art-showcase/paintings/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.avif",
  },
  {
    id: 4,
    painterName: "Claude Monet",
    avatarSrc: "/images/art-showcase/artists/Autoportret_Claude_Monet.avif",
    imageSrc: "/images/art-showcase/paintings/Claude_Monet_023.avif",
  },
];
