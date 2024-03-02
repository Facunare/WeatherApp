import React, { useEffect, useState, useRef } from "react";
import SearchBar from "./SearchBar";
import MainInfoCard from "./MainInfoCard";
import Footer from "./Footer";
import DataBox from "./DataBox";

const Card = () => {
    
    const modalRef = useRef(null);
    const [modalHeight, setModalHeight] = useState(400);
    const [data, setData] = useState({})
    const [modalVisible, setModalVisible] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const [geoLocationFetched, setGeoLocationFetched] = useState(false);
    const [fetchType, setFetchType] = useState('');

    useEffect(() => {
     
        const storedData = localStorage.getItem("data");
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setData(parsedData);
                setFetchType('local'); 
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        }
    }, [fetchType]);

    useEffect(() => {
        if (fetchType === 'geolocation') { 
            if (!geoLocationFetched) {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(
                        async function (position) {
                            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=8618719e0c739a0ddc42604f37fd6261&units=metric`);
                            let dataJson = await res.json()
                            setData(dataJson)
                            localStorage.setItem("data", JSON.stringify(dataJson));
                            setGeoLocationFetched(true);
                        },
                        function (error) {
                            console.error("Error getting user's location: " + error.message);
                            navigator.permissions.query({ name: "geolocation" })
                        }
                    );
                } else {
                    console.log("Geolocation is not supported by this browser.");
                }
            }
        }
    }, [fetchType, geoLocationFetched]);

    
    const handleClickPlus = () => {
        setModalVisible(!modalVisible);
    };
    const handleSearchView = () => {
        setSearchVisible(!searchVisible);
    }; 

    const returnGeolocation = () => {
        setFetchType("geolocation")
    }

  
    useEffect(() => {
      const modalElement = modalRef.current;
  
      const handleMouseDown = (event) => {
        event.preventDefault();
  
        const initialY = event.clientY;
        const initialHeight = modalElement.offsetHeight;
  
        const onMouseMove = (moveEvent) => {
          const deltaY = moveEvent.clientY - initialY;
          const newHeight = initialHeight - deltaY;
  
          if (newHeight >= 300 && newHeight <= 740) {
            setModalHeight(newHeight);
            modalElement.style.height = `${newHeight}px`;
          }
        };
  
        const onMouseUp = () => {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        };
  
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      };
  
      modalElement.addEventListener("mousedown", handleMouseDown);
  
      return () => {
        modalElement.removeEventListener("mousedown", handleMouseDown);
      };
    }, [modalRef]);




    return (
        <div className="overflow-hidden bg-white/[.1] backdrop-blur-md w-[390px] h-[744px] rounded-[35px] flex-col flex justify-center bg-[url('/Image.svg')] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div className="flex items-center justify-center">
                <SearchBar setData={setData} setSearchVisible={setSearchVisible} searchVisible={searchVisible} setFetchType={setFetchType}/>
                <button className="top-0 right-0 absolute mt-1 p-5 group" onClick={returnGeolocation}><i class='bx bx-map-pin text-white group-hover:text-blue-300'></i></button>
            </div>
            <MainInfoCard data={data} card={"card1"}/>
            <Footer handleClickPlus={handleClickPlus} handleSearchView={handleSearchView}/>
            <div ref={modalRef} id="modal" className={`bg-gradient-to-r from-[#372f69ab] via-[#70358c94] to-[#372f69ab] overflow-hidden absolute flex justify-center bottom-0 h-2/5 w-full backdrop-blur-lg rounded-tr-[35px] rounded-tl-[35px] transition-opacity ${modalVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex flex-col justify-start items-center w-full">
                    <button id="dradToTop" className="mt-3 p-[4px] bg-[#41215C] w-1/6 h-2 rounded-full"></button>
                    <div className="flex flex-col text-center m-7">
                        <h1 className="text-white text-3xl">{data?.name}</h1>
                        <p className="text-[#85809A] text-2xl">{data && data.main && data.main.temp ? Math.round(data?.main?.temp) + "°C" : "---"} | {data && data.weather ? data?.weather[0]?.main : "" }</p>
                    </div>
                    <div className="grid grid-cols-2 grid-flow-row grid-flow-dense gap-3 w-full px-5">
                        <DataBox title="Humidity" data={data?.main?.humidity} icon="bx bxs-droplet-half"/>
                        <DataBox title="Feels Like... (°C)" data={Math.round(data?.main?.feels_like)} icon="bx bx-face"/>
                        <DataBox title="Sea Level (hPa)" data={data?.main?.sea_level} icon="bx bx-water"/>
                        <DataBox title="Wind Speed (m/s)" data={data?.wind?.speed} icon="bx bx-wind"/>
                        <DataBox title={`Snow (mm) - ${data?.snow?.['1h'] ? "1h" :"3h"}`} data={data?.snow?.['1h'] || data?.snow?.['3h']} icon="bx bx-wind"/>
                        <DataBox title="Clouds (%)" data={data?.clouds?.all} icon="bx bx-cloud"/>
                        <DataBox title={`Rain (mm) - ${data?.rain?.['1h'] ? "1h" :"3h"}`} data={data?.rain?.['1h'] || data?.rain?.['3h']} icon="bx bxs-florist"/>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
