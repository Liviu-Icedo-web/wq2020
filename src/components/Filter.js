import React from "react";
import { Dropdown } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next';

const Filter = ({
    setFilterByCity,
    filterByCountry,
    setFilterByCountry,
    listCities,
    listCountries,
}) => {
    const clearFilter = e => {
        setFilterByCity("");
        setFilterByCountry("");
    };

    const handleFilterByTypeCity = data => {
        setFilterByCity(data.value);
    };

    const handleFilterByCountryChange = data => {
        setFilterByCountry(data.value)
    };
    const { t } = useTranslation();

    return (
        <div>
            <div className="wq-dropdown">
                <div className="wq-45">
                <Dropdown
                    placeholder={t('searchCountry')}
                    fluid
                    search
                    selection={true}
                    options={listCountries.map(c => {
                        return { key: c.iso, value: c.iso, flag: c.iso, text: c.name }
                    })}
                    onChange={(e, data) => handleFilterByCountryChange(data)}
                />
                </div>
                <div className="wq-45">
                <Dropdown
                    placeholder={t('searchCity')}
                    fluid
                    search
                    multiple
                    defaultValue={filterByCountry}
                    selection={true}
                    options={listCities.map((city, ind) => {
                        return { key: ind, value: city.name, flag: city.country_iso.toLowerCase(), text: city.name + ' + ' + city.people }
                    })}
                    onChange={(e, data) => handleFilterByTypeCity(data)}
                />
                </div>
            </div>
            <button className='ui basic mini button wq-clear' onClick={clearFilter}>{t('reset')}</button>
        </div>
    );
};

export default Filter;