import React, { useContext, useEffect, useState } from 'react';
import { SharedData } from '../SharedData/SharedContext';
import SubscriptionModal from '../Modals/SubscriptionModal/SubscriptionModal';

const Subscription = () => {
    const { user } = useContext(SharedData);
    const [allSubscription, setAllSubscription]= useState([]);
    const [refetch, setRefetch]= useState(false);
    useEffect(() => {

    }, [refetch])
    return (
        <div className='container-fluid mt-4'>
            <div className="row">
                {
                    allSubscription.map((item, index)=><div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                        <div className="card">
                            <div className="card-body">

                            </div>
                        </div>
                    </div>)
                }
                <div className='col-12 col-sm-6 col-md-4 col-lg-3' title='Add Subscription'>
                    <div className="card d-flex justify-content-center align-items-center" data-bs-target="#SubscriptionModal" data-bs-toggle="modal" style={{ border: "1px dashed black", height: "300px", backgroundColor: "#dddddd", cursor: "pointer" }}>
                        <div>
                            <i className='bi bi-plus fs-1 text-muted fw-bold'>

                            </i>
                        </div>
                    </div>
                </div>
                <SubscriptionModal setRefetch={setRefetch} refetch={refetch}></SubscriptionModal>
            </div>
        </div>
    );
};

export default Subscription;