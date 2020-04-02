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

                <div className="ui fluid search selection dropdown">
                    <input type="hidden" name="country"/>
                    <i className="dropdown icon"></i>
                    <div className="default text">Select Country</div>
                    <div className="menu">
                    <div className="item" data-value="af"><i className="af flag"></i>Afghanistan</div>
                    <div className="item" data-value="ax"><i className="ax flag"></i>Aland Islands</div>
                    <div className="item" data-value="al"><i className="al flag"></i>Albania</div>
                    <div className="item" data-value="dz"><i className="dz flag"></i>Algeria</div>
                    <div className="item" data-value="as"><i className="as flag"></i>American Samoa</div>
                    <div className="item" data-value="ad"><i className="ad flag"></i>Andorra</div>
                    <div className="item" data-value="ao"><i className="ao flag"></i>Angola</div>
                    </div>
                </div>
        </form>
    );
}
export default Search;