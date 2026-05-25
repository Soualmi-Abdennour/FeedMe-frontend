"use client";
import React from "react";
import { useProfile } from "../../hooks/useProfile";
import { useUserPosts } from "../../hooks/useUserPosts";
import ProfileHeader from "../molecules/ProfileHeader";
import RestaurantProfileServices from "@/features/profile/components/molecules/RestaurantProfileServices";
import ProfilePosts from "@/features/profile/components/molecules/ProfilePosts";
import { RestaurantUserProfileAppModel } from "../../../user/types/user.types";
import { Loader2, AlertCircle } from "lucide-react";

type Props = {
    slug: string;          
    currentUserSlug: string; 
};

function ProfilePage({ slug, currentUserSlug }: Props) {
    const { user, isLoading, error } = useProfile(slug);
    const {
        posts,
        isLoading: postsLoading,
        error: postsError,
    } = useUserPosts(user?.id ?? "");

    const isOwnProfile = slug === currentUserSlug;
    const isRestaurant = user?.role === "RESTAURANT";

    if (isLoading) {
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
        </div>
    );
    }

    if (error || !user) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen gap-3 text-muted-foreground">
            <AlertCircle className="w-10 h-10 text-fail-400" />
            <p className="text-sm">{error ?? "User not found"}</p>
        </div>
    );
    }

    return (
    <div className="relative z-0 w-full h-screen overflow-y-scroll">
        <ProfileHeader user={user} isOwnProfile={isOwnProfile} />
            {isRestaurant && user.profile && (
        <RestaurantProfileServices profile={user.profile as RestaurantUserProfileAppModel} />
        )}

        <ProfilePosts posts={posts} isLoading={postsLoading} error={postsError} />
    </div>
    );
}

export default ProfilePage;