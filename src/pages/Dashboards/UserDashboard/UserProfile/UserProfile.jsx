import {
  MapPin,
  Edit3,
  Camera,
  TrendingUp,
  Award,
  Hash,
  Phone,
  User,
  Link as LinkIcon,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Loader } from "../../../../components/Loader/Loader";

export const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: oneUser = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["updated-user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/one?email=${user?.email}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      displayName: oneUser?.displayName || "",
      phoneNumber: oneUser?.phoneNumber || "",
      photoURL: oneUser?.photoURL || "",
      address: oneUser?.address || "",
    },
  });

  useEffect(() => {
    if (oneUser) {
      reset({
        displayName: oneUser?.displayName,
        phoneNumber: oneUser?.phoneNumber,
        photoURL: oneUser?.photoURL,
        address: oneUser?.address,
      });
    }
  }, [oneUser, reset]);

  const stats = { participated: 20, won: 5 };
  const winPercentage =
    stats.participated > 0
      ? ((stats.won / stats.participated) * 100).toFixed(1)
      : "0.0";

  const primaryColor = "#00b074";

  const onSubmit = (data) => {
    console.log("Form Submitted Data:", data);

    axiosSecure.patch(`/users/${oneUser?._id}/info`, data).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Profile has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });

    setIsEditing(false);
  };

  // console.log(user);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="pb-5 mx-auto font-sans max-w-7xl text-base-content">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-base-content/90">
          Profile Settings
        </h1>
        <p className="mt-2 text-lg text-base-content/60">
          Manage your account settings and view your performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left Column: Profile Summary */}
        <div className="space-y-6 lg:col-span-4">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl bg-base-100/80 backdrop-blur-md dark:bg-base-200/80">
            <div className="absolute top-0 left-0 z-0 w-full h-48 overflow-hidden">
              <img
                src={oneUser?.photoURL || "https://via.placeholder.com/500"}
                alt="Blur bg"
                className="object-cover w-full h-full transition-transform duration-700 scale-125 filter blur-2xl opacity-40 dark:opacity-20 hover:scale-150"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent to-base-100/90 dark:to-base-200/95"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center p-6">
              <div className="relative group">
                <div className="p-1 rounded-full shadow-lg w-36 h-36 bg-linear-to-tr from-primary via-white to-primary shadow-primary/20">
                  <img
                    src={oneUser?.photoURL}
                    alt="Profile"
                    className="object-cover w-full h-full border-4 rounded-full border-base-100 dark:border-base-300 bg-base-200"
                  />
                </div>
                <button className="absolute p-3 transition-all border rounded-full shadow-md bottom-1 right-1 bg-base-100 dark:bg-base-300 border-base-200/50 text-base-content/70 hover:text-primary hover:shadow-lg group-hover:scale-110 active:scale-95">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-3 text-center">
                <h2 className="text-3xl font-extrabold text-base-content/90">
                  {oneUser?.displayName}
                </h2>
                <div className="inline-flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                  <MapPin className="w-4 h-4" />{" "}
                  {oneUser?.address || "Shibchar, Madaripur"}
                </div>
              </div>

              <div className="w-full h-px my-8 bg-linear-to-r from-transparent via-base-content/10 to-transparent"></div>

              {/* Glowing Win Percentage */}
              <div className="flex flex-col items-center">
                <h3 className="flex items-center gap-2 mb-6 text-lg font-bold tracking-wider uppercase text-base-content/70">
                  <TrendingUp className="w-5 h-5 text-primary" /> Success Rate
                </h3>
                <div className="relative w-48 h-48 group">
                  <div className="absolute transition-opacity duration-700 rounded-full opacity-0 inset-4 bg-primary/20 filter blur-xl group-hover:opacity-70"></div>
                  <svg className="relative z-10 w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="84"
                      stroke="currentColor"
                      strokeWidth="14"
                      fill="transparent"
                      className="text-base-300/50 dark:text-base-content/5"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="84"
                      stroke={primaryColor}
                      strokeWidth="14"
                      fill="transparent"
                      strokeDasharray={527}
                      strokeDashoffset={527 - (527 * winPercentage) / 100}
                      strokeLinecap="round"
                      className="transition-all ease-in-out duration-1500"
                      style={{
                        filter: `drop-shadow(0 0 8px ${primaryColor}80)`,
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-base-content/90">
                      {winPercentage}
                      <span className="text-2xl">%</span>
                    </span>
                    <span className="mt-1 text-xs font-bold tracking-widest uppercase text-base-content/50">
                      Win Rate
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid w-full grid-cols-2 gap-4 mt-10">
                <div className="p-5 text-center transition-transform border rounded-4xl bg-base-200/50 dark:bg-base-300/30 border-base-content/5 backdrop-blur-sm hover:-translate-y-1">
                  <Award className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <span className="block text-sm font-bold tracking-wider uppercase text-base-content/50">
                    Won
                  </span>
                  <span className="text-2xl font-black text-base-content/90">
                    {stats.won}
                  </span>
                </div>
                <div className="p-5 text-center transition-transform border bg-base-200/50 dark:bg-base-300/30 border-base-content/5 backdrop-blur-sm hover:-translate-y-1 rounded-4xl">
                  <Hash className="w-6 h-6 mx-auto mb-2 text-base-content/70" />
                  <span className="block text-sm font-bold tracking-wider uppercase text-base-content/50">
                    Total
                  </span>
                  <span className="text-2xl font-black text-base-content/90">
                    {stats.participated}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Toggle between View Mode and Edit Form */}
        <div className="lg:col-span-8">
          <div className="rounded-[2.5rem] border border-base-200 dark:border-base-300 shadow-xl bg-base-100 dark:bg-base-200 overflow-hidden relative min-h-[600px] flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary/50 via-base-200 to-primary/50"></div>

            {/* Header with Toggle Button */}
            <div className="flex items-center justify-between px-8 py-8 border-b border-base-200 dark:border-base-300/50">
              <div>
                <h3 className="flex items-center gap-3 text-2xl font-bold text-base-content/90">
                  {isEditing ? "Edit Profile Details" : "Personal Information"}
                </h3>
                <p className="mt-1 text-base-content/60">
                  {isEditing
                    ? "Update your details below."
                    : "View your current account details."}
                </p>
              </div>

              {/* Toggle Button */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`p-3 rounded-2xl transition-all duration-300 cursor-pointer ${
                  isEditing
                    ? "bg-red-50 text-red-500 hover:bg-red-100 rotate-90"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
                title={isEditing ? "Cancel Editing" : "Edit Profile"}
              >
                {isEditing ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Edit3 className="w-6 h-6" />
                )}
              </button>
            </div>

            <div className="p-8 grow lg:p-10">
              {/* Conditional Rendering based on isEditing state */}
              {isEditing ? (
                /* ----------------- EDIT FORM MODE ----------------- */
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-8 animate-fadeIn"
                >
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Full Name Input */}
                    <div className="space-y-3 group">
                      <label className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-colors text-base-content/80 group-focus-within:text-primary">
                        <User className="w-4 h-4" /> Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          {...register("displayName", { required: true })}
                          className="w-full py-5 pl-4 pr-4 font-medium transition-all duration-300 border border-transparent outline-none rounded-2xl bg-base-200/60 dark:bg-base-300/60 focus:border-primary focus:bg-base-100 dark:focus:bg-base-300 focus:ring-4 focus:ring-primary/10 text-base-content/90 placeholder:text-base-content/40"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    {/* Phone Number Input */}
                    <div className="space-y-3 group">
                      <label className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-colors text-base-content/80 group-focus-within:text-primary">
                        <Phone className="w-4 h-4" /> Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          {...register("phoneNumber")}
                          placeholder="+880 1XXX XXXXXX"
                          className="w-full py-5 pl-4 pr-4 font-medium transition-all duration-300 border border-transparent outline-none rounded-2xl bg-base-200/60 dark:bg-base-300/60 focus:border-primary focus:bg-base-100 dark:focus:bg-base-300 focus:ring-4 focus:ring-primary/10 text-base-content/90 placeholder:text-base-content/40"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Photo URL Input */}
                  <div className="space-y-3 group">
                    <label className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-colors text-base-content/80 group-focus-within:text-primary">
                      <LinkIcon className="w-4 h-4" /> Profile Photo URL
                    </label>
                    <div className="relative flex w-full align-middle">
                      <input
                        type="url"
                        {...register("photoURL")}
                        placeholder="https://example.com/your-photo.jpg"
                        className="w-full py-5 pl-4 pr-16 font-medium truncate transition-all duration-300 border border-transparent outline-none rounded-2xl bg-base-200/60 dark:bg-base-300/60 focus:border-primary focus:bg-base-100 dark:focus:bg-base-300 focus:ring-4 focus:ring-primary/10 text-base-content/90 placeholder:text-base-content/40"
                      />
                      {oneUser?.photoURL && (
                        <img
                          src={oneUser.photoURL}
                          alt="Preview"
                          className="absolute object-cover w-10 h-10 -translate-y-1/2 border-2 shadow-sm right-3 top-1/2 rounded-xl border-base-100"
                        />
                      )}
                    </div>
                  </div>

                  {/* Address Textarea */}
                  <div className="space-y-3 group">
                    <label className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-colors text-base-content/80 group-focus-within:text-primary">
                      <MapPin className="w-4 h-4" /> Address
                    </label>
                    <textarea
                      rows="4"
                      {...register("address")}
                      placeholder="Enter your address..."
                      className="w-full px-5 py-5 font-medium transition-all duration-300 border border-transparent outline-none resize-none rounded-2xl bg-base-200/60 dark:bg-base-300/60 focus:border-primary focus:bg-base-100 dark:focus:bg-base-300 focus:ring-4 focus:ring-primary/10 text-base-content/90 placeholder:text-base-content/40"
                    ></textarea>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-6 pt-6 border-t border-base-200 dark:border-base-300/50">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-8 py-4 font-bold transition-all cursor-pointer rounded-2xl text-base-content/70 hover:text-base-content hover:bg-base-200/50 dark:hover:bg-base-300/50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="relative px-10 py-4 overflow-hidden font-extrabold transition-all shadow-xl cursor-pointer rounded-2xl bg-primary text-primary-content shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 group"
                    >
                      <span className="relative z-10">Save Changes</span>
                      <div className="absolute inset-0 w-full h-full transition-all duration-300 scale-0 rounded-2xl group-hover:scale-100 group-hover:bg-white/20"></div>
                    </button>
                  </div>
                </form>
              ) : (
                /* ----------------- VIEW ONLY MODE ----------------- */
                <div className="space-y-8 animate-fadeIn">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold tracking-wider uppercase text-base-content/50">
                        Full Name
                      </h4>
                      <p className="text-xl font-bold text-base-content/90">
                        {oneUser?.displayName || "Not set"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold tracking-wider uppercase text-base-content/50">
                        Phone Number
                      </h4>
                      <p className="text-xl font-bold text-base-content/90">
                        {oneUser?.phoneNumber || "+880 1700 000000"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-bold tracking-wider uppercase text-base-content/50">
                      Email Address
                    </h4>
                    <p className="text-xl font-bold break-all text-base-content/90">
                      {oneUser?.email || "user@example.com"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-bold tracking-wider uppercase text-base-content/50">
                      Address
                    </h4>
                    <p className="p-6 text-lg font-medium leading-relaxed border bg-base-200/30 rounded-2xl border-base-200 text-base-content/80">
                      {oneUser?.address || "Shibchar, Madaripur"}
                    </p>
                  </div>

                  <div className="pt-8 mt-4 border-t border-base-200 dark:border-base-300/50">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 text-primary">
                      <div className="p-2 bg-white rounded-lg shadow-xs dark:bg-base-300">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold">Pro Tip</h4>
                        <p className="text-sm opacity-80">
                          Complete your profile to increase your chances of
                          being selected for premium contests.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
