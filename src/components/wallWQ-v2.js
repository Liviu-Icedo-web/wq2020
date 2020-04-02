import React, { useState, useEffect, useRef } from "react";

import firebase from 'firebase';
import 'firebase/auth';
import '../assets/index.less';
import UserItem from './UserItem';
import Search from "./Search";
import AutoResponsive from 'autoresponsive-react';

const db = firebase.firestore();
const style = { width: 100, height: 100 }


function WallWQV2() {
    const [listUsers, setListUsers] = useState([]);
    const [listCities, setListCities] = useState([]);
    const [listCountries, setListCountries] = useState([]);
    const [widthContainer, setwidthContainer] = useState(null);
    const containerWQ = useRef(null);

    const [sortedUsers, setSortedUsers] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [filterByCity, setFilterByCity] = useState("");
    const [filterByCountry, setFilterByCountry] = useState("");

    useEffect(() => {
        const fetchDataUsers = async () => {
            const dataUsers = await db.collection('user').get();
            setListUsers(dataUsers.docs.map(doc => ({ ...doc.data(), id: doc.id })));

            const dataCities = await db.collection('city').limit(3).get();
            setListCities(dataCities.docs.map(doc => ({ ...doc.data(), id: doc.id })));

            const dataCountries = await db.collection('countries').get();
            setListCountries(dataCountries.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };

        if (containerWQ.current) {
            setwidthContainer(containerWQ.current.refs.container.offsetWidth);
        }
        const handleResize = () => {
            setwidthContainer(containerWQ.current.refs.container.offsetWidth);
        }

        window.addEventListener('resize', handleResize)
        fetchDataUsers();

    }, []);

    useEffect(() => {
        const filterData = async () => {
            const searchRegex = searchValue && new RegExp(`${searchValue}`, "i");
            const countryRegex = filterByCountry && new RegExp(`${filterByCountry}`);
            const cityRegex = filterByCity && new RegExp(`${filterByCity}`);           
            const result = listUsers.filter(
                user =>
                    (!searchRegex || searchRegex.test(user.name)) &&
                    (!countryRegex || countryRegex.test(user.country)) &&
                    (!cityRegex || cityRegex.test(user.location))
            );
            setSortedUsers(result);
        }

        filterData();
    }, [listUsers,filterByCountry,filterByCity,searchValue])
    
    const getAutoResponsiveProps = () => {

        return {
            itemMargin: 1,
            containerWidth: widthContainer >= 1227 ? 1127 : widthContainer,
            itemClassName: 'item',
            gridWidth: 1,
            transitionDuration: '.5'
        };
    }

    return (
        <div className="albumPanel">
            <Search
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                filterByCity={filterByCity}
                setFilterByCity={setFilterByCity}
                filterByCountry={filterByCountry}
                setFilterByCountry={setFilterByCountry}
                listUsers={listUsers}
                listCities={listCities}
                listCountries={listCountries}
            />
            {console.log('DDDD', sortedUsers)}
            <AutoResponsive ref={containerWQ} {...getAutoResponsiveProps()}>
                {sortedUsers.map((userItem) => (
                    <a key={userItem.id} href="#" className='w1 album item' style={style}>
                        <UserItem userItem={userItem} />
                    </a>
                ))
                }
            </AutoResponsive>
        </div>
    )
}

export default WallWQV2;