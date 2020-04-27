import React, { useState, useEffect, useRef } from "react";

import firebase from 'firebase';
import 'firebase/auth';
import './assets/index.less';
import UserItem from './UserItem';
import Search from "./Search";
import InfiniteScroll from "react-infinite-scroll-component";
import AutoResponsive from 'autoresponsive-react';
import { useTranslation } from 'react-i18next';

const db = firebase.firestore();
const style = { width: 100, height: 100 }
const style2 = { width: '100%', height: 380, position: 'inherit!important' }
const limit = 5;
let result = [];
let multiResult = [];
let da= false;

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
    const { t } = useTranslation();

    useEffect(() => {
        const fetchDataUsers = async () => {
            const dataUsers = await db.collection('user').limit(1).get();
            setListUsers(dataUsers.docs.map(doc => ({ ...doc.data(), id: doc.id })));

            const dataCities = await db.collection('city').orderBy('country_iso').limit(1).get();
            setListCities(dataCities.docs.map(doc => ({ ...doc.data(), id: doc.id })));

            const dataCountries = await db.collection('countries').limit(1).get();
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

        if(searchValue.length>2)
        { 
            da = true;
         }
        
    }, []);

    useEffect(() => {
        const filterData = async () => {
            const searchRegex = searchValue && new RegExp(`${searchValue}`, "i");
            const countryRegex = filterByCountry && new RegExp(`${filterByCountry}`);

            if (filterByCity.length > 1) {
                result = [];
                filterByCity.map((c, _i) => {
                    const cityRegex = filterByCity && new RegExp(`${c}`);

                    multiResult = listUsers.filter(
                        user =>
                            (!searchRegex || searchRegex.test(user.name)) &&
                            (!countryRegex || countryRegex.test(user.country)) &&
                            (!cityRegex || cityRegex.test(user.location))
                    );
                    result.push(...multiResult)
                })

             } 
            else {
                const cityRegex = filterByCity && new RegExp(`${filterByCity}`); 
                result = [];
                result = listUsers.filter(
                    user =>
                        (!searchRegex || searchRegex.test(user.name)) &&
                        (!countryRegex || countryRegex.test(user.country)) &&
                        (!cityRegex || cityRegex.test(user.location))
                );
            }
            setSortedUsers(result);            
        }
        filterData();       
        
    },[listUsers, filterByCountry, filterByCity, searchValue])

    useEffect(() => { 
        changeUsers();

    },[searchValue])
    
    const changeUsers = () => {
        if(searchValue.length>1)
         {
            setTimeout(async() => {
            const nameUsers = await db.collection('user').where('name', '>=', searchValue).get();
            let newUsers= [];
            newUsers = nameUsers.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            
            setSortedUsers([...sortedUsers,...newUsers]);
           
          }, 1000);
        }else{
            setSortedUsers(listUsers)
        }    
    }
    
    let retrieveMore = async () => {
    try {

      let additionalQuery = db.collection('user')
        .orderBy('name')
        .startAfter(sortedUsers[sortedUsers.length -1].name)
        .limit(limit)
      // Cloud Firestore: Query Snapshot
      let documentSnapshots = await additionalQuery.get();       // Cloud Firestore: Document Data

    let prepareArr = documentSnapshots.docs.map(doc =>({...doc.data(),id:doc.id}));
    setListUsers([...listUsers,...prepareArr]); 
    setSortedUsers(listUsers); 

    }
    catch (error) {
      console.log(error);
    }
  };

    const getAutoResponsiveProps = () => {
        return {
            itemMargin: 1,
            containerWidth: widthContainer >= 1227 ? 1127 : widthContainer,
            itemClassName: 'item',
            gridWidth: 1,
            transitionDuration: '.5',
            containerHeight:400
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
            {console.log('*** DATA ***',sortedUsers)
            }
            <AutoResponsive ref={containerWQ} {...getAutoResponsiveProps()}>
                <InfiniteScroll
                    dataLength={sortedUsers.length}
                    next={retrieveMore}
                    hasMore={true}
                    loader={<h4>{t('thankYou')}</h4>}
                    height={350}
                    style={style2}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <h5>{t('thankYou')}</h5>
                        </p>
                    }
                >
                    {sortedUsers.map((userItem, ind) => (
                        <div key={ind} className='w1 album item' style={style}>
                            <UserItem userItem={userItem} key={ind} />
                        </div>))
                    }
                </InfiniteScroll>
            </AutoResponsive>
        </div>
    )
}

export default WallWQV2;