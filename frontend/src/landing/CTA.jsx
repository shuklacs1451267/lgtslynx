import { useState } from "react";
import AuthModal from "../dashboard/login/AuthModal";

export default function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="get-started" className="py-24 bg-accent text-black text-center">
        <h2 className="text-4xl font-bold mb-6">
          Build Authority. Get Indexed Faster.
        </h2>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform"
        >
          Login / Sign up
        </button>
      </section>

      {/* Modal Integration */}
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
