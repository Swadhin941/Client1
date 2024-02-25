import React, { useContext, useEffect, useState } from 'react';
import { SharedData } from '../SharedData/SharedContext';
import SubscriptionModal from '../Modals/SubscriptionModal/SubscriptionModal';
import useTitle from '../CustomHook/useTitle/useTitle';
import useAxiosSecure from '../CustomHook/useAxiosSecure/useAxiosSecure';
import toast from 'react-hot-toast';
import DataSpinner from '../DataSpinner/DataSpinner';
import "./Subscription.css";
import ConfirmModal from '../Modals/ConfirmModal/ConfirmModal';
import CalculateSubscription from '../CustomHook/CalculateSubscription/CalculateSubscription';
import { useNavigate } from 'react-router-dom';

const Subscription = () => {
    useTitle("Lookaura- Subscription");
    const { user, forceLoading, setForceLoading } = useContext(SharedData);
    const [allSubscription, setAllSubscription] = useState([]);
    const [refetch, setRefetch] = useState(false);
    const [axiosSecure] = useAxiosSecure();
    const [dataLoading, setDataLoading] = useState(false);
    const [decision, setDecision] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState('');
    const [currentTimezone, setCurrentTimezone] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        setDataLoading(true);
        axiosSecure.get('/getSubscriptions')
            .then(res => res.data)
            .then(data => {
                setDataLoading(false);
                setAllSubscription(data);
            })
            .catch(error => {
                setDataLoading(false);
                toast.error(error.message);
            })
    }, [refetch])

    useEffect(() => {
        if (decision) {
            axiosSecure.delete(`/deleteSubscription?id=${selectedSubscription}`)
                .then(res => res.data)
                .then(data => {
                    if (data.deletedCount >= 1) {
                        toast.success("Deleted Successfully");
                        setRefetch(!refetch);
                        setDecision(false);
                    }
                })
                .catch(error => {
                    toast.error(error.message);
                    setDecision(false)
                })
        }
    }, [decision])

    const handleSubscriptionClick = (item) => {
        const date= CalculateSubscription(item?.month, currentTimezone);
        axiosSecure.post('/createSubscriptionOrder',{...item})
        .then(res=>res.data)
        .then(data=>{
            if(data){
                const options = {
                    key: 'rzp_test_HJtppEK315iHxh',
                    currency: data.currency,
                    amount: data.amount,
                    name: 'Design Subscription',
                    description: 'Design subscription',
                    order_id: data.id,
                    image:
                        'https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/raml2xzpwgc9tpomgaxd',
                    handler: async function (response) {
                        // console.log(response)
                        axiosSecure.post('/subscriptionValidate', {
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
                            currentCoins: user?.coins,
                            subscriptionOut: date,
                            region: currentTimezone
                        })
                            .then(res => res.data)
                            .then(data => {
                                if (data.acknowledged) {
                                    toast.success("Payment successful");
                                    setForceLoading(!forceLoading);
                                    setSelectedSubscription('');
                                    navigate('/Dashboard');
                                }
                                if (data.message) {
                                    toast.error(data.message);
                                }
                            })
                            .catch(error => {
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
                paymentObject.on("payment.failed", function (response) {
                    toast.error(response.message);
                })
                paymentObject.open()
            }
        })
        .catch(error=>{
            toast.error(error.message);
        })
    }

    useEffect(() => {
        if(user?.region){
            setCurrentTimezone(user?.region);
        }
        else{
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            setCurrentTimezone(timezone);
        }
    }, [user]);

    return (
        <div className='container-fluid mt-4'>
            {
                dataLoading ? <DataSpinner></DataSpinner> : <div className="row">
                    {
                        allSubscription.map((item, index) => <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                            <div className="card" style={{ height: "330px" }}>
                                {
                                    user?.role === 'admin' && <div className='card-header d-flex justify-content-end mb-0' style={{ backgroundColor: "white", borderBottom: "0px", }}>
                                        <button className='btn btn-close' data-bs-target="#ConfirmModal" data-bs-toggle="modal" onClick={() => setSelectedSubscription(item._id)}></button>
                                    </div>
                                }
                                <div className="card-body mt-0">
                                    <h2 className='text-center fw-bold text-secondary'>{item.fees}₹</h2>
                                    <p className=" mb-0 mt-5">Validity: {item.month} Month</p>
                                    <p className="mt-0">Coins: {item.coins} Free</p>
                                    <div className={`${item.description.length >= 150 && "customHeight"}`}>Description: <p className='text-muted d-inline'>{item.description}</p></div>
                                </div>
                                <div className="card-footer" style={{ borderTop: "0px" }}>
                                    <button className='btn btn-primary w-100' onClick={() => handleSubscriptionClick(item)} >Buy</button>
                                </div>
                            </div>
                        </div>)
                    }
                    {
                        user?.role === 'admin' && <div className='col-12 col-sm-6 col-md-4 col-lg-3' title='Add Subscription'>
                            <div className="card d-flex justify-content-center align-items-center" data-bs-target="#SubscriptionModal" data-bs-toggle="modal" style={{ border: "1px dashed black", height: "330px", backgroundColor: "#dddddd", cursor: "pointer" }}>
                                <div>
                                    <i className='bi bi-plus fs-1 text-muted fw-bold'>

                                    </i>
                                </div>
                            </div>
                        </div>
                    }
                    
                    <SubscriptionModal setRefetch={setRefetch} refetch={refetch}></SubscriptionModal>
                    <ConfirmModal setDecision={setDecision}></ConfirmModal>
                </div>
            }

        </div>
    );
};

export default Subscription;