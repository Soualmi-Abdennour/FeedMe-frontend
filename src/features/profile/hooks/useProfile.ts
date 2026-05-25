import { useState, useEffect } from "react"
import { UserAppModel } from "@/features/user/types/user.types"
import { MOCK_RESTAURANT_DATA } from "@/features/profile/mockData/profileResMock";

type UseProfileState = {
user: UserAppModel | null;
isLoading: boolean;
error: string | null;
};

export function useProfile(slug: string): UseProfileState {
const [user, setUser] = useState<UserAppModel | null>(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
useEffect(() => {
    if (!slug) return;

    const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {

        const res = await fetch(`/api/users/${slug}`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data: UserAppModel = await res.json();
        setUser(data);
    } catch (err: any) {
        setError(err.message || "Something went wrong");
    } finally {
        setIsLoading(false);
    }
    };

    fetchProfile();
    }, [slug]);

    return { user, isLoading, error };
}