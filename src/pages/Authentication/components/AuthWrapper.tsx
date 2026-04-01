import type { IAuthWrapperProps } from "../types";
import ProductMatrixScroll from "./ProductMatrixScroll";
import { productIcons } from "./productIcons.config";

const AuthWrapper = ({ children }: IAuthWrapperProps) => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="flex h-screen bg-pulse-cream overflow-auto">
            <div className="flex-1 flex flex-col justify-between px-4 py-8 bg-pulse-cream ">
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-md">{children}</div>
                </div>
                <footer className="text-app-secondary text-[14px] py-1 text-left pl-4">
                    © {currentYear} Pulse Store. All rights reserved
                </footer>
            </div>
            <div
                className="hidden lg:flex lg:w-1/2 items-center justify-center overflow-hidden"
                style={{
                    background:
                        "linear-gradient(150deg, var(--color-pulse-cream), var(--color-pulse-cream-dark))",
                }}
            >
                <ProductMatrixScroll icons={productIcons} />
            </div>
        </div>
    );
};

export default AuthWrapper;
