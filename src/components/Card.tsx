import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import colored from "../assets/images/image2.svg";

interface CardProps {
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
  reverse?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
}) => {
  // const [currentImage, setCurrentImage] = useState<string | StaticImageData>(imageSrc);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [grayFilter, setGrayFilter] = useState<string>("grayscale");

  useEffect(() => {
    const preloadImage = new window.Image();
    preloadImage.src = colored;

    const handleScroll = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (isFullyVisible) {
          // setCurrentImage(colored);
          setGrayFilter("grayscale-0");
        } else {
          // setCurrentImage(blackandwhite);
          setGrayFilter("grayscale");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${grayFilter} flex lg:flex-row flex-col items-center mt-40 relative z-10 flex-wrap ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      <Image
        src={colored}
        alt={imageAlt}
        width={500}
        height={500}
        className="grayscale-0 lg:h-64 lg:w-96 mx-auto lg:ml-10 h-36 w-52 mt-10 lg:mt-0 lg:mr-32 transition-opacity duration-500"
      />
      <div className="lg:w-96 lg:ml-10">
        <div className="text-white border lg:w-64 flex justify-center mx-auto lg:mx-0">
          <h1 className="lg:text-xl text-sm">{title}</h1>
        </div>
        <p className="text-white mt-1 lg:w-96 lg:ml-0 mx-auto text-xs lg:text-lg text-center lg:text-left">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
