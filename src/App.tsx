import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";

import Loading from "@/components/custom/Loading";
import { router } from "@/routes/routes";
import { TooltipProvider } from "@/components/ui/tooltip";

const App = () => {
    return (
        <>
            <TooltipProvider>
                <Suspense fallback={<Loading />}>
                    <RouterProvider router={router} />
                </Suspense>
            </TooltipProvider>
        </>
    );
};

export default App;
