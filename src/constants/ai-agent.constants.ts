import { Bot, Headset, Truck, type LucideIcon } from "lucide-react";

import type { TAgentKey } from "@/api/services/aiAgents/aiAgents.request.types";

export type TAgentMeta = {
    label: string;
    icon: LucideIcon;
    description: string;
};

export const AI_AGENT_META: Record<TAgentKey, TAgentMeta> = {
    product_listing: {
        label: "Product Listing",
        icon: Bot,
        description:
            "Drafts new product listings through conversation, then creates the product once the admin confirms.",
    },
    order_tracking: {
        label: "Order Tracking",
        icon: Truck,
        description:
            "Answers shipping and order-status questions for signed-in customers.",
    },
    customer_query: {
        label: "Customer Query",
        icon: Headset,
        description:
            "Handles customer FAQs and escalates to a support ticket when it can't help.",
    },
};

export const AI_AGENT_KEYS: TAgentKey[] = [
    "product_listing",
    "order_tracking",
    "customer_query",
];
