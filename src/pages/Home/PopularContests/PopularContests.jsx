import React from "react";
import { motion } from "framer-motion";
import { Users, ArrowRight, Trophy, Calendar } from "lucide-react";
import { useNavigate } from "react-router";
import ContestCard from "../../../components/ContestCard/ContestCard";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Loader } from "../../../components/Loader/Loader";

// Mock Data (Replace with API Data)
// const contestsData = [
//   {
//     id: 1,
//     name: "Article Writing Championship",
//     category: "Writing",
//     image:
//       "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     participants: 120,
//     description:
//       "Write a compelling article about the future of AI technology and its impact on society.",
//     deadline: "2 Days left",
//   },
//   {
//     id: 2,
//     name: "Modern UI/UX Design Challenge",
//     category: "Design",
//     image:
//       "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     participants: 350,
//     description:
//       "Design a futuristic mobile app interface for a smart home system using glassmorphism.",
//     deadline: "5 Days left",
//   },
//   {
//     id: 3,
//     name: "Logo Design for EcoBrand",
//     category: "Design",
//     image:
//       "https://images.unsplash.com/photo-1626785774573-4b799314348d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     participants: 85,
//     description:
//       "Create a minimalist logo for a new eco-friendly clothing brand targeting Gen Z.",
//     deadline: "1 Week left",
//   },
//   {
//     id: 4,
//     name: "Photography: Urban Life",
//     category: "Photography",
//     image:
//       "https://images.unsplash.com/photo-1449824913929-2b3a641053c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     participants: 210,
//     description:
//       "Capture the essence of city life in a single frame. Black and white photos preferred.",
//     deadline: "3 Days left",
//   },
//   {
//     id: 5,
//     name: "Game Development Hackathon",
//     category: "Development",
//     image:
//       "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     participants: 450,
//     description:
//       "Build a playable 2D game prototype within 48 hours using Unity or Godot.",
//     deadline: "12 Hours left",
//   },
//   {
//     id: 6,
//     name: "Digital Art: Cyberpunk",
//     category: "art",
//     image:
//       "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     participants: 180,
//     description:
//       "Create a character concept art set in a dystopian cyberpunk universe.",
//     deadline: "4 Days left",
//   },
// ];

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
  console.log(contests);

  // Sort by highest participation
  // const sortedContests = [...contestsData]
  //   .sort((a, b) => b.participants - a.participants)
  //   .slice(0, 6);

  // const handleDetailsClick = (id) => {
  //   if (!isLoggedIn) {
  //     navigate("/login");
  //   } else {
  //     navigate(`/contest/${id}`);
  //   }
  // };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="px-4 py-20 md:px-6 bg-base-100">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-extrabold md:text-5xl text-neutral">
            Popular Contests
          </h2>
          <p className="max-w-xl mx-auto text-base-content/70">
            Join the most happening challenges right now. Compete with thousands
            and prove your mettle.
          </p>
        </div>

        {/* Contests Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contests.map((contest, index) => (
            <ContestCard key={contest.id} contest={contest} index={index} />
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
