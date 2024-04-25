import React, { useState } from "react";
import "../stylings/Ladysuzan.css";
import { TypeAnimation } from 'react-type-animation';
const images = [
  {
    original: "https://cdn.motor1.com/images/mgl/lAOqE/s3/2019-bmw-x5-xdrive45e.webp",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://fotos-jornaldocarro-estadao.nyc3.cdn.digitaloceanspaces.com/wp-content/uploads/2020/11/20161855/20201119_bcb95a3434e245a795f80bafe88aca94_2-gle-400-d-coupe-1-1-1160x668.jpg",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://cache.bmwusa.com/cosy.arox?pov=walkaround&brand=WBBM&vehicle=248F&client=byoc&paint=P0300&fabric=FLKSW&sa=S01MA,S01TH,S0302,S0319,S0322,S03MF,S0453,S04GQ,S04HB,S04MC,S05AC,S05AZ,S06AC,S06AK,S06C4,S06NW,S06U3,S06WD,S0712,S0760,S0776,S07M9,S07MA&date=20240228&angle=30",
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
      <div className="Typing-animation" style={{ textAlign: 'center', fontWeight: 'bold' }}>
      <TypeAnimation
      style={{ whiteSpace: 'pre-line', height: '140px', display: 'block', fontSize: '2rem' }}
      sequence={[
        `Explore our vast selection \n of \n quality vehicles.`,
        2000, 
        `Discover reliable cars \n at \n unbeatable prices.`,
        2000, 
        `Drive away in your dream car \n today!!!`,
        2000, 
        '',
      ]}
      speed={{ type: 'keyStrokeDelayInMs', value: 39 }}
      repeat={Infinity}
    />
</div>
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
