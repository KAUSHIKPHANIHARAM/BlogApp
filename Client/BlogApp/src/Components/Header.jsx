import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetState } from '../Redux/Slices/UserAuthorSlice';
import { FaHome, FaUserPlus, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes, FaBloggerB, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import '../Styles/Header.css';
import axios from 'axios';

function Header() {
    const { LoginUserStatus, currentUser } = useSelector(state => state.UserAuthorLoginReducer);
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate()
    let [articlesList, setArticlesList] = useState([]);

    let token = localStorage.getItem("token");
    let axiosWithToken = axios.create({
        headers: { Authorization: `Bearer ${token}` },
    });

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    function logout() {
        localStorage.removeItem('token');
        dispatch(resetState());
        setMenuOpen(false);
    }


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuOpen && !event.target.closest('.header-container')) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [menuOpen]);

    async function gotoAuthorProfile() {
        console.log(currentUser.userType)
        navigate(`/articles-by-author/${currentUser.username}`)
    }

    return (
        <nav className={`header-container ${scrolled ? 'scrolled' : ''}`}>
            <div className="brand">
                <NavLink to="/" className="logo">
                    <FaBloggerB className="logo-icon" />
                    <span className="logo-text">BlogSite</span>
                </NavLink>
                <button className="menu-toggle" onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(!menuOpen);
                }}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            <div className={`nav-backdrop ${menuOpen ? "visible" : ""}`} onClick={() => setMenuOpen(false)}></div>

            <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                <li>
                    <NavLink to="/" className="nav-item" onClick={() => setMenuOpen(false)}>
                        <FaHome className="nav-icon" /> <span>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/articles" className="nav-item" onClick={() => setMenuOpen(false)}>
                        <FaBloggerB className="nav-icon" /> <span>Blogs</span>
                    </NavLink>
                </li>

                {LoginUserStatus ? (
                    <>
                        <li className="user-profile">
                            <div className="profile-wrapper">
                                <div className="avatar">
                                    <FaUser />
                                </div>
                                {currentUser.userType === 'author'
                                    ?
                                    <button className="btn btn-primary" onClick={gotoAuthorProfile} >{currentUser.username}</button>
                                    :
                                    <span className="username"  >{currentUser.username}</span>
                                }
                            </div>
                        </li>
                        <li className="nav-divider"></li>
                        <li>
                            <NavLink to="/login" className="nav-item logout-btn" onClick={logout}>
                                <FaSignOutAlt className="nav-icon" /> <span>Logout</span>
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-divider"></li>
                        <li>
                            <NavLink to="/register" className="nav-item register-btn" onClick={() => setMenuOpen(false)}>
                                <FaUserPlus className="nav-icon" /> <span>Register</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" className="nav-item login-btn" onClick={() => setMenuOpen(false)}>
                                <FaSignInAlt className="nav-icon" /> <span>Login</span>
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Header;