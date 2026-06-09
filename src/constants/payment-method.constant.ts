export const PAYMENT_METHOD_OPTIONS = [
    { value: "credit_card", label: "Credit Card", disabled: true },
    { value: "debit_card", label: "Debit Card", disabled: true },
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "cash_on_delivery", label: "Cash on Delivery" },
] as const;
