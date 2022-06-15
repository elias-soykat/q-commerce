import { createRef, useState } from "react";

export default function Carousel({ images }) {
  const [currentImage, setCurrentImage] = useState(0);

  const refs = images.reduce(
    (acc, val, i) => ({ ...acc, [i]: createRef() }),
    {}
  );

  const scrollToImage = (i) => {
    setCurrentImage(i);

    refs[i].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const totalImages = images.length;

  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };

  const arrowStyle =
    "absolute text-white z-10 bg-black h-9 w-9 opacity-80 flex items-center justify-center";

  const sliderControl = (isLeft) => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? "left-2" : "right-2"}`}
      style={{ top: "40%" }}
    >
      <span role="img" aria-label={`Arrow ${isLeft ? "left" : "right"}`}>
        {isLeft ? "◀" : "▶"}
      </span>
    </button>
  );

  return (
    <div className="relative w-full">
      <div className="carousel">
        {sliderControl(true)}
        {images.map((img, i) => (
          <div className="w-full flex-shrink-0" key={img._id} ref={refs[i]}>
            <img
              src={img.url}
              className="w-full object-contain"
              alt="carousel"
            />
          </div>
        ))}
        {sliderControl()}
      </div>
    </div>
  );
}
