import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaEye } from 'react-icons/fa';
import '../Styles/ArticlesByAuthor.css';

function ArticleByAuthor() {
    const [articlesList, setArticlesList] = useState([]);
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.UserAuthorLoginReducer);
    const token = localStorage.getItem('token');

    const axiosWithToken = axios.create({
        headers: { Authorization: `Bearer ${token}` }
    });

    const getArticlesOfCurrentAuthor = async () => {
        try {
            const res = await axiosWithToken.get(`http://localhost:4001/author-api/articles/${currentUser.username}`);
            setArticlesList(res.data.payload);
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    const readArticleByArticleId = (articleObj) => {
        navigate(`../article/${articleObj.articleId}`, { state: articleObj });
    };

    useEffect(() => {
        getArticlesOfCurrentAuthor();
    }, []);

    return (
        <div className="articles-container">
            <h1 className="articles-heading">Articles By {currentUser.username}</h1>
            <div className="articles-grid">
                {articlesList.map((article) => (
                    <div className="article-card" key={article._id}>
                        <div className="article-body">
                            <h5 className="article-title">{article.title}</h5>
                            <p className="article-text">
                                {article.content.substring(0, 80) + '...'}
                            </p>
                            <button className="article-btn" onClick={() => readArticleByArticleId(article)}>
                                <span>Read More</span>
                            </button>
                        </div>
                        <div className="article-footer">
                            <small>Last updated on {new Date(article.dateOfModification).toLocaleDateString()}</small>
                            <div className="article-icons">
                                <span className="icon-wrapper">
                                    <FaRegHeart /> {article.likes ? article.likes.length : 0} 
                                </span>
                                <span className="icon-wrapper">
                                    <FaEye /> {article.views ? article.views.length : 0}  
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ArticleByAuthor;
