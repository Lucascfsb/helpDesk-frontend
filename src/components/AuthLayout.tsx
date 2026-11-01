import { Outlet } from "react-router";

import logoSvg from "../assets/logo.svg";
import backgroundImage from "../assets/background.png";

export function AuthLayout() {
  return (
    <div className="min-h-screen w-full relative flex flex-col md:flex-row bg-blue-dark overflow-hidden">
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="hidden md:block md:w-1/2 lg:w-3/5" />

      <div className="relative z-10 w-full md:w-170 min-h-screen flex flex-col items-center justify-end md:justify-start md:pt-3 ml-auto mt-0 md:mt-0">
        <div className="w-full md:h-[calc(100vh-12px)] bg-white rounded-t-4xl md:rounded-t-none md:rounded-tl-[20px] flex flex-col items-center pt-8 pb-40 px-6 md:py-12 md:px-35 shadow-2xl overflow-y-auto">
          <div className="flex items-center justify-center gap-3 ">
            <img src={logoSvg} alt="Logo" className="w-42 h-24" />
          </div>

          <div className="w-full max-w-100 flex flex-col items-center">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
