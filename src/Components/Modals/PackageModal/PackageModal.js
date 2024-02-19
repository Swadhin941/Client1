import React, { useContext } from 'react';
import useAxiosSecure from '../../CustomHook/useAxiosSecure/useAxiosSecure';
import toast from 'react-hot-toast';
import { SharedData } from '../../SharedData/SharedContext';

const PackageModal = ({reload, setReload}) => {
    const [axiosSecure]= useAxiosSecure();
    const {user}= useContext(SharedData);
    const handleSubmit= (e)=>{
        e.preventDefault();
        const form= e.target;
        const price = form.price.value;
        const coins= form.coins.value;
        const description= form.description.value;
        axiosSecure.post(`/postPackage?user=${user?.email}`, {
            price, coins, description
        })
        .then(res=>res.data)
        .then(data=>{
            if(data.acknowledged){
                toast.success("Package posted successfully");
                setReload(!reload);
            }
        })
        .catch(error=>{
            toast.error(error.message);
        })
    }
    return (
        <div className='modal fade' id='PackageModal' data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header" style={{borderBottom:"0px"}}>
                        <button className='btn btn-close' data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <h3 className='text-center'>Post a package</h3>
                        <form onSubmit={handleSubmit} className='form'>
                            <div>
                                <label htmlFor="coins">Coins:</label>
                                <div>
                                    <input type="text" className='form-control' name="coins" required />
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="price">Price:</label>
                                <div>
                                    <input type="text" className='form-control' name="price" required />
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="description">Description:</label>
                                <div>
                                    <textarea name="description" id="" className='form-control' rows="2" required style={{resize:"none"}}></textarea>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <button type='submit' className='btn btn-primary w-100' data-bs-dismiss="modal">Upload</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageModal;