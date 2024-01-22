import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./PageNotFound.css";
import useTitle from '../CustomHook/useTitle/useTitle';

const PageNotFound = () => {
    useTitle("Lookaura");
    const navigate= useNavigate();
    return (
        <div className='container-fluid d-flex justify-content-center align-items-center bg-dark' style={{height:"100vh"}}>
            <div >
                <h1 className='text-center text-white pageNotFoundCode'>4<span style={{ color: "red" }}>0</span>4</h1>
                <h5 className='text-center text-white'>Page Not Found!</h5>
                <div className='d-flex justify-content-center'>
                    <button className='btn' style={{ backgroundColor: "white", fontWeight: "600" }} onClick={()=>navigate('/Dashboard')}>Back to dashboard</button>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;