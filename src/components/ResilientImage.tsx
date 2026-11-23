import { useState } from 'react';
import { Dumbbell } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  priority?: boolean;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'HANDSTAND Gym & Power Fitness™',
  priority = false,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#151515] via-[#0d0d0d] to-[#080808] p-6 text-center border border-white/10 ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center border border-[#C6FF00]/30 bg-[#080808]">
          <Dumbbell className="h-5 w-5 text-[#C6FF00]" aria-hidden="true" />
        </div>
        <p className="font-display text-lg font-bold tracking-wider text-white uppercase">
          {fallbackTitle}
        </p>
        <p className="mt-1 text-xs text-[#999999]">Illustrative Concept Placeholder</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
      className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  );
}
