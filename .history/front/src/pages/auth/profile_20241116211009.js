import React, { useState, useEffect } from "react";
import "./profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState({});

  useEffect(() => {
    const email = "user@example.com"; // Replace with the logged-in user's email or dynamically fetch this.
    fetch(`http://localhost:3000/profile?email=${email}`)
      .then((response) => {
        if (!response.ok) throw new Error("Profile not found");
        return response.json();
      })
      .then((userSchema) => {
        setProfile({
          username: userSchema.username,
          email: userSchema.email,
          country: userSchema.country,
          city: userSchema.city,
        });
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const handleEditToggle = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleInputChange = (field, value) => {
    setProfile((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      {Object.keys(profile).length > 0 ? (
        <>
          <div className="profile-item">
            <span className="label">Name:</span>
            {isEditing.username ? (
              <input
                type="text"
                value={profile.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
              />
            ) : (
              <span>{profile.username}</span>
            )}
            <button onClick={() => handleEditToggle("username")}>
              {isEditing.username ? "Save" : "Edit"}
            </button>
          </div>

          <div className="profile-item">
            <span className="label">Email:</span>
            <span>{profile.email}</span>
          </div>

          <div className="profile-item">
            <span className="label">Country:</span>
            {isEditing.country ? (
              <input
                type="text"
                value={profile.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
              />
            ) : (
              <span>{profile.country}</span>
            )}
            <button onClick={() => handleEditToggle("country")}>
              {isEditing.country ? "Save" : "Edit"}
            </button>
          </div>

          <div className="profile-item">
            <span className="label">City:</span>
            {isEditing.city ? (
              <input
                type="text"
                value={profile.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
            ) : (
              <span>{profile.city}</span>
            )}
            <button onClick={() => handleEditToggle("city")}>
              {isEditing.city ? "Save" : "Edit"}
            </button>
          </div>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
