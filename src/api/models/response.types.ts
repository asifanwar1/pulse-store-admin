export interface ICustomer {
    Id: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    FullName: string;
    Email: string;
    Contact: string | null;
    Type: string;
    Status: string;
    ProfileImageId: string | null;
    CoverImageId: string | null;
    NotificationAllowed: boolean;
    TermsAccepted: boolean;
    Address: string | null;
    AddressCity: string | null;
    AddressState: string | null;
    AddressLatitude: number | null;
    AddressLongitude: number | null;
    LastActiveDate: string;
    ChatNotificationMuteEndAt: string | null;
    ChatNotificationMuteStartAt: string | null;
    SnoozeChatNotificationDaily: boolean;
    SnoozeOn: boolean;
    HomeCourseId: string | null;
    SkillLevel: string | null;
    PlayingSince: string | null;
    FacebookId: string | null;
    ProfileImage: any | null;
    HomeCourse: any | null;
    CoverImage: any | null;
    Preferences: any[];
    joinedClubs: any[];
    IsSocialSignedIn: boolean;
}

export interface ICustomersResponseType {
    Data: ICustomer[];
    Count: number;
}

export interface ICustomerResponseType {
    Data: ICustomer;
}

export interface IUpdateCustomerStatusResponseType {
    message: string;
    Data: ICustomer;
}
