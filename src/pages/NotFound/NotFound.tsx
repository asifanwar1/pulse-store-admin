import { useNavigate } from "react-router-dom";

import { CustomButton } from "@/components/custom/CustomButton";

import { APP_ROUTES } from "@/routes/appRoutes";
import logo from "@/assets/images/pulse-store-black.png";
import Image from "@/components/custom/Image";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4 relative overflow-hidden">
            <Image
                src={logo}
                alt="Pulse Store Logo"
                className="absolute top-5 left-5 w-45 h-20"
            />

            <div className="relative z-10 text-center space-y-8 max-w-2xl mx-auto mt-5">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-[8rem] font-black tracking-tighter text-foreground/10 select-none">
                        404
                    </h2>
                    <h2 className="text-4xl font-bold text-foreground">
                        Page Not Found
                    </h2>
                </div>

                <div className="space-y-4">
                    <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
                        Oops! The page you're looking for seems to have wandered
                        off. Let's get you back on track.
                    </p>
                </div>

                <div className="flex justify-center">
                    <CustomButton onClick={() => navigate(APP_ROUTES.ROOT)}>
                        Go to Home
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
