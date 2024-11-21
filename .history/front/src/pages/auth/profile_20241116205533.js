import React, { useState, useEffect } from "react";
import "./ProfilePage.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState({});
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+123456789",
    address: "123 Main Street, City, Country",
  });

  useEffect(() => {    
    fetch(`http://localhost:3000/auth/profile?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setProfile({
          name: data.name,
          email: data.email,
          phone: data.Country,
          address: data.City,
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
      <div className="profile-item">
        <span className="label">Name:</span>
        {isEditing.name ? (
          <input
            type="text"
            value={profile.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        ) : (
          <span>{profile.name}</span>
        )}
        <button onClick={() => handleEditToggle("name")}>
          {isEditing.name ? "Save" : "Edit"}
        </button>
      </div>

      <div className="profile-item">
        <span className="label">Email:</span>
        {isEditing.email ? (
          <input
            type="email"
            value={profile.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        ) : (
          <span>{profile.email}</span>
        )}
        <button onClick={() => handleEditToggle("email")}>
          {isEditing.email ? "Save" : "Edit"}
        </button>
      </div>

      <div className="profile-item">
        <span className="label">Country:</span>
        {isEditing.Country ? (
          <input
            type="text"
            value={profile.Country}
            onChange={(e) => handleInputChange("country", e.target.value)}
          />
        ) : (
          <span>{profile.Country}</span>
        )}
        <button onClick={() => handleEditToggle("country")}>
          {isEditing.Country ? "Save" : "Edit"}
        </button>
      </div>

      <div className="profile-item">
        <span className="label">City</span>
        {isEditing.City ? (
          <input
            type="text"
            value={profile.City}
            onChange={(e) => handleInputChange("city", e.target.value)}
          />
        ) : (
          <span>{profile.address}</span>
        )}
        <button onClick={() => handleEditToggle("address")}>
          {isEditing.address ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
