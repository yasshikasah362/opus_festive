"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react"; // NextAuth session
import { useRouter } from "next/navigation";
import GandhijayantiUI from "./GandhijayantiUI";

export default function GandhijayantiPage() {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkLogin() {
      // 1️⃣ Check NextAuth login
      const session = await getSession();
      if (session) {
        setUsername(session.user.name);
        setLoading(false);
        return;
      }

      // 2️⃣ Check Opus login
      const opusToken = localStorage.getItem("opusToken");
      if (opusToken) {
        setUsername("Opus User");
        setLoading(false);
        return;
      }

      // 3️⃣ Neither login exists → redirect to /login
      router.push("/login");
    }

    checkLogin();
  }, [router]);

  if (loading || !username) {
    // show nothing while loading or redirecting
    return null;
  }

  return <GandhijayantiUI username={username} />;
}
