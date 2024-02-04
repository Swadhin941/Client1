import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { SharedData } from '../../SharedData/SharedContext';
import useAxiosSecure from '../../CustomHook/useAxiosSecure/useAxiosSecure';
import toast from 'react-hot-toast';
import "../../Dashboard/Dashboard.css";
import useTitle from '../../CustomHook/useTitle/useTitle';

const ReviewDesigns = () => {
    useTitle("Lookaura- Review design");
    const { user } = useContext(SharedData);
    const [axiosSecure] = useAxiosSecure();
    const [searchParams, setSearchParams] = useSearchParams();
    const [allDesigns, setAllDesigns] = useState([]);
    const [temp, setTemp]= useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === "admin") {
            axiosSecure.post('/specificUnApprovedItems', {
                email: searchParams.get("user")
            })
                .then(res => res.data)
                .then(data => {
                    if (!data) {
                        navigate(`/${searchParams.get("user")}`)
                    }
                    else {
                        if (data.length === 0) {
                            navigate(-1);
                        }
                        else {
                            // console.log(data)
                            // setTemp(data);
                            setAllDesigns(data);
                        }
                    }
                    // console.log(data)
                })
                .catch(error => {
                    toast.error(error.message);
                })
        }
    }, [user])

    useEffect(()=>{
        if(temp.length!==0){
            console.log(temp);
        }
    },[temp])

    return (
        <div className='container-fluid'>
            <h2 className='fw-bold'>Unapproved Designs</h2>
            <div className="row mt-5">
                {
                   allDesigns.length!==0 &&  allDesigns.map((item, index) => <div className='col-12 col-sm-6 col-md-4 col-lg-3' key={index}>
                       <div className="card" style={{ borderRadius: "10px" }} onClick={() => navigate(`/Dashboard/specific-design?id=${item?._id}`)}>
                            {
                                item.isPremium && <div className='d-flex justify-content-end'>
                                    <div style={{ position: "absolute", zIndex: "1000", top: "-7px" }}>
                                        <i className='bi bi-bookmark-star-fill text-warning fs-3'></i>
                                    </div>
                                </div>
                            }

                            <div className={item?.isPremium ? "imgCardPremium" : 'imgCard'}>
                                <img src={item?.image} alt="" />
                            </div>
                            <div className="card-body">
                                <h5 className='fw-bold'>{item?.title}</h5>
                                <div className='d-flex' style={{flexWrap:"wrap"}}>
                                    {
                                        item?.tags.map((tagItem, tagIndex) => <div key={tagIndex} className='ps-2 pe-2 pt-1 pb-1 border rounded-4 mx-2 mt-3' style={{ backgroundColor: "#EBEBEB", fontSize:"10px" }}>{tagItem?.name || tagItem}</div>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>)
                }
                
            </div>
        </div>
    );
};

export default ReviewDesigns;