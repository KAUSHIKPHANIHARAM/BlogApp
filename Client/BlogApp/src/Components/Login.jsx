import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserAuthorLoginThunk } from '../Redux/Slices/UserAuthorSlice';
import { FaUser, FaLock } from 'react-icons/fa';
import '../Styles/Login.css';

function Login() {
    const { register, handleSubmit } = useForm();
    const { LoginUserStatus, errorOccured, errMsg, currentUser } = useSelector(state => state.UserAuthorLoginReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleFormSubmit(formObj) {
        dispatch(UserAuthorLoginThunk(formObj));
    }

    useEffect(() => {
        if (LoginUserStatus) {
            if (currentUser.userType === 'user') {
                navigate('/user-profile');
            } else if (currentUser.userType === 'author') {
                navigate('/author-profile');
            }
        }
    }, [LoginUserStatus, currentUser, navigate]);

    return (
        <div className="login-page">

            <div className="login-left">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyTfiUIzxhWa9dNhVte3RvMeeyA6wfbnoORQ&s" alt="Blogging" className="login-image" />
                <h2>Welcome to Your Blog Journey!</h2>
                <p>Connect, Write, and Share your thoughts with the world.</p>
            </div>


            <div className="login-right">
                <form className="login-form" onSubmit={handleSubmit(handleFormSubmit)}>
                    <h1>Login</h1>
                    <p className="login-subtitle">Continue your blogging journey!</p>

                    {errorOccured && <p className="error-message">{errMsg}</p>}

                    <label>User Type</label>
                    <div className="radio-group">
                        <input type="radio" id="user" value="user" {...register('userType')} required />
                        <label htmlFor="user">Reader</label>
                        <input type="radio" id="author" value="author" {...register('userType')} required />
                        <label htmlFor="author">Writer</label>
                    </div>

                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input type="text" placeholder="Enter username" {...register('username')} required />
                    </div>

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input type="password" placeholder="Enter password" {...register('password')} required />
                    </div>

                    <button className="login-button">Login</button>

                    <p className="register-link">
                        Don't have an account? <a href="/register">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
