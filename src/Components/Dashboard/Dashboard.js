import React, { useContext, useEffect, useState } from 'react';
import { SharedData } from '../SharedData/SharedContext';
import useTitle from '../CustomHook/useTitle/useTitle';
import useAxiosSecure from '../CustomHook/useAxiosSecure/useAxiosSecure';
import toast from 'react-hot-toast';
import "./Dashboard.css";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    useTitle("Lookaura- Dashboard")
    const { user } = useContext(SharedData);
    const [allDesigns, setAllDesigns] = useState([]);
    const [adminStatistics, setAdminStatistics] = useState(null);
    const [designerStatistics, setDesignerStatistics]= useState(null);
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === 'admin') {
            axiosSecure.get('/adminStatistics')
                .then(res => res.data)
                .then(data => {
                    setAdminStatistics(data);
                })
                .catch(error => {
                    toast.error(error.message)
                })
        }
        if (user?.role === 'designer') {
            axiosSecure.get('/designerStatistics')
            .then(res=>res.data)
            .then(data=>{
                console.log(data);
                setDesignerStatistics(data);
            })
        }

    }, [user])

    useEffect(() => {
        if (user?.role === "admin") {
            axiosSecure.get('/allDesignsForAdmin')
                .then(res => res.data)
                .then(data => {
                    setAllDesigns(data);
                })
                .catch(error => {
                    toast.error(error.message);
                })
        }
        if(user?.role==='store'){
            axiosSecure.get('/viewAllDesigns')
            .then(res=>res.data)
            .then(data=>{
                console.log(data);
                setAllDesigns(data);
            })
        }
    }, [user])

    const adminDashboardFirstCards = [
        {
            id: 1,
            icon: "bi bi-person",
            name: "Designers",
            iconBackColor: "#8353E2FF",
            cardBackColor: "#F5F2FDFF"
        },
        {
            id: 2,
            icon: "bi bi-shop-window",
            name: "Shops",
            iconBackColor: "#00BDD6FF",
            cardBackColor: "#EBFDFFFF"
        },
        {
            id: 3,
            icon: "bi bi-cash-coin",
            name: "Paid Shops",
            iconBackColor: "#5DA05DFF",
            cardBackColor: "#E6F4EAFF"
        },
        {
            id: 4,
            icon: "bi bi-x-circle-fill",
            name: "Unpaid Shops",
            iconBackColor: "#ED7D2DF",
            cardBackColor: "#FEF6F1FF"
        },
    ]

    const adminDashboardSecondCards = [
        {
            id: 1,
            icon: "bi bi-check2",
            name: "Approved",
            iconBackColor: "#00BDD6FF",
            cardBackColor: "#EBFDFFFF"
        },
        {
            id: 2,
            icon: "bi bi-hourglass-split",
            name: "Unapproved",
            iconBackColor: "#8353E2FF",
            cardBackColor: "#F5F2FDFF"
        },
        {
            id: 3,
            icon: "bi bi-x-circle-fill",
            name: "Rejected",
            iconBackColor: "#ED7D2DF",
            cardBackColor: "#FEF6F1FF"
        },
        {
            id: 4,
            icon: "bi bi-currency-dollar",
            name: "Sold",
            iconBackColor: "#5DA05DFF",
            cardBackColor: "#E6F4EAFF"
        },
        {
            id: 5,
            icon: "bi bi-currency-dollar",
            name: "Unsold",
            iconBackColor: "#4069E5FF",
            cardBackColor: "#F1F4FDFF"
        }


    ]

    const designerDashboardFirstCards = [
        {
            id: 1,
            icon: "bi bi-check2",
            name: "Approved",
            iconBackColor: "#00BDD6FF",
            cardBackColor: "#EBFDFFFF"
        },
        {
            id: 2,
            icon: "bi bi-hourglass-split",
            name: "Unapproved",
            iconBackColor: "#8353E2FF",
            cardBackColor: "#F5F2FDFF"
        },
        {
            id: 3,
            icon: "bi bi-x-circle-fill",
            name: "Rejected",
            iconBackColor: "#ED7D2DF",
            cardBackColor: "#FEF6F1FF"
        }
    ]

    const handleReaction= (item)=>{
        if(item?.personReaction){
            let temp = item.likes.filter(data=>data.email!== user?.email);
            axiosSecure.put(`/productReaction?id=${item._id}`,{likes: temp})
            .then(res=>res.data)
            .then(data=>{
                if(data.modifiedCount>=1){
                    let temp2= [...allDesigns];
                    temp2.forEach(element=>{
                        if(element._id===item?._id){
                            element.likes= [...temp];
                            delete element?.personReaction
                        }
                    })
                    setAllDesigns(temp2);
                }
            })
            .catch(error=>{
                toast.error(error.message);
            })
        }
        else{
            let temp = [...item.likes, {email: user?.email}]
            axiosSecure.put(`/productReaction?id=${item?._id}`,{likes: temp})
            .then(res=>res.data)
            .then(data=>{
                if(data.modifiedCount>=1){
                    let temp2= [...allDesigns];
                    temp2.forEach(element=>{
                        if(element._id===item._id){
                            let temp2= [...element.likes, {email: user?.email}];
                            element.likes=[...temp2];
                            element.personReaction= true
                        }
                    })
                    setAllDesigns(temp2);
                }
            })
        }
        
    }

    return (
        <div className='container-fluid'>
            <h2 className='mt-2'>Hi, {user?.username}</h2>
            {
                user?.role === 'admin' && <div className="row g-2">
                    <h2 className='mb-5'>Total User: {adminStatistics?.totalUsers}</h2>
                    {
                        adminDashboardFirstCards.map((item) => <div className="col-12 col-md-6 col-lg-3" key={item.id}>
                            <div className="card" style={{ backgroundColor: item.cardBackColor, border: `1px solid ${item.cardBackColor}` }}>
                                <div className="card-body d-flex justify-content-center">
                                    <div>
                                        <div className='d-flex justify-content-center'><div className='border border-1' style={{ borderRadius: "50%", height: "45px", width: "45px", textAlign: "center", backgroundColor: item.iconBackColor }}><i className={`${item.icon} fs-3 ${item.id !== 4 ? "text-white" : "text-warning"}`}></i></div></div>
                                        <div className='fs-4 text-center my-0' style={{ color: item.iconBackColor }}>{(item.id === 1 && `${adminStatistics?.totalDesigner}`) || (item.id === 2 && `${adminStatistics?.totalShops}`) || (item.id === 3 && `${adminStatistics?.PaidShops}`) || (item.id === 4 && `${adminStatistics?.UnpaidShops}`)}</div>
                                        <div className='text-center my-0'>
                                            <h5 className='my-0'>{item.name}</h5>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>)
                    }

                </div>
            }
            {
                user?.role === 'admin' && <div className="row g-2">
                    <h2 className='my-3'>Total Designs: {adminStatistics?.totalDesigns}</h2>
                    {
                        adminDashboardSecondCards.map((item, index) => <div className="col-12 col-md-4 col-lg-3" key={item.id}>
                            <div className="card" style={{ backgroundColor: item.cardBackColor, border: `1px solid ${item.cardBackColor}` }}>
                                <div className="card-body d-flex justify-content-center">
                                    <div>
                                        <div className='d-flex justify-content-center'><div className='border border-1' style={{ borderRadius: "50%", height: "45px", width: "45px", textAlign: "center", backgroundColor: item.iconBackColor }}><i className={`${item.icon} fs-3 ${item.id !== 3 ? "text-white" : "text-warning"}`}></i></div></div>
                                        <div className='fs-4 text-center my-0' style={{ color: item.iconBackColor }}>{(item.id === 1 && `${adminStatistics?.totalApproveDesigns}`) || (item.id === 2 && `${adminStatistics?.totalUnapproved}`) || (item.id === 3 && `${adminStatistics?.totalRejected}`) || (item.id === 4 && `${adminStatistics?.totalSold}`) || (item.id === 5 && `${adminStatistics?.totalUnsold}`)}</div>
                                        <div className='text-center my-0'>
                                            <h5 className='my-0'>{item.name}</h5>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>)
                    }
                </div>
            }
            {
                user?.role === "designer" && <div className='ms-5 mt-2 me-5'>
                    <div className='d-flex justify-content-between'>
                        <h2>Dashboard</h2>
                        <h2>Total Designs: {designerStatistics?.total_design}</h2>
                    </div>
                    <div className="row g-2">
                        {
                            designerDashboardFirstCards.map(item => <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                                <div className="card" style={{ backgroundColor: item.cardBackColor, border: `1px solid ${item.cardBackColor}` }}>
                                    <div className="card-body d-flex justify-content-center">
                                        <div>
                                            <div className='d-flex justify-content-center'><div className='border border-1' style={{ borderRadius: "50%", height: "45px", width: "45px", textAlign: "center", backgroundColor: item.iconBackColor }}><i className={`${item.icon} fs-3 ${item.id !== 3 ? "text-white" : "text-warning"}`}></i></div></div>
                                            <div className='fs-4 text-center my-0' style={{ color: item.iconBackColor }}>{(item.id===1 && `${designerStatistics?.total_approved}`) || (item.id===2 && `${designerStatistics?.total_unapproved}`) || (item.id===3 && `${designerStatistics?.total_rejected}`) }</div>
                                            <div className='text-center my-0'>
                                                <h5 className='my-0'>{item.name}</h5>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            }
            {
                (user?.role === "admin" || user?.role==='store')  && <div className="row g-2 mt-4">
                    <h1 className='fw-bold mb-4'>View All Designs Here:</h1>
                    {
                        allDesigns.map((item, index) => <div className='col-12 col-sm-6 col-md-4 col-lg-3' key={index}>
                            <div className="card" style={{ borderRadius: "10px", cursor: "pointer" }} >
                                {
                                    item.isPremium && <div className='d-flex justify-content-end'>
                                        <div style={{ position: "absolute", zIndex: "1000", top: "-7px" }}>
                                            <i className='bi bi-bookmark-star-fill text-warning fs-3'></i>
                                        </div>
                                    </div>
                                }

                                <div className={item.isPremium ? "imgCardPremium" : 'imgCard'}>
                                    <img src={item.image} alt="" />
                                </div>
                                <div className="card-body" style={{borderBottom:"0px"}}>
                                    <div className="d-flex justify-content-between">
                                        <h5 className='fw-bold'>{item?.title}</h5>
                                        <div>
                                            <span className='fs-3'>{item.likes.length}</span><span onClick={()=>handleReaction(item)}><i className={`bi ${item?.personReaction? "bi-heart-fill text-danger": "bi-heart"} fs-4`}></i></span>
                                        </div>
                                    </div>
                                    
                                    <div className='d-flex'>
                                        {
                                            item.tags.map((tagItem, tagIndex) => <div key={tagIndex} className='ps-2 pe-2 pt-1 pb-1 border rounded-4 mx-2 mt-3' style={{ backgroundColor: "#EBEBEB" }}>{tagItem}</div>)
                                        }
                                    </div>
                                    <div className='mt-2'>
                                        <h5>{item.isPremium ? item?.price + "₹" : "Free"}</h5>

                                    </div>
                                </div>
                                <div className="card-footer" style={{borderTop:"0px"}}>
                                    {
                                        user?.role === "admin" ? <button className='btn btn-warning w-100' onClick={() => navigate(`/specific-design?id=${item._id}`)}>View Details</button> : item?.isPremium ? <button className='btn btn-warning w-100' onClick={() => navigate('/availablePackage')}>Pay {item?.price}</button> : <button className='btn btn-warning w-100' onClick={() => navigate(`/specific-design?id=${item._id}`)}>View Details</button>
                                    }
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            }

        </div>
    );
};

export default Dashboard;