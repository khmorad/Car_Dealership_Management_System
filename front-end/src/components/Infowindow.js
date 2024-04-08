import React from "react";
import "../stylings/Infowindow.css";
export default function Infowindow() {
  const carInfo = [
    {
      picture:
        "https://cdn.motor1.com/images/mgl/lAOqE/s3/2019-bmw-x5-xdrive45e.webp",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      picture:
        "https://fotos-jornaldocarro-estadao.nyc3.cdn.digitaloceanspaces.com/wp-content/uploads/2020/11/20161855/20201119_bcb95a3434e245a795f80bafe88aca94_2-gle-400-d-coupe-1-1-1160x668.jpg",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      picture:
        "https://cache.bmwusa.com/cosy.arox?pov=walkaround&brand=WBBM&vehicle=248F&client=byoc&paint=P0300&fabric=FLKSW&sa=S01MA,S01TH,S0302,S0319,S0322,S03MF,S0453,S04GQ,S04HB,S04MC,S05AC,S05AZ,S06AC,S06AK,S06C4,S06NW,S06U3,S06WD,S0712,S0760,S0776,S07M9,S07MA&date=20240228&angle=30",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  return (
    <div className="infoContainer">
      {carInfo.map((car, index) => (
        <div className="infoCard" key={index}>
          <div className="cargallery">
            <img src={car.picture} alt="Picture" />
          </div>
          <div className="carInfo">bruh</div>
        </div>
      ))}
    </div>
  );
}