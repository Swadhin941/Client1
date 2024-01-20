import React, { useContext, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import "./Main.css";
import { SharedData } from '../SharedData/SharedContext';
import ProfileModal from '../Modals/ProfileModal/ProfileModal';

const Main = () => {
    const { user, logout, loading } = useContext(SharedData);

    return (
        <div className='container-fluid ps-0 pe-0 d-flex' style={{ backgroundColor: "#e5eafc", height: "100vh" }}>
            <div>
                <div className='bg-dark d-flex justify-content-center align-items-center' style={{ height: "100%", width: "50px" }}>
                    <div>
                        {
                            user && <div>
                                <NavLink to={'/'} title='Dashboard' style={{textDecoration:"none", color:"white"}}><i className='bi bi-brush fs-5'></i></NavLink>
                            </div>
                        }
                        
                        {
                            user?.role === "admin" && <>
                                <div className='my-3'>
                                    <NavLink to={'/addUser'} title='Add user' className={'side-link'}><i className='bi bi-person-plus-fill fs-5'></i></NavLink>
                                </div>
                                <div className="">
                                    <NavLink to={'/ApproveRequest'} title='Approve Design' className={'side-link'}><i className='bi bi-tags-fill fs-5'></i></NavLink>
                                </div>
                                <div className="mt-3">
                                    <NavLink to={'/managePayment'} title='Manage Payment' className={'side-link'}><i className='bi bi-cash-stack fs-5'></i></NavLink>
                                </div>

                            </>
                        }
                        {
                            user?.role === "designer" && <>
                                <div className="mt-3">
                                    <NavLink to={'/myDesigns'} title='My Design' className={'side-link'}><i className='bi bi-x-diamond-fill fs-5'></i></NavLink>
                                </div>
                                <div className="mt-3">
                                    <NavLink to={'/addDesign'} title='Add Design' className={'side-link'}><i className='bi bi-box-arrow-in-down-left fs-5'></i></NavLink>
                                </div>
                            </>
                        }
                        {
                            user?.role === 'store' && <>
                                <div className="mt-3">
                                    <NavLink to={'/carts'} title='My Carts' className={'side-link'}><i className='bi bi-cart-fill fs-5'></i></NavLink>
                                </div>
                            </>
                        }
                        {
                           ( user?.role === "admin" || user?.role === "store") && <div className="mt-3">
                                <NavLink to={'/availablePackage'} title='Packages' className={'side-link'}><i className='bi bi-boxes fs-5'></i></NavLink>
                            </div>
                        }

                    </div>
                </div>
            </div>
    
            <div style={{ height: "100%", width: "100%", overflow: "auto", overflowX: "hidden", overflowY: "auto" }}>
                {
                    user && <div className='d-flex justify-content-end p-3 bg-light'>
                    <div className='d-flex justify-content-evenly'>
                        <div className='mx-2'>
                            <span className='text-success fs-3 fw-bold'>{user?.coins}</span>
                        </div>
                        <div className='mx-2' style={{ height: "40px", width: "40px" }} data-bs-target="#ProfileModal" data-bs-toggle="modal">
                            <img src={user?.photoURL ? user?.photoURL : "https://i.ibb.co/bmVqbdY/empty-person.jpg"} alt="" height={'40px'} width={'40px'} style={{ borderRadius: "50%" }} />
                        </div>
                        <div className='me-4'>
                            <button className='btn btn-outline-dark' onClick={() => logout()}>Logout</button>
                        </div>
                    </div>
                </div>
                }
                
                <ProfileModal></ProfileModal>
                <div className='marginAuto'>
                    <Outlet></Outlet>
                </div>

            </div>

        </div>
    );
};

export default Main;