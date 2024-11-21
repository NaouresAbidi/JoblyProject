import React, { useState, useEffect } from "react";
import "./profile.css";

const Profile = ({ userId }) => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState({});

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      console.error("No userId provided");
      return;
    }

    fetch(`http://localhost:3000/user?_id=${storedUserId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Profile not found");
        return response.json();
      })
      .then((userSchema) => {
        setProfile({
          _id: storedUserId,
          username: userSchema.username,
          email: userSchema.email,
          country: userSchema.country,
          city: userSchema.city,
        });
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [userId]);

  const handleEditToggle = async (field) => {
    if (isEditing[field]) {
      try {
        const response = await fetch(`http://localhost:3000/user`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: profile._id, 
            [field]: profile[field], 
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save changes");
        }

        const data = await response.json();
        console.log(data.msg); // Log success message
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    }

    // Toggle editing mode for the field
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // Handle input changes for editable fields
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
            <span className="label">Username:</span>
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
            <span className="label">Bio:</span>
            {isEditing.bio ? (
              <input
                type="text"
                value={profile.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
              />
            ) : (
              <span>{profile.bio}</span>
            )}
            <button onClick={() => handleEditToggle("bio")}>
              {isEditing.bio ? "Save" : "Edit"}
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
