import { useState, useEffect } from "react";
import { PostAppModel } from "@/features/studio-and-publication/types/studio.types";
import { MOCK_POSTS_DB } from "@/features/profile/mockData/postMock";

type UseUserPostsState = {
    posts: PostAppModel[];
    isLoading: boolean;
    error: string | null;
};

export function useUserPosts(userId: string): UseUserPostsState {
    const [posts, setPosts] = useState<PostAppModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) return;

    const fetchPosts = async () => {
        setIsLoading(true);
        setError(null);
        try {
        const res = await fetch(`/api/posts/user/${userId}`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data: PostAppModel[] = await res.json();
        setPosts(data);

        } catch (err: any) {
        setError(err.message || "Something went wrong");
        } finally {
        setIsLoading(false);
        }
    };

    fetchPosts();
    }, [userId]);

    return { posts, isLoading, error };
}