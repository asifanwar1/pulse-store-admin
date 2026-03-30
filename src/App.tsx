import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";

import Loading from "@/components/custom/Loading";
import { router } from "@/routes/routes";

const App = () => {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <RouterProvider router={router} />
            </Suspense>
        </>
    );
};

export default App;
