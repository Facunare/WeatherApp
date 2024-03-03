import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import Widget from "./Widget";
const Card2 = () => {
    let navigate = useNavigate();
    const [data, setData] = useState({})
    let res;
    let dataJson;
    useEffect(() => {
        const putPlaces = async () => {
            const storedData = localStorage.getItem("places");
            if (storedData) {
                try {
                    const parsedData = JSON.parse(storedData);
                    const newData = [];
                    for (let i of parsedData) {
                        res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${i.name}&appid=8618719e0c739a0ddc42604f37fd6261&units=metric`);
                        dataJson = await res.json();
                        newData.push(dataJson)
                    }
                    setData(newData);
                } catch (error) {
                    console.error("Error fetching weather data:", error);
                }
            }
        }
        putPlaces();
    }, []);
    
    const handleDelete = (id) => {
        const storedData = localStorage.getItem("places");
        let parsedData = JSON.parse(storedData);
        parsedData = parsedData.filter(place => place.id !== id);
        localStorage.setItem("places", JSON.stringify(parsedData))
        location.reload()
    }   

    const handleSelect = async (name) =>{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=8618719e0c739a0ddc42604f37fd6261&units=metric`);
        const dataJson = await res.json();
        localStorage.setItem("data", JSON.stringify(dataJson));
        return navigate("/");
    }

    return (

        <div id="card2" className=" overflow-hidden bg-gradient-to-r from-[#372F69] via-[#3E2E73] to-[#2F2C58] backdrop-blur-md w-[390px] h-[744px] rounded-[35px] flex-col flex justify-start shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div className="flex justify-between px-5 mt-5">
                <div className="flex">
                    <a href="/"><i className='bx bx-chevron-left self-center text-3xl text-[#ADA2D7]'></i></a>
                    <h1 className="text-white text-2xl">Weather</h1>
                </div>
            </div>
            <SearchBar setData={setData} card={"card2"}/>
            <div id="savedPlaces" className="flex flex-col items-center gap-5 h-full w-full px-10 mt-24 overflow-y-scroll pb-10">
                {data.length > 0 ? (
                    data.map((place, index) => (
                        <Widget place={place} index={index} handleDelete={handleDelete} handleSelect={handleSelect}/>
                    ))
                ) : (
                    <p className="text-white text-2xl">{"There's no places saved"}</p>
                )}
            </div>
        </div>
    )
}

export default Card2