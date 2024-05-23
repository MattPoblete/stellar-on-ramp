import Image from "next/image";
import UserData from "@/components/UserData";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Paltalabs on-ramp
        </h1>
        <br />
        <p className="text-center text-lg">
          This is a test project for Paltalabs on-ramp.
        </p>
      </div>
      <div className="z-0 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <UserData />
      </div>
      
        
    </main>
  );
}
