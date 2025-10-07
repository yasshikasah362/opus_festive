"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardUI from "./DashboardUI";

export default function Dashboard() {
  const { data: session, status } = useSession(); // status: 'loading', 'authenticated', 'unauthenticated'
  const [opusToken, setOpusToken] = useState(null);
  const [loadingToken, setLoadingToken] = useState(true);
  const router = useRouter();

  // Load Opus token
  useEffect(() => {
    const token = localStorage.getItem("opusToken");
    setOpusToken(token);
    setLoadingToken(false);
  }, []);

  // Redirect only after both session and Opus token are loaded
  useEffect(() => {
    if (!loadingToken && status !== "loading") {
      if (!session && !opusToken) {
        router.push("/login");
      }
    }
  }, [session, status, opusToken, loadingToken, router]);

  if (status === "loading" || loadingToken) {
    return null; // or show a loading spinner
  }

  if (session) {
    return <DashboardUI username={session.user.name} />;
  }

  if (opusToken) {
    return <DashboardUI username="Opus User" />;
  }

  return null; // fallback
}
