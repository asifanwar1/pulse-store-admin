import type { BaseQueryType } from "@/api/models";
import type { TChatType } from "@/pages/ChatsManagement/ChatLayout/Chats.types";

export type TCreateChatBody = {
    title?: string;
    chatType: TChatType;
    userIds?: number[];
};
export type TGetChatsListingBody = {
    page: number;
    limit: number;
};

export type TGetChatsListingParams = BaseQueryType & {
    search?: string;
    beforeChatEventId?: number;
    unread?: boolean;
    type?: string;
    Q?: string;
};
