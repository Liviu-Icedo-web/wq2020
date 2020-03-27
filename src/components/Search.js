import React from "react";
import Filter from "./Filter";

const Search = ({
    searchvalue,
    setSearchValue,
    filterByType,
    setFilterByType,
    filterByYear,
    setFilterByYear

}) => {
    const handleSearchInputChanges = e =>{
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
            filterByYear={filterByYear}
            setFilterByYear={setFilterByYear}
        />
        </form>
    );

}