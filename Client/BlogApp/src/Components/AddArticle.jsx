import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../Styles/AddArticle.css';

function AddArticle() {
    let { register, handleSubmit } = useForm();
    let { currentUser } = useSelector((state) => state.UserAuthorLoginReducer);
    let [err, setErr] = useState('');
    let navigate = useNavigate();
    let token = localStorage.getItem('token');

    const postNewArticle = async (article) => {
        article.dateOfCreation = new Date();
        article.dateOfModification = new Date();
        article.articleId = Date.now();
        article.username = currentUser.username;
        article.comments = [];
        article.status = true;
        article.likes = [];
        article.views = 0;

        let axiosWithToken = axios.create({
            headers: { Authorization: `Bearer ${token}` },
        });

        try {
            let response = await axiosWithToken.post(
                'http://localhost:4001/author-api/article',
                article
            );

            if (response.data.message === 'New Article Created') {
                navigate(`/author-profile/articles-by-author/${currentUser.username}`);
            } else {
                setErr(response.data.message);
            }
        } catch (err) {
            setErr("Error creating article");
        }
    };

    return (
        <motion.div
            className="add-article-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="card">
                <motion.h1
                    className="card-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Add Your Article
                </motion.h1>
                {err && <div className="alert alert-danger">{err}</div>}

                <motion.form
                    onSubmit={handleSubmit(postNewArticle)}
                    className="article-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="mb-3">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            placeholder="Enter article title"
                            required
                            className="form-control"
                            {...register('title')}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category">Category</label>
                        <select className="form-select" {...register('category')}>
                            <option value="">Select a category</option>
                            <option value="programming">Programming</option>
                            <option value="java">Java</option>
                            <option value="aiml">AIML</option>
                            <option value="dp">Dynamic Programming</option>
                            <option value="sport">Sports</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content">Article Content</label>
                        <textarea
                            name="content"
                            placeholder="Write your article here..."
                            className="form-control"
                            {...register('content')}
                        ></textarea>
                    </div>
                    <motion.button
                        type="submit"
                        className="btn-submit"
                        whileHover={{ scale: 1.05 }}
                    >
                        Post Article
                    </motion.button>
                </motion.form>
            </div>
        </motion.div>
    );
}

export default AddArticle;
