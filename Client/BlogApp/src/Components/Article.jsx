import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { MdRestore } from "react-icons/md";
import axios from 'axios';
import '../Styles/Article.css';

function Article() {
    let navigate = useNavigate();
    //let [deleteStatus, setDeleteStatus] = useState(false);
    let { currentUser, commentStatus } = useSelector((state) => state.UserAuthorLoginReducer);
    let { register, handleSubmit } = useForm();
    let { state } = useLocation();
    //console.log(state)
    let token = localStorage.getItem('token');
    let axiosWithToken = axios.create({
        headers: { Authorization: `Bearer ${token}` }
    });

    // const enableComment = () => {
    //     setDeleteStatus(false)
    // }

    const disableComment = async () => {
        //console.log("before:", state.status);
        let result = await axiosWithToken.put(`http://localhost:4001/author-api/article/${state.articleId}`, state)
        //console.log(result.payload)
        navigate(`/author-profile/articles-by-author/${state.username}`, { state: result.payload })
        //setDeleteStatus(true);
    }

    let [editStatus, setEditStatus] = useState(false);

    const enableEdit = () => {
        setEditStatus(true);
    };

    const disableEdit = async (editedArticle) => {
        try {
            const modifiedArticle = { ...state, ...editedArticle };
            modifiedArticle.dateOfModification = new Date();
            delete modifiedArticle._id;

            let res = await axiosWithToken.put('http://localhost:4001/author-api/article', modifiedArticle);
            if (res.data.message === 'Articles Modified') {
                setEditStatus(false);
                navigate(`/author-profile/article/${modifiedArticle.articleId}`, { state: res.data.article });
            }
        } catch (err) {
            console.log(err);
        }
    };

    let [comment, setComment] = useState('');
    const handleFormSubmit = async (commentObj) => {
        commentObj.username = currentUser.username;
        let res = await axiosWithToken.post(`http://localhost:4001/user-api/comment/${state.articleId}`, commentObj);
        if (res.data.message === 'Comments Posted') {
            setComment(res.data.message);
        }
    };

    return (
        <div className="article-container">
            {editStatus === false ? (
                <>
                    <div className="d-flex justify-content-between">
                        <div>
                            <p className="display-3 me-4 fw-bolder">{state.title}</p>
                            <span className="py-3">
                                <small className="text-secondary me-4 fs-5">
                                    Created on:{state.dateOfCreation}
                                </small>
                                <small className="text-secondary fs-5">
                                    Modified on:{state.dateOfModification}
                                </small>
                            </span>
                        </div>

                        <div className="edit-delete-container">
                            {currentUser.userType === 'author' && (
                                <>
                                    <FiEdit
                                        className="edit-icon"
                                        onClick={enableEdit}
                                    />
                                    {state.status === true ? (
                                        <>
                                            <RiDeleteBin5Fill
                                                className="delete-icon"
                                                onClick={disableComment}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <MdRestore
                                                className="delete-icon"
                                                onClick={disableComment}
                                            />
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <p className="lead mt-3 fw-normal" style={{ whiteSpace: 'pre-line' }}>
                        {state.content}
                    </p>
                    <div className="comments-section">
                        {state.comments.length === 0 ? (
                            <p className="display-3">No Comments Yet......</p>
                        ) : (
                            state.comments.map((commentObj, ind) => (
                                <div className="comment-card" key={ind}>
                                    <p className="fs-4" style={{ color: 'dodgerblue', textTransform: 'capitalize' }}>
                                        <FaUserAlt /> {commentObj.username}
                                    </p>
                                    <p className="fs-4">{commentObj.comment}</p>
                                </div>
                            ))
                        )}
                    </div>
                    {currentUser.userType === 'user' && (
                        <div className="comment-form">
                            <h2>{comment}</h2>
                            <form onSubmit={handleSubmit(handleFormSubmit)}>
                                <input
                                    type="text"
                                    {...register('comment')}
                                    className="form-control mb-4"
                                    placeholder="Write comments here!!"
                                    required
                                />
                                <button className="btn btn-success" type="submit">
                                    Add Comment
                                </button>
                            </form>
                        </div>
                    )}
                </>
            ) : (
                <form onSubmit={handleSubmit(disableEdit)} className="article-form">
                    <div className="mb-4">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            {...register('title')}
                            defaultValue={state.title}
                        />
                    </div>
                    <label htmlFor="category">Category</label>
                    <select {...register('category')} defaultValue={state.category}>
                        <option value="">Select a category</option>
                        <option value="programming">Programming</option>
                        <option value="java">Java</option>
                        <option value="aiml">AIML</option>
                        <option value="dp">Dynamic Programming</option>
                    </select>
                    <label htmlFor="content">Article Content</label>
                    <textarea
                        name="text"
                        id="text"
                        {...register('content')}
                        defaultValue={state.content}
                    ></textarea>
                    <button className="btn btn-success" type="submit">
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    );
}

export default Article;
