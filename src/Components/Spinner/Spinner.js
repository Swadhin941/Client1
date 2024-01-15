import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
    return (
        <div className='container-fluid d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <ClipLoader color="black" size={40} />
        </div>
    );
};

export default Spinner;