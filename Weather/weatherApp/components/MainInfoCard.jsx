import React, {useState} from "react";

const MainInfoCard = ({data}) => {

    return (
        <div className="text-white text-center">
            <h1 className="text-3xl">{data?.name}</h1>
            <h2 className="text-6xl font-thin">{data && data.main && data.main.temp && Math.round(data?.main?.temp)+ "°C"}</h2>
            <p className="text-gray-300 mt-4">{data.weather && data.weather.length > 0 && data.weather[0].main}</p>

            <div className="flex gap-5 items-center justify-center mt-1">
                <p>{data && data.main && data.main.temp_min && "Min: " + Math.round(data.main.temp_min)+ '°C'}</p>
                <p>{data && data.main && data.main.temp_max && "Max: " + Math.round(data.main.temp_max)+ '°C'}</p>
            </div>
            <img src="/House 4 3.svg" alt=""  id="house"/>
        </div>
    );
};

export default MainInfoCard;
