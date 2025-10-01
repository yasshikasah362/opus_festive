import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import NavratriUI from "./NavratriUI";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
  redirect("/login");
  }

  return <NavratriUI username={session.user.name} />;
}
