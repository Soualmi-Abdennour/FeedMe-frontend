"use client";
import React from "react";
import { PostAppModel } from "@/features/studio-and-publication/types/studio.types";
import PostPreview from "@/features/studio-and-publication/components/molecules/PostPreview";
import { Loader2, ImageOff } from "lucide-react";

type Props = {
    posts: PostAppModel[];
    isLoading: boolean;
    error: string | null;
};

function ProfilePosts({ posts, isLoading, error }: Props) {
    if (isLoading) {
    return (
        <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
        </div>
    );
    }

    if (error) {
    return (
        <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground">
            <ImageOff className="w-8 h-8" />
            <p className="text-sm">Failed to load posts</p>
        </div>
    );
    }

    if (posts.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground">
            <ImageOff className="w-8 h-8" />
            <p className="text-sm">No publications yet</p>
        </div>
    );
    }

    return (
        <div className="p-4">
            <h2 className="text-sm font-semibold text-foreground mb-3">Publications</h2>
            <div className="grid grid-cols-3 gap-1">
        {posts.map(({ id, mediaType, media }) => (
            <PostPreview
                key={id}
                mediaType={mediaType}
                media={media}
                postId={id}
            />
        ))}
        </div>
    </div>
    );
}

export default ProfilePosts;