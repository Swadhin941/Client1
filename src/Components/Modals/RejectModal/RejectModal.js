import React, { useContext } from 'react';
import useAxiosSecure from '../../CustomHook/useAxiosSecure/useAxiosSecure';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { SharedData } from '../../SharedData/SharedContext';

const RejectModal = ({ reload, setReload }) => {
    const { user } = useContext(SharedData);
    const [axiosSecure] = useAxiosSecure();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const handleReject = () => {
        axiosSecure.put(`/approveDesign?id=${searchParams.get('id')}&&user=${user?.email}`, {
            isRejected: true
        })
            .then(res => res.data)
            .then(data => {
                if (data.modifiedCount >= 1) {
                    setReload(!reload);
                    navigate(-1);
                }
            })
            .catch(error => {
                toast.error(error.message);
            })
    }
    return (
        <div className='modal fade' id='#RejectModal' data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-sm modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <p className='text-center'>Are you sure want to reject it?</p>
                        <div className='mt-2 d-flex justify-content-evenly'>
                            <button className='btn btn-success' data-bs-dismiss="modal" onClick={handleReject}>Confirm</button>
                            <button className='btn btn-danger' data-bs-dismiss="modal"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RejectModal;