import Link from "next/link";
import { Button } from "../ui/button";
import { auth, signOut } from "../../auth";

export default async function Navbar() {
  const session = await auth()

  const handleSignOut = async () => {
    "use server"
    await signOut({ redirectTo: "/" })
  }

  const navItems = [
    {
      label: "Pricing",
      href: "/pricing",
      status : true
    },
    {
      label: "SignIn",
      href: "/login",
      status : session?.user ? false : true
    },
  ]
  return (
    <div className="w-full p-2 md:p-4 md:pl-8 md:pr-8 flex items-center justify-between font-brcolage-grotesque z-50">
      <div className="font-bold text-xl md:w-[50%] w-full">
        <h1 className="text-2xl">Editta</h1>
      </div>
      <div className="md:w-[50%] w-full flex items-center justify-end gap-4">
        {navItems.map((item) => (
          item.status ? (
            <Link key={item.label} href={item.href} className={item.label === "SignIn" ? "p-2 bg-black text-white rounded-md" : ""}>{item.label}</Link>
          ) : null
        ))}
        {session?.user && <Button onClick={handleSignOut} className="p-2 bg-black text-white rounded-md">Logout</Button>}
      </div>
    </div>
  )
}   