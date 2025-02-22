import axios from "axios";
import React, { useContext, useState } from "react";
import userContext from "../context/userContext";

function Start() {
  const { setToken} = useContext(userContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    remember: true,
    serviceId: "S0001",
    serviceName: "Guess The Word",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/login`,
        formData
      );
      if (!response.data.success) {
        setError(response.data.message);
        return;
      }
      localStorage.setItem("user", response.data.token);
      setToken(response.data.token);
    } catch (error) {
      setError(
        error.response?.data?.message || "There was a problem with the request"
      );
    }
  };
  const handleSingup = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/register`,
        formData
      );
      // if (response.status !== 200) throw new Error("Signup request failed");
      if (response.data.success) {
        setMessage(`Verification email sent to ${formData.email}`);
        setIsSignup(false);
      } else {
        setMessage(response.data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setMessage(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      if (isSignup) {
        await handleSingup();
      } else {
        await handleLogin();
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex items-center justify-center h-full font-normal text-themColor-blue">
      <div className="bg-themColor-lightOrange border-[4px] border-themColor-blue rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-themColor-red max-w-lg w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-2 py-12 px-10"
        >
          <div className="bg-white rounded-full h-32 w-32 flex items-center justify-center">
            <img src="/logo.svg" alt="GTW Logo" className="h-24 w-24 " />
          </div>

          <h1 className="text-3xl text-light">
            {isSignup ? "Sign Up" : "Sign In"} to Guess The Word
          </h1>
          {error && (
            <p className="text-red-500 font-medium text-sm text-center">
              {error}
            </p>
          )}
          {message && (
            <p className="text-themColor-green font-semibold text-center text-lg">
              {message}
            </p>
          )}
          {isSignup && (
            <input
              className="w-full px-3 py-2 font-semibold tracking-wide text-pale bg-primary rounded-md border border-secondary focus:border-light hover:border-accent placeholder:text-themColor-yellow"
              placeholder="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            className="w-full px-3 py-2 font-semibold tracking-wide text-pale bg-primary rounded-md border border-secondary focus:border-light hover:border-accent placeholder:text-themColor-yellow"
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className={`${isSignup && "grid grid-cols-2"} gap-2 w-full`}>
            <input
              className="w-full px-3 py-2 font-semibold tracking-wide text-pale bg-primary rounded-md border border-secondary focus:border-light hover:border-accent placeholder:text-themColor-yellow"
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {isSignup && (
              <input
                className="w-full px-3 py-2 font-semibold tracking-wide text-pale bg-primary rounded-md border border-secondary focus:border-light hover:border-accent placeholder:text-themColor-yellow"
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            )}
          </div>

          {isSignup && (
            <>
              <select
                className="w-full px-3 py-2 font-semibold tracking-wide text-pale bg-primary rounded-md border border-secondary focus:border-light hover:border-accent"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </>
          )}

          <div className="flex justify-between w-full items-center">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="mr-2 w-4 h-4"
              />
              Remember me
            </label>
            {!isSignup && (
              <a
                href="/forget"
                className="text-light font-medium hover:underline"
              >
                Forgot Password?
              </a>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 ${
              loading ? "bg-themColor-red" : "bg-themColor-green text-white"
            } rounded-full font-bold border-[4px] border-light ${
              loading ? "cursor-not-allowed" : "hover:border-themColor-red"
            } transition-all duration-300`}
          >
            {loading
              ? isSignup
                ? "Signing Up..."
                : "Signing In..."
              : isSignup
              ? "Sign Up"
              : "Sign In"}
          </button>

          <p className="text-sm">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="font-semibold text-light hover:text-accent transition-all duration-200"
            >
              {isSignup ? "Sign in" : "Sign up"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Start;
