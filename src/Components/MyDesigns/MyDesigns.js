import React, { useState } from 'react';

const MyDesigns = () => {
    const [allDesigns, setAllDesigns]= useState([]); 
    return (
        <div className={`container-fluid ${allDesigns.length===0 && "d-flex justify-content-center align-items-center"}`} style={{height:"100%"}}>
            {
                allDesigns.length===0 ? <div className='d-flex justify-content-center align-items-center bg-dark' style={{height:"300px", width: "100%", borderRadius:"10px"}}>
                    <h1 className='text-white'>No Designs</h1>
                </div> : <div className='row'>
                    
                </div>
            }
        </div>
    );
};

export default MyDesigns;