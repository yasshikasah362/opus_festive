import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  await connectToDatabase();
  const { name, email, password } = await req.json();
  const exists = await User.findOne({ email });
  if (exists) {
    return new Response("User already exists", { status: 400 });
  }
  await User.create({ name, email, password });
  return new Response("User created", { status: 201 });
}
