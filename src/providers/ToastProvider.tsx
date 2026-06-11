import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { TToastProviderProps } from "./types";

const ToastProvider = ({ children }: TToastProviderProps) => {
    return (
        <>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                toastClassName="!bg-pulse-cream-dark !text-pulse-green-dark !border !border-gray-200 !shadow-lg"
                progressClassName="!bg-pulse-green-dark"
            />
        </>
    );
};

export default ToastProvider;
