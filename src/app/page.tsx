
import Landing from "@/components/LandingPage/Landing";
import { auth } from "../auth";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await auth()

  if (!session?.user) {
    return (
      <div className="w-full">
        <Landing />
      </div>
    )
  } else {
    redirect("/dashboard")
  }

}