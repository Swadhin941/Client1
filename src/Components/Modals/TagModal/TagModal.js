import React, { useContext, useEffect, useState } from 'react';
import { SharedData } from '../../SharedData/SharedContext';
import useAxiosSecure from '../../CustomHook/useAxiosSecure/useAxiosSecure';
import "./TagModal.css";
import toast from 'react-hot-toast';
import ClockLoader from 'react-spinners/ClockLoader';

const TagModal = () => {
    const { user } = useContext(SharedData);
    const [allTag, setAllTag] = useState([]);
    const [axiosSecure] = useAxiosSecure();
    const [showInput, setShowInput] = useState(false);
    const [tagLoading, setTagLoading] = useState(false);
    const [allSelectedTag, setAllSelectedTag] = useState([]);

    useEffect(() => {
        axiosSecure.get("/allTag")
            .then(res => res.data)
            .then(data => {
                setAllTag(data);
            })
            .catch(error=>{
                toast.error(error.message)
            })
    }, [])

    


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const tagName = form.tag.value;
        setTagLoading(true);
        axiosSecure.post('/addTag', { name: tagName })
            .then(res => res.data)
            .then(data => {
                if (data.acknowledged) {
                    let temp = { name: tagName };
                    setAllTag([...allTag, temp]);
                    form.reset();
                    setTagLoading(false);
                    setShowInput(false);
                }
            })
            .catch(error => {
                toast.error(error.message);
                setTagLoading(false);
            })
    }

    const handleRemoveTag= (item)=>{
        let temp = allTag.filter((data)=>data.name!== item.name);
        axiosSecure.delete(`/delete-tag?name=${item.name}`)
        .then(res=>res.data)
        .then(data=>{
            if(data.deletedCount>=1){
                setAllTag(temp);
                toast.success("Tag deleted successfully");
            }
        })
        .catch(error=>{
            toast.error(error.message);
        })
    }

    

    return (
        <div className='modal fade' id='TagModal' data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header" style={{ borderBottom: "0px" }}>
                        <button className='btn btn-close' data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        {
                            user?.role === "admin" && <><div className='d-flex justify-content-evenly' style={{ flexWrap: "wrap" }}>
                                {
                                    allTag.length === 0 ? <div className='d-flex justify-content-center'>No Tags available currently</div> : allTag.map((item, index) => <div className='bg-dark text-white d-flex p-2 m-1' style={{ borderRadius: "10px" }} key={index}>
                                        <div>
                                            <h6 className='my-0'>{item.name}</h6>
                                        </div>
                                        <div className='ms-2 '>
                                            <i className='bi bi-x-circle-fill fs-6' onClick={() => handleRemoveTag(item)}></i>
                                        </div>
                                    </div>)
                                }
                                <div className='p-2 border border-1' onClick={() => setShowInput(!showInput)} style={{ backgroundColor: "#e0e0e0", borderRadius: "10px" }}>
                                    <i className={`bi ${showInput ? " bi-dash-lg" : "bi-plus-lg"}`}></i>
                                </div>
                            </div>
                                {
                                    showInput && <div className='mt-2'>
                                        <form onSubmit={handleSubmit}>
                                            <input type="text" name='tag' className='form-control' />
                                            <div className='mt-2'>
                                                <button type='submit' className='btn btn-success w-100 d-flex justify-content-center' disabled={tagLoading ? true : false}>{tagLoading ? <ClockLoader size={24} color='white' /> : "Add Tag"}</button>
                                            </div>
                                        </form>
                                    </div>
                                }
                            </> 
                        }

                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TagModal;