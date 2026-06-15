import React, { useState } from "react";
import { Box } from "lucide-react";
import { formatNumberCurrency } from "@/utils/common.utils";

export type ProductOrderCardProps = {
    image: string;
    category?: string;
    title: string;
    unitPrice?: string | number;
    totalAmount?: string | number;
    quantity?: number;
    sku?: string;
    onClick?: () => void;
};

const ProductOrderCard: React.FC<ProductOrderCardProps> = ({
    image,
    category,
    title,
    unitPrice,
    totalAmount,
    quantity,
    sku,
    onClick,
}) => {
    const [imageError, setImageError] = useState(false);

    return (
        <div
            className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 max-w-md"
            onClick={onClick}
        >
            <div className="relative h-48 overflow-hidden">
                {!image || imageError ? (
                    <div className="flex flex-col w-full h-full bg-placeholder/20 flex items-center justify-center">
                        <Box className="w-14 h-14 text-gray-400 mt-5" />
                        <p className="text-sm text-gray-500 mt-2">
                            {imageError
                                ? "Failed to load image"
                                : "No image available"}
                        </p>
                    </div>
                ) : (
                    <img
                        src={image}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        onError={() => setImageError(true)}
                    />
                )}
            </div>

            <div className="p-6">
                <h2 className="text-[18px] text-pulse-green-dark font-600 mb-3">
                    {title}
                </h2>

                <div className="flex items-center gap-2 mb-6 h-[25px] text-[14px] text-pulse-green-dark">
                    Category:
                    <span className="text-[14px] font-normal text-pulse-green">
                        {category}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-pulse-green-dark text-[14px]">
                        Unit Price:
                        <span className="text-[14px] font-normal text-pulse-green">
                            {formatNumberCurrency(unitPrice)}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-pulse-green-dark text-[14px]">
                        Total Price:
                        <span className="text-[14px] font-normal text-pulse-green">
                            {formatNumberCurrency(totalAmount)}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-pulse-green-dark text-[14px]">
                        Quantity:
                        <span className="text-[14px] font-normal text-pulse-green">
                            {quantity}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-pulse-green-dark text-[14px]">
                        Product Sku:
                        <span className="text-[14px] font-normal text-pulse-green">
                            {sku}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductOrderCard;
