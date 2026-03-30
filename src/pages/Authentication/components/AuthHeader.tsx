import type { IAuthHeaderProps } from "../types";

const AuthHeader = ({
    title = "Welcome",
    subtitle = "Pulse Store.",
    logo,
}: IAuthHeaderProps) => (
    <div className="w-full flex flex-col items-center pt-8 pb-2">
        {logo && (
            <img src={logo} alt="Pulse Store" className="h-16 mb-6 mr-auto" />
        )}
        <div className="w-full max-w-md">
            <div className="mb-6">
                <h1
                    className="text-app-primary font-bold text-[32px] md:text-[28px] leading-tight mb-2"
                    style={{ fontFamily: "Archivo, system-ui, sans-serif" }}
                >
                    {title}
                </h1>
                {subtitle && (
                    <p
                        className="text-app-secondary text-[16px] mb-4"
                        style={{ fontFamily: "Archivo, system-ui, sans-serif" }}
                    >
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    </div>
);

export default AuthHeader;
