import React from 'react';
import useAxiosSecure from '../../CustomHook/useAxiosSecure/useAxiosSecure';
import toast from 'react-hot-toast';

const DeleteUser = ({DeleteUser, setDeleteUser, reload, setReload}) => {
    const [axiosSecure]= useAxiosSecure();
    const handleDelete= ()=>{
        axiosSecure.delete(`/deleteUser?user=${DeleteUser?.email}`)
        .then(res=>res.data)
        .then(data=>{
            if(data.deletedCount>=1){
                toast.success("Deleted successfully");
                setReload(!reload);
                setDeleteUser(null);
            }
        })
        .catch(error=>{
            toast.error(error.message);
        })
    }
    return (
        <div className='modal fade' id="DeleteUser" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content">
                    <div className="modal-body">
                        <p className='text-center'>Are you sure want to delete this?</p>
                        <div className='d-flex justify-content-evenly'>
                            <button className='btn btn-success' data-bs-dismiss="modal" onClick={()=>handleDelete()}>Yes</button>
                            <button className='btn btn-danger' data-bs-dismiss="modal"onClick={()=>setDeleteUser(null)}>No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteUser;