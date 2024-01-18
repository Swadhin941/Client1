import React from 'react';

const ViewUser = ({DesignerDetails}) => {
    return (
        <div className='modal fade' id='ViewUser' data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h5 className='text-center'>View User</h5>
                        <div>
                            <div className='d-flex justify-content-evenly'>
                                <p>First Name: {DesignerDetails?.first_name}</p>
                                <p>Last Name: {DesignerDetails?.last_name}</p>
                            </div>
                            <div>
                                <p className='text-center'>Email: {DesignerDetails?.email}</p>
                            </div>
                            <div className='d-flex justify-content-evenly'>
                                <div>
                                    <p>Phone: {DesignerDetails?.phone_number}</p>
                                </div>
                                <div>
                                    <p>City: {DesignerDetails?.city} </p>
                                </div>
                            </div>
                            <div className='d-flex justify-content-evenly'>
                                <div>
                                    <p>State: {DesignerDetails?.state}</p>
                                </div>
                                <div>
                                    <p>Country: {DesignerDetails?.country}</p>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-dark' data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewUser;