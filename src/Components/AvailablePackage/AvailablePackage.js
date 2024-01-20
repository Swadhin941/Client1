import React, { useContext, useEffect, useState } from 'react';
import { SharedData } from '../SharedData/SharedContext';
import useAxiosSecure from '../CustomHook/useAxiosSecure/useAxiosSecure';
import toast from 'react-hot-toast';
import PackageModal from '../Modals/PackageModal/PackageModal';
import Spinner from '../Spinner/Spinner';

const AvailablePackage = () => {
    const { user } = useContext(SharedData);
    const [availablePackage, setAvailablePackage] = useState([]);
    const [reload, setReload] = useState(false);
    const [axiosSecure] = useAxiosSecure();
    const [dataLoading, setDataLoading]= useState(false);

    useEffect(() => {
        if (user !== false) {
            setDataLoading(true);
            axiosSecure.get('/allPackage')
                .then(res => res.data)
                .then(data => {
                    setAvailablePackage(data);
                    setDataLoading(false);
                })
                .catch(error => {
                    toast.error(error.message);
                    setDataLoading(false);
                })
        }
    }, [user, reload])

    if(dataLoading){
        return <Spinner></Spinner>
    }

    return (
        <div className='container-fluid m-4'>
            <div className="row g-3">
                {
                    availablePackage.length!==0 && availablePackage.map(item=><div className='col-12 col-sm-6 col-md-4 col-lg-3' key={item?._id}>
                        <div className="card" style={{height:"300px"}}>
                            <div className="card-body" style={{borderBottom:"0px"}}>
                                <h2 className='text-center text-muted my-0'>{item?.coins} </h2>
                                <p className='my-0 text-center'>Coins</p>
                                <div className='mt-2'>
                                    <span>Description: {item?.description}</span>
                                </div>
                                
                            </div>
                            <div className="card-footer" style={{borderTop:"0px"}}>
                                <div className='mt-2'>
                                    <button className='btn btn-primary w-100'>Pay ₹{item.price}</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
                {
                    user?.role === "admin" && <div className="col-12 col-sm-6 col-md-4 col-lg-3" title='Add Package'>
                        <div className="card d-flex justify-content-center align-items-center" data-bs-target="#PackageModal" data-bs-toggle="modal" style={{ border: "1px dashed black", height: "300px", backgroundColor: "#dddddd", cursor: "pointer" }}>
                            <div>
                                <i className='bi bi-plus fs-1 text-muted fw-bold'>

                                </i>
                            </div>
                        </div>
                    </div>
                }
                
                <PackageModal reload={reload} setReload={setReload}></PackageModal>
            </div>
        </div>
    );
};

export default AvailablePackage;