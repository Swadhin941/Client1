import React from 'react';

const ConfirmModal = ({setDecision}) => {

    return (
        <div className="modal fade" id='ConfirmModal' data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-sm modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <p className='text-center'>Are you sure want to do this?</p>
                        <div className='mt-2 d-flex justify-content-evenly'>
                            <button className='btn btn-success' data-bs-dismiss="modal" onClick={()=>setDecision(true)}>Confirm</button>
                            <button className='btn btn-danger' data-bs-dismiss="modal" onClick={()=>setDecision(false)}>Cancel</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ConfirmModal;