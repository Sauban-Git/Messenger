import { useState } from "react";
import { useComponentsDisplayStore } from "../store/componentsStore";
import type { UserInfoApi } from "../types/types";
import axios from "../utils/axios.ts"
import { useUserInfoStore } from "../store/userInfoStore.ts";

export const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setUserInfo = useUserInfoStore((state) => state.setUserInfo)
  const setConversationListDisplay = useComponentsDisplayStore((state) => state.setConversationListDisplay)
  const setLoginDisplay = useComponentsDisplayStore((state) => state.setLoginDisplay)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await axios.post<{ user: UserInfoApi, token: string }>("/user/signup", {
      phone: formData.phone,
      password: formData.password,
      name: formData.name,
    })

    setUserInfo(response.data.user)
    localStorage.setItem("token", response.data.token)

    console.log("User signed up:", response.data.user);
    setConversationListDisplay(true)
  };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {/* Full Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-semibold mb-2"
          >
            Phone
          </label>
          <input
            type="phone"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-semibold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
        <div className="text-center text-sm text-gray-600 mt-4 flex justify-center">

          <p>
            Already have an account?
          </p>
          <p className="cursor-pointer text-blue-500 underline" onClick={() => setLoginDisplay(true)}>{" "}Login</p>
        </div>
      </form>
    </div>
  );
};

