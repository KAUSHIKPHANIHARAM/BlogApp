import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaRegHeart, FaHeart, FaEye } from "react-icons/fa";
import "../Styles/Articles.css";

function Articles() {
    let [articlesList, setArticlesList] = useState([]);
    let navigate = useNavigate();

    let { currentUser, LoginUserStatus } = useSelector((state) => state.UserAuthorLoginReducer);
    let token = localStorage.getItem("token");

    let axiosWithToken = axios.create({
        headers: { Authorization: `Bearer ${token}` },
    });

    useEffect(() => {
        const getArticlesOfCurrentAuthor = async () => {
            try {
                const response = await axiosWithToken.get("http://localhost:4001/user-api/articles");
                setArticlesList(response.data.payload);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };
        getArticlesOfCurrentAuthor();
    }, []);

    const readArticleByArticleId = async (articleObj) => {
        try {
            if (!currentUser.username) {
                alert("Please log in to read the article.");
                return;
            }

            await axiosWithToken.put(`http://localhost:4001/author-api/views/${articleObj._id}`, {
                username: currentUser.username,
            });

            navigate(`../article/${articleObj.articleId}`, { state: articleObj });
        } catch (error) {
            console.error("Error updating views:", error);
        }
    };


    const handleLike = async (blogId) => {
        if (!currentUser.username) {
            alert("You must be logged in to like a post!");
            return;
        }

        try {
            const response = await axiosWithToken.put(`http://localhost:4001/author-api/likes/${blogId}`, {
                username: currentUser.username,
            });

            // Update state to reflect new likes count
            setArticlesList((prevArticles) =>
                prevArticles.map((article) =>
                    article._id === blogId
                        ? { ...article, likes: response.data.likedUsers }
                        : article
                )
            );
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };


    return (
        <div className="articles-section">
            <div className="articles-wrapper">
                {articlesList.map((article) => {
                    const isLiked = Array.isArray(article.likes) && article.likes.includes(currentUser.username);

                    return (
                        <div className="article-item" key={article.articleId}>
                            <div className="article-content">
                                <h5 className="article-title">{article.title}</h5>
                                <p className="article-description">
                                    {article.content.substring(0, 80) + "..."}
                                </p>
                                {LoginUserStatus ? (
                                    <button className="article-btn" onClick={() => readArticleByArticleId(article)}>
                                        <span>Read More</span>
                                    </button>
                                ) : (
                                    <button className="article-btn" onClick={() => navigate("/login")}>
                                        <span>Read More</span>
                                    </button>
                                )}
                            </div>
                            <div className="article-footer">
                                <small>
                                    Last updated on{" "}
                                    {new Date(article.dateOfModification).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </small>
                                <div className="article-icons">
                                    <span onClick={() => handleLike(article._id)} style={{ cursor: "pointer" }}>
                                        {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
                                    </span>
                                    <span>{article.likes ? article.likes.length : 0}</span>
                                    <FaEye />
                                    <span>{article.views ? article.views.length : 0}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Articles;
