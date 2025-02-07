import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Mood as MoodIcon,
  Event as EventIcon,
  Favorite as FavoriteIcon,
  Movie as MovieIcon,
  MusicNote as MusicNoteIcon,
  PhotoCamera as PhotoCameraIcon,
} from "@mui/icons-material";
import { styled } from "@mui/system";

import ConfirmationModal from "../../components/modal/ConfirmModal";
import { fetchUserByUsername, updateUserProfile } from "../../api/userApi";

const AvatarWrapper = styled(Box)({
  position: "relative",
  width: 300,
  height: 300,
  display: "inline-block",
  margin: "0 auto",
});

const CameraIconWrapper = styled(Box)({
  position: "absolute",
  bottom: 0,
  right: 0,
  background: "#1976d2",
  borderRadius: "50%",
  padding: "5px",
  cursor: "pointer",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
});

const ProfileCard = ({ user }) => {
  const [moodInfo, setMoodInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const profileInfo = await fetchUserByUsername(user.username);
      setUserInfo(profileInfo.user);
      setMoodInfo(profileInfo.currentMood);
      setFormData(profileInfo.user);
      setProfileImage(profileInfo.user.profileImage);
    };
    fetchProfile();
  }, [user]);

  const handleSave = async (field) => {
    try {
      const updatedUser = await updateUserProfile(user.username, {
        [field]: formData[field],
      });
      setUserInfo(updatedUser.user);
      setEditField(null);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setShowConfirmation(true);
    }
  };

  const handleProfileImageUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    try {
      const updatedUser = await updateUserProfile(user.username, {
        profileImage: URL.createObjectURL(selectedFile),
      });
      setProfileImage(URL.createObjectURL(selectedFile));
      setUserInfo(updatedUser.user);
    } catch (error) {
      console.error("Failed to update profile image:", error);
    } finally {
      setShowConfirmation(false);
      setSelectedFile(null);
    }
  };

  const renderField = (label, field, IconComponent) => (
    <Box className="d-flex align-items-center mb-2">
      <IconComponent className="text-primary me-2" />
      {editField === field ? (
        <>
          <TextField
            name={field}
            value={formData[field] || ""}
            onChange={handleInputChange}
            size="small"
            variant="outlined"
            style={{ marginRight: "8px" }}
          />
          <IconButton onClick={() => handleSave(field)} color="primary">
            <SaveIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="body1" style={{ marginRight: "8px" }}>
            {label}: {userInfo[field] || "N/A"}
          </Typography>
          {!(field === 'partner' && userInfo.partner) &&  <IconButton onClick={() => setEditField(field)} color="primary">
            <EditIcon />
          </IconButton>}
        </>
      )}
    </Box>
  );

  return (
    <Card className="d-flex mb-4 shadow-sm" style={{ borderRadius: "16px" }}>
      <Box
        className="d-flex align-items-center bg-light p-4"
        style={{ width: "40%", borderRadius: "16px 0 0 16px" }}
      >
        <AvatarWrapper>
          <Avatar
            src={profileImage}
            sx={{ width: 300, height: 300, border: "4px solid white" }}
          />
          <CameraIconWrapper component="label">
            <PhotoCameraIcon sx={{ color: "white" }} />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleProfileImageSelect}
            />
          </CameraIconWrapper>
        </AvatarWrapper>
      </Box>

      <CardContent
        className="d-flex flex-column justify-content-center"
        style={{ width: "60%" }}
      >
        <Typography variant="h5" gutterBottom>
          {userInfo.username}
        </Typography>

        {renderField("Username", "username", PersonIcon)}
        {renderField("Email", "email", EmailIcon)}
        {renderField("Partner", "partner", FavoriteIcon)}
        {renderField("Chomulation Code", "chomulation", EventIcon)}
        {renderField("Favorite Song", "currentFavSong", MusicNoteIcon)}
        {renderField("Favorite Movie", "currentFavMovie", MovieIcon)}

        <Box className="d-flex align-items-center mb-2">
          <MoodIcon className="text-primary me-2" />
          <Typography variant="body1">
            Mood: {moodInfo?.description || "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <ConfirmationModal
        open={showConfirmation}
        handleClose={() => setShowConfirmation(false)}
        message="Are you sure you want to upload this new profile picture?"
        onConfirm={(result) => {
          if (result) {
            handleProfileImageUpload();
          } else {
            setSelectedFile(null);
          }
          setShowConfirmation(false);
        }}
      />
    </Card>
  );
};

export default ProfileCard;
