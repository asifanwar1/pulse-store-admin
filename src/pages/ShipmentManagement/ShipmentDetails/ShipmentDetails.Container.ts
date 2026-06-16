import { useGetShipment } from "@/hooks/api/shipment.queries";
import { APP_ROUTES } from "@/routes/appRoutes";
import { getRouteWithId } from "@/utils/common.utils";
import { useNavigate, useParams } from "react-router-dom";

const NO_VALUE = 0;

export const useShimentDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { data: shipment, isLoading: isShipmenttLoading } = useGetShipment(
        Number(id),
    );

    const isShipmentDataLoading = isShipmenttLoading;

    const handleNavigateBack = () => navigate(-1);

    const handleNavigateToProduct = (id: number) =>
        navigate(
            getRouteWithId({
                route: APP_ROUTES.PRODUCTS_DETAILS,
                id,
            }),
        );

    return {
        NO_VALUE,
        shipment,
        isShipmenttLoading,
        isShipmentDataLoading,
        handleNavigateBack,
        handleNavigateToProduct,
    };
};
