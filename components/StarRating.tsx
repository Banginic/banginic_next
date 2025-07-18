import React from "react";
import { star } from "@/assets/photos";
import Image from "next/image";

interface StarRatingProps {
  rating: number; // Expected range: 1 to 5
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Image
      key={index}
      src={star}
      width={35}
      height={35}
      alt="./placeholder.png"
      className={`w-5 h-5 inline-block ${index < rating ? "opacity-100" : "opacity-20"}`}
    />
  ));

  return <div className="flex space-x-1">{stars}</div>;
};

export default StarRating;
