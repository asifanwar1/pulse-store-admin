import WelcomeSection from "./Welcome";
import type { IAuthWrapperProps } from "../types";

const personWorker = "https://illustrations.popsy.co/amber/man-with-laptop.svg";
const welcomeBackground =
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80";

const AuthWrapper = ({ children }: IAuthWrapperProps) => {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <div className="flex bg-white">
                <div className="flex-1 flex items-center justify-center px-4 py-8 bg-white">
                    <div className="w-full max-w-md">{children}</div>
                </div>
                <div className="hidden lg:flex lg:w-1/2 bg-auth-primary text-white items-center justify-center">
                    <WelcomeSection
                        backgroundImage={welcomeBackground}
                        personImage={personWorker}
                    />
                </div>
            </div>
            <div className="relative">
                <footer className="absolute bottom-0 left-[8%] 2xl:left-[14%] lg:left-[9%] text-app-secondary text-[14px] py-1 ">
                    © {currentYear} Dadcrafted Decor. All rights reserved
                </footer>
            </div>
        </>
    );
};

export default AuthWrapper;
