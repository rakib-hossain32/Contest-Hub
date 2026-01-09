import React from "react";
import { motion } from "framer-motion";
import { Users, ArrowRight, Trophy, Calendar } from "lucide-react";
import { useNavigate } from "react-router";
import ContestCard from "../../../components/ContestCard/ContestCard";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Loader } from "../../../components/Loader/Loader";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";



export default function PopularContests() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // const isLoggedIn = false;

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["popular-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/contests/popular-contests?status=Confirmed"
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="px-4  md:px-6 bg-base-100">
      <div className="container mx-auto">
        <SectionHeader
          title="Popular Contests"
          subtitle="Join the most happening challenges right now. Compete with thousands and prove your mettle."
        />

        {/* Contests Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contests.map((contest, index) => (
            <ContestCard key={contest._id} contest={contest} index={index} />
          ))}
        </div>

        {/* Show All Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/all-contests")}
            className="flex items-center gap-2 px-8 py-3 mx-auto font-bold transition-all duration-300 border-2 shadow-md cursor-pointer group bg-base-100 border-primary text-primary rounded-xl hover:bg-primary hover:text-primary-content hover:shadow-primary/30"
          >
            Show All Contests
            <ArrowRight
              className="transition-transform group-hover:translate-x-1"
              size={20}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
