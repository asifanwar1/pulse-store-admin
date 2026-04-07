import React from "react";

interface InfoCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value }) => (
    <div className="flex items-start gap-3">
        <div className="text-pulse-green mt-0.5 shrink-0">{icon}</div>
        <div>
            <p className="text-xss text-app-secondary">{label}</p>
            <p className="text-xs font-medium text-pulse-green-dark">{value}</p>
        </div>
    </div>
);

export default InfoCard;
