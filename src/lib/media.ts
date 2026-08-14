/**
 * Reliable public photo URLs for hero / banners / category chips.
 * Prefer direct Unsplash + Cloudinary upload URLs — never bare Cloudinary `fetch/` without a source.
 */
const u = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const cld = (path: string, w = 1200) =>
  `https://res.cloudinary.com/pg8uhzw0/image/upload/f_auto,q_auto,c_fill,g_auto,w_${w}/${path}`;

export const photos = {
  himachal: u('photo-1626621341517-bbf3d9990a23', 1400, 900),
  uttarakhand: u('photo-1506905925346-21bda4d32df4', 1400, 900),
  yatra: u('photo-1564507592333-c60657eea523', 1400, 900),
  kedarnath: u('photo-1548013146-72479768bada', 800, 800),
  ebc: u('photo-1518002054494-3a6f94352e9d', 1400, 900),
  nepal: u('photo-1544735716-392fe2489ffa', 1400, 900),
  chopta: u('photo-1464822759023-fed622ff2c3b', 800, 800),
  hampta: u('photo-1486870591958-9b9d0d1dda99', 1400, 900),
  triund: u('photo-1454496522488-7a8e488e8606', 800, 800),
  snow: u('photo-1483728642387-6c3bdd6c93e5', 1400, 900),
  vof: cld('v1785367489/pexels-unaizat97-8673607_anl07u.jpg'),
  kedarkantha: cld('v1785399843/pexels-sanket-barik-2808574-7846473_efonvw.jpg'),
} as const;

export type PhotoKey = keyof typeof photos;
