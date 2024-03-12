import React, { useContext, useState } from 'react';
import { SharedData } from '../../SharedData/SharedContext';
import useAxiosSecure from '../../CustomHook/useAxiosSecure/useAxiosSecure';
import toast from 'react-hot-toast';
import ClockLoader from 'react-spinners/ClockLoader';
import AWS from "aws-sdk";

const ProfileModal = () => {
    const { user, setUser } = useContext(SharedData);
    const [showPasswordInputs, setShowPasswordInputs] = useState(false);
    const [axiosSecure] = useAxiosSecure();
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [tempPicture, setTempPicture]= useState(null);
    const [photoLoading, setPhotoLoading]= useState(false);
    const s3 =new AWS.S3({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
        region: process.env.REACT_APP_REGION
    })

    const handleUploadPhoto= (e)=>{
        if (e.target.files[0].type.split('/')[1].toLowerCase() === 'jpg' || e.target.files[0].type.split('/')[1].toLowerCase() === 'png' || e.target.files[0].type.split('/')[1].toLowerCase() === 'jpeg'){
            setTempPicture(e.target.files[0]);
        }
        else{
            toast.error("Image should be in jpg, png or jpeg format only");
            return;
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setPasswordLoading(true);
        axiosSecure.put(`/changePassword?user=${user?.email}`, {
            password: e.target.password.value
        })
            .then(res => res.data)
            .then(data => {
                if (data.modifiedCount >= 1) {
                    toast.success("Password changed");
                    let temp = { ...user };
                    temp.password = e.target.password.value;
                    setUser(temp);
                    setPasswordLoading(false);
                    e.target.reset();
                    setShowPasswordInputs(false);
                }
            })
            .catch(error => {
                toast.error(error.message);
                setPasswordLoading(false);
            })
    }

    const handlePictureSave= async()=>{
        setPhotoLoading(true);
        const params = {
            Bucket: process.env.REACT_APP_BUCKET,
            Key: tempPicture?.name,
            Body: tempPicture
        }
        try{
            const response = await s3.upload(params).promise()
            if(response.Location){
                axiosSecure.put(`/changePassword?user=${user?.email}`, {
                    photoURL: response.Location
                })
                    .then(res => res.data)
                    .then(data => {
                        if (data.modifiedCount >= 1) {
                            let temp = { ...user };
                            temp.photoURL = response.Location;
                            setUser(temp);
                            setPhotoLoading(false)
                            setTempPicture(null);
                        }
                    })
                    .catch(error => {
                        toast.error(error.message);
                        setPhotoLoading(false);
                    })
            }
        }
        catch(error){
            console.log(error.message);
            toast.error(error.message);
            setPhotoLoading(false);
        }
    }

    return (
        <div className='modal fade' id='ProfileModal' data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-sm modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header" style={{ borderBottom: "0px" }}>
                        <button className='btn btn-close' data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className='d-flex justify-content-center'>
                            <div>
                                <div style={{ height: "90px", width: "90px" }} onClick={()=>document.querySelector(".changePhoto").click()}>
                                    <img src={tempPicture ? URL.createObjectURL(tempPicture): user?.photoURL ? user?.photoURL : "https://i.ibb.co/bmVqbdY/empty-person.jpg"} alt="" height={'90px'} width={"90px"} style={{ borderRadius: "50%" }} />
                                </div>
                                
                                
                            </div>
                        </div>
                        {
                            tempPicture && <div className='d-flex justify-content-evenly mt-3'>
                                <button className='btn btn-success d-flex justify-content-center mx-2' style={{ width: "80px" }} onClick={()=>handlePictureSave()}>{photoLoading ? <ClockLoader size={24} color="white" /> : "Save"}</button>
                                <button className="btn btn-danger" onClick={() => setTempPicture(null)}>Cancel</button>
                            </div>
                        }
                        <input type="file" name='changePhoto' className='changePhoto' hidden onChange={handleUploadPhoto} />
                        <div className='d-flex justify-content-center'>
                            <h5>{user?.username}</h5>
                        </div>
                        <div>
                            <p>Email: {user?.email}</p>
                            <p>City: {user?.city}</p>
                            <p>Phone: {user?.phone_number}</p>
                            <p>State: {user?.state}</p>
                            <p>Country: {user?.country}</p>
                        </div>
                        <div className='mt-2 d-flex'>
                            <p>Password: {passwordLoading? <ClockLoader size={20} color='black' />: user?.password}</p><span className='ms-2' onClick={() => setShowPasswordInputs(!showPasswordInputs)}><i className='bi bi-box-arrow-down-left'></i></span>
                        </div>
                        {
                            showPasswordInputs && <div className='mt-2'>
                                <form className='form' onSubmit={handleSubmit}>
                                    <div>
                                        <input type="password" name='password' className='form-control' required />
                                    </div>
                                    <button type='submit' className='btn btn-success mt-2 w-100 d-flex justify-content-center'>{passwordLoading ? <ClockLoader size={24} color='white' /> :"Change password"}</button>
                                </form>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;