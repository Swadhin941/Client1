import React, { useContext, useEffect, useState } from 'react';
import "./Login.css";
import ClockLoader from "react-spinners/ClockLoader";
import useTitle from '../CustomHook/useTitle/useTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import { SharedData } from '../SharedData/SharedContext';
import toast from 'react-hot-toast';


const Login = () => {
    useTitle("Lookaura - Login");
    const { user, setUser, setLoading, login } = useContext(SharedData);
    const [showPassword, setShowPassword] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        setLoginLoading(true);
        login(email, password)
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    // console.log(data.result);
                    setUser(data.result);
                    fetch(`${process.env.REACT_APP_SERVER}/jwt`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({ email: email })
                    })
                        .then(res => res.json())
                        .then(data => {
                            localStorage.setItem("specialToken", data.token)
                            // setUser(data.result);
                            toast.success(`Welcome`);
                            setLoading(false);
                            setLoginLoading(false);
                            navigate(from, { replace: true });
                        })
                }
                else{
                    toast.error("Invalid Credentials. Please try again");
                    setLoginLoading(false);
                }
            })
            .catch(error=>{
                toast.error(error.message);
                setLoginLoading(false);
            })
    }

    return (
        <div className='container-fluid ps-0 pe-0'>
            <div className='d-flex'>
                <div className='loginImgSection'>
                    <img src={'https://i.ibb.co/4ZszKJN/login.png'} alt="" />
                </div>
                <div className='d-flex justify-content-center align-items-center w-100'>
                    <div className="card w-75 border-0">
                        
                        <div className="card-body">
                            <h5 className='fw-bold my-2'>Welcome Back!</h5>
                            <form className='form' onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className='form-label my-0 text-muted'>Email:</label>
                                    <div className='input-group my-0'>
                                        <span className='input-group-text'><i className='bi bi-envelope'></i></span>
                                        <input type="email" name='email' className='form-control' required placeholder='Enter your email' style={{height:"60px"}} />
                                    </div>
                                </div>
                                <div className='mt-2'>
                                    <label htmlFor="password" className='form-label text-muted my-0'>Password:</label>
                                    <div className='input-group my-0'>
                                        <span className='input-group-text'><i className='bi bi-key'></i></span>
                                        <input type={showPassword ? "text" : "password"} name='password' className='form-control' style={{ borderRight: "0px", height:"60px" }} placeholder='Enter your password' required />
                                        <span className='input-group-text' style={{ backgroundColor: "white" }} onClick={() => setShowPassword(!showPassword)}><i className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}></i></span>
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <button type='submit' className='btn btn-dark w-100 d-flex justify-content-center' disabled={loginLoading ? true : false}>{loginLoading ? <ClockLoader size={24} color='white' /> : "Login"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;