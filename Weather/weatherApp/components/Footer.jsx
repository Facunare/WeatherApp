import React, {useState} from "react";

const Footer = ({handleClickPlus, handleSearchView}) => {

    return (
        <div className="flex items-center justify-center w-full justify-self-end mt-12 absolute bottom-0 z-10">
            <button onClick={handleSearchView} className="self-center ml-10 hover:scale-110 hover:opacity-90 transition-all"><i className='bx bx-search-alt-2 text-white text-3xl'></i></button>
            <div className="relative">
                <img src="/Subtract.png" alt="" className="block mx-auto"/>
                <button onClick={handleClickPlus} className="shadow-[0px_0px_1px_3px_#979BB8] shadow-[inset_0px_0px_2px_3px_#CDD1D7] hover:opacity-90 active:scale-90 transition-all absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-md shadow-inner-slate-200" id="buttonPlus">
                    <img src="/Plus.svg" alt=""/>
                </button>
            </div>
            <a href="/cities" className="mr-10 hover:scale-110 hover:opacity-90 transition-all"><i className='bx bx-list-ul text-white text-3xl'></i></a>
        </div>
    );
};

export default Footer;
