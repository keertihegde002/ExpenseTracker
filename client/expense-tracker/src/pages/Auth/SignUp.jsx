import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";
    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter password");
      return;
    }

    setError("");

    try {
      if (profilePicture) {
        const uploadImageResponse = await uploadImage(profilePicture);
        profileImageUrl = uploadImageResponse.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Network error, please try again later"
      );
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 w-full max-w-md">
        <h3 className="text-2xl font-semibold text-gray-900 mb-1">Create an Account</h3>
        <p className="text-sm text-gray-600 mb-6">
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignUp} className="space-y-5">
          <ProfilePhotoSelector
            image={profilePicture}
            setImage={setProfilePicture}
          />
          <Input
            value={fullName}
            label="Full Name"
            onChange={(event) => setFullName(event.target.value)}
            placeholder="John"
            type="text"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="name@example.com"
            type="email"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Create a strong password"
            type="password"
          />

          {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 rounded-lg transition-all"
          >
            Sign Up
          </button>

          <p className="text-sm text-gray-700 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
