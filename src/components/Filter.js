import React from "react";

const Filter = ({
    filterByType,
    setFilterByType,
    filterByYear,
    setFilterByYear
}) => {
    const clearFilter = e => {
        setFilterByType("");
    };

    const handelFilterByTypeChange = e =>{
        setFilterByType(e.target.value);
    };

    const handelFilterByYearChange = e => {
        setFilterByYear(e.target.value)
    };

    return (
        <div>
            <div>
                <label>Type : </label>
                <select defaultValue={filterByType} onChange={handleFilterByTypeChange}>
                <option value="TV">Série</option>
                <option value="Movie">Film</option>
                <option value="OVA">OVA</option>
                </select>
                <label> year : </label>
                <select defaultValue={filterByYear} onChange={handleFilterByYearChange}>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                </select>
            </div>
        <button onClick={clearFilter}>clear</button>
        </div>
    );
};

//export defualt Filter;