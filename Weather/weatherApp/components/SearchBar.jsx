import React, {useState} from "react";

const SearchBar = ({setData, setSearchVisible, searchVisible=true, card, setFetchType}) => {
    const [search, setSearch] = useState();
    const places = []

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!search) return
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=8618719e0c739a0ddc42604f37fd6261&units=metric`);
        const dataJson = await res.json();
        setData(dataJson);
        localStorage.setItem("data", JSON.stringify(dataJson));
        if (setSearchVisible && searchVisible) {
            setSearchVisible(false);
        }
        setFetchType('search');
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if(!search) return
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=8618719e0c739a0ddc42604f37fd6261&units=metric`);
        const dataJson = await res.json();
        const currentPlaces = JSON.parse(localStorage.getItem("places")) || [];
        if(currentPlaces.some(place => place.id === dataJson.id)) return;
        
        if(dataJson.cod == "404") return
        const updatedPlaces = [...currentPlaces, dataJson];
        localStorage.setItem("places", JSON.stringify(updatedPlaces));
        location.reload()
    }

    return (
        <form action="" method="POST" className={`${card=="card2" ? "mt-12 w-full" : ""} top-0 left-0 absolute w-[90%] px-5 transition-opacity ${searchVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}` }>
            <input placeholder="Seach for a city"  type="search" name="search" id="" onChange={(e)=>setSearch(e.target.value)} className="mt-5 text-white w-full rounded-md pl-2 py-1 bg-[rgb(50,57,97)] shadow-[inset_0px_5px_10px_-4px_#000]" style={{outline: 'none'}}/>
            <button onClick={card=="card2" ? handleSave : handleSubmit} className="outline outline-none absolute -translate-x-6 -translate-y-1.5 transform mt-[30px] text-white text-xl"><i className='bx bx-search-alt-2'></i></button>
        </form>
    );
};

export default SearchBar;
