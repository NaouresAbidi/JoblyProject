import React, { useState, useEffect } from "react";
import "./profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No userId provided");
      return;
    }

    fetch(`http://localhost:3000/user?_id=${userId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Profile not found");
        return response.json();
      })
      .then((userSchema) => {
        setProfile({
          userId, // Storing userId explicitly for updates
          username: userSchema.username,
          email: userSchema.email,
          country: userSchema.country,
          city: userSchema.city,
          bio: userSchema.bio || "", // Default empty bio if missing
        });
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const handleEditToggle = async (field) => {
    if (isEditing[field]) {
      try {
        const response = await fetch(`http://localhost:3000/user`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: profile.userId, // Use correct field name for backend
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
        alert("Failed to save changes."); // Notify user about the failure
        return; // Stop further toggling
      }
    }

    // Toggle editing state
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleInputChange = (field, value) => {
    if (profile.hasOwnProperty(field)) {
      setProfile((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    }
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
