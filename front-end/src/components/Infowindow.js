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
  const [selectedCar, setSelectedCar] = useState(null);
  const handleClick = (car)=>[
    setSelectedCar(car)
  ]
  const renderCarWindow = () => {
    if (!selectedCar) return null; // Return null if no car is selected
  
    // Define the style object for the car window
    const carWindowStyle = {
      padding: "6px",
      height: selectedCar ? "auto" : "1", 
      overflow: "hidden", 
      transition: "height 0.2s", 
    };
  
    return (
      <div className="carWindow" style={carWindowStyle}>
        <div className="carImage">
          <img src={selectedCar.image_url} alt="Car Picture" />
        </div>
        <div className="carDetails" >
          <h2>{selectedCar.Brand} {selectedCar.Model}</h2>
          <ul>
            <li>
              <span className="detailLabel">Year:</span> {selectedCar.Year_of_manufacturing}
            </li>
            <li>
              <span className="detailLabel">Price:</span> ${selectedCar.Price}
            </li>
            <li>
              <span className="detailLabel">Mileage:</span> {selectedCar.Mileage} miles
            </li>

            <li>
              <span className="detailLabel">Trim:</span> {selectedCar.Trim}
            </li>
            <li>
              <span className="detailLabel">Type:</span> {selectedCar.Type}
            </li>
            <li>
              <span className="detailLabel">Gas type:</span> {selectedCar.Gas_Type}
            </li>
            {/* Add more details as needed */}
          </ul>
          <button onClick={() => setSelectedCar(null)}>Close</button> {/* Close button */}
        </div>
      </div>
    );
  };
  useEffect(() => {
    fetch('http://127.0.0.1:5000/cars/all') 
      .then(response => response.json())
      .then(data => {
        serCarInfo(data);
      })
      .catch(error => console.error('Error fetching cars:', error));
  }, []);
 
  const [showElement, setShowElement] = useState(true)
  useEffect(()=>{
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
  useEffect(() => {
    fetch('http://127.0.0.1:5000/cars/all')
      .then(response => response.json())
      .then(data => {
        serCarInfo(data);
        setFilteredCars(data); 
      })
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

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
      {showElement && (
        <div className="filterContainer">
          <div className="insideContainer">
            <div className="group">
              <input required="" type="text" className="input" placeholder="filter results..." ref={carFilter} onChange={handleFilter}></input>
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <div className="filter-checkbox">
              <ul>
                <li><input type="checkbox" ref={suvCheckBox} className="filter" value="suv" onChange={handleCheckFilter}></input>Suv</li>
                <li><input type="checkbox" ref={truckCheckBox} className="filter" value="truck" onChange={handleCheckFilter}></input>Truck</li>
                <li><input type="checkbox" ref={coupeCheckBox} className="filter" value="coupe" onChange={handleCheckFilter}></input>Coupe</li>
                <li><input type="checkbox" ref={convertableCheckbox} className="filter" value="convertible" onChange={handleCheckFilter}></input>Convertible</li>
                <li><input type="checkbox" ref={sedanCheckbox} className="filter" value="sedan" onChange={handleCheckFilter}></input>Sedan</li>
                <li><input type="checkbox" ref={hybridCheckBox} className="filter" value="hybrid" onChange={handleCheckFilter}></input>Hybrid</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="infoContainer">
        {filteredCars.map((car, index) => (
          <div className="infoCard" key={index} onClick={() => handleClick(car) }>
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
      <div className="middleContainer">
      {renderCarWindow()} 
    </div>
    </div>
  );
}


