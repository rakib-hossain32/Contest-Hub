import React from "react";
import { Link } from "react-router";

const Register = () => {
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
        <form className="relative z-10 p-6 -mt-24 border shadow-md bg-base-100 rounded-2xl border-primary/10 backdrop-blur-lg">
          {/* Title */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-primary">
              Create an Account
            </h1>
            <p className="mt-1 text-sm text-neutral/70">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Inputs */}
          <div className="space-y-6">
            {/* Email */}
            <div className="relative flex items-center">
              <input
                type="text"
                required
                className="w-full px-2 py-3 pr-8 text-sm transition border-b outline-none text-neutral border-neutral/20 focus:border-primary"
                placeholder="Enter Your Name"
              />
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#aaa"
                stroke="#aaa"
                className="w-[18px] h-[18px] absolute right-2"
                viewBox="0 0 682.667 682.667"
              >
                <g transform="matrix(1.33 0 0 -1.33 0 682.667)">
                  <path
                    fill="none"
                    strokeMiterlimit="10"
                    strokeWidth="40"
                    d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                  ></path>
                </g>
              </svg> */}
            </div>
            <div className="relative flex items-center">
              <input
                type="url"
                required
                className="w-full px-2 py-3 pr-8 text-sm transition border-b outline-none text-neutral border-neutral/20 focus:border-primary"
                placeholder="Photo URL"
              />
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#aaa"
                stroke="#aaa"
                className="w-[18px] h-[18px] absolute right-2"
                viewBox="0 0 682.667 682.667"
              >
                <g transform="matrix(1.33 0 0 -1.33 0 682.667)">
                  <path
                    fill="none"
                    strokeMiterlimit="10"
                    strokeWidth="40"
                    d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                  ></path>
                </g>
              </svg> */}
            </div>
            <div className="relative flex items-center">
              <input
                name="email"
                type="email"
                required
                className="w-full px-2 py-3 pr-8 text-sm transition border-b outline-none text-neutral border-neutral/20 focus:border-primary"
                placeholder="Enter email"
              />
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#aaa"
                stroke="#aaa"
                className="w-[18px] h-[18px] absolute right-2"
                viewBox="0 0 682.667 682.667"
              >
                <g transform="matrix(1.33 0 0 -1.33 0 682.667)">
                  <path
                    fill="none"
                    strokeMiterlimit="10"
                    strokeWidth="40"
                    d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                  ></path>
                </g>
              </svg> */}
            </div>

            {/* Password */}
            <div className="relative flex items-center">
              <input
                name="password"
                type="password"
                required
                className="w-full px-2 py-3 pr-8 text-sm transition border-b outline-none text-neutral border-neutral/20 focus:border-primary"
                placeholder="Enter password"
              />
            </div>
          </div>

          {/* Login Button */}
          <div className="mt-10">
            <button
              type="button"
              className="w-full py-2 font-medium text-white transition rounded-md shadow-lg cursor-pointer bg-primary hover:bg-primary/90 shadow-primary/30"
            >
              Create Account
            </button>

            <p className="mt-6 text-sm text-center text-neutral/70">
              Already have an account?
              <Link to='/auth/login' className="ml-1 font-medium cursor-pointer text-secondary hover:underline">
                Login
              </Link>
            </p>
          </div>

          <hr className="my-6 border-neutral/20" />
          <button className="w-full mt-5  py-2.5 rounded-lg flex items-center justify-center gap-3 bg-base-100 hover:bg-base-100 transition shadow-md cursor-pointer hover:scale-105">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="font-medium text-neutral">Sign up with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
