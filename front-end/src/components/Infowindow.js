import React, { useEffect, useState, useRef } from "react";
import "../stylings/Infowindow.css";
/*
Type: BodyClass
Seats No.: Seats
FuelType: FuelTypePrimary (Secondary)
Model: Model
Brand: Make
YearOfManufacturing: ModelYear
-Add: Trim, EngineCylinder, EngineHP
Car attributes from VIN Decoder
Add SoldStatus
*/
export default function Infowindow() {

  const carFilter = useRef(null)
  const suvCheckBox = useRef(null)
  const truckCheckBox = useRef(null)
  const hybridCheckBox = useRef(null)
  const coupeCheckBox = useRef(null)
  const convertableCheckbox = useRef(null)
  const sedanCheckbox = useRef(null)

  const [filteredCars, setFilteredCars] = useState([]);
  const [carInfo, serCarInfo] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/cars/all') // Assuming Flask server is running on http://127.0.0.1:5000/
      .then(response => response.json())
      .then(data => {
        serCarInfo(data, console.log(carInfo));
      })
      .catch(error => console.error('Error fetching employees:', error));
  }, []);
  const carssInfo = [
    {
      VIN: 'ABC123XYZ456789',
      Brand: 'Toyota',
      Model: 'RAV4',
      Gas_type: 'Gasoline',
      Mileage: 80000,
      Year_of_manufacturing: 2017,
      Trim: "LE",
      Type: "SUV",
      Exterior_color: "silver",
      Drivetrain: "AWD",
      Interior_color: "black",
      Seats_no: 5,
      Price: 25000,
      picture: "https://www.earnhardttoyota.com/blogs/4308/wp-content/uploads/2020/07/2021-Toyota-RAV4-Prime-side-view-Super-White_o.jpg",
    },
    {
      VIN: 'DEF456UVW123456',
      Brand: 'Honda',
      Model: 'Civic',
      Gas_type: 'Gasoline',
      Mileage: 60000,
      Year_of_manufacturing: 2018,
      Trim: "EX",
      Type: "Sedan",
      Exterior_color: "white",
      Drivetrain: "FWD",
      Interior_color: "gray",
      Seats_no: 5,
      Price: 18000,
      picture: "https://www.dealerfireblog.com/earnhardthonda/wp-content/uploads/sites/1207/2020/10/2021-Honda-Civic-Hatchback-Platinum-White-Pearl_o-1024x576.jpg",
    },
    {
      VIN: 'GHI789MNO234567',
      Brand: 'Ford',
      Model: 'F-150',
      Gas_type: 'Gasoline',
      Mileage: 50000,
      Year_of_manufacturing: 2016,
      Trim: "XLT",
      Type: "Truck",
      Exterior_color: "black",
      Drivetrain: "4x4",
      Interior_color: "tan",
      Seats_no: 5,
      Price: 30000,
      picture: "https://di-uploads-pod41.dealerinspire.com/depaulaford/uploads/2022/03/2022-Ford-F-150-XLT-White-1.jpg",
    },
    {
      VIN: 'JKL012PQR345678',
      Brand: 'Chevrolet',
      Model: 'Malibu',
      Gas_type: 'Gasoline',
      Mileage: 70000,
      Year_of_manufacturing: 2019,
      Trim: "LT",
      Type: "Sedan",
      Exterior_color: "blue",
      Drivetrain: "FWD",
      Interior_color: "black",
      Seats_no: 5,
      Price: 20000,
      picture: "https://img2.carmax.com/assets/mmy-chevrolet-malibu-2013/image/1.jpg?width=800&height=600",
    },
    {
      VIN: 'MNO345STU678901',
      Brand: 'Jeep',
      Model: 'Wrangler',
      Gas_type: 'Gasoline',
      Mileage: 40000,
      Year_of_manufacturing: 2020,
      Trim: "Sport",
      Type: "SUV",
      Exterior_color: "green",
      Drivetrain: "4x4",
      Interior_color: "black",
      Seats_no: 4,
      Price: 35000,
      picture: "data:image/jpeg;base64,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",
    }
  ];
  const [showElement, setShowElement] = useState(true)
  useEffect(()=>{
    setFilteredCars(carInfo)
    const handleResize = ()=>{
      if(window.innerWidth < 800){
        setShowElement(false)
      }
      else{
        setShowElement(true)
      }
    }
    window.addEventListener('resize', handleResize)

  }, [])


  const handleFilter = ()=>{
    const searchedCar = carFilter.current.value.toLowerCase()
    if (searchedCar === ""){
      setFilteredCars(carInfo)
    }
    else{
      const filterValue = carInfo.filter(cars =>cars.Brand.toLowerCase().includes(searchedCar) )
      setFilteredCars(filterValue)

    }

  }

  const handleCheckFilter = ()=>{
    let filteredCar = [...carInfo]
    if (truckCheckBox.current && truckCheckBox.current.checked) {
      filteredCar = filteredCar.filter(car => car.Type.toLowerCase() === 'truck');
    }
    if (sedanCheckbox.current && sedanCheckbox.current.checked) {
      filteredCar = filteredCar.filter(car => car.Type.toLowerCase() === 'sedan');
    }
    if (hybridCheckBox.current && hybridCheckBox.current.checked) {
      filteredCar = filteredCar.filter(car => car.Type.toLowerCase() === 'hybrid');
    }
    if (suvCheckBox.current && suvCheckBox.current.checked) {
      filteredCar = filteredCar.filter(car => car.Type.toLowerCase() === 'suv');
    }
    if (coupeCheckBox.current && coupeCheckBox.current.checked) {
      filteredCar = filteredCar.filter(car => car.Type.toLowerCase() === 'coupe');
    }


    setFilteredCars(filteredCar)
  }
  //show full page of a car
  return (
    <div className="container">
      
    {showElement &&
    <div className="filterContainer">
    <div className="insideContainer">
    <input placeholder="fliter results..." ref={carFilter} className="filterSearch" onChange={handleFilter}></input>
  <ul>
          
          <li><input type="checkbox" ref={suvCheckBox} className="filter" value="suv" onChange={handleCheckFilter}></input>Suv</li>
          <li><input type="checkbox" ref={truckCheckBox} className="filter"  value="truck"onChange={handleCheckFilter}></input>Truck</li>
          <li><input type="checkbox" ref={coupeCheckBox} className="filter" value="coupe"onChange={handleCheckFilter}></input>Coupe</li>
          <li><input type="checkbox" ref={convertableCheckbox} className="filter" value="convertible"onChange={handleCheckFilter}></input>Convertible</li>
          <li><input type="checkbox" ref={sedanCheckbox} className="filter" value="sedan"onChange={handleCheckFilter}></input>Sedan</li>
          <li><input type="checkbox"ref={hybridCheckBox} className="filter" value="hybrid"onChange={handleCheckFilter}></input>Hybrid</li>
  
  </ul>
 

  </div>
  </div>}
    <div className="infoContainer">

      
      {filteredCars.map((car, index) => (
        <div className="infoCard" key={index}>
          <div className="cargallery">
            <img src={car.image_url} alt="Car Picture" />
          </div>
          <div className="carInfo">
            <h2>{car.Brand} {car.Model}</h2>
            <ul className="carDetails">
              <li>
                <span className="detailLabel">Year:</span> {car.Year_of_manufacturing}
              </li>
              <li>
                <span className="detailLabel">Mileage:</span> {car.Mileage} miles
              </li>
              <li>
                <span className="detailLabel">Price:</span> {`$${car.Price}`}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
    </div>
 
  );
}


