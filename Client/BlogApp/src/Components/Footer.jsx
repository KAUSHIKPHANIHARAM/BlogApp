import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../Styles/Footer.css';


function Footer() {
    const currentYear = new Date().getFullYear();


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    function subscribe() {
        alert("Subscription Done!!!");
    }

    return (
        <footer className="footer">
            <div className="footer-waves">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path className="wave-1" d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,218.7C840,235,960,245,1080,229.3C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
            </div>

            <motion.div
                className="footer-content"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                <motion.div className="footer-section about" variants={itemVariants}>
                    <h3>About Owner</h3>
                    <p>I am a student interested in creating interactive websites, dedicated to excellence in web development and innovation.</p>
                    <div className="footer-logo">
                        <span>Interactive Web Developer</span>
                        <p>Blog Platform</p>
                    </div>
                </motion.div>

                <motion.div className="footer-section contact" variants={itemVariants}>
                    <h3>Contact</h3>
                    <div className="contact-info">
                        <div className="contact-item">
                            <FaMapMarkerAlt className="contact-icon" />
                            <span>Bachupally, Hyderabad</span>
                        </div>
                        <div className="contact-item">
                            <FaPhone className="contact-icon" />
                            <span>+91 9347983496</span>
                        </div>
                        <div className="contact-item">
                            <FaEnvelope className="contact-icon" />
                            <span>kaushik.phaniharam@gmail.com</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div className="footer-section links" variants={itemVariants}>
                    <h3>Quick Links</h3>
                    <ul>
                        <li>
                            <FaChevronRight className="link-icon" />
                            <Link to="/aboutus">About Us</Link>
                        </li>
                        <li>
                            <FaChevronRight className="link-icon" />
                            <Link to="/contact">Contact</Link>
                        </li>
                        <li>
                            <FaChevronRight className="link-icon" />
                            <Link to="/articles">Blogs</Link>
                        </li>
                        <li>
                            <FaChevronRight className="link-icon" />
                            <Link to="/terms">Terms & Conditions</Link>
                        </li>
                        <li>
                            <FaChevronRight className="link-icon" />
                            <Link to="/privacy">Privacy Policy</Link>
                        </li>
                    </ul>
                </motion.div>

                <motion.div className="footer-section social" variants={itemVariants}>
                    <h3>Follow Us</h3>
                    <p>Stay connected with us on social media platforms</p>
                    <div className="social-icons">
                        <motion.a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <FaFacebook />
                        </motion.a>
                        <motion.a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <FaInstagram />
                        </motion.a>
                        <motion.a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <FaTwitter />
                        </motion.a>
                        <motion.a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <FaLinkedin />
                        </motion.a>
                    </div>
                    <div className="newsletter">
                        <h4>Subscribe to Newsletter</h4>
                        <div className="newsletter-form">
                            <input type="email" placeholder="Your Email" required />
                            <motion.button onClick={subscribe}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Subscribe
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} VNRVJIET. All rights reserved.</p>
                <div className="footer-bottom-links">
                    <Link to="/privacy">Privacy</Link>
                    <Link to="/terms">Terms</Link>
                    <Link to="/faq">FAQ</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;