
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [authUser, setAuthUser] = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      setLoading(true);

      const API = import.meta.env.VITE_API_URL ||
        "https://bookstore-u7zc.onrender.com";

      const res = await axios.post(
        `${API}/user/login`,
        userInfo
      );

      if (res.data && res.data.user) {
        localStorage.setItem(
          "Users",
          JSON.stringify(res.data.user)
        );

        setAuthUser(res.data.user);

        toast.success("Logged in successfully!");

        document.getElementById("my_modal_3")?.close();

        navigate("/");
      } else {
        toast.error(res.data.message || "Invalid login response");
      }

    } catch (error) {
      console.error("Login Error:", error);

      toast.error(
        error.response?.data?.message ||
        "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">

          <form onSubmit={handleSubmit(onSubmit)}>

            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() =>
                document.getElementById("my_modal_3")?.close()
              }
            >
              ✕
            </button>

            <h3 className="font-bold text-lg">Login</h3>

            <div className="mt-4 space-y-2">
              <span>Email</span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md outline-none"
                {...register("email", {
                  required: "Email is required"
                })}
              />

              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <span>Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md outline-none"
                {...register("password", {
                  required: "Password is required"
                })}
              />

              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex justify-around items-center mt-6">

              <button
                type="submit"
                disabled={loading}
                className="bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-700 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p>
                Not registered?{" "}
                <Link
                  to="/signup"
                  className="underline text-blue-500"
                  onClick={() =>
                    document.getElementById("my_modal_3")?.close()
                  }
                >
                  Signup
                </Link>
              </p>

            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
