import React, { useContext, useEffect, useState } from 'react';
import { SharedData } from '../../SharedData/SharedContext';
import useAxiosSecure from '../../CustomHook/useAxiosSecure/useAxiosSecure';
import ViewUser from '../../Modals/ViewUser/ViewUser';
import { useNavigate } from 'react-router-dom';

const ApproveRequest = () => {
    const { user } = useContext(SharedData);
    const [approveDesign, setApproveDesign] = useState([]);
    const [totalApproveDesign, setTotalApproveDesign]= useState(0);
    const [designerDetails, setDesignerDetails] = useState(null);
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            axiosSecure.get(`/reviewDesigns?user=${user?.email}`)
            .then(res=>res.data)
            .then(data=>{
                // console.log(data);
                let count=0;
                data.forEach(element=>{
                    count+= element.total_unapproved
                })
                setTotalApproveDesign(count);
                setApproveDesign(data);
            })
        }
    }, [user])
    return (
        <div className='container-fluid'>
            {
                approveDesign.length === 0 ? <div className='d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
                    <div className='bg-dark p-5' style={{height:"350px", width:"100%", borderRadius:"10px"}}>
                        <h2 className='text-white fw-bold text-center'>Nothing to approve</h2>
                    </div>
                </div> : <><div className="row mt-5">
                    <div className="col-12 col-md-12 col-lg-12">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <div className='d-flex justify-content-center'>
                                    <h2 className='fw-bold'>Total pending reviews: {totalApproveDesign} </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>

                    </div>
                    {
                        approveDesign.map((item, index) => <div key={index} className='col-12 col-md-12 col-lg-12'>
                            <div className="card">
                                <div className="card-body d-flex justify-content-between">
                                    <div>
                                        <p style={{ fontWeight: "600" }}>Name: {item.first_name + " " + item.last_name}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <div className='mx-4'>
                                            <p>Pending reviews: {item.total_unapproved}</p>
                                        </div>
                                        <div className='mx-4'>
                                            <button className='btn btn-dark' data-bs-toggle="modal" data-bs-target="#ViewUser" onClick={() => setDesignerDetails(item)}>Designer Details</button>
                                        </div>
                                        <div className='mx-4'>
                                            <button className='btn btn-outline-dark' onClick={() => navigate(`/Dashboard/review-designs?user=${item?.email}`)}>Review</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
                    <ViewUser DesignerDetails={designerDetails}></ViewUser>
                    </> 
            }
            
        </div>
    );
};

export default ApproveRequest;