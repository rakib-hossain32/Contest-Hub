import React from "react";
import { motion } from "framer-motion";
import {
  XCircle,
  RefreshCcw,
  ArrowLeft,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden font-sans bg-base-100">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-64 h-64 rounded-full top-10 left-10 bg-error/5 blur-3xl"></div>
        <div className="absolute w-64 h-64 rounded-full bottom-10 right-10 bg-base-300/30 blur-3xl"></div>
      </div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md overflow-hidden border shadow-2xl bg-base-100 border-base-200 rounded-3xl"
      >
        <div className="p-8 text-center">
          {/* Animated Cancel Icon */}
          <motion.div
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 dark:bg-red-900/20"
          >
            <XCircle size={40} className="text-error" />
          </motion.div>

          <h2 className="mb-2 text-2xl font-bold text-base-content">
            Payment Cancelled
          </h2>
          <p className="px-2 mb-8 text-base-content/60">
            The transaction was cancelled or failed to complete. Don't worry,
            you haven't been charged.
          </p>

          {/* Help Box */}
          <div className="flex items-start gap-3 p-4 mb-8 text-left border bg-base-200/50 rounded-xl border-base-300">
            <AlertCircle size={20} className="text-primary mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-base-content">
                Common Reasons:
              </h4>
              <ul className="pl-4 mt-1 space-y-1 text-xs list-disc text-base-content/60">
                <li>Slow internet connection</li>
                <li>Card verification failed</li>
                <li>Cancelled by user</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {/* Go Back button acts as Try Again */}
            <button
              onClick={() => navigate(-1)}
              className="w-full text-lg shadow-lg btn btn-primary shadow-primary/20"
            >
              <RefreshCcw size={20} /> Try Again
            </button>

            <Link
              to="/"
              className="w-full btn btn-ghost text-base-content/70 hover:bg-base-200"
            >
              <ArrowLeft size={20} /> Return to Home
            </Link>
          </div>
        </div>

        {/* Support Footer */}
        <div className="py-4 text-center border-t bg-base-200/50 border-base-200">
          <Link
            to="/contact"
            className="inline-flex items-center gap-1 text-xs font-medium transition-colors text-base-content/50 hover:text-primary"
          >
            <MessageCircle size={14} /> Having trouble? Contact Support
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancel;
