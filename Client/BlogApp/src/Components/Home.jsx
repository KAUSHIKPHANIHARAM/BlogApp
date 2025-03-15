import React from 'react';
import '../Styles/Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()
    const goToRegister = () => {
        navigate('/register')
    }
    return (
        <div className="home-container">
            <header className="hero-section">
                <h1>Welcome to the Blogging World</h1>
                <p>Unleash your thoughts, inspire the world, and create a lasting impact with your words.</p>
                <button className="cta-button " onClick={goToRegister}>Start Writing</button>
            </header>

            <section className="info-section">
                <h2>What are Blogs?</h2>
                <div className="info-content">
                    <p>Blogs are online spaces where individuals share insights, experiences, and ideas. Whether personal or professional, blogs serve as a medium to educate, entertain, and engage audiences worldwide.</p>
                    <img src="https://plus.unsplash.com/premium_photo-1682434403587-1313db01ed02?w=500&auto=format&fit=crop&q=60" alt="Blogs" />
                </div>
            </section>

            <section className="info-section reverse">
                <h2>Why Write Blogs?</h2>
                <div className="info-content">
                    <p>Writing a blog allows you to build your digital identity, express your creativity, and connect with like-minded individuals. It can also be a great tool for career growth and knowledge sharing.</p>
                    <img src="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=500&auto=format&fit=crop&q=60" alt="Writing Blogs" />
                </div>
            </section>

            <section className="info-section">
                <h2>Power of Blogging</h2>
                <div className="info-content">
                    <img src="https://media.istockphoto.com/id/876014518/photo/blog-blogging-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=7R1PzUH670cyZqD3_FWAPR093uqrzq_F4wJGwizPkBU=" alt="Importance of Blogging" />
                    <p>Blogging helps in branding, improving communication skills, and driving online visibility. Whether for business, personal storytelling, or social influence, blogging remains a powerful tool in the digital age.</p>
                </div>
            </section>

            <section className="info-section reverse">
                <h2>Join the Global Blogging Community</h2>
                <div className="info-content">
                    <img src="https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?w=500&auto=format&fit=crop&q=60" alt="Blogging Community" />
                    <p>Become part of a dynamic community where creativity meets impact. Connect with fellow writers, learn new skills, and expand your reach. Your story deserves to be told!</p>
                </div>
            </section>


            <header className="hero-section">
                <h1>Start Your Blogging Journey Today</h1>
                <p>Share your knowledge, tell your story, and inspire the world.</p>
                <button className="cta-button " onClick={goToRegister}>Get Started</button>
            </header>

            {/* <footer className="cta-footer">
                <h2>Start Your Blogging Journey Today</h2>
                <p>Share your knowledge, tell your story, and inspire the world.</p>
                <button className="cta-button" onClick={goToRegister}>Get Started</button>
            </footer> */}
        </div>
    );
}

export default Home;
