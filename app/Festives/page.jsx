import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import FestivesUI from "./FestivesUI";

export default async function FlyerPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // If not logged in, show unauthorized page
    return (
      <div
        className="flex items-center justify-center min-h-screen px-4"
        style={{ background: "var(--primary-gradient)" }}
      >
        <div
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/flowers.png')] opacity-120 mix-blend-overlay"
          aria-hidden="true"
        />
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-lg shadow-xl text-center border border-gray-200">
          <h2 className="text-2xl font-semibold text-red-500 mb-3">
            Unauthorized
          </h2>
          <p className="text-gray-600 text-sm">
            Please log in to access this page.
          </p>
        </div>
      </div>
    );
  }

  // If session exists, render Flyer page
  return <FestivesUI username={session.user.name}  />;
}

