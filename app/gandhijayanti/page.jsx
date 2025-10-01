import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import GandhijayantiUI from "./GandhijayantiUI";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <GandhijayantiUI username={session.user.name} />;
}
