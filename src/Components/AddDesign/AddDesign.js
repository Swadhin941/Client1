import React, { useContext, useEffect, useState } from 'react';
import Tags from "./Tags";
import { SharedData } from '../SharedData/SharedContext';
import useAxiosSecure from '../CustomHook/useAxiosSecure/useAxiosSecure';
import toast from 'react-hot-toast';
import ClockLoader from 'react-spinners/ClockLoader';
import TagModal from '../Modals/TagModal/TagModal';
import DesignerTagModal from '../Modals/DesignerTagModal/DesignerTagModal';
import useTitle from '../CustomHook/useTitle/useTitle';
import AWS from 'aws-sdk';

const AddDesign = () => {
    useTitle("Lookaura- Add Design");
    const { user } = useContext(SharedData);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [tags, setTags] = useState([]);
    const [assets, setAssets] = useState(null);
    const [image, setImage] = useState(null);
    const [checked, setChecked] = useState(true);
    const [dataLoading, setDataLoading] = useState(false);
    const [axiosSecure] = useAxiosSecure();
    const s3 = new AWS.S3({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
        region: process.env.REACT_APP_REGION
    })

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleUploadAssets = (e) => {
        setAssets(e.target.files[0]);
    };

    const handleUploadImage = (e) => {
        setImage(e.target.files[0]);
    };

    const handleChecked = (event) => {
        setChecked(!checked);
    };

    const handleSubmit = async () => {

        if (tags.length === 0) {
            toast.error("Please enter some tags");
            return;
        }
        if (!assets) {
            toast.error("Please upload the assets");
            return
        }
        if (!image) {
            toast.error("Please upload a image");
            return;
        }
        if (!description) {
            toast.error("Please give a short description");
            return;
        }
        if (!title) {
            toast.error("Please enter the title");
            return;
        }
        setDataLoading(true)

        const params = {
            Bucket: process.env.REACT_APP_BUCKET,
            Key: assets?.name,
            Body: assets
        }
        try {
            const response = await s3.upload(params).promise()
            if (response.Location) {
                let params2 = {
                    Bucket: process.env.REACT_APP_BUCKET,
                    Key: image?.name,
                    Body: image
                }
                const imgResponse = await s3.upload(params2).promise();
                if (imgResponse.Location) {
                    // console.log(response.Location, imgResponse.Location)
                    axiosSecure.post(`/addDesign?user=${user?.email}`, { title, description, uploaderEmail: user?.email, uploaderName: user?.username, isApproved: false, image: imgResponse.Location, assets: response.Location, likes: [], isPremium: checked, isSold: false, isRejected: false, tags: [...tags] })
                        .then(res => res.data)
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success("Design posted")
                                setDataLoading(false)
                            }
                        })
                        .catch(error => {
                            toast.error(error.message);
                            setDataLoading(false);
                        })
                }
            }
        }
        catch (error) {
            toast.error(error.message);
            setDataLoading(false);
        }

    }


    return (
        <div
            className="container border rounded p-4 bg-white shadow-lg d-flex justify-content-center"
            style={{ height: "32rem", marginTop: "2rem" }}
        >
            <div className="card border border-0" style={{ width: "500px" }}>
                <div className="card-body">
                    <h3 className="ms-lg-5">Upload New Design</h3>
                    <form className='form'>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Title:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                onChange={handleChangeTitle}
                            />
                        </div>
                        <div className="form-group mt-1">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                className="form-control "
                                id="exampleFormControlTextarea1"
                                rows="3"
                                onChange={handleChangeDescription}
                                style={{ resize: "none" }}></textarea>
                        </div>
                        <div className="form-group mt-1">
                            {
                                tags.length === 0 ? <button className='btn btn-primary w-100' data-bs-target="#DesignerTagModal" data-bs-toggle="modal">Add tags</button> :
                                    <div className='d-flex'>
                                        <div className='w-100' style={{ overflow: "auto", overflowX: "hidden", overflowY: "auto", height: "50px", borderBottom: "2px solid black" }}>
                                            <div className='d-flex' style={{ flexWrap: "wrap" }}>
                                                {
                                                    tags.map((item, index) => <div key={index} className='p-2 bg-dark text-white m-2' style={{ border: "1px solid transparent", borderRadius: "10px" }}><h6>{item.name}</h6></div>)
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            <button className='btn btn-primary' style={{ width: "100px" }} data-bs-target="#DesignerTagModal" data-bs-toggle="modal">Edit tag</button>
                                        </div>

                                    </div>

                            }

                        </div>
                        <DesignerTagModal tags={tags} setTags={setTags}></DesignerTagModal>
                        <div className="row mt-1">
                            <div className="col">
                                <label htmlFor="uploadimg">Upload Images:</label>
                                <input
                                    id="file"
                                    className="form-control mt-2 "
                                    onChange={handleUploadImage}
                                    type="file"
                                    multiple={true}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="uploadasset">Upload Asset:</label>
                                <input
                                    className="form-control mt-2"
                                    id="file"
                                    onChange={handleUploadAssets}
                                    type="file"
                                />
                            </div>
                        </div>

                        <div className="form-check mt-2">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="premium"
                                name="premium"
                                checked={checked}
                                onChange={handleChecked}
                            />

                            <label className="form-check-label" htmlFor="exampleCheck1">
                                Premium
                            </label>
                        </div>
                        <button className='btn btn-dark w-100 mt-3 d-flex justify-content-center' onClick={() => handleSubmit()}>{dataLoading ? <ClockLoader size={24} color='white' /> : "Submit"}</button>
                    </form>
                </div>
            </div>
            {/* <div style={{width:"800px"}}>
                <h3 className="ms-lg-5">Upload New Design</h3>
                <div className="row mt-4">

                    <div className="col-lg-5 col-md-12 position-relative">
                        <div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Title:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    onChange={handleChangeTitle}
                                />
                            </div>
                            <div className="form-group mt-1">
                                <label htmlFor="description">Description:</label>
                                <textarea
                                    className="form-control "
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    onChange={handleChangeDescription}
                                    style={{ resize: "none" }}></textarea>
                            </div>
                            <div className="form-group mt-1">
                                {
                                    tags.length === 0 ? <button className='btn btn-primary w-100' data-bs-target="#DesignerTagModal" data-bs-toggle="modal">Add tags</button> :
                                        <div className='d-flex'>
                                            <div className='w-100' style={{ overflow: "auto", overflowX: "hidden", overflowY: "auto", height: "50px", borderBottom: "2px solid black" }}>
                                                <div className='d-flex' style={{ flexWrap: "wrap" }}>
                                                    {
                                                        tags.map((item, index) => <div key={index} className='p-2 bg-dark text-white m-2' style={{ border: "1px solid transparent", borderRadius: "10px" }}><h6>{item.name}</h6></div>)
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <button className='btn btn-primary' style={{ width: "100px" }} data-bs-target="#DesignerTagModal" data-bs-toggle="modal">Edit tag</button>
                                            </div>

                                        </div>

                                }

                            </div>
                            <DesignerTagModal tags={tags} setTags={setTags}></DesignerTagModal>
                            <div className="row mt-1">
                                <div className="col">
                                    <label htmlFor="uploadimg">Upload Images:</label>
                                    <input
                                        id="file"
                                        className="form-control mt-2 "
                                        onChange={handleUploadImage}
                                        type="file"
                                        multiple={true}
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="uploadasset">Upload Asset:</label>
                                    <input
                                        className="form-control mt-2"
                                        id="file"
                                        onChange={handleUploadAssets}
                                        type="file"
                                    />
                                </div>
                            </div>

                            <div className="form-check mt-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="premium"
                                    name="premium"
                                    checked={checked}
                                    onChange={handleChecked}
                                />

                                <label className="form-check-label" htmlFor="exampleCheck1">
                                    Premium
                                </label>
                            </div>
                            <button className='btn btn-dark w-100 mt-3 d-flex justify-content-center' onClick={() => handleSubmit()}>{dataLoading ? <ClockLoader size={24} color='white' /> : "Submit"}</button>
                        </div>
                    </div>
                </div>
            </div> */}

        </div>
    );
};

export default AddDesign;