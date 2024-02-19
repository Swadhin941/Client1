import React from 'react';
import FadeLoader from "react-spinners/FadeLoader"

const DataSpinner = () => {
    return (
        <div className='container-fluid w-100 d-flex justify-content-center align-items-center' style={{height:"200px"}}>
            <FadeLoader color='black'/>
        </div>
    );
};

export default DataSpinner;