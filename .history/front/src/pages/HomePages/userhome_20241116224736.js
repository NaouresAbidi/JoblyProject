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

    useEffect(() => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
          console.error('No userId found in localStorage');
          return;
      }
  
      fetch(`http://localhost:3000/userhome?userId=${userId}`)
          .then((response) => {
              if (!response.ok) throw new Error('Failed to fetch profile');
              return response.json();
          })
          .then((data) => setProfile(data))
          .catch((error) => console.error('Error fetching profile:', error));
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
                            <div id="cover-picture"></div>
                            <div id="profile-picture">
                                <FontAwesomeIcon icon={faUserCircle} size="4x" />
                                {profile ? (
                                    <>
                                        <h6>{profile.username}</h6>
                                        <hr />
                                        <p><a href="#">Who viewed your profile</a></p>
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

                        <div className="common-properties" id="show-post-container">
                            <div><strong>Your connection commented/reacted on this</strong></div>
                            <div>
                                <FontAwesomeIcon icon={faUserCircle} size="4x" />
                                <b>{profile ? profile.username : 'User Name'}</b> <FontAwesomeIcon icon={faCircle} /> 1st
                                <p>{profile ? `${profile.city}, ${profile.country}` : 'User bio'}</p>
                            </div>
                            <p>🎉 Exciting News! 🎉 Just earned my AWS certification...</p>
                            <div id="likes">
                                <button className="btn"><FontAwesomeIcon icon={faThumbsUp} /><FontAwesomeIcon icon={faSignLanguage} /><FontAwesomeIcon icon={faHeart} /> 72</button>
                                <button className="btn">43 Comments</button>
                            </div>
                            <div id="like-option">
                                <button className="btn"><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
                                <button className="btn"><FontAwesomeIcon icon={faCommentDots} /> Comment</button>
                                <button className="btn"><FontAwesomeIcon icon={faShareSquare} /> Share</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <aside className="common-properties" id="right-card">
                            <h6>Today's News and Views <FontAwesomeIcon icon={faInfoCircle} /></h6>
                            <ul>
                                <li><a href="#"><FontAwesomeIcon icon={faCircle} /> News Headline 1</a> <small>1d ago</small></li>
                                <li><a href="#"><FontAwesomeIcon icon={faCircle} /> News Headline 2</a> <small>2d ago</small></li>
                            </ul>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserHome;

