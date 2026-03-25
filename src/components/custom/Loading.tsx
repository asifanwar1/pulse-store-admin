import React from "react";
import { Image } from "./Image";

import logo from "@/assets/images/dcd-logo.png";

const Loading: React.FC = () => (
    <div className="flex h-screen w-full items-center justify-center bg-background">
        <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="zoom-in-out"
        />
    </div>
);

export default Loading;
