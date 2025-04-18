'use client';

import { useEffect, useState } from 'react';

export default function Slideshow({ title, albums }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % albums.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [albums.length]);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-md font-semibold mb-4">{title}</h3>

      <div className="relative w-full h-[300px] overflow-hidden flex items-center justify-center">
        {albums.map((album, index) => (
          <img
            key={index}
            src={album.image}
            alt={`Album ${index}`}
            className={`w-full h-[300px] object-contain rounded-xl transition-opacity duration-1000 ease-in-out ${
              current === index ? 'opacity-100' : 'opacity-0 absolute inset-0'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
