import React from "react";

const Widget = ({handleDelete, handleSelect, place, index}) => {

    return (
        <div  onClick={()=>handleSelect(place?.name)} key={index} id="place" className="hover:opacity-80 cursor-pointer shadow-[0px_20px_30px_-10px_#000] bg-gradient-to-r from-[#5936B4]  to-[#362A84] w-full flex justify-between p-5 rounded-tl-[40px] rounded-bl-[20px] rounded-bl-[20px] rounded-br-[20px]">
            <div className="flex flex-col justify-start text-white"> 
                <h2 className="text-6xl">{Math.round(place?.main?.temp) || ""}°</h2>
                <div className="flex gap-1 items-center mt-4 text-[#ADA2D7] text-sm">
                        <p>Min: {Math.round(place?.main?.temp_min) || ""}°</p>
                        <p>Max: {Math.round(place?.main?.temp_max) || ""}°</p>
                </div>
                <p className="text-md">{place?.name || ""}</p>
            </div>
            <div className="flex items-center flex-col justify-between -translate-y-3 ml-8">
                <img className="" src={"https://openweathermap.org/img/wn/" + place?.weather[0]?.icon + "@2x.png"} alt="" />
                <p className="text-white">{place?.weather[0]?.main || ""}</p>
            </div>
            <button onClick={() =>handleDelete(place?.id)} className="relative top-[-65px] text-red-400 right-[-13px] group"><i class='bx bx-trash hover:text-red-500'></i></button>
        </div>
    )
}

export default Widget