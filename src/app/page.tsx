
import Hero from "@/components/LandingPage/Hero";
import { auth } from "../auth";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await auth()

  if (!session?.user) {
    return (
      <div className="w-full">
        <Hero />
      </div>
    )
  } else {
    redirect("/dashboard")
  }

}