import React, { useContext, useEffect, useState } from 'react';
import { SharedData } from '../SharedData/SharedContext';
import useTitle from '../CustomHook/useTitle/useTitle';
import useAxiosSecure from '../CustomHook/useAxiosSecure/useAxiosSecure';
import toast from 'react-hot-toast';
import "./Dashboard.css";
import { Link, useNavigate } from 'react-router-dom';
import TagModal from '../Modals/TagModal/TagModal';
import ConfirmModal from '../Modals/ConfirmModal/ConfirmModal';
import DataSpinner from '../DataSpinner/DataSpinner';

const Dashboard = () => {
    useTitle("Lookaura- Dashboard");
    const { user, setUser } = useContext(SharedData);
    const [allDesigns, setAllDesigns] = useState([]);
    const [adminStatistics, setAdminStatistics] = useState(null);
    const [designerStatistics, setDesignerStatistics] = useState(null);
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const [filterValue, setFilterValue] = useState('');
    const [allTag, setAllTag] = useState([]);
    const [decision, setDecision] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [reload, setReload] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [allDataLoading, setAllDataLoading]= useState(false);

    useEffect(() => {
        if (user?.role === 'admin') {
            setDataLoading(true);
            axiosSecure.get(`/adminStatistics?user=${user?.email}`)
                .then(res => res.data)
                .then(data => {
                    setAdminStatistics(data);
                    setDataLoading(false);
                })
                .catch(error => {
                    setDataLoading(false);
                    toast.error(error.message)
                })
        }
        if (user?.role === 'designer') {
            setDataLoading(true);
            axiosSecure.get(`/designerStatistics?user=${user?.email}`)
                .then(res => res.data)
                .then(data => {
                    setDataLoading(false);
                    // console.log(data);
                    setDesignerStatistics(data);
                })
                .catch(error => {
                    toast.error(error.message);
                })
        }

    }, [user])
    // console.log(user);
    useEffect(() => {
        // console.log(filterValue);
        if (user?.role === "admin") {
            setAllDataLoading(true);
            axiosSecure.get(`/allDesignsForAdmin?search=${filterValue}&&user=${user?.email}`)
                .then(res => res.data)
                .then(data => {
                    // console.log(data);
                    setAllDesigns(data);
                    setAllDataLoading(false);
                })
                .catch(error => {
                    setAllDataLoading(false);
                    toast.error(error.message);
                })
        }
        if (user?.role === 'store') {
            setAllDataLoading(true);
            axiosSecure.get(`/viewAllDesigns?search=${filterValue}&&user=${user?.email}`)
                .then(res => res.data)
                .then(data => {
                    setAllDesigns(data);
                    setAllDataLoading(false);
                })
        }
    }, [user, filterValue, reload])

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

    const handleReaction = (item) => {
        if (item?.personReaction) {
            let temp = item.likes.filter(data => data.email !== user?.email);
            let temp2 = [...allDesigns];
            temp2.forEach(element => {
                if (element._id === item?._id) {
                    element.likes = [...temp];
                    delete element?.personReaction
                }
            })
            setAllDesigns([...temp2]);

            axiosSecure.put(`/productReaction?id=${item._id}&&user=${user?.email}`, { likes: temp })
                .then(res => res.data)
                .then(data => {
                    if (data.modifiedCount >= 1) {
                    }
                })
                .catch(error => {
                    toast.error(error.message);
                })
        }
        else {
            let temp2 = [...allDesigns];
            temp2.forEach(element => {
                if (element._id === item._id) {
                    element.likes = [...element.likes, { email: user?.email }];
                    element.personReaction = true
                }
            })
            // console.log(192,temp2);
            setAllDesigns([...temp2]);
            let temp = [...item.likes]
            axiosSecure.put(`/productReaction?id=${item?._id}&&user=${user?.email}`, { likes: temp })
                .then(res => res.data)
                .then(data => {
                    if (data.modifiedCount >= 1) {

                    }
                })
                .catch(error => {
                    toast.error(error.message);
                })
        }

    }

    useEffect(() => {
        axiosSecure.get("/allTag")
            .then(res => res.data)
            .then(data => {
                setAllTag(data);
            })
            .catch(error => {
                toast.error(error.message);
            })
    }, [])


    const handleNavigate = (item) => {
        if (user?.role === "store" && item?.isPremium) {
            navigate(`/Dashboard/specific-design?id=${item._id}`)
        }
    }

    useEffect(() => {
        if (decision) {
            axiosSecure.put(`/updateProduct?user=${user?.email}`, { buyerEmail: user?.email, isSold: true, _id: selectedItem?._id, remainingCoins: parseInt(user?.coins) - parseInt(selectedItem?.price) })
                .then(res => res.data)
                .then(data => {
                    if (data.modifiedCount >= 1) {
                        let temp = { ...user };
                        temp.coins = parseInt(user?.coins) - parseInt(selectedItem?.price)
                        setUser(temp);
                        toast.success("Product purchased successfully");
                        setReload(!reload);
                        setDecision(false);
                    }
                })
        }
        else {
            setSelectedItem(null);
        }
    }, [decision])
    // console.log(dataLoading);

    return (
        <div className='container-fluid'>
            <div className='d-flex justify-content-between mt-2 mb-2'>
                <h2 className='m-0'>Hi, {user?.username}</h2>
                {
                    user?.role === "admin" && <button className='btn btn-primary' data-bs-target="#TagModal" data-bs-toggle="modal">All Tags</button>
                }
            </div>
            <TagModal></TagModal>
            {
                dataLoading ? <DataSpinner></DataSpinner> : user?.role === 'admin' && <div className="row g-2">
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
                dataLoading ? <DataSpinner></DataSpinner> : user?.role === 'admin' && <div className="row g-2">
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
                user?.role === "designer" && 
                    <div className='ms-5 mt-2 me-5'>
                        <div className='d-flex justify-content-between'>
                            <h2>Dashboard</h2>
                            <h2>Total Designs: {designerStatistics?.total_design}</h2>
                        </div>
                        <div className="row g-2">
                            {
                                designerDashboardFirstCards.map((item, index) => <div className="col-12 col-md-6 col-lg-4" key={index}>
                                    <div className="card" style={{ backgroundColor: item.cardBackColor, border: `1px solid ${item.cardBackColor}` }}>
                                        <div className="card-body d-flex justify-content-center">
                                            <div>
                                                <div className='d-flex justify-content-center'><div className='border border-1' style={{ borderRadius: "50%", height: "45px", width: "45px", textAlign: "center", backgroundColor: item.iconBackColor }}><i className={`${item.icon} fs-3 ${item.id !== 3 ? "text-white" : "text-warning"}`}></i></div></div>
                                                <div className='fs-4 text-center my-0' style={{ color: item.iconBackColor }}>{(item.id === 1 && `${designerStatistics?.total_approved}`) || (item.id === 2 && `${designerStatistics?.total_unapproved}`) || (item.id === 3 && `${designerStatistics?.total_rejected}`)}</div>
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
                (user?.role === "admin" || (user?.role === 'store' && user?.isPaid)) && <div className="row g-2 mt-4">
                    <div className='d-flex justify-content-between'>
                        <h1 className='fw-bold mb-4'>View All Designs Here:</h1>
                        <div>
                            <select name="filter" id="" defaultValue={"default"} className='form-select' onChange={(data) => {
                                if (data.target.value === 'default') {
                                    setFilterValue('')
                                }
                                else {
                                    setFilterValue(data.target.value);
                                }
                            }}>
                                <option value="default">All</option>
                                {
                                    allTag.map((item, index) => <option value={item.name} key={index}>{item.name}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    
                    {
                        allDataLoading ? <DataSpinner></DataSpinner> : allDesigns.length === 0 ? <div className='d-flex justify-content-center align-items-center' style={{ border: "1px dashed gray", height: "200px", backgroundColor:"#DDDDDD", borderRadius:"10px",marginBottom:"10px"}}><h1 className='fw-bolder' style={{color:"whitesmoke"}}>No data found</h1></div> :allDesigns.map((item, index) => <div className='col-12 col-sm-6 col-md-4 col-lg-3' key={index}>
                            <div className="card" style={{ borderRadius: "10px", cursor: "pointer" }} >
                                {
                                    item.isPremium && <div className='d-flex justify-content-end'>
                                        <div style={{ position: "absolute", zIndex: "1000", top: "-7px" }}>
                                            <i className='bi bi-bookmark-star-fill text-warning fs-3'></i>
                                        </div>
                                    </div>
                                }

                                <div className={item.isPremium ? "imgCardPremium" : 'imgCard'} onClick={() => handleNavigate(item)}>
                                    <img src={item.image} alt="" />
                                </div>
                                <div className="card-body" style={{ borderBottom: "0px" }}>
                                    <div className="d-flex justify-content-between">
                                        <h5 className='fw-bold' onClick={() => handleNavigate(item)}>{item?.title}</h5>
                                        <div>
                                            <span className='fs-3'>{item.likes.length}</span><span onClick={() => handleReaction(item)}><i className={`bi ${item?.personReaction ? "bi-heart-fill text-danger" : "bi-heart"} fs-4`}></i></span>
                                        </div>
                                    </div>

                                    <div className='d-flex' onClick={() => handleNavigate(item)} style={{ flexWrap: "wrap" }}>
                                        {
                                            item.tags.map((tagItem, tagIndex) => <div key={tagIndex} className='ps-2 pe-2 pt-1 pb-1 border rounded-4 mx-2 mt-3' style={{ backgroundColor: "#EBEBEB", fontSize: "10px" }}>{tagItem?.name || tagItem}</div>)
                                        }
                                    </div>
                                    <div className='mt-2'>
                                        <h5>{item.isPremium ? item?.price + "₹" : "Free"}</h5>

                                    </div>
                                </div>
                                <div className="card-footer" style={{ borderTop: "0px" }}>
                                    {
                                        user?.role === "admin" ? <button className='btn btn-warning w-100' onClick={() => navigate(`/Dashboard/specific-design?id=${item._id}`)}>View Details</button> : item?.isPremium ? user?.coins >= parseInt(item?.price) ? <button className='btn btn-warning w-100' data-bs-target="#ConfirmModal" data-bs-toggle="modal" onClick={() => setSelectedItem(item)}>Pay {item?.price}</button> : <button className='btn btn-warning w-100' onClick={() => navigate('/Dashboard/availablePackage')}>Pay {item?.price}</button> : <button className='btn btn-warning w-100' onClick={() => navigate(`/Dashboard/specific-design?id=${item._id}`)}>View Details</button>
                                    }
                                </div>
                            </div>
                        </div>)
                    }
                    <ConfirmModal setDecision={setDecision}></ConfirmModal>

                </div>

            }

            {
                user?.role === 'store' && !user?.subscription && <>
                    <div className='d-flex justify-content-center align-items-center mt-5' style={{ color: "white" }}>
                        <h2 className='fw-bold text-primary'>Please buy your subscription to access the designs.</h2>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button className='btn btn-primary' onClick={() => navigate('/Dashboard/subscriptions')}>Buy subscription</button>
                    </div>
                </>

            }
        </div>
    );
};

export default Dashboard;