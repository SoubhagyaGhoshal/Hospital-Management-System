import React, { useState } from "react";
import bgImg from "../../assets/Home-bg-01.png";
import { GrFacebookOption } from "react-icons/gr";
import {
  FaGoogle,
  FaTwitter,
  FaLinkedinIn,
  FaRegEyeSlash,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
} from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { apiRequest } from "../../../utils/ApiUtils/ApiUtils.jsx";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    gender: "",
    birth: "",
    address: "",
    education: "",
    designation: "",
    department: "",
    bloodGroup: "",
    maritalStatus: "",
    injury: "",
    patientImg: "",
    doctorimg: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setError("");
    setSuccess("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!selectedRole) {
      setError("Please select a role: Doctor or Patient.");
      return false;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || !formData.mobile) {
      setError("Please fill in all required fields.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    if (selectedRole === "Doctor" && (!formData.designation || !formData.department || !formData.education)) {
      setError("Please fill in all doctor-specific fields.");
      return false;
    }

    if (selectedRole === "Patient" && (!formData.bloodGroup || !formData.maritalStatus)) {
      setError("Please fill in all patient-specific fields.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      let response;
      const submitData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile,
        gender: formData.gender,
        birth: formData.birth,
        address: formData.address,
      };

      if (selectedRole === "Doctor") {
        submitData.designation = formData.designation;
        submitData.department = formData.department;
        submitData.education = formData.education;
        submitData.doctorimg = formData.doctorimg || "https://via.placeholder.com/150";
        
        response = await apiRequest("post", "/doctor/register", submitData);
      } else if (selectedRole === "Patient") {
        submitData.bloodGroup = formData.bloodGroup;
        submitData.maritalStatus = formData.maritalStatus;
        submitData.injury = formData.injury;
        submitData.patientImg = formData.patientImg || "https://via.placeholder.com/150";
        
        response = await apiRequest("post", "/patient/register", submitData);
      }

      if (response) {
        setSuccess(`Account created successfully! You can now login as ${selectedRole}.`);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
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

      {/* Right Side - Sign Up Section */}
      <div className="md:w-[50%] bg-[#11141b] flex justify-center items-center md:py-0 py-8 overflow-y-auto">
        <div className="md:w-[80%] w-[90%] max-h-[90vh] overflow-y-auto">
          {/* Title */}
          <h1 className="text-[#96a2b4] text-lg font-sans">
            Welcome to Cliniva
          </h1>

          <div>
            <span className="text-red-500">{error}</span>
          </div>

          <div>
            <span className="text-green-500">{success}</span>
          </div>

          {/* Role Selection */}
          <div className="flex justify-between py-4 text-[14px]">
            {["Doctor", "Patient"].map((role) => (
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

          {/* Sign Up Text */}
          <span className="text-[#96a2b4] text-lg font-bold">Sign up</span>

          <form onSubmit={handleSubmit} className="mt-5">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="absolute top-[-2px] left-2 bg-[#11141b] text-[#96a2b4] text-[14px] px-2 h-[12px]">
                  First Name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full border-[0.5px] border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-white placeholder-gray-400 mt-2"
                  placeholder="Enter first name"
                />
                <FaUser className="absolute right-4 top-[24px] text-[#96a2b4]" />
              </div>

              <div className="relative">
                <label className="absolute top-[-2px] left-2 bg-[#11141b] text-[#96a2b4] text-[14px] px-2 h-[12px]">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full border-[0.5px] border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-white placeholder-gray-400 mt-2"
                  placeholder="Enter last name"
                />
                <FaUser className="absolute right-4 top-[24px] text-[#96a2b4]" />
              </div>
            </div>

            {/* Email and Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="relative">
                <label className="absolute top-[-2px] left-2 bg-[#11141b] text-[#96a2b4] text-[14px] px-2 h-[12px]">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border-[0.5px] border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-white placeholder-gray-400 mt-2"
                  placeholder="Enter your email"
                />
                <FaEnvelope className="absolute right-4 top-[24px] text-[#96a2b4]" />
              </div>

              <div className="relative">
                <label className="absolute top-[-2px] left-2 bg-[#11141b] text-[#96a2b4] text-[14px] px-2 h-[12px]">
                  Mobile*
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full border-[0.5px] border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-white placeholder-gray-400 mt-2"
                  placeholder="Enter mobile number"
                />
                <FaPhone className="absolute right-4 top-[24px] text-[#96a2b4]" />
              </div>
            </div>

            {/* Gender and Birth Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="relative">
                <label className="absolute top-[-2px] left-2 bg-[#11141b] text-[#96a2b4] text-[14px] px-2 h-[12px]">
                  Gender*
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full border-[0.5px] border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-white mt-2"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="relative">
                <label className="absolute top-[-2px] left-2 bg-[#11141b] text-[#96a2b4] text-[14px] px-2 h-[12px]">
                  Date of Birth*
                </label>
                <input
                  type="date"
                  name="birth"
                  value={formData.birth}
                  onChange={handleInputChange}
                  className="w-full border-[0.5px] border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-white mt-2"
                />
                <FaCalendarAlt className="absolute right-4 top-[24px] text-[#96a2b4]" />
              </div>
            </div>

            {/* Address */}
            <div className="mt-4">
              <div className="relative">
                <label className="absolute top-[-2px] left-2 bg-[#11141b] text-[#96a2b4] text-[14px] px-2 h-[12px]">
                  Address*
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border-[0.5px] border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-white placeholder-gray-400 mt-2"
                  placeholder="Enter your address"
                />
                <FaMapMarkerAlt className="absolute right-4 top-[24px] text-[#96a2b4]" />
              </div>
            </div>

            {/* Role-specific fields */}
            {selectedRole === "Doctor" && (
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <label className="absolute top-[-2px] left-2 bg-[#11141b] text-[#96a2b4] text-[14px] px-2 h-[12px]">
                      Designation*
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      className="w-full border-[0.5px] border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-white placeholder-gray-400 mt-2"
                      placeholder="e.g., Cardiologist"
                    />
                    <FaBriefcase className="absolute right-4 top-[24px] text-[#96a2b4]" />
                  </div>

                  <div className="relative">
                    <label className="absolute top-[-2px] left-2 bg-[#11141b] text-[#96a2b4] text-[14px] px-2 h-[12px]">
                      Department*
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full border-[0.5px] border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-white mt-2"
                    >
                      <option value="">Select Department</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Gynaecology">Gynaecology</option>
                      <option value="Microbiology">Microbiology</option>
                    </select>
                  </div>

                  <div className="relative">
                    <label className="absolute top-[-2px] left-2 bg-[#11141b] text-[#96a2b4] text-[14px] px-2 h-[12px]">
                      Education*
                    </label>
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      className="w-full border-[0.5px] border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-white placeholder-gray-400 mt-2"
                      placeholder="e.g., MD, MBBS"
                    />
                    <FaGraduationCap className="absolute right-4 top-[24px] text-[#96a2b4]" />
                  </div>
                </div>
              </div>
            )}

            {selectedRole === "Patient" && (
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="absolute top-[-2px] left-2 bg-[#11141b] text-[#96a2b4] text-[14px] px-2 h-[12px]">
                      Blood Group*
                    </label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                      className="w-full border-[0.5px] border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-white mt-2"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div className="relative">
                    <label className="absolute top-[-2px] left-2 bg-[#11141b] text-[#96a2b4] text-[14px] px-2 h-[12px]">
                      Marital Status*
                    </label>
                    <select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                      className="w-full border-[0.5px] border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-white mt-2"
                    >
                      <option value="">Select Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="relative">
                    <label className="absolute top-[-2px] left-2 bg-[#11141b] text-[#96a2b4] text-[14px] px-2 h-[12px]">
                      Medical History
                    </label>
                    <textarea
                      name="injury"
                      value={formData.injury}
                      onChange={handleInputChange}
                      className="w-full border-[0.5px] border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-white placeholder-gray-400 mt-2"
                      placeholder="Enter any medical history or injuries"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Password and Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="relative">
                <label className="absolute top-[-2px] left-2 bg-[#11141b] text-[#96a2b4] text-[14px] px-2 h-[12px]">
                  Password*
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border-[0.5px] border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-white placeholder-gray-400 mt-2"
                  placeholder="Enter password"
                />
                <span
                  className="absolute right-4 top-[24px] text-[#96a2b4] cursor-pointer text-[25px]"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
                </span>
              </div>

              <div className="relative">
                <label className="absolute top-[-2px] left-2 bg-[#11141b] text-[#96a2b4] text-[14px] px-2 h-[12px]">
                  Confirm Password*
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full border-[0.5px] border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-white placeholder-gray-400 mt-2"
                  placeholder="Confirm password"
                />
                <span
                  className="absolute right-4 top-[24px] text-[#96a2b4] cursor-pointer text-[25px]"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
                </span>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mt-5 flex gap-2">
              <input
                type="checkbox"
                required
                className="border"
              />
              <span className="text-[#96a2b4] text-sm">
                I agree to the{" "}
                <span className="text-[#005cbb] cursor-pointer">Terms of Service</span>{" "}
                and{" "}
                <span className="text-[#005cbb] cursor-pointer">Privacy Policy</span>
              </span>
            </div>

            {/* Sign Up Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-[#005cbb] py-3 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </div>
          </form>

          {/* OR Divider */}
          <div className="flex flex-col mt-8 relative opacity-90">
            <span className="text-[#96a2b4] text-center absolute top-[-12px] w-full">
              <span className="bg-[#11141b] px-4 text-[16px] font-bold">
                OR
              </span>
            </span>
            <hr className="border-white border-t-1" />
          </div>

          {/* Social Sign Up Icons */}
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

          {/* Login Link */}
          <div className="text-center mt-6">
            <span className="text-[#96a2b4]">
              Already have an account?{" "}
              <span 
                className="text-[#005cbb] cursor-pointer hover:underline"
                onClick={() => navigate("/")}
              >
                Sign in
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp; 