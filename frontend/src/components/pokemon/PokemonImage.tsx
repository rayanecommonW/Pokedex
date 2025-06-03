import React from 'react';
import type { PokemonSpriteDetails } from '../../models/pokemon.models'; // Adjust path if needed
 // Adjust path if needed

interface PokemonImageProps {
  sprites: PokemonSpriteDetails;
  altName: string;
  className?: string;
}

const PokemonImage: React.FC<PokemonImageProps> = ({ sprites, altName, className }) => {
  // Prioritize official artwork, then home, then dream_world, then default front sprite
  const imageUrl =
    sprites.other?.['official-artwork']?.front_default ||
    sprites.other?.home?.front_default ||
    sprites.other?.dream_world?.front_default ||
    sprites.front_default;

  const placeholderText = encodeURIComponent(altName.substring(0,10));
  const placeholderUrl = `https://placehold.co/150x150/EEE/333?text=${placeholderText}`;

  return (
    <img
      src={imageUrl || placeholderUrl}
      alt={`Image of ${altName}`}
      className={className || "w-[150px] h-auto block mx-auto my-3"}
      onError={(e) => {
        // If the primary image fails to load, try the basic front_default as a last resort
        if (imageUrl !== sprites.front_default && sprites.front_default) {
            (e.target as HTMLImageElement).src = sprites.front_default;
        } else {
            // If all else fails, use the placeholder
            (e.target as HTMLImageElement).src = placeholderUrl;
        }
      }}
    />
  );
};

export default PokemonImage;