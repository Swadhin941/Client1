import React, { useContext, useEffect, useState } from 'react';
import { SharedData } from '../../SharedData/SharedContext';
import useAxiosSecure from '../../CustomHook/useAxiosSecure/useAxiosSecure';
import toast from 'react-hot-toast';

const DesignerTagModal = ({ tags, setTags }) => {
    const { user } = useContext(SharedData);
    const [axiosSecure] = useAxiosSecure();
    const [allTag, setAllTag] = useState([]);
    const [allSelectedTag, setAllSelectedTag] = useState([])

    useEffect(() => {
        axiosSecure.get("/allTag")
            .then(res => res.data)
            .then(data => {
                if (user?.role === "designer") {
                    data.forEach(element => {
                        let findName = tags.find(nameData => nameData.name === element.name);
                        if (findName) {
                            element.selected = true;
                        }
                    })
                }
                setAllTag(data);
            })
            .catch(error=>{
                toast.error(error.message);
            })
    }, [])

    const handleClick = (item) => {
        if (item?.selected) {
            let temp = [...allTag];
            let tempTag = allSelectedTag.filter(data => data.name !== item.name);
            setAllSelectedTag([...tempTag]);
            temp.forEach(element => {
                if (element.name === item.name) {
                    delete element.selected
                }
            })
            setAllTag([...temp]);
        }

        else {
            let temp = [...allTag];
            setAllSelectedTag([...allSelectedTag, { ...item }])
            temp.forEach(element => {
                if (element.name === item?.name) {
                    element.selected = true;
                }
            })
            setAllTag([...temp]);
        }
    }

    return (
        <div className='modal fade' id='DesignerTagModal' data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centred modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header" style={{ borderBottom: "0px" }}>
                        <button className='btn btn-close' data-bs-dismiss="modal" onClick={() => setTags([...allSelectedTag])}></button>
                    </div>
                    <div className="modal-body">
                        {
                            user?.role === "designer" && <>
                                <div className='d-flex justify-content-evenly' style={{ flexWrap: "wrap" }}>
                                    {
                                        allTag.map((item, index) => <div onClick={() => handleClick(item)} key={index} className={`p-2 m-2 ${item?.selected ? "selectedTag" : "unSelectedTag"}`} style={{ backgroundColor: "#e0e0e0", borderRadius: "10px", cursor: "pointer" }}>
                                            {item.name}
                                        </div>)
                                    }
                                </div>
                                <div className='mt-2 d-flex justify-content-end'>
                                    <button className='btn btn-success' onClick={() => setTags([...allSelectedTag])} data-bs-dismiss="modal">Add</button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesignerTagModal;