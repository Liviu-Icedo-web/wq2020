import React from "react";
import Filter from "./Filter";
import { Input } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    return (
        <form className="search">
            <Input
                icon='users' 
                iconPosition='left' 
                placeholder={t('search')}
                value={searchvalue}
                onChange={handleSearchInputChanges}
                type='text'
                fluid
                className='wq-user-search'
                
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