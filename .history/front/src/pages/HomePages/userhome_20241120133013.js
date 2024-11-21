import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark, faCommentDots, faHome, faUsers, faBriefcase, faComments, faBell, faUserCircle,
  faEdit, faFileAlt, faVideo, faCamera, faThumbsUp, faSignLanguage, faHeart, faCircle, faSearch,
  faGlobe, faShareSquare, faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

const UserHome = () => {
  const [profile, setProfile] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No userId provided");
      return;
    }

    // Fetch user profile
    fetch(`http://localhost:3000/user?_id=${userId}`)
      .then(response => {
        if (!response.ok) throw new Error("Profile not found");
        return response.json();
      })
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
    // Fetch the news from your backend
    fetch('http://localhost:3000/usernews')
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch news");
      return response.json();
    })
    .then(newsData => {
      setNews(newsData); // Set the fetched news to the state
    })
    .catch(error => console.error("Error fetching news:", error));
  }, []);

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
                      src={
                        profile.profilePicture
                          ? `http://localhost:3000/uploads/${profile.profilePicture}`
                          : "/default-profile.png"
                      }
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
              <ul>
                {news.length > 0 ? (
                  news.map((item, index) => (
                    <li key={index}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faCircle} /> {item.title}
                      </a> 
                      <small>{new Date(item.publishedAt).toLocaleDateString()}</small>
                    </li>
                  ))
                ) : (
                  <p>Loading news...</p>
                )}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
