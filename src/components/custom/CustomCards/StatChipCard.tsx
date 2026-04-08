import React from "react";

export interface StatChipProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

const StatChipCard: React.FC<StatChipProps> = ({ icon, label, value }) => (
    <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-pulse-cream-dark shadow-dash-card flex-1 min-w-0">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-pulse-cream-dark shrink-0 text-pulse-green">
            {icon}
        </div>
        <div className="min-w-0">
            <p className="text-xss text-app-secondary truncate">{label}</p>
            <p className="text-sm font-bold text-pulse-green-dark truncate">
                {value}
            </p>
        </div>
    </div>
);

export default StatChipCard;
