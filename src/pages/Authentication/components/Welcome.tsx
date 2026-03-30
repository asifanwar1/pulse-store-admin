import type { IWelcomeSectionProps } from "../types";

const WelcomeSection = ({
    title = (
        <>
            Welcome to
            <br />
            <span className="font-bold">Pulse Store</span>
        </>
    ),
    subtitle = (
        <>
            Manage. Sell. <span className="font-bold">Grow.</span>
        </>
    ),
    backgroundImage,
    personImage,
    className,
}: IWelcomeSectionProps) => {
    return (
        <div
            className={`relative w-full h-screen flex items-center justify-center bg-auth-primary lg:max-w-[574px] xl:max-w-[726px] mr-5 ${className}`}
        >
            <img
                src={backgroundImage}
                alt="Background"
                className="absolute inset-0 w-full h-[95%] mt-5 object-cover object-center z-0 rounded-none lg:rounded-[15px]"
                draggable={false}
            />

            <div className="h-[95%] mt-5 absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 rounded-none lg:rounded-[20px]" />

            <div className="absolute top-0 left-0 w-full z-20 flex flex-col items-center pt-16 px-4 text-center">
                <h2 className="text-white text-xl sm:text-2xl lg:text-[32px] font-normal leading-tight mb-2">
                    {title}
                </h2>
                <p className="text-white text-base sm:text-lg lg:text-[20px] font-normal tracking-tight drop-shadow-md">
                    {subtitle}
                </p>
            </div>

            <img
                src={personImage}
                alt="Person"
                className="absolute right-40 2xl:bottom-[26.8px] lg:bottom-[9.5px] md:bottom-[9.5px] 2xl:w-[90%] lg:w-[80%]  z-30 select-none pointer-events-none
                    -translate-x-6 sm:-translate-x-10 lg:-translate-x-16"
                draggable={false}
                style={{
                    objectFit: "contain",
                }}
            />
        </div>
    );
};

export default WelcomeSection;
