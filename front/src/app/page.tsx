import ButtonDefault from "@/components/ui/ButtonDefault";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="font-extrabold text-8xl tracking-wide mb-6 animate-fade-in">Hire Me</h1>
        <p className="w-[600px] mx-auto text-lg leading-relaxed tracking-wide mb-12 animate-slide-up">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        </p>
      </div>
      <div className="flex justify-between w-80">
        <ButtonDefault
          label="Register"
          link="/registration"
          customClasses="bg-black transition-all duration-300 rounded-full w-28 h-12 text-gray-200 font-semibold"
        />
        <ButtonDefault
          label="Login"
          link="/login"
          customClasses="bg-black transition-all duration-300 rounded-full w-28 h-12 text-gray-200 font-semibold"
        />
      </div>
    </div>  
  );
}
