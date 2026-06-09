import type { OrderLineItem, SelectedOption } from "./OrderManagement.types";

const createOrderLineItem = (
    option: SelectedOption,
    existing?: OrderLineItem,
): OrderLineItem => {
    if (existing) return existing;

    return {
        id: option.value,
        productName: String(option.label),
        quantity: 1,
        unitPrice: 0,
    };
};

export const mapOptionsToSelectedProducts = (
    selectedOptions: SelectedOption[],
    currentProducts: OrderLineItem[],
): OrderLineItem[] => {
    const existingById = new Map(
        currentProducts.map((item) => [item.id, item]),
    );

    return selectedOptions.map((option) =>
        createOrderLineItem(option, existingById.get(option.value)),
    );
};
