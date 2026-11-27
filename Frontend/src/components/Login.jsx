
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [, setAuthUser] = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const API =
        import.meta.env.VITE_API_URL ||
        "https://bookstore-u7zc.onrender.com";

      const res = await axios.post(
        `${API.replace(/\/$/, "")}/user/login`,
        {
          email: data.email,
          password: data.password,
        },
        { timeout: 20000 }
      );

      if (res.data && res.data.user) {
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        setAuthUser(res.data.user);

        toast.success("Logged in successfully!");

        document.getElementById("my_modal_3")?.close();
        navigate("/");
      } else {
        toast.error(res.data?.message || "Invalid login response");
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
    <>
      {/* Visible Login button */}
      <button
        type="button"
        className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-700"
        onClick={() =>
          document.getElementById("my_modal_3")?.showModal()
        }
      >
        Login
      </button>

      {/* Login dialog */}
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
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-around items-center mt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-700"
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
    </>
  );
}

export default Login;
