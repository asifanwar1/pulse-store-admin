import type { UserModel } from "./user.model";

export interface AuthStateType {
    user?: UserModel | null;
    isAuthenticated?: boolean;
    token?: string;
    forgetVerificationToken?: string;
    notificationCount?: {
        total: number;
    };
}

export const initialAuthState: AuthStateType = {
    user: null,
    token: "",
    isAuthenticated: false,
    forgetVerificationToken: ""
};
