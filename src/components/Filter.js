import React from "react";

const Filter = ({
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
    const clearFilter = e => {
        setFilterByType("");
    };

    const handleFilterByTypeCity = e =>{
        setFilterByCity(e.target.value);
    };

    const handleFilterByCountryChange = e => {
        setFilterByCountry(e.target.value)
    };

    return (
        <div>
            <div>
            <label> Countries : </label>
                <select defaultValue={filterByCountry} onChange={handleFilterByCountryChange}>
                <option key={-1} value={''}>{'None'}</option>
                {listCountries.map((country, ind) => (
                            <option key={ind} value={country.iso}>{country.name}</option>
                        ))
                    }
                </select>
                <label>City : </label>
                <select defaultValue={filterByCity} onChange={handleFilterByTypeCity}>
                        <option key={-1} value={''}>{'None'}</option>
                    {listCities.map((city, ind) => (
                            <option key={ind} value={city.name}>{city.name}</option>
                        ))
                    }
                
                </select>
                
            </div>
        <button onClick={clearFilter}>clear</button>
        </div>
    );
};

export default Filter;