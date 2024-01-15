import React, { useEffect, useState } from 'react';
import Tags from "./Tags";

const AddDesign = () => {
    const [title, setTitle]= useState(null);
    const [description, setDescription]= useState(null);
    const [tags, setTags]= useState([]);
    const [assets, setAssets]= useState(null);
    const [image, setImage]= useState(null);
    const [checked, setChecked]= useState(true);

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleTags = (tagsFromChild) => {
        setTags(tagsFromChild);
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

    const handleSubmit = ()=>{

    }

    useEffect(()=>{
        console.log(checked);
    },[checked]);

    return (
        <div
            className="container border rounded p-4 bg-white shadow-lg"
            style={{ height: "32rem" }}
        >
            <h3 className="ms-lg-5">Upload New Design</h3>
            <div className="row mt-4">
                <div className="col-6 d-lg-flex justify-content-center d-none d-md-none ">
                    <img
                        src={'https://i.ibb.co/Jq7rkcY/side-Image.png'}
                        alt="sideimg"
                        className="rounded-4"
                        style={{ height: "25rem" }}
                    />
                </div>
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
                            ></textarea>
                        </div>
                        <div className="form-group mt-1">
                        
                            <Tags handleTags={handleTags} />
                        </div>
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
                        <button className='btn btn-dark w-100 mt-3'>Upload</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddDesign;