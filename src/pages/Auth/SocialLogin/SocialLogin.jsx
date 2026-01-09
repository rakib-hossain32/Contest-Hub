import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { googleLogin, setLoading } = useAuth();

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
        setLoading(false);
        toast.error(err.message);
      });
  };



  return (
    <div className="space-y-3 mt-5">
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full py-2.5 rounded-lg flex items-center justify-center gap-3 bg-base-100 hover:bg-base-200 transition shadow-md cursor-pointer hover:scale-[1.02] border border-neutral/10"
      >
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="font-medium text-neutral">Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
