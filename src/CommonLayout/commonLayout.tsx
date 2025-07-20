import Navbar from "@/components/Common/Navbar";

export default function CommonLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full h-full flex flex-col">
            <div className="w-full">
                <Navbar />
            </div>
            {children}
        </div>
    )
}   