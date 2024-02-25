import React, { useState } from 'react';
import useAxiosSecure from '../../CustomHook/useAxiosSecure/useAxiosSecure';
import toast from 'react-hot-toast';
import ClockLoader from 'react-spinners/ClockLoader';

const SubscriptionModal = ({setRefetch, refetch}) => {
    const [saveLoading, setSaveLoading] = useState(false);
    const [axiosSecure] = useAxiosSecure();
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const fees= form.fees.value;
        const coins= form.coins.value;
        const month = form.month.value;
        const description= form.description.value;
        setSaveLoading(true);
        axiosSecure.post('/postSubscription',{
            fees, coins, month, description
        })
        .then(res=>res.data)
        .then(data=>{
            if(data.acknowledged){
                setSaveLoading(false);
                form.reset();
                toast.success("Subscriptions updated successfully");
                setRefetch(!refetch);
            }
            
        })
        .catch(error=>{
            setSaveLoading(false);
            toast.error(error.message);
        })
    }
    return (
        <div className='modal fade' id='SubscriptionModal' data-bs-keyboard="false" data-bs-backdrop="static">
            <div className="modal-dialog modal-sm modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header" style={{ borderBottom: "0px" }}>
                        <button className='btn btn-close' data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <form className='form' onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="fee" className='form-label'>Subscription Fee:</label>
                                <div className='input-group'>
                                    <input type="text" className='form-control' name='fees' placeholder='Fees' required/>
                                </div>
                            </div>
                            <div className="mt-2">
                                <label htmlFor="coins">Coins:</label>
                                <div className='input-group'>
                                    <input type="text" name='coins' className='form-control' placeholder='Coins' required/>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="month">Month:</label>
                                <div className='input-group'>
                                    <input type="text" className='form-control' name='month' placeholder='Enter total number of month' required/>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="description">Description:</label>
                                <div className='input-group'>
                                    <textarea name="description" id="description" rows="2" className='form-control' style={{ resize: "none" }} placeholder='Description' required></textarea>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <button className='btn btn-primary w-100 d-flex justify-content-center' data-bs-dismiss="modal">{saveLoading? <ClockLoader color='white' size={24} />:"Save"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionModal;