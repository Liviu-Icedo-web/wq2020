import React from "react";
const style = { width: 100, height: 100 }

const UserItem = ({userItem}) => {
    return (  
        <div>       
            <img className="a-cover"
                alt={"profile img"}
                src={userItem.img}
            />                 
            <div className="a-layer">                   
                <span className="al-title">{userItem.name}</span>
                <span className="al-brand">{userItem.location}</span>
                <span className="al-count">{userItem.country}</span>                    
            </div>
        </div>
        
    );
};

export default UserItem;