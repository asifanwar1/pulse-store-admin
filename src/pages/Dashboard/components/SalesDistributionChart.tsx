import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { salesDistributionData } from "@/mock/dashboard.mock";
import ChartCard from "../../../components/custom/CustomCards/ChartCard";

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        name: string;
        value: number;
        payload: { color: string };
    }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-dash-card-border rounded-xl shadow-dash-card-hover px-3.5 py-2.5 text-xs">
            <div className="flex items-center gap-2">
                <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: payload[0].payload.color }}
                />
                <span className="font-semibold text-app-primary">
                    {payload[0].name}
                </span>
                <span className="text-app-secondary">{payload[0].value}%</span>
            </div>
        </div>
    );
}

function renderLegend(props: {
    payload?: Array<{ value?: string; color?: string }>;
}) {
    const { payload } = props;
    return (
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-3">
            {payload?.map((entry, i) => (
                <li
                    key={i}
                    className="flex items-center gap-1.5 text-xs text-app-secondary"
                >
                    <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: entry.color ?? "#9DA5B4" }}
                    />
                    {entry.value}
                </li>
            ))}
        </ul>
    );
}

export default function SalesDistributionChart() {
    return (
        <ChartCard
            title="Sales Distribution"
            subtitle="Revenue share by category"
            className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-1"
        >
            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={salesDistributionData}
                        cx="50%"
                        cy="45%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={3}
                        dataKey="value"
                        strokeWidth={0}
                    >
                        {salesDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={renderLegend} />
                </PieChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
