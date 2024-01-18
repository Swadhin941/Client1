import React, { useContext, useEffect, useState } from 'react';
import { SharedData } from '../../SharedData/SharedContext';
import useAxiosSecure from '../../CustomHook/useAxiosSecure/useAxiosSecure';

const TagModal = () => {
    const { user } = useContext(SharedData);
    const [allTag, setAllTag] = useState([]);
    const [axiosSecure] = useAxiosSecure();

    useEffect(() => {

    }, [])

    return (
        <div className='modal fade' id='TagModal' data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TagModal;