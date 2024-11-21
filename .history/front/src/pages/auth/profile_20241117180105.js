import React, { useState, useEffect } from "react";
import "./profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No userId provided");
      return;
    }

    fetch(`http://localhost:3000/profile?_id=${userId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Profile not found");
        return response.json();
      })
      .then((userSchema) => {
        setProfile({
          _id: userId,
          username: userSchema.username,
          email: userSchema.email,
          country: userSchema.country,
          city: userSchema.city,
          bio: userSchema.bio || "",
          profilePicture: userSchema.profilePicture, // Add profile picture
        });
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const handleEditToggle = async (field) => {
    if (isEditing[field]) {
      try {
        const response = await fetch(`http://localhost:3000/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: profile._id,
            username: field === "username" ? profile.username : undefined,
            bio: field === "bio" ? profile.bio : undefined,
            country: field === "country" ? profile.country : undefined,
            city: field === "city" ? profile.city : undefined,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save changes");
        }

        const data = await response.json();
        console.log(data.msg);
      } catch (error) {
        console.error("Error saving changes:", error);
        alert("Failed to save changes.");
        return;
      }
    }

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

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const uploadProfilePicture = async () => {
    if (!profilePicture) {
      alert("Please select a profile picture.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", profilePicture);
    formData.append("_id", profile._id);

    try {
      const response = await fetch("http://localhost:3000/profile/profile-picture", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload profile picture");
      }

      const data = await response.json();
      alert(data.msg);
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePicture: data.updatedUser.profilePicture,
      }));
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture.");
    }
  };

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      {Object.keys(profile).length > 0 ? (
        <>
        <img src=`http://localhost:3000/uploads/profile.profilePicture` alt="Profile Picture" className="profile-picture" />


        <div className="profile-item">
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
            <button onClick={uploadProfilePicture}>Upload</button>
          </div>
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
