import type { StateCreator } from "zustand";
import { USER_TYPE, type UserType } from "@/constants/user-type.constants";
import { sliceResetFns } from "./store";
import type { UserModel } from "@/api/models/user.model";

export interface AuthStateType {
    userType: UserType;
    isAuthenticated: boolean;
    token: string | null;
    deviceId: string | null;
    user: UserModel | null;
}

export interface AuthSliceType extends AuthStateType {
    setAuth: (auth: Partial<AuthStateType>) => void;
    clearAuth: () => void;
}

export const initialAuthState: AuthStateType = {
    userType: USER_TYPE.CUSTOMER,
    isAuthenticated: false,
    token: null,
    deviceId: null,
    user: null,
};

const authSlice: StateCreator<AuthSliceType, [], [], AuthSliceType> = (
    set,
    _get,
    _store,
) => {
    sliceResetFns.add(() => set(initialAuthState));

    return {
        ...initialAuthState,
        setAuth: (auth) => set((state) => ({ ...state, ...auth })),
        clearAuth: () => set(() => ({ ...initialAuthState })),
    };
};

export default authSlice;
