import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { googleLogin } = useAuth();

  const location = useLocation();
  // console.log(location)

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        // console.log(result.user);
        navigate(location.state || "/");
        toast.success("Successfully Login");
        const { displayName, email, photoURL } = result.user;

        const userInfo = {
          displayName,
          email,
          photoURL,
        };
        axiosSecure.post("/users", userInfo);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
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
      <span className="font-medium text-neutral">Sign up with Google</span>
    </button>
  );
};

export default SocialLogin;
