import React from 'react';
import useAxiosSecure from '../../CustomHook/useAxiosSecure/useAxiosSecure';
import toast from 'react-hot-toast';

const EditUser = ({editUser, setEditUser, reload, setReload}) => {
    console.log(editUser);
    const [axiosSecure]= useAxiosSecure();
    const handleSubmit = (e)=>{
        e.preventDefault();
        const form = e.target;
        const first_name= form.firstName.value;
        const last_name= form.lastName.value;
        const phone_number= form.phoneNumber.value;
        axiosSecure.put('/updateUser', {
            first_name, last_name,phone_number, email: editUser?.email
        })
        .then(res=>res.data)
        .then(data=>{
            if(data.modifiedCount>=1){
                toast.success("User updated successfully");
                setReload(!reload);
                setEditUser(null);
            }
        })
        .catch(error=>{
            toast.error(error.message);
        })
    }
    return (
        <div className='modal fade' id='EditUser' data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} className='form'>
                            <div>
                                <label htmlFor="firstName">First name:</label>
                                <div className='input-group'>
                                    <input type="text" name='firstName' className='form-control' required />
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="lastName">Last name:</label>
                                <div className='input-group'>
                                    <input type="text" name='lastName' className='form-control' required />
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="username">Username:</label>
                                <div>
                                    <input type="text" name='username' className='form-control' required />
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="Phone">Phone:</label>
                                <div className='input-group'>
                                    <input type="text" name='phoneNumber' className='form-control' required />
                                </div>
                            </div>
                            <div className='mt-2 d-flex justify-content-evenly'>
                                <button type='submit' className='btn btn-success' data-bs-dismiss="modal">Save</button>
                                <p className='btn btn-danger m-0' data-bs-dismiss="modal" onClick={()=>setEditUser(null)}>Cancel</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUser;