// import { useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import { queryClient } from "@/lib/queryClient";
// // import {
// //     GetNotificationsListings,
// //     GetNotificationsUnreadCount,
// //     NOTIFICATION_QUERY_KEYS,
// //     ReadSingleNotification
// // } from "@/api/services/notifications";
// import { useStore } from "@/store";
// // import { useInfinitePaginatedQuery } from "@/hooks/usePaginatedQuery";
// import type { AuthStateType } from "@/api/models/storage.model";
// // import type { IGetNotificationListingsParams } from "@/api/models/request.types";
// import type { NotificationModel } from "@/api/models/notification.model";

// export const useGetNotificationsListings = (
//     props: IGetNotificationListingsParams & { enabled?: boolean }
// ) => {
//     const { readStatus, enabled = true } = props;
//     const [open, setOpen] = useState<boolean>(false);

//     const { data, refetch, ...rest } = useInfinitePaginatedQuery<NotificationModel>({
//         queryKey: [NOTIFICATION_QUERY_KEYS.NOTIFICATION_LISTING],
//         enabled,
//         queryFn: async (params) => {
//             const data = await GetNotificationsListings({
//                 ...params,
//                 ...(readStatus && { readStatus })
//             });

//             if (!data) {
//                 return { data: [], count: 0 };
//             }

//             return {
//                 data: data.data,
//                 count: data.total
//             };
//         }
//     });

//     const handleOpenChange = (newOpen: boolean) => {
//         if (newOpen) {
//             queryClient.invalidateQueries({
//                 queryKey: [NOTIFICATION_QUERY_KEYS.NOTIFICATION_LISTING]
//             });
//             queryClient.invalidateQueries({
//                 queryKey: [NOTIFICATION_QUERY_KEYS.NOTIFICATION_UNREAD_COUNT]
//             });
//         }

//         setOpen(newOpen);
//     };

//     const handleClose = () => setOpen(false);

//     return {
//         ...rest,
//         data,
//         open,
//         setOpen,
//         handleClose,
//         handleOpenChange
//     };
// };

// export const useReadSingleNotification = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async ({ id }: { id: number }) => {
//             return await ReadSingleNotification(id);
//         },
//         onSuccess: async () => {
//             await queryClient.invalidateQueries({
//                 queryKey: [NOTIFICATION_QUERY_KEYS.NOTIFICATION_LISTING]
//             });
//             await queryClient.invalidateQueries({
//                 queryKey: [NOTIFICATION_QUERY_KEYS.NOTIFICATION_UNREAD_COUNT]
//             });
//             await queryClient.refetchQueries({
//                 queryKey: [NOTIFICATION_QUERY_KEYS.NOTIFICATION_UNREAD_COUNT]
//             });
//         },
//         onError: (error) => {
//             console.error("Failed to mark notification as read:", error);
//         }
//     });
// };

// export const useGetNotificationsUnreadCount = () => {
//     const setAuth = useStore((state) => state.setAuth);
//     const isAuthenticated = useStore((state) => state.isAuthenticated);

//     return useQuery({
//         queryKey: [NOTIFICATION_QUERY_KEYS.NOTIFICATION_UNREAD_COUNT],
//         enabled: !!isAuthenticated,
//         refetchIntervalInBackground: true,
//         queryFn: async () => {
//             try {
//                 const { data } = await GetNotificationsUnreadCount();
//                 const count = data ?? 0;
//                 setAuth({ notificationCount: { total: count } });
//                 return count;
//             } catch (error) {
//                 console.error("Failed to fetch unread count:", error);
//                 setAuth({ notificationCount: { total: 0 } });
//                 return 0;
//             }
//         }
//     });
// };

// export const updateUnreadNotificationCount = async () => {
//     const { data } = await GetNotificationsUnreadCount();

//     queryClient.setQueryData<AuthStateType>(["AUTH"], (prevData) => {
//         if (prevData) {
//             return {
//                 ...prevData,
//                 notificationCount: { total: Number(data) }
//             };
//         }
//         return prevData;
//     });
// };
