import React, { useState } from "react";
import "../stylings/Ladysuzan.css";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];
export default function Ladysuzan() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleClickPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <div className="gallery">
        <button className="nav-button" onClick={handleClickPrev}>
          {"<"}
        </button>
        <div className="gallery-item">
          <img
            src={images[currentIndex].original}
            alt={`Image ${currentIndex}`}
          />
        </div>
        <button className="nav-button" onClick={handleClickNext}>
          {">"}
        </button>
      </div>
    </div>
  );
}
