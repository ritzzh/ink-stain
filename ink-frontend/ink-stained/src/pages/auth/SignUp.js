import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  MenuItem,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import { register, clearError, clearSuccess } from "../../features/auth/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const { loading, error, success } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    partner: "",
    adminCode: "",
    age: "",
    gender: "",
    chomulation: "",
    profileImage: null,
  });

  const [errors, setErrors] = useState({});
  const [showExtraFields, setShowExtraFields] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (success) {
      // Redirect to login after success
      setTimeout(() => {
        dispatch(clearSuccess());
        navigate("/login");
      }, 2000); // Wait for 2 seconds before redirecting
    }
  }, [success, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage" && files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setImagePreview(URL.createObjectURL(file)); // Set image preview
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "A valid email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const submissionData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submissionData.append(key, value);
      });
      dispatch(register(formData));
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-5 mb-4">
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h5" className="text-center mb-3">
                Sign Up
              </Typography>
              {error && (
                <Alert severity="error" onClose={() => dispatch(clearError())}>
                  {error}
                </Alert>
              )}
              {success && (
                <Alert severity="success">
                  {success} Redirecting to login...
                </Alert>
              )}
              <form onSubmit={handleSubmit}>
                {[
                  { label: "Username", name: "username", type: "text" },
                  { label: "Name", name: "name", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Password", name: "password", type: "password" },
                  {
                    label: "Confirm Password",
                    name: "confirmPassword",
                    type: "password",
                  },
                ].map(({ label, name, type }) => (
                  <TextField
                    key={name}
                    label={label}
                    name={name}
                    type={type}
                    fullWidth
                    variant="outlined"
                    value={formData[name]}
                    onChange={handleChange}
                    error={!!errors[name]}
                    helperText={errors[name]}
                    className="mb-3"
                  />
                ))}
                <FormControlLabel
                  control={
                    <Switch
                      checked={showExtraFields}
                      onChange={() => setShowExtraFields((prev) => !prev)}
                    />
                  }
                  label="Advanced Sign Up"
                />
              </form>
            </CardContent>
          </Card>
        </div>

        {showExtraFields && (
          <div className="col-lg-5 mb-4">
            <Card className="shadow-lg">
              <CardContent>
                <form>
                  {imagePreview && (
                    <div className="text-center mb-3">
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className="img-thumbnail"
                        style={{ width: 150, height: 150 }}
                      />
                    </div>
                  )}
                  <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    className="mb-3"
                  >
                    Upload Profile Image
                    <input
                      type="file"
                      hidden
                      name="profileImage"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </Button>
                  {[
                    { label: "Partner Username", name: "partner", type: "text" },
                    { label: "Admin Code", name: "adminCode", type: "text" },
                    { label: "Age", name: "age", type: "number" },
                    {
                      label: "Gender",
                      name: "gender",
                      type: "select",
                      options: [
                        "male",
                        "female",
                        "non-binary",
                        "prefer not to say",
                      ],
                    },
                    {
                      label: "Chomulation Code",
                      name: "chomulationCode",
                      type: "text",
                    },
                  ].map(({ label, name, type, options }) =>
                    type === "select" ? (
                      <TextField
                        key={name}
                        select
                        label={label}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        fullWidth
                        className="mb-3"
                      >
                        {options.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      <TextField
                        key={name}
                        label={label}
                        name={name}
                        type={type}
                        fullWidth
                        variant="outlined"
                        value={formData[name]}
                        onChange={handleChange}
                        className="mb-3"
                      />
                    )
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <div className="text-center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className="mt-4"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
