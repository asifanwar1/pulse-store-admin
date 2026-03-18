import type { TChatType } from "@/pages/ChatsManagement/ChatLayout/Chats.types";
import type { TUserLocation, TUserResponse } from "../users/users.response.types";
import type { TMedia } from "../projects/projects.response.types";

export type TParticipant = {
    id: number;
    chatId: number;
    userId: number;
    lastReadEventId: number;
    lastDeliveredEventId: number;
    user: TUserResponse;
    lastReadEvent: TUserResponse;
    lastDeliveredEvent: TUserResponse;
    unreadCount: number;
};
export type TAttachment = {
    id: number;
    eventId: number;
    mediaId: number;
    media: TMedia;
};

export type TEvent = {
    id: number;
    content: string;
    chatId: number;
    senderParticipantId: number;
    isFromSystem: boolean;
    locationId: number;
    location: TUserLocation;
    chat: any; // @type-fix
    senderParticipant: any; // @type-fix
    attachments: TAttachment[]; // @type-fix
    type: string;
    meta: Record<string, unknown>;
    createdAt?: string;
    updatedAt?: string;
};

export type TCreateChatResponse = {
    isSelected?: boolean;
    id: number;
    title: string;
    type: TChatType;
    lastEventId: number;
    participants: TParticipant[];
    lastEvent: TEvent;
    blockedByParticipantId: number;
    canDisable: boolean;
    canChat: boolean;
    events: TEvent[];
};

export type TGetChatsListingResponse = {
    data: TCreateChatResponse[];
};

export type TGetChatEventsResponse = {
    data: ReadonlyArray<TEvent>;
};
