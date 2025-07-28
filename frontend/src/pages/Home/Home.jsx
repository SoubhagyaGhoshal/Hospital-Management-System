import React, { useState } from "react";
import bgImg from "../../assets/Home-bg-01.png";
import { GrFacebookOption } from "react-icons/gr";
import {
  FaGoogle,
  FaTwitter,
  FaLinkedinIn,
  FaRegEyeSlash,
} from "react-icons/fa";
import { CgGirl } from "react-icons/cg";
import { IoEyeOutline } from "react-icons/io5";
import { loginAdmin } from "../../Api/AdminApi";
import { loginPatient } from "../../Api/PatientApi";
import { doctorLogin } from "../../Api/DoctorApi";
import { useNavigate } from "react-router-dom";
import ConnectionTest from "../../components/ConnectionTest";

function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = async () => {
    if (!selectedRole) {
      setError("Please select a role: Admin, Doctor, or Patient.");
      return;
    }
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      if (selectedRole === "Admin") {
        const response = await loginAdmin({ username, password });

        if (response) {
          setSuccess(`Login successful as ${selectedRole}`);
          localStorage.setItem("token", response.token);
          localStorage.setItem("userRole", "admin");
          navigate("/dashbord");
        } else {
          setError("Login failed.");
        }
      } else if (selectedRole === "Patient") {
        const response = await loginPatient({ email: username, password });

        if (response && response.token) {
          setSuccess(`Login successful as ${selectedRole}`);
          localStorage.setItem("token", response.token);
          localStorage.setItem("userRole", "patient");
          localStorage.setItem("patientData", JSON.stringify(response.patient));
          navigate("/patient-dashboard");
        } else {
          setError("Invalid email or password.");
        }
              } else if (selectedRole === "Doctor") {
          const response = await doctorLogin({ email: username, password });

          if (response && response.token) {
            setSuccess(`Login successful as ${selectedRole}`);
            localStorage.setItem("token", response.token);
            localStorage.setItem("userRole", "doctor");
            localStorage.setItem("doctorData", JSON.stringify(response.doctor));
            navigate("/doctor-dashboard");
          } else {
            setError("Invalid email or password.");
          }
        }
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError(error.message || "Login failed.");
    }
  };

  return (
    <div className="md:flex md:h-[110vh]">
      {/* Left Side - Background Image */}
      <div className="md:w-[50%]">
        <img
          src={bgImg}
          className="w-full"
          alt="Home Page Background"
        />
      </div>

      {/* Right Side - Login Section */}
      <div className="md:w-[50%] bg-[#11141b] flex justify-center items-center md:py-0 py-8">
        <div className="md:w-[60%] w-[90%]">
          {/* Title */}
          <h1 className="text-[#96a2b4] text-lg font-sans">
            Welcome to Cliniva
          </h1>

          {/* Connection Test */}
          <ConnectionTest />

          <div>
            <span className="text-red-500">{error}</span>
          </div>

          <div>
            <span className="text-green-500">{success}</span>
          </div>

          {/* Role Selection */}
          <div className="flex justify-between py-4 text-[14px]">
            {["Admin", "Doctor", "Patient"].map((role) => (
              <span
                key={role}
                className={`px-5 py-3 rounded-full font-bold cursor-pointer border text-[#96a2b4] border-[#96a2b4] ${
                  selectedRole === role ? " text-white bg-[#0b8400]" : ""
                }`}
                onClick={() => handleRoleSelection(role)}>
                {role}
              </span>
            ))}
          </div>

          {/* Sign In Text */}
          <span className="text-[#96a2b4] text-lg font-bold">Sign in</span>

          {/* Username Input */}
          <div className="mt-5 relative">
            <label className="absolute top-[-2px] left-2 bg-[#11141b] text-[#96a2b4] text-[14px] px-2 h-[12px]">
              Username*
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-[0.5px] border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-white placeholder-gray-400 mt-2"
              placeholder="Enter your username"
            />
            <span className="absolute right-4 top-[24px] text-white cursor-pointer">
              <CgGirl className="text-[25px] text-[#96a2b4]" />
            </span>
          </div>

          {/* Password Input */}
          <div className="mt-5 relative">
            <label className="absolute top-[-1px] left-2 bg-[#11141b] text-[#96a2b4] text-[14px] px-2 h-[12px]">
              Password*
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-[0.5px] border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-white placeholder-gray-400 mt-2"
              placeholder="Enter your password"
            />
            <span
              className="absolute right-4 top-[24px] text-[#96a2b4] cursor-pointer text-[25px]"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </span>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="mt-5 flex justify-between">
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="border"
              />
              <span className="text-[#96a2b4]">Remember me</span>
            </div>
            <span className="text-[#96a2b4] cursor-pointer">
              Forgot password?
            </span>
          </div>

          {/* Login Button */}
          <div className="mt-12">
            <button
              onClick={handleSubmit}
              className="w-full text-white bg-[#005cbb] py-3 rounded-full cursor-pointer">
              Login
            </button>
          </div>

          {/* OR Divider */}
          <div className="flex flex-col mt-8 relative opacity-90">
            <span className="text-[#96a2b4] text-center absolute top-[-12px] w-full">
              <span className="bg-[#11141b] px-4 text-[16px] font-bold">
                OR
              </span>
            </span>
            <hr className="border-white border-t-1" />
          </div>

          {/* Social Login Icons */}
          <div className="text-[#96a2b4] flex gap-2 justify-center mt-6">
            {[FaGoogle, GrFacebookOption, FaTwitter, FaLinkedinIn].map(
              (Icon, index) => (
                <div
                  key={index}
                  className="border p-2 rounded border-[#96a2b4] hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-[#005cbb] hover:text-white">
                  <Icon className="text-[14px]" />
                </div>
              )
            )}
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <span className="text-[#96a2b4]">
              Don't have an account?{" "}
              <span 
                className="text-[#005cbb] cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;