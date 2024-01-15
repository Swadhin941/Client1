import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import "./Main.css";

const Main = () => {
    return (
        <div className='container-fluid ps-0 pe-0 d-flex' style={{ backgroundColor: "#e5eafc", height: "100vh" }}>
            <div>
                <div className='bg-dark d-flex justify-content-center align-items-center' style={{ height: "100%", width: "50px" }}>
                    <div>
                        <div>
                            <NavLink to={'/'} title='Dashboard' className={'nav-link'}><i className='bi bi-brush fs-5'></i></NavLink>
                        </div>
                        <div className='my-3'>
                            <NavLink to={'/addUser'} title='Add user' className={'nav-link'}><i className='bi bi-person-plus-fill fs-5'></i></NavLink>
                        </div>
                        <div className="">
                            <NavLink to={'/ApproveRequest'} title='Approve Design' className={'nav-link'}><i className='bi bi-tags-fill fs-5'></i></NavLink>
                        </div>
                        <div className="mt-3">
                            <NavLink to={'/managePayment'} title='Manage Payment' className={'nav-link'}><i className='bi bi-cash-stack fs-5'></i></NavLink>
                        </div>
                        <div className="mt-3">
                            <NavLink to={'/addDesign'} title='Add Design' className={'nav-link'}><i className='bi bi-box-arrow-in-down-left fs-5'></i></NavLink>
                        </div>
                        <div className="mt-3">
                            <NavLink to={'/myDesigns'} title='My Design' className={'nav-link'}><i className='bi bi-x-diamond-fill fs-5'></i></NavLink>
                        </div>
                        <div className="mt-3">
                            <NavLink to={'/carts'} title='My Carts' className={'nav-link'}><i className='bi bi-cart-fill fs-5'></i></NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: "100%",width:"100%", overflow: "auto", overflowX: "hidden", overflowY: "auto" }}>
                <div className='d-flex justify-content-end p-3 bg-light'>
                    <div className='d-flex justify-content-evenly'>
                        <div className='mx-2'>
                            <h5>Image</h5>
                        </div>
                        <div className='me-4'> 
                            <button className='btn btn-outline-dark'>Logout</button>
                        </div>
                    </div>
                </div>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Main;