import React, { useContext, useEffect, useState } from 'react';
import { SharedData } from '../SharedData/SharedContext';

const Carts = () => {
    const [allDesigns, setAllDesigns]= useState([]);
    const {user}= useContext(SharedData);
    useEffect(()=>{
        if(user?.role==="store"){
            
        }
    },[])
    return (
        <div className='container-fluid'>
            <div className="row">

            </div>
        </div>
    );
};

export default Carts;