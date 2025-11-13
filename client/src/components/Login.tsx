
import { useState } from "react";
import { useComponentsDisplayStore } from "../store/componentsStore";
import axios from "../utils/axios.ts"
import type { UserInfoApi } from "../types/types.ts";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const setConversationListDisplay = useComponentsDisplayStore((state) => state.setConversationListDisplay)
  const setSignupDisplay = useComponentsDisplayStore((state) => state.setSignupDisplay)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userInfo = await axios.post<{ userInfo: UserInfoApi, token: string }>("/user/signin", {
      phone: formData.phone,
      password: formData.password
    })

    console.log(userInfo)

    setConversationListDisplay(true)
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        {/* Phone */}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-semibold mb-2"
          >
            Phone
          </label>
          <input
            type="tel"
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
        <div className="text-center text-sm flex justify-center mt-4">

          <p>
            New here?</p><p className="text-blue-500 underline cursor-pointer" onClick={() => setSignupDisplay(true)}>{" "}Signup</p>
        </div>
      </form>
    </div>
  );
};

