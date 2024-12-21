'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Registration() {
  
  const router = useRouter();
		//post request fetch()
	const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		router.push("/srm")
	}	
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r ">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-[400px] animate-slide-up">
        <h1 className="font-extrabold text-6xl tracking-wide mb-4 animate-fade-in">
          Register
        </h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
                type="text"
                id="name"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
                type="email"
                id="email"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
                type="password"
                id="password"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
            />
          </div>
          <button
              type="submit"
              className="bg-black text-gray-200 hover:bg-[#00B99A] font-semibold rounded-full w-full py-3 transition-all duration-300"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>

        <img className={"p-2 py-6"} src={"https://www.asp.gov.md/sites/default/files/dd/logo-mpower.svg"}/>

      </div>

    </div>
  );
}
