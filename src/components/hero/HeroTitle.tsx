import React from 'react';

interface HeroTitleProps {
  main: string;
  highlight: string;
}

export function HeroTitle({ main, highlight }: HeroTitleProps) {
  return (
    <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
      <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
        {main}
      </span>
      <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-200 to-primary-100">
        {highlight}
      </span>
    </h1>
  );
}