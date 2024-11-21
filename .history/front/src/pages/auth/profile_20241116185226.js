import React, { useState } from "react";
import "./ProfilePage.css";
import { Link } from 'react-router-dom';


const Profile = () => {
  const [isEditing, setIsEditing] = useState({});
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+123456789",
    address: "123 Main Street, City, Country",
  });

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
        <span className="label">Phone:</span>
        {isEditing.phone ? (
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        ) : (
          <span>{profile.phone}</span>
        )}
        <button onClick={() => handleEditToggle("phone")}>
          {isEditing.phone ? "Save" : "Edit"}
        </button>
      </div>

      <div className="profile-item">
        <span className="label">Address:</span>
        {isEditing.address ? (
          <input
            type="text"
            value={profile.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
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
