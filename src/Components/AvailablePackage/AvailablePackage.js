import React, { useContext, useEffect, useState } from 'react';
import { SharedData } from '../SharedData/SharedContext';
import useAxiosSecure from '../CustomHook/useAxiosSecure/useAxiosSecure';
import toast from 'react-hot-toast';
import PackageModal from '../Modals/PackageModal/PackageModal';
import Spinner from '../Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import useTitle from '../CustomHook/useTitle/useTitle';

const AvailablePackage = () => {
    useTitle("Lookaura- Available Package");
    const { user, forceLoading, setForceLoading } = useContext(SharedData);
    const [availablePackage, setAvailablePackage] = useState([]);
    const [reload, setReload] = useState(false);
    const [axiosSecure] = useAxiosSecure();
    const [dataLoading, setDataLoading]= useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user !== false) {
            setDataLoading(true);
            axiosSecure.get(`/allPackage?user=${user?.email}`)
                .then(res => res.data)
                .then(data => {
                    setAvailablePackage(data);
                    setDataLoading(false);
                })
                .catch(error => {
                    toast.error(error.message);
                    setDataLoading(false);
                })
        }
    }, [user, reload])

    const handleOrder= (item)=>{
        axiosSecure.post(`/order?user=${user?.email}`,{
            ...item
        })
        .then(res=>res.data)
        .then(data=>{
            // console.log(data)
            if(data){
                // console.log(data);
                const options = {
                    key: 'rzp_test_HJtppEK315iHxh',
                    currency: data.currency,
                    amount: data.amount,
                    name: 'Design Payment',
                    description: 'Design Payment',
                    order_id: data.id,
                    image:
                        'https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/raml2xzpwgc9tpomgaxd',
                    handler: async function (response) {
                        // console.log(response)
                        axiosSecure.post('/order/validate',{
                            order_id: response.razorpay_order_id,
                            signature: response.razorpay_signature,
                            paymentId: response.razorpay_payment_id,
                            email: user?.email,
                            timeMili: Date.now(),
                            date: new Date().toLocaleDateString(),
                            time: new Date().toLocaleTimeString(),
                            packagePrice: data.amount/100,
                            packageCoins: parseInt(item.coins),
                            phone_number: user?.phone_number,
                            username: user?.username, 
                            currentCoins: user?.coins 
                        })
                        .then(res=>res.data)
                        .then(data=>{
                            if(data.acknowledged){
                                toast.success("Payment successful");
                                setForceLoading(!forceLoading);
                                navigate('/Dashboard');
                            }
                            if(data.message){
                                toast.error(data.message);
                            }
                        })
                        .catch(error=>{
                            toast.error(error.message);
                        })
                        
                    },
                    prefill: {
                        name: user?.username,
                        email: user?.email,
                        contact: user?.phone_number,
                    },
                }
                const paymentObject = new window.Razorpay(options)
                paymentObject.on("payment.failed", function(response){
                    toast.error(response.message);
                })
                paymentObject.open()
            }
        })
    }

    const handleDeletePackage= (id)=>{
        axiosSecure.delete(`/deletePackage?deleteId=${id}`)
        .then(res=>res.data)
        .then(data=>{
            if(data.deletedCount>=1){
                let temp = [...availablePackage];
                temp = temp.filter(filterId=> filterId._id !== id);
                setAvailablePackage([...temp]);
            }
        })
        .catch(error=>{
            toast.error(error.message);
        })
    }

    if(dataLoading){
        return <Spinner></Spinner>
    }

    return (
        <div className='container-fluid m-4'>
            <div className="row g-3">
                {
                    availablePackage.length!==0 && availablePackage.map(item=><div className='col-12 col-sm-6 col-md-4 col-lg-3' key={item?._id}>
                        <div className="card" style={{height:"300px"}}>
                            {
                                user?.role==="admin" && <div className='card-header d-flex justify-content-end bg-white' style={{borderBottom:"0px"}}>
                                    <button className='btn btn-close' onClick={()=>handleDeletePackage(item._id)} style={{cursor:"pointer"}}></button>
                                </div>
                            }
                            <div className="card-body" style={{borderBottom:"0px"}}>
                                <h2 className='text-center text-muted my-0'>{item?.coins} </h2>
                                <p className='my-0 text-center'>Coins</p>
                                <div className='mt-2'>
                                    <span>Description: {item?.description}</span>
                                </div>
                                
                            </div>
                            <div className="card-footer" style={{borderTop:"0px"}}>
                                <div className='mt-2'>
                                    <button className='btn btn-primary w-100' onClick={()=>handleOrder(item)}>Pay ₹{item.price}</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
                {
                    user?.role === "admin" && <div className="col-12 col-sm-6 col-md-4 col-lg-3" title='Add Package'>
                        <div className="card d-flex justify-content-center align-items-center" data-bs-target="#PackageModal" data-bs-toggle="modal" style={{ border: "1px dashed black", height: "300px", backgroundColor: "#dddddd", cursor: "pointer" }}>
                            <div>
                                <i className='bi bi-plus fs-1 text-muted fw-bold'>

                                </i>
                            </div>
                        </div>
                    </div>
                }
                
                <PackageModal reload={reload} setReload={setReload}></PackageModal>
            </div>
        </div>
    );
};

export default AvailablePackage;