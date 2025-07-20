import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full p-2 md:p-4 md:pl-8 md:pr-8 flex items-center justify-between font-brcolage-grotesque">
      <div className="font-bold text-xl md:w-[50%] w-full">
        <h1 className="text-2xl">Editta</h1>
      </div>
      <div className="md:w-[50%] w-full flex items-center justify-end gap-4">
        <Link href="/pricing"  >Pricing</Link>
        <Link href="/login" className="p-2 bg-black text-white rounded-md">SignIn</Link>
      </div>
    </div>
  )
}   