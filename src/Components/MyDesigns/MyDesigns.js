import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../CustomHook/useAxiosSecure/useAxiosSecure';
import { SharedData } from '../SharedData/SharedContext';
import "../Dashboard/Dashboard.css";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MyDesigns = () => {
    const [allDesigns, setAllDesigns] = useState([]);
    const { user } = useContext(SharedData);
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();


    useEffect(() => {
        if (user?.role === 'designer') {
            axiosSecure.get('/myDesigns')
                .then(res => res.data)
                .then(data => {
                    setAllDesigns(data);
                })
        }
    }, [user])

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
            setAllDesigns(temp2);

            axiosSecure.put(`/productReaction?id=${item._id}`, { likes: temp })
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
            setAllDesigns(temp2);
            let temp = [...item.likes]
            axiosSecure.put(`/productReaction?id=${item?._id}`, { likes: temp })
                .then(res => res.data)
                .then(data => {
                    if (data.modifiedCount >= 1) {

                    }
                })
        }

    }

    return (
        <div className={`container-fluid ${allDesigns.length === 0 && "d-flex justify-content-center align-items-center"}`} style={{ height: "100%" }}>
            {
                allDesigns.length === 0 ? <div className='d-flex justify-content-center align-items-center bg-dark' style={{ height: "300px", width: "100%", borderRadius: "10px" }}>
                    <h1 className='text-white'>No Designs</h1>
                </div> : <div className='row'>
                    <h2 className='fw-bold mb-5'>My Designs</h2>
                    {
                        allDesigns.map((item, index) => <div className='col-12 col-sm-6 col-md-4 col-lg-3' key={index}>
                            <div className="card" style={{ borderRadius: "10px", cursor: "pointer", }} >
                                {
                                    item.isPremium && <div className='d-flex justify-content-end'>
                                        <div style={{ position: "absolute", zIndex: "1000", top: "-7px" }}>
                                            <i className='bi bi-bookmark-star-fill text-warning fs-3'></i>
                                        </div>
                                    </div>
                                }

                                <div className={item.isPremium ? "imgCard" : 'imgCard'}>
                                    <img src={item.image} alt="" />
                                </div>
                                <div className="card-body" style={{ borderBottom: "0px" }}>
                                    <div className="d-flex justify-content-between">
                                        <h5 className='fw-bold'>{item?.title}</h5>
                                        <div>
                                            <span className='fs-3'>{item.likes.length}</span><span onClick={() => handleReaction(item)}><i className={`bi ${item?.personReaction ? "bi-heart-fill text-danger" : "bi-heart"} fs-4`}></i></span>
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
                                <div className="card-footer" style={{ borderTop: "0px" }}>
                                    <button className='btn btn-warning w-100' onClick={() => navigate(`/Dashboard/specific-design?id=${item._id}`)}>View Details</button>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            }
        </div>
    );
};

export default MyDesigns;