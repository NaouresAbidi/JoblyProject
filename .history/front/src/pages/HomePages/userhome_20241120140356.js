const UserHome = () => {
  const [profile, setProfile] = useState(null);
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollingUp, setScrollingUp] = useState(false); // To toggle between arrows
  const [hasNextPage, setHasNextPage] = useState(false); // To check if there's another page of news
  const [hasPrevPage, setHasPrevPage] = useState(false); // To check if there's a previous page

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
    fetch('http://localhost:3000/user/news')
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch news");
        return response.json();
      })
      .then(newsData => {
        setNews(newsData);
        // Set whether we have previous or next pages
        setHasNextPage(newsData.length > currentPage * 5);
        setHasPrevPage(currentPage > 1);
      })
      .catch(error => console.error("Error fetching news:", error));
  }, [currentPage]);

  const scrollToNext = () => {
    setCurrentPage(prevPage => prevPage + 1);
    setScrollingUp(false); // Show down arrow
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    setCurrentPage(prevPage => prevPage - 1);
    setScrollingUp(true); // Show up arrow
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayedNews = news.slice(5 * (currentPage - 1), 5 * currentPage);

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
                <>
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

                  <button className={`scroll-btn ${scrollingUp ? 'up' : 'down'}`} onClick={scrollingUp ? scrollToTop : scrollToNext} style={{ display: hasNextPage || hasPrevPage ? 'block' : 'none' }}>
                    <FontAwesomeIcon icon={scrollingUp ? faArrowUp : faArrowDown} />
                  </button>
                </>
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
