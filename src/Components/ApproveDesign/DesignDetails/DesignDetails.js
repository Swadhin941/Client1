import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SharedData } from '../../SharedData/SharedContext';
import useAxiosSecure from '../../CustomHook/useAxiosSecure/useAxiosSecure';
import { Grid, Typography, Paper, Button, Box, Link } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import DesignerUser from '../../AddUser/DesignerUser/DesignerUser';
import PriceModal from '../../Modals/PriceModal/PriceModal';
import RejectModal from '../../Modals/RejectModal/RejectModal';
import ConfirmModal from '../../Modals/ConfirmModal/ConfirmModal';
import { toast } from "react-hot-toast";
import useTitle from '../../CustomHook/useTitle/useTitle';
import "./DesignerDetails.css";

const DesignDetails = () => {
    useTitle("Lookaura- Design Details");
    const [searchParams, setSearchParams] = useSearchParams();
    const { user } = useContext(SharedData);
    const [axiosSecure] = useAxiosSecure();
    const [designDetails, setDesignerDetails] = useState(null);
    const navigate = useNavigate();
    const [designApprove, setDesignApprove] = useState(false);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        if (user) {
            axiosSecure.post(`/specificDesignApproval?user=${user?.email}`, { id: searchParams.get("id") })
                .then(res => res.data)
                .then(data => {
                    if (!data) {
                        navigate(`/${searchParams.get('id')}`)
                    }
                    else {
                        // console.log(data);
                        setDesignerDetails(data);
                    }
                })
                .catch(error=>{
                    toast.error(error.message);
                })
        }
    }, [user, reload])

    useEffect(() => {
        if (designApprove) {
            axiosSecure.put(`/approveDesign?id=${searchParams.get("id")}&&user=${user?.email}`, {
                isApproved: true
            })
                .then(res => res.data)
                .then(data => {
                    if (data.modifiedCount >= 1) {
                        toast.success("Design approved")
                        setReload(!reload);
                    }
                })
                .catch(error=>{
                    toast.error(error.message);
                })
        }
    }, [designApprove])

    return (
        <div className='container-fluid mt-3' style={{ height: "100%" }}>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >

                <Grid item xs={12}>
                    <Paper sx={{ padding: 3, borderRadius: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body1" color="initial">
                                    Name: {designDetails?.uploaderName}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" color="initial" align="right">
                                    Likes: {designDetails?.likes.length}{' '}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6} alignItems="center" className='mt-4'>
                    <Paper sx={{ padding: 3, borderRadius: 2, minHeight: '100%' }}>
                        <div>
                            <img src={designDetails?.image} style={{ height: "auto", width: "100%" }} className={(user?.role === "admin" || (user?.role === "designer" && user?.email === designDetails?.uploaderEmail) || (user?.role === "store" && user?.email === designDetails?.buyerEmail)) ? "img-fluid" : designDetails?.isPremium ? `imgBlur` : "img-fluid"} alt="" />
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={6} className='mt-4'>
                    <Paper sx={{ padding: 3, borderRadius: 2 }}>
                        <Typography variant="h5" color="initial" align="center">
                            <b>{designDetails?.title}</b>
                        </Typography>
                        <Typography variant="body1" color="initial">
                            {designDetails?.description}
                        </Typography>
                        <Box textAlign="center">
                            {
                                (user?.role === "admin" || (user?.role === "designer" && user?.email === designDetails?.uploaderEmail) || (user?.role === "store" && user?.email === designDetails?.buyerEmail)) ? <button className='btn btn-dark'>
                                    <a href={designDetails?.assets} download style={{ textDecoration: "none", color: "white" }}>Download</a>
                                </button> : !designDetails?.isPremium && <button className='btn btn-dark'>
                                    <a href={designDetails?.assets} download style={{ textDecoration: "none", color: "white" }}>Download</a>
                                </button>
                            }

                        </Box>
                    </Paper>
                </Grid>

            </Grid>
            {
                user?.role === "admin" && (!designDetails?.isApproved && !designDetails?.isRejected) && designDetails?.isPremium && <div className='d-flex justify-content-center mt-3'>
                    <button className='btn btn-primary mx-2' data-bs-target="#PriceModal" data-bs-toggle="modal">Approve</button>
                    <button className='btn btn-danger' data-bs-target="#RejectModal" data-bs-toggle="modal">Reject</button>
                </div>
            }
            {
                user?.role === "admin" && (!designDetails?.isApproved && !designDetails?.isRejected) && !designDetails?.isPremium && <div className='d-flex justify-content-center mt-3'>
                    <button className='btn btn-primary mx-2' data-bs-target="#ConfirmModal" data-bs-toggle="modal">Approve</button>
                    <button className='btn btn-danger' data-bs-target="#RejectModal" data-bs-toggle="modal">Reject</button>
                </div>
            }
            <PriceModal setReload={setReload} reload={reload}></PriceModal>
            <RejectModal setReload={setReload} reload={reload}></RejectModal>
            <ConfirmModal setDecision={setDesignApprove}></ConfirmModal>
        </div>
    );
};

function Item(props) {
    return (
        <>
            <Box
                sx={{
                    // margin: 0,
                    // padding: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                alignItems="center"
                justify="center"
            >

                <img
                    src={props.item}
                    width="80%"
                    alt=""
                    style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                />
            </Box>
        </>
    )
}

export default DesignDetails;