import { createContext } from "react";

type User = {
    user_id: string;
    username: string;
} | null;

export type AuthContextType = {
    user: User;
    loading: boolean;
    initialized: boolean;
    refresh: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);