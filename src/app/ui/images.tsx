"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type Images = {
  id: string;
  alt: string;
};

export function ImagePath(image: Images) {
  return (
    <Image
      src={`/images/${image.id}.png`}
      alt={image.alt}
      width="90"
      height="90"
    />
  );
}

export default function QasLogo() {
  return <ImagePath id="qaslogo" alt="QAS LOGO" />;
}

//404 Not Found GIF
export function NotFoundGif() {
  const [gifSrc, setGifSrc] = useState<string | null>(null);

  useEffect(() => {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    console.log("Is the user in Dark Mode? " + isDarkMode);
    setGifSrc(isDarkMode ? "/gifs/notfounddark.gif" : "/gifs/notfound.gif");
  }, []);

  return (
    <Image
      unoptimized={true}
      src={gifSrc || "/gifs/ZKZg.gif"}
      id="404gif"
      alt=""
      width={500}
      height={500}
    />
  );
}
