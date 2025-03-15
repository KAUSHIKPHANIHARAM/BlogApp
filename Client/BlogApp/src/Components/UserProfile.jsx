import React from 'react';
import '../Styles/UserProfile.css';
import { useNavigate, Outlet } from 'react-router-dom';

function UserProfile() {
    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <div className="profile-buttons">
                <button className="btn" onClick={() => navigate('articles')}>Articles</button>
            </div>
            <div className="profile-content">
                <Outlet />
            </div>
        </div>
    );
}

export default UserProfile;
