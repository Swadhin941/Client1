import React from 'react';
import useAxiosSecure from '../../CustomHook/useAxiosSecure/useAxiosSecure';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PriceModal = ({reload, setReload}) => {
    const [axiosSecure]= useAxiosSecure();
    const [searchParams, setSearchParams]= useSearchParams();
    const navigate = useNavigate();
    const handleSubmit= (e)=>{
        e.preventDefault();
        const form = e.target;
        const price = form.price.value;
        console.log(searchParams.get("id"), price);
        axiosSecure.put(`/approveDesign?id=${searchParams.get("id")}`,{
            isApproved: true, price: price
        })
        .then(res=>res.data)
        .then(data=>{
            if(data.modifiedCount>=1){
                setReload(!reload)
                navigate(-1);
            }
        })
    }
    return (
        <div className='modal fade' id='PriceModal' data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-sm modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} className='form'>
                            <div>
                                <input type="text" className='form-control' name='price' required placeholder='Enter Price' />
                            </div>
                            <div className='mt-2 d-flex justify-content-evenly'>
                                <button type='submit' className='btn btn-success' data-bs-dismiss="modal">Approve</button>
                                <p className='btn btn-danger m-0' data-bs-dismiss="modal">Cancel</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceModal;