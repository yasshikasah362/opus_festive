import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DiwaliUI from "./DiwaliUI";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // User not logged in → redirect to login page
    redirect("/login");
  }

  return <DiwaliUI username={session.user.name} />;
}
