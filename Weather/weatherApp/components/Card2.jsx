import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import Widget from "./Widget";
const Card2 = () => {
    let navigate = useNavigate();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const putPlaces = async () => {
            const storedData = localStorage.getItem("places");
            if (storedData) {
                try {
                    const parsedData = JSON.parse(storedData);
                    const newData = [];
                    for (let i of parsedData) {
                        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${i.name}&appid=8618719e0c739a0ddc42604f37fd6261&units=metric`);
                        const dataJson = await res.json();
                        newData.push(dataJson)
                    }
                    setData(newData);
                } catch (error) {
                    console.error("Error fetching weather data:", error);
                } finally {
                    setLoading(false);
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
                {data.length > 0 && !loading && (
                    data.map((place, index) => (
                        <Widget place={place} index={index} handleDelete={handleDelete} handleSelect={handleSelect}/>
                    ))
                )}
                {!loading && data.length === 0 && (
                    <p className="text-white text-2xl">{"There's no places saved"}</p>
                )}

                {loading && 
                    <div role="status" className="relative top-0">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#794eee]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default Card2