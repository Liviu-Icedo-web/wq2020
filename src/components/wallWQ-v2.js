import React, {useState, useEffect,useRef,useLayoutEffect } from "react";

import firebase from 'firebase';
import 'firebase/auth';
import '../assets/index.less';
import UserItem from './UserItem';
import AutoResponsive from 'autoresponsive-react';

const db = firebase.firestore();
const style = { width: 100, height: 100 }


function WallWQV2() {
    const [listUsers, setListUsers] = useState([]);
    const [widthContainer, setwidthContainer] = useState(null);
    const containerWQ = useRef(null);
    
    useEffect(() => {
        const fetchDataUsers = async () => {
            const dataUsers = await db.collection('user').get();
            setListUsers(dataUsers.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }
            )));
        };  
        if(containerWQ.current){        
            setwidthContainer(containerWQ.current.refs.container.offsetWidth);
        }
        const handleResize = () => {
            setwidthContainer(containerWQ.current.refs.container.offsetWidth);
        }
        window.addEventListener('resize', handleResize)
        fetchDataUsers();
    }, []);

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
            <AutoResponsive ref={containerWQ} {...getAutoResponsiveProps()}>
                {listUsers.map((userItem, ind) => (
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