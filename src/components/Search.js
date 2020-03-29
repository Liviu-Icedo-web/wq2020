import React from "react";
import Filter from "./Filter";

const Search = ({
    searchvalue,
    setSearchValue,
    filterByType,
    setFilterByType,
    filterByCity,
    setFilterByCity,
    filterByCountry,
    setFilterByCountry,
    listUsers,
    listCities,
    listCountries,

}) => {
    const handleSearchInputChanges = e => {
        setSearchValue(e.target.value);
    };

    return (
        <form className="search">
            <input
                placeholder="Search"
                value={searchvalue}
                onChange={handleSearchInputChanges}
                type="text"
            />
            <Filter
                filterByType={filterByType}
                setFilterByType={setFilterByType}
                filterByCity={filterByCity}
                setFilterByCity={setFilterByCity}
                filterByCountry={filterByCountry}
                setFilterByCountry={setFilterByCountry}
                listUsers={listUsers}
                listCities={listCities}
                listCountries={listCountries}
            />
        </form>
    );
}
export default Search;