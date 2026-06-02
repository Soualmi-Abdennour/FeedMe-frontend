"use client";
import React, { useRef, useState } from "react";
import { PostAppModel } from "@/features/studio-and-publication/types/studio.types";
import PostPreview from "@/features/studio-and-publication/components/molecules/PostPreview";
import { Loader2, ImageOff } from "lucide-react";
import { IProfilePosts } from "@/features/user/types/props.types";
import PostWrapper from "@/features/studio-and-publication/components/organism/PostWrapper";


function ProfilePosts({ posts, isLoading, isError }: IProfilePosts) {
    const [postToShow,setPostToShow]=useState<PostAppModel|null>(null)
    return (
        <div className="py-4 px-12">
            {/* <h2 className="text-sm font-semibold text-foreground mb-3">Publications</h2> */}
            {isLoading && (
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                </div>
            )}
            {isError && (
                <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground">
                    <ImageOff className="w-8 h-8" />
                    <p className="text-sm">Failed to load posts</p>
                </div>
            )}
            {!isLoading && !isError && (
                <div className="grid grid-cols-4 gap-3 ">
                    {posts.map((post) => (
                        <div
                            onClick={(e) => {
                                    setPostToShow(post)
                            }}
                        className="cursor-pointer"
                         key={post.id}
                        >
                        <PostPreview
                            key={post.id}
                            mediaType={post.mediaType}
                            media={post.media}
                            postId={post.id}
                            ownerId={post.user.id}
                        />
                        </div>
                    ))
                    }
                    {posts.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground col-span-3">
                            <ImageOff className="w-8 h-8" />
                            <p className="text-sm">No Posts</p>
                        </div>
                    )}
                </div>
            )}
            {postToShow && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    onClick={()=>setPostToShow(null)}
                >
                    <div className="relative bg-white rounded-3xl shadow-2xl max-w-full h-full mx-4">
                        <button
                            onClick={() => setPostToShow(null)}
                            className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60 transition"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                        <PostWrapper post={postToShow} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfilePosts;