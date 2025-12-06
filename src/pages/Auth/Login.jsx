import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const Login = () => {
  const [eye, setEye] = useState(true);
  const { signInUser, googleLogin } = useAuth();
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm();

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        // console.log(result.user);
        navigate('/')
        toast.success("Successfully Login");
      })
      .catch((err) => { 
      toast.error(err.message)
     })
  };

  const handleSignIn = (data) => {
    // console.log(data);
    const { email, password } = data;
    signInUser(email, password)
      .then(() => { 
        toast.success('Successfully Login')
        navigate('/')
      })
      .catch((err) => { 
      toast.error(err.message)
     })
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-10 bg-base-100">
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
              Sign in
            </button>

            <p className="mt-6 text-sm text-center text-neutral/70">
              Don’t have an account?
              <Link
                to="/auth/register"
                className="ml-1 font-medium cursor-pointer text-secondary hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>

          <hr className="my-6 border-neutral/20" />
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full mt-5  py-2.5 rounded-lg flex items-center justify-center gap-3 bg-base-100 hover:bg-base-100 transition shadow-md cursor-pointer hover:scale-105"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="font-medium text-neutral">
              Sign up with Google
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
