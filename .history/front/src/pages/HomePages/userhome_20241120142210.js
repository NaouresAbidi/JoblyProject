import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark, faCommentDots, faHome, faUsers, faBriefcase, faComments, faBell, faUserCircle,
  faEdit, faFileAlt, faVideo, faCamera, faThumbsUp, faSignLanguage, faHeart, faCircle, faSearch,
  faGlobe, faShareSquare, faInfoCircle, faArrowDown, faArrowUp
} from '@fortawesome/free-solid-svg-icons';

const UserHome = () => {
    const [profile, setProfile] = useState(null);
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            console.error("No userId provided");
            return;
        }

        // Fetch user profile
        fetch(`http://localhost:3000/user?_id=${userId}`)
            .then(response => response.json())
            .then(userSchema => {
                setProfile({
                    _id: userId,
                    username: userSchema.username,
                    email: userSchema.email,
                    country: userSchema.country,
                    city: userSchema.city,
                    bio: userSchema.bio,
                    profilePicture: userSchema.profilePicture,
                });
            })
            .catch(error => console.error("Error fetching profile:", error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/user/news')
            .then(response => response.json())
            .then(newsData => {
                setNews(newsData);
                setHasNextPage(newsData.length > currentPage * 3);
                setHasPrevPage(currentPage > 1);
            })
            .catch(error => console.error("Error fetching news:", error));
    }, [currentPage]);

    const scrollToNext = () => {
        const newsContainer = document.getElementById("news-list-container");
        newsContainer.scrollBy({
            top: 100, // Adjust scroll distance as needed
            behavior: 'smooth',
        });
        setCurrentPage(prevPage => prevPage + 1);
    };

    const scrollToTop = () => {
        const newsContainer = document.getElementById("news-list-container");
        newsContainer.scrollBy({
            top: -100, // Adjust scroll distance as needed
            behavior: 'smooth',
        });
        setCurrentPage(prevPage => prevPage - 1);
    };

    const displayedNews = news.slice(3 * (currentPage - 1), 3 * currentPage);

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img src={require('./images/joblylogo.png')} style={{ width: '48px' }} alt="Jobly Logo" />
            </a>
            <form className="form-inline mx-auto">
              <input id="search" type="search" placeholder="Search" aria-label="Search" />
            </form>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto" id="space">
                <li className="nav-item"><a className="nav-link" href="#"><FontAwesomeIcon icon={faHome} /><br />Home</a></li>
                <li className="nav-item"><a className="nav-link" href="#"><FontAwesomeIcon icon={faUsers} /><br />Network</a></li>
                <li className="nav-item"><a className="nav-link" href="#"><FontAwesomeIcon icon={faBriefcase} /><br />Jobs</a></li>
                <li className="nav-item"><a className="nav-link" href="#"><FontAwesomeIcon icon={faComments} /><br />Messaging</a></li>
                <li className="nav-item"><a className="nav-link" href="#"><FontAwesomeIcon icon={faBell} /><br />Notifications</a></li>
              </ul>
            </div>
          </div>
        </nav>
  
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <aside className="common-properties" id="left-card">
                <div id="profile-picture">
                  {profile ? (
                    <>
                      <img
                        src={profile.profilePicture ? `http://localhost:3000/uploads/${profile.profilePicture}` : "/default-profile.png"}
                        alt="Profile"
                      />
                      <h6>{profile.username}</h6>
                      <hr />
                      <p>{profile.bio}</p>
                      <p><Link to="/profile">Profile</Link></p>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </aside>
            </div>
  
            <div className="col-sm-6">
              <div className="common-properties" id="new-post-container">
                <button className="btn"><FontAwesomeIcon icon={faEdit} /> Start a post</button>
                <button className="btn share-media"><FontAwesomeIcon icon={faFileAlt} /></button>
                <button className="btn share-media"><FontAwesomeIcon icon={faVideo} /></button>
                <button className="btn share-media"><FontAwesomeIcon icon={faCamera} /></button>
              </div>
            </div>
  
            <div className="col-sm-3">
                        <aside className="common-properties" id="right-card">
                            <h6>Today's News and Views <FontAwesomeIcon icon={faInfoCircle} /></h6>
                            {news.length > 0 ? (
                                <div className="news-list-container" id="news-list-container">
                                    <button className="scroll-btn up" onClick={scrollToTop} style={{ display: hasPrevPage ? 'block' : 'none' }}>
                                        <FontAwesomeIcon icon={faArrowUp} />
                                    </button>

                                    <ul className="news-list">
                                        {displayedNews.map((item, index) => (
                                            <li key={index} className="news-item">
                                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                    <div className="news-card">
                                                        <img src={item.urlToImage} alt={item.title} className="news-image" />
                                                        <h5 className="news-title">{item.title}</h5>
                                                        <p className="news-description">{item.description}</p>
                                                        <small className="news-date">{new Date(item.publishedAt).toLocaleDateString()}</small>
                                                    </div>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>

                                    <button className="scroll-btn down" onClick={scrollToNext} style={{ display: hasNextPage ? 'block' : 'none' }}>
                                        <FontAwesomeIcon icon={faArrowDown} />
                                    </button>
                                </div>
                            ) : (
                                <p>Loading news...</p>
                            )}
                        </aside>
                    </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserHome;
  