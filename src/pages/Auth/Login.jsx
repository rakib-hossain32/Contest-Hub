import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import SocialLogin from "./SocialLogin/SocialLogin";

const Login = () => {
  const [eye, setEye] = useState(true);
  const { signInUser, setLoading } = useAuth();
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm();
  const location = useLocation()
  // console.log(location)

  const handleSignIn = (data) => {
    // console.log(data);
    const { email, password } = data;
    signInUser(email, password)
      .then(() => {
        toast.success('Successfully Login')
        navigate(location.state || "/");
      })
      .catch((err) => {
        setLoading(false); // Reset global loading state on error
        toast.error(err.message)
      })
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-20 bg-base-100">
      <div className="grid justify-center max-w-md p-4 mx-auto">
        {/* Image Section */}
        <div className="aspect-64/45">
          <img
            src="https://readymadeui.com/login-image.webp"
            className="object-cover w-full shadow-md rounded-2xl "
            alt="login-image"
          />
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="relative z-10 p-6 -mt-24 border shadow-md bg-base-100 rounded-2xl border-primary/10 backdrop-blur-lg"
        >
          {/* Title */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-primary">Log In</h1>
            <p className="mt-1 text-sm text-neutral/70">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Inputs */}
          <div className="space-y-6">
            {/* Email */}
            <div className="relative flex items-center">
              <input
                {...register("email")}
                type="email"
                required
                className="w-full px-2 py-3 pr-8 text-sm transition border-b outline-none text-neutral border-neutral/20 focus:border-primary"
                placeholder="Enter email"
              />
            </div>

            {/* Password */}
            <div className="relative flex items-center">
              <input
                {...register("password")}
                type={eye ? "password" : "text"}
                required
                className="w-full px-2 py-3 pr-8 text-sm transition border-b outline-none text-neutral border-neutral/20 focus:border-primary"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setEye(!eye)}
                className="absolute cursor-pointer right-2 text-neutral"
              >
                {eye ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a className="text-sm font-medium cursor-pointer text-primary hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Login Button */}
          <div className="mt-10">
            <button className="w-full py-2 font-medium text-white transition rounded-md shadow-lg cursor-pointer bg-primary hover:bg-primary/90 shadow-primary/30">
              LogIn
            </button>

            {/* Demo Login Buttons */}
            <div className="mt-8">
              <p className="mb-4 text-xs font-bold tracking-widest text-center uppercase text-neutral/40">
                Quick Demo Access
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSignIn({ email: "user@example.com", password: "Password123!" })}
                  className="px-4 py-1.5 text-xs font-bold transition border rounded-full text-neutral border-neutral/20 hover:bg-primary/10 hover:border-primary hover:text-primary cursor-pointer active:scale-95"
                >
                  User
                </button>
                <button
                  type="button"
                  onClick={() => handleSignIn({ email: "creator@example.com", password: "Password123!" })}
                  className="px-4 py-1.5 text-xs font-bold transition border rounded-full text-neutral border-neutral/20 hover:bg-secondary/10 hover:border-secondary hover:text-secondary cursor-pointer active:scale-95"
                >
                  Creator
                </button>
                <button
                  type="button"
                  onClick={() => handleSignIn({ email: "admin@example.com", password: "Password123!" })}
                  className="px-4 py-1.5 text-xs font-bold transition border rounded-full text-neutral border-neutral/20 hover:bg-accent/10 hover:border-accent hover:text-accent cursor-pointer active:scale-95"
                >
                  Admin
                </button>
              </div>
            </div>

            <p className="mt-6 text-sm text-center text-neutral/70">
              Don’t have an account?
              <Link
                state={location.state}
                to="/auth/register"
                className="ml-1 font-medium cursor-pointer text-secondary hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>

          <hr className="my-6 border-neutral/20" />
          <SocialLogin />
        </form>
      </div>
    </div>
  );
};

export default Login;
