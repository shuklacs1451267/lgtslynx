import React, { useState } from "react";
import { FaGoogle, FaTimes } from "react-icons/fa";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative border border-slate-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-2"
        >
          <FaTimes size={20} />
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-slate-500 text-center mb-8 text-sm">
            {isLogin ? "Enter your details to login" : "Join us to build authority"}
          </p>

          <button className="w-full flex items-center justify-center gap-3 border border-slate-200 py-3 rounded-xl hover:bg-slate-50 transition-all font-medium mb-6 text-slate-700">
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400">Or email</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none" />
            )}
            <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none" />
            <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent outline-none" />
            
            <button className="w-full bg-accent text-black font-bold py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-600 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent font-bold hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}