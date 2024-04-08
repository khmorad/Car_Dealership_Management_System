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
        "https://images.dealer.com/ddc/vehicles/2024/Honda/CR-V/SUV/trim_EXL_722c6b/color/Platinum%20White%20Pearl-WX-235%2C234%2C231-640-en_US.jpg",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  return (
    <div className="infoContainer">
      {carInfo.map((car, index) => (
        <div className="infoCard" key={index}>
          <div className="cargallery">
            <img src={car.thumbnail} alt="Thumbnail" />
          </div>
          <div className="carInfo">bruh</div>
        </div>
      ))}
    </div>
  );
}
