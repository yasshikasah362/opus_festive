import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation"; 
import FlyerUI from "./FlyerUI";

export default async function FlyerPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Not logged in → redirect to /login
    redirect("/login");
  }

  // If session exists, render Flyer page
  return <FlyerUI username={session.user.name} />;
}
