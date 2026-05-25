"use client";
import React from "react";
import { UserAppModel, NormalUserProfileAppModel, RestaurantUserProfileAppModel } from "@/features/user/types/user.types";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";


type Props = {
    user: UserAppModel;
    isOwnProfile: boolean;
};

function ProfileHeader({ user, isOwnProfile }: Props) {
    const router = useRouter();
    const isRestaurant = user.role === "RESTAURANT";
    const profile = user.profile;

    const avatarUrl = isRestaurant
    ? (profile as RestaurantUserProfileAppModel)?.restaurantBasicInformation?.restaurantLogoUrl
    : (profile as NormalUserProfileAppModel)?.userBasicInformation?.profileImageUrl;

    const displayName = isRestaurant
    ? (profile as RestaurantUserProfileAppModel)?.restaurantBasicInformation?.restaurantName
    : (profile as NormalUserProfileAppModel)?.userBasicInformation?.fullName;

    const bio = isRestaurant
    ? (profile as RestaurantUserProfileAppModel)?.restaurantBasicInformation?.bio
    : (profile as NormalUserProfileAppModel)?.userBasicInformation?.bio;

    const city = isRestaurant
    ? (profile as RestaurantUserProfileAppModel)?.restaurantLocationAndContact?.city
    : (profile as NormalUserProfileAppModel)?.userBasicInformation?.city;

    const phoneNumber = isRestaurant
    ? (profile as RestaurantUserProfileAppModel)?.restaurantBasicInformation?.phoneNumber
    : (profile as NormalUserProfileAppModel)?.userBasicInformation?.phoneNumber;

    const businessEmail = isRestaurant
    ? (profile as RestaurantUserProfileAppModel)?.restaurantBasicInformation?.businessEmail
    : null;

    const googleMapsLink = isRestaurant
    ? (profile as RestaurantUserProfileAppModel)?.restaurantLocationAndContact?.googleMapsLink
    : null;

    const kitchenCategories = isRestaurant
    ? (profile as RestaurantUserProfileAppModel)?.restaurantDetails?.kitchenCategory
    : (profile as NormalUserProfileAppModel)?.userUsagePreferences?.kitchenCategory;

    return (
    <div className="flex flex-col gap-7 p-6 border-b border-border m-7 rounded-md shadow-lg">
        <div className="flex items-start justify-between gap-4 ">
        <div className="flex items-center gap-4">
            <div className="w-20 h-20 relative rounded-full overflow-hidden bg-muted border border-border flex-shrink-0">
            {avatarUrl ? (
                <Image
                src={avatarUrl}
                alt={displayName ?? "Profile picture"}
                className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                {displayName?.charAt(0).toUpperCase() ?? "?"}
                </div>
            )}
            </div>

            <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold text-foreground">{displayName ?? "—"}</h1>
            <span className="text-sm text-muted-foreground">@{user.userName}</span>
            {isRestaurant && (
                <span className="text-xs font-medium text-primary-500 bg-primary-100 px-2 py-0.5 rounded-full w-fit">
                Restaurant
                </span>
            )}
            </div>
        </div>

        {isOwnProfile && (
            <Button
            variant="secondary"
            size="sm"
            className="text-primary-500 font-bold"
            onClick={() => router.push("/home/user/components/templates/EditProfilePage.tsx")}
            >
            Edit Profile
            </Button>
        )}
        </div>

        {bio && (
        <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>
        )}

        <div className="flex flex-col gap-4 text-sm text-muted-foreground">
        {city && (
        <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>{city}</span>
        </div>
        )}
        {phoneNumber && (
        <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-orange-500" />
            <span>{phoneNumber}</span>
        </div>
        )}
        {businessEmail && (
        <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-orange-500" />
            <span>{businessEmail}</span>
        </div>
        )}
        {googleMapsLink && (
            <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-orange-500" />
                <a
                    href={googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:underline truncate"
                >
                View on Google Maps
                </a>
            </div>
            )}
        </div>

        {kitchenCategories && kitchenCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
            {kitchenCategories.map((cat) => (
            <span
                key={cat}
                className="text-xs text-white font-semibold bg-primary-500 px-2 py-1 rounded-full text-muted-foreground border border-border"
            >
                {cat}
            </span>
            ))}
        </div>
        )}
    </div>
    );
}

export default ProfileHeader;