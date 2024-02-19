import React, { useContext, useState } from 'react';
import { toast } from "react-hot-toast";
import ClockLoader from 'react-spinners/ClockLoader';
import useAxiosSecure from '../../CustomHook/useAxiosSecure/useAxiosSecure';
import { SharedData } from '../../SharedData/SharedContext';


const AddUserForm = () => {
    const [roleName, setRoleName] = useState('');
    const [dataLoading, setDataLoading] = useState(false);
    const [storeName, setStoreName] = useState(null);
    const [axiosSecure] = useAxiosSecure();
    const { user } = useContext(SharedData);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (roleName === "") {
            toast.error("Select a account type");
            return;
        }
        const form = e.target;
        const first_name = form.firstName.value;
        const last_name = form.lastName.value;
        const email = form.email.value;
        const password = form.password.value;
        const state = form.state.value;
        const country = form.country.value;
        const phone_number = form.phoneNumber.value;
        const username = form.username.value;
        if (roleName === 'store' && storeName === null) {
            toast.error("Please enter a shop name");
            return;
        }
        if (roleName === 'store') {
            axiosSecure.post(`/addUser?user=${user?.email}`, { first_name, last_name, username, email, password, state, country, phone_number, coins: 0, storeName, role: roleName, is_staff: true, is_active: true, isPaid: false })
                .then(res => res.data)
                .then(data => {
                    if (data.message) {
                        toast.error(data.message);
                    }
                    if (data.acknowledged) {
                        toast.success("User added successfully");
                    }
                })
                .catch(error => {
                    toast.error(error.message);
                })
        }
        else {
            axiosSecure.post(`/addUser?user=${user?.email}`, {
                first_name, last_name, username, email, password, state, country, phone_number, role: roleName, is_staff: true, is_active: true
            })
                .then(res => res.data)
                .then(data => {
                    if (data.message) {
                        toast.error(data.message);
                    }
                    if (data.acknowledged) {
                        toast.success("User added successfully");
                    }
                })
                .catch(error => {
                    toast.error(error.message);
                })
        }
    }

    return (

        <div className='container-fluid'>
            <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                    <div className="card rounded rounded-3">
                        <div className="card-body">
                            <h5>Create user</h5>
                            <form className='form' onSubmit={handleSubmit}>
                                <div className='d-flex justify-content-evenly'>
                                    <div>
                                        <label htmlFor="firstName" className='form-label'>First name:</label>
                                        <div>
                                            <input type="text" className='form-control' name='firstName' placeholder='Enter your first name' required />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="lastName">Last name:</label>
                                        <div>
                                            <input type="text" className='form-control' name='lastName' placeholder='Enter your last name' required />
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-2 d-flex justify-content-evenly'>
                                    <div>
                                        <label htmlFor="email" className='form-label'>Email:</label>
                                        <div>
                                            <input type="email" className='form-control' name='email' placeholder='Enter your email' required />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password:</label>
                                        <div>
                                            <input type="password" className='form-control' name='password' placeholder='Enter your password' required />
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-2 d-flex justify-content-evenly'>
                                    <div>
                                        <label htmlFor="state" className='form-label'>State:</label>
                                        <div>
                                            <input type="text" className='form-control' name='state' placeholder='Enter your phone number' required />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="city">City:</label>
                                        <div>
                                            <input type="text" className='form-control' name='city' placeholder='Enter your city' required />
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-2 d-flex justify-content-evenly'>
                                    <div>
                                        <label htmlFor="phoneNumber" className='form-label'>Phone:</label>
                                        <div>
                                            <input type="text" className='form-control' name='phoneNumber' placeholder='Enter your phone number' required />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="country">Country:</label>
                                        <div>
                                            <input type="text" className='form-control' name='country' placeholder='Enter your country' required />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-evenly mt-2'>
                                    <div>
                                        <label htmlFor="username" className='form-label'>Username:</label>
                                        <div>
                                            <input type="text" className='form-control' name='username' placeholder="Enter a username" required />
                                        </div>
                                    </div>
                                    {
                                        roleName === 'store' && <div>
                                            <label htmlFor="storeName">Store name</label>
                                            <div>
                                                <input type="text" className='form-control' name='storeName' placeholder="Enter your store name" required onChange={(data) => setStoreName(data.target.value)} />
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className='d-flex justify-content-center mt-3'>
                                    <div className='form-check'>
                                        <label htmlFor="Role">Role</label>
                                        <div>
                                            <input type="radio" name='role' className='form-check-input' defaultValue={'designer'} onChange={(data) => setRoleName(data.target.value)} /><label htmlFor="Designer">Designer</label>
                                        </div>
                                        <div>
                                            <input type="radio" name='role' className='form-check-input' defaultValue={'store'} onChange={(data) => setRoleName(data.target.value)} /><label htmlFor="store">Normal User</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-3 d-flex justify-content-end'>
                                    <button type='submit' className='btn btn-primary w-25 d-flex justify-content-center' disabled={dataLoading ? true : false}>{dataLoading ? <ClockLoader size={24} color='white' /> : "Submit"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUserForm;