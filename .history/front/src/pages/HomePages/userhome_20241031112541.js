import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css'; // Ensure this path is correct for your project
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faHome, faUsers, faBriefcase, faComments, faBell, faUserCircle, faEdit, faFileAlt, faVideo, faCamera, faThumbsUp, faSignLanguage, faHeart, faCircle, faPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faGlobe, faShareSquare } from '@fortawesome/free-solid-svg-icons';


const UserHome = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#0a66c2' }}>
        <div className="container">
          <a className="navbar-brand" href="#"><img src="/images\joblylogo.png" style={{ width: '48px' }} alt="LinkedIn Logo" /></a>
          <form className="form-inline">
            <div className="input-icons">
              <FontAwesomeIcon icon={faSearch} />
              <input className="form-control mr-sm-2" id="search" type="search" placeholder="Search" aria-label="Search" />
            </div>
          </form>
          <button className="navbar-toggler" id="custom-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <nav className="navbar navbar-light no-pad">
              <ul className="navbar-nav mr-auto" id="space">
                <li className="nav-item"><a className="nav-link" href="#" style={{ fontSize: '11px' }}><FontAwesomeIcon icon={faHome} size="2x" /><br />Home</a></li>
                <li className="nav-item"><a className="nav-link" href="#" style={{ fontSize: '11px' }}><FontAwesomeIcon icon={faUsers} size="2x" /><br />My Network</a></li>
                <li className="nav-item"><a className="nav-link" href="#" style={{ fontSize: '11px' }}><FontAwesomeIcon icon={faBriefcase} size="2x" /><br />Jobs</a></li>
                <li className="nav-item"><a className="nav-link" href="#" style={{ fontSize: '11px' }}><FontAwesomeIcon icon={faComments} size="2x" /><br />Messaging</a></li>
                <li className="nav-item"><a className="nav-link" href="#" style={{ fontSize: '11px' }}><FontAwesomeIcon icon={faBell} size="2x" /><br />Notification</a></li>
              </ul>
            </nav>
            {/* Dropdowns and additional elements would go here */}
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          {/* Left Sidebar */}
          <div className="col-sm-2.5">
            <aside className="common-properties" id="left-card">
              <div id="cover-picture"></div>
              <div id="profile-picture">
                <FontAwesomeIcon icon={faUserCircle} size="4x" />
                <h6 style={{ color: 'black' }}>User Name</h6>
                User Bio
                <hr />
              </div>
              <div className="secondary-info">
                <a href="#">Who viewed your profile<b style={{ color: '#4079cf', marginLeft: '30px' }}>Total</b></a>
                <br />
                <a href="#">Connections<b style={{ color: '#4079cf', marginLeft: '95px' }}>Total</b><br /><b style={{ color: 'black' }}>Manage your network</b></a>
              </div>
              <div className="secondary-info">
                <a href="#">Access exclusive tools & insights<br /><b style={{ color: 'black' }}>Try Premium Free for 1 Month</b></a>
              </div>
              <hr />
              <div className="secondary-info-saveitem">
                <a href="#"><FontAwesomeIcon icon={faBookmark} />&emsp;Saved items</a>
              </div>
            </aside>
          </div>

          {/* Middle Content */}
          <div className="col-sm-6">
            <div className="common-properties" id="new-post-container">
              <div id="new-post">
                <button type="button" className="btn" id="new-post-btn">
                  <FontAwesomeIcon icon={faEdit} />&nbsp;Start a post
                </button>
                <button type="button" className="btn share-media" style={{ borderLeft: '1px solid rgba(0,0,0,.15)' }}>
                  <FontAwesomeIcon icon={faFileAlt} />
                </button>
                <button type="button" className="btn share-media" style={{ borderLeft: '1px solid rgba(0,0,0,.15)' }}>
                  <FontAwesomeIcon icon={faVideo} />
                </button>
                <button type="button" className="btn share-media" style={{ borderLeft: '1px solid rgba(0,0,0,.15)' }}>
                  <FontAwesomeIcon icon={faCamera} />
                </button>
              </div>
              <div id="article">
                <a href="#" style={{ color: '#4079cf' }}>Write an article</a>&nbsp;on LinkedIn
              </div>
            </div>

            {/* Posts */}
            <div className="common-properties" id="show-post-container">
              <div id="show-comment-on-post">
                <b style={{ color: 'black' }}>Your connection&nbsp;</b>commented/reacted on this
              </div>
              <div id="show-account-name">
                <a href="#">
                  <FontAwesomeIcon icon={faUserCircle} size="4x" style={{ color: 'rgba(0,0,0,.6)' }} />
                  <div style={{ display: 'inline-block' }}>
                    <b style={{ color: 'black' }}>User Name</b>&nbsp;<FontAwesomeIcon icon={faCircle} style={{ fontSize: '4px', color: 'black' }} />&nbsp;1st
                    <br />
                    <p>User bio</p>
                    <p>8h <FontAwesomeIcon icon={faCircle} style={{ fontSize: '4px', color: 'black' }} /> Edited/None <FontAwesomeIcon icon={faCircle} style={{ fontSize: '4px', color: 'black' }} /> <FontAwesomeIcon icon={faGlobe} /></p>
                  </div>
                </a>
              </div>
              <div id="caption">
                <p>🎉 Exciting News! 🎉 I'm thrilled to share that I have just earned my AWS certification, thanks to the exceptional support from my faculty at Tekup University...</p>
              </div>
              <div id="likes">
                <ul>
                  <li>
                    <button type="button" className="btn">
                      <FontAwesomeIcon icon={faThumbsUp} style={{ color: 'blue' }} />
                      <FontAwesomeIcon icon={faSignLanguage} style={{ color: 'green' }} />
                      <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
                      <span>72</span>
                    </button>
                  </li>
                  <li>
                    <button type="button" className="btn">
                      <span>43 Comments</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div id="like-option">
                <span>
                  <button type="button" className="btn">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    Like
                  </button>
                </span>
                <span>
                  <button type="button" className="btn">
                    <FontAwesomeIcon icon={faCommentDots} />
                    Comment
                  </button>
                </span>
                <span>
                  <button type="button" className="btn">
                    <FontAwesomeIcon icon={faShareSquare} />
                    Share
                  </button>
                </span>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-sm-3.5">
            <aside className="common-properties" id="right-card">
              <div id="news-views">
                Today's news and views
                <span style={{ float: 'right' }}>
                  <button type="button" className="btn" style={{ background: 'transparent', color: 'rgba(0,0,0,.6)', padding: '0 !important', border: '0 !important' }}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </button>
                </span>
              </div>
              <ul id="news-section">
                {/* Example news items, repeat as necessary */}
                <li>
                  <a href="#">
                    <div>
                      <FontAwesomeIcon icon={faCircle} style={{ marginLeft: '12px', fontSize: '9px', color: '#0ea7e8' }} />&emsp;<span>News Headline 1</span>
                    </div>
                    <span className="news-day">1d ago&nbsp;<FontAwesomeIcon icon={faCircle} style={{ fontSize: '4px' }} />&nbsp;1,706 readers</span>
                  </a>
                </li>
                {/* More news items... */}
              </ul>
            </aside>
            <br />
            <aside className="common-properties" id="advertisement">
              <img src="images/advertisement.png" style={{ width: '288px', height: '238px' }} alt="Advertisement" />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
