import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  Download,
  Home,
  Calendar,
  Hash,
  Trophy,
} from "lucide-react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  // URL থেকে transactionId বা অন্য info নেয়া যেতে পারে
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});

  const sessionId = searchParams.get("session_id");
  const transactionId =
    searchParams.get("txn_id") ||
    "TXN_" + Math.random().toString(36).substr(2, 9).toUpperCase();

  useEffect(() => {
    if (sessionId) {
      axiosSecure.post(`/payment-success`, { sessionId }).then((res) => {
        setPaymentInfo(res.data);
      });
    }
  }, [axiosSecure, sessionId]);
  console.log(paymentInfo);
  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden font-sans bg-base-100">
      {/* Background Decor (Same as ContestDetails) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="flex items-center justify-center w-24 h-24 rounded-full shadow-2xl bg-linear-to-br from-secondary to-teal-600 shadow-secondary/30"
            >
              <CheckCircle size={48} className="text-white" strokeWidth={3} />
            </motion.div>
            <div className="absolute inset-0 rounded-full bg-secondary/20 blur-xl animate-pulse -z-10"></div>
          </div>
        </div>

        {/* Receipt Card */}
        <div className="overflow-hidden border shadow-2xl bg-base-100 border-base-200 rounded-3xl">
          {/* Top Decorative Bar */}
          <div className="w-full h-2 bg-linear-to-r from-secondary via-primary to-secondary"></div>

          <div className="p-8 text-center">
            <h2 className="mb-2 text-3xl font-extrabold text-primary">
              Payment Successful!
            </h2>
            <p className="mb-8 text-base-content/70">
              You have successfully registered for the contest. Good luck!
            </p>

            {/* Ticket Info */}
            <div className="relative p-6 text-left border bg-base-200/50 rounded-2xl border-base-300">
              {/* Visual Cutouts */}
              <div className="absolute w-6 h-6 border-r rounded-full top-1/2 -left-3 bg-base-100 border-base-300"></div>
              <div className="absolute w-6 h-6 border-l rounded-full top-1/2 -right-3 bg-base-100 border-base-300"></div>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Trophy size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wide uppercase text-base-content/50">
                    Payment For
                  </p>
                  <h4 className="text-lg font-bold text-base-content">
                    Contest Entry Fee
                  </h4>
                </div>
              </div>

              <div className="my-2 divider"></div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-base-content/60">
                    <Hash size={14} /> Transaction ID
                  </span>
                  <span className="font-mono font-medium text-base-content">
                    {paymentInfo?.transactionId}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-base-content/60">
                    <Calendar size={14} /> Date
                  </span>
                  <span className="font-medium text-base-content">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 text-lg">
                  <span className="font-bold text-base-content">
                    Amount Paid
                  </span>
                  <span className="font-black text-secondary">
                    ${paymentInfo?.amount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid gap-3 p-6 border-t bg-base-200/30 border-base-200">
            <Link
              to="/dashboard"
              className="w-full text-lg shadow-lg btn btn-primary shadow-primary/20"
            >
              Go to Dashboard <ArrowRight size={20} />
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <button className="btn btn-outline border-base-300 text-base-content/70 hover:bg-base-200 hover:text-base-content">
                <Download size={18} /> Receipt
              </button>
              <Link
                to="/"
                className="btn btn-ghost text-base-content/70 hover:bg-base-200"
              >
                <Home size={18} /> Home
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
