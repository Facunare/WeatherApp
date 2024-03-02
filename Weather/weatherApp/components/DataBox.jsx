import React, {useState} from "react";

const DataBox = ({title, data, icon}) => {

    return (
        <div className={`${title=="Humidity" ? "col-span-2" : ""} w-full rounded-3xl border-2 h-28 border-[#5D3A9D] bg-[#2D2156] shadow-[0_3px_10px_rgb(0,0,0,.5)]`}>
            <div className="w-full flex gap-1 items-center ml-3 mt-3 pr-3 text-[#85809A]">
                <i className={icon}></i>
                <p>{title}</p>
            </div>
            <div className="flex items-center justify-center gap-5">
            <p className="text-white text-5xl text-center">{title === "Humidity" ? (data ? `${data}%` : "?") : (data || "?")}</p>
                { title == "Humidity" ?
                <div class="w-[50%] bg-white/[.2] rounded-full h-1  dark:bg-gray-700">
                    <div class={`bg-gradient-to-r from-blue-500 via-[#8259D2] via-[#B758E7] to-[#E64497] h-1 rounded-full w-[${data}%]`}></div>
                </div> : ""}
            </div>
        </div>
    );
};

export default DataBox;
