import {
    useEffect,
    useState,
    useCallback,
    useRef
} from "react";

import { AuthContext} from "./AuthContext";
import type { ReactNode } from "react";

type User = {
    user_id: string;
    username:string;
    first_name:string;
    last_name:string;
} | null;

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<User>(() => {
        // initialize from localStorage synchronously
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });


    const [loading, setLoading] = useState(true);

    const [initialized, setInitialized] = useState(false);
    const initializedRef = useRef(false); // survives remount

    const fetchUser = useCallback(async (signal?: AbortSignal) => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/auth/me", {
                credentials: "include",
                signal
            });

            if (!res.ok) {
                setUser(null);
                return;
            }

            const data = await res.json();
            setUser(data);
        } catch {
            if (!signal?.aborted) setUser(null);
        } finally {
            if (!signal?.aborted) {
                setLoading(false);
                setInitialized(true);
                initializedRef.current = true;
            }
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        fetchUser(controller.signal);
        return () => controller.abort();
    }, [fetchUser]);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                initialized,
                refresh: fetchUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}