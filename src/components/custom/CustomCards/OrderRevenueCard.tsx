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
                <div>
                    <p className="text-xss text-app-secondary truncate">
                        Order Id:
                    </p>
                    <p className="text-sm font-bold text-pulse-green-dark truncate underline cursor-pointer">
                        <span onClick={onOrderIdClick}>{orderId}</span>
                    </p>
                </div>
                <div>
                    <p className="text-xss text-app-secondary truncate">
                        Product Id:
                    </p>
                    <p className="text-sm font-bold text-pulse-green-dark truncate underline cursor-pointer">
                        <span onClick={onProductIdClick}>{productId}</span>
                    </p>
                </div>
                <div>
                    <p className="text-xss text-app-secondary truncate">
                        Product Name:
                    </p>
                    <p className="text-sm font-bold text-pulse-green-dark truncate">
                        {productName}
                    </p>
                </div>
                <div>
                    <p className="text-xss text-app-secondary truncate">
                        Product SKU:
                    </p>
                    <p className="text-sm font-bold text-pulse-green-dark truncate">
                        {productSku}
                    </p>
                </div>
                <div>
                    <p className="text-xss text-app-secondary truncate">
                        Category:
                    </p>
                    <p className="text-sm font-bold text-pulse-green-dark truncate">
                        {productCategory}
                    </p>
                </div>
                <div>
                    <p className="text-xss text-app-secondary truncate">
                        Quantity:
                    </p>
                    <p className="text-sm font-bold text-pulse-green-dark truncate">
                        {quantity}
                    </p>
                </div>
                <div>
                    <p className="text-xss text-app-secondary truncate">
                        Retail Price:
                    </p>
                    <p className="text-sm font-bold text-pulse-green-dark truncate">
                        {retailPrice}
                    </p>
                </div>
                <div>
                    <p className="text-xss text-app-secondary truncate">
                        Cost Price:
                    </p>
                    <p className="text-sm font-bold text-pulse-green-dark truncate">
                        {costPrice}
                    </p>
                </div>
                <div>
                    <p className="text-xss text-app-secondary truncate">
                        Total Amount:
                    </p>
                    <p className="text-sm font-bold text-pulse-green-dark truncate">
                        {totalAmount}
                    </p>
                </div>
                <div>
                    <p className="text-xss text-app-secondary truncate">
                        Profit:
                    </p>
                    <p className="text-sm font-bold text-pulse-green-dark truncate">
                        {profit}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderRevenueCard;
