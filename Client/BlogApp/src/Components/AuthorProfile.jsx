import React from 'react';
import '../Styles/AuthorProfile.css';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AuthorProfile() {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.UserAuthorLoginReducer);

    return (
        <div className="profile-container">
            <h1>Author Profile</h1>
            <div className="profile-buttons">
                <button className="btn" onClick={() => navigate(`articles-by-author/${currentUser.username}`)}>Articles</button>
                <button className="btn" onClick={() => navigate(`new-article`)}>Add New</button>
            </div>
            <div className="profile-content">
                <Outlet />
            </div>
        </div>
    );
}

export default AuthorProfile;
