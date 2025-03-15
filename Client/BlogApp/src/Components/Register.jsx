import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaPen, FaBook } from 'react-icons/fa';
import '../Styles/Register.css';

function Register() {
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    async function handleFormSubmit(formObj) {
        setLoading(true);
        try {
            const apiURL = formObj.userType === 'user'
                ? 'http://localhost:4001/user-api/user'
                : 'http://localhost:4001/author-api/author';

            let res = await axios.post(apiURL, formObj);

            if (res.data.message === 'User Created' || res.data.message === 'Author Created') {
                navigate('/login');
            } else {
                setErr(res.data.message);
            }
        } catch (error) {
            setErr('Something went wrong, please try again!');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="register-page">
            <motion.div
                className="register-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="register-image-container">
                    <motion.div
                        className="register-image"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <img src="https://media.istockphoto.com/id/887987150/photo/blogging-woman-reading-blog.webp?a=1&b=1&s=612x612&w=0&k=20&c=YFjFUrdT89CqtToKn69eBVyZQPg1vvbhSObgc9uEwtE=" alt="Blogging Illustration" />
                        <div className="image-overlay">
                            <h2>Express Your Ideas</h2>
                            <p>Join our community of writers and readers!</p>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="register-form-container"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <form className="register-form" onSubmit={handleSubmit(handleFormSubmit)}>
                        <motion.h1
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            Join Our Blogging Community
                        </motion.h1>

                        <motion.p
                            className="register-subtitle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            Share your thoughts, write your stories, and inspire others!
                        </motion.p>

                        {err && (
                            <motion.div
                                className="error-message"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <p>{err}</p>
                            </motion.div>
                        )}

                        <div className="form-group">
                            <label>I want to join as</label>
                            <div className="user-type-selector">
                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="user"
                                        value="user"
                                        {...register('userType', { required: true })}
                                    />
                                    <label htmlFor="user">
                                        <FaBook />
                                        <span>Reader</span>
                                    </label>
                                </div>

                                <div className="user-type-option">
                                    <input
                                        type="radio"
                                        id="author"
                                        value="author"
                                        {...register('userType', { required: true })}
                                    />
                                    <label htmlFor="author">
                                        <FaPen />
                                        <span>Writer</span>
                                    </label>
                                </div>
                            </div>
                            {errors.userType && <span className="form-error">Please select a user type</span>}
                        </div>

                        <div className="form-group">
                            <div className="input-wrapper">
                                <FaUser className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    {...register('username', { required: true, minLength: 3 })}
                                />
                            </div>
                            {errors.username?.type === 'required' && <span className="form-error">Username is required</span>}
                            {errors.username?.type === 'minLength' && <span className="form-error">Username must be at least 3 characters</span>}
                        </div>

                        <div className="form-group">
                            <div className="input-wrapper">
                                <FaEnvelope className="input-icon" />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    {...register('email', {
                                        required: true,
                                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                    })}
                                />
                            </div>
                            {errors.email?.type === 'required' && <span className="form-error">Email is required</span>}
                            {errors.email?.type === 'pattern' && <span className="form-error">Please enter a valid email address</span>}
                        </div>

                        <div className="form-group">
                            <div className="input-wrapper">
                                <FaLock className="input-icon" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    {...register('password', { required: true, minLength: 6 })}
                                />
                            </div>
                            {errors.password?.type === 'required' && <span className="form-error">Password is required</span>}
                            {errors.password?.type === 'minLength' && <span className="form-error">Password must be at least 6 characters</span>}
                        </div>

                        <motion.button
                            className="signup-button"
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </motion.button>

                        <motion.p
                            className="register-link"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            Already have an account? <Link to="/login">Sign In</Link>
                        </motion.p>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Register;