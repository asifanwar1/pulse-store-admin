import React from "react";

export type OrderRevenueCardProps = {
    orderId: number;
    productId: number;
    productName: string;
    productSku: string;
    productCategory: string;
    quantity: number;
    retailPrice: string;
    costPrice: string;
    totalAmount: string;
    profit: string;
    onProductIdClick: () => void;
    onOrderIdClick: () => void;
};

const OrderRevenueCard: React.FC<OrderRevenueCardProps> = ({
    orderId,
    productId,
    productName,
    productSku,
    productCategory,
    quantity,
    retailPrice,
    costPrice,
    totalAmount,
    profit,
    onProductIdClick,
    onOrderIdClick,
}) => {
    return (
        <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div>Order Id: {orderId}</div>
                <div>Product Id: {productId}</div>
                <div>Product Name: {productName}</div>
                <div>Product SKU: {productSku}</div>
                <div>Category: {productCategory}</div>
                <div>Quantity: {quantity}</div>
                <div>Retail Price: {retailPrice}</div>
                <div>Cost Price: {costPrice}</div>
                <div>Total Amount: {totalAmount}</div>
                <div>Profit: {profit}</div>
            </div>
        </div>
    );
};

export default OrderRevenueCard;
