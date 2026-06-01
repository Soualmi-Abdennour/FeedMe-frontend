"use client";
import { Button } from "@/components/ui/button";
import { UserAppModel } from "@/features/user/types/user.types";
import { Link2, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { extractProfileData } from "../../utils/user.utils";


type Props = {
    user: UserAppModel;
    sameUser?: boolean;
};

function ProfileHeader({ user, sameUser = false }: Props) {
    const profileData = extractProfileData(user)
    
    return (
        <div className="flex flex-col gap-7 bg-white p-6 border-b border-border m-7 rounded-md shadow-lg ">
            <div className="flex items-start justify-between gap-4 ">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 relative rounded-full overflow-hidden  border border-border flex-shrink-0">
                        <Image
                            src={profileData?.imageUrl ?? "/default/default-profile-image.png"}
                            alt={"Profile picture"}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-bold text-foreground">{profileData?.displayName ?? "—"}</h1>
                        <span className="text-sm text-muted-foreground">@{user.userName}</span>
                        {user.role === "RESTAURANT" && (
                            <span className="text-xs font-medium text-primary-500 bg-primary-100 px-2 py-0.5 rounded-full w-fit">
                                Restaurant
                            </span>
                        )}
                    </div>
                </div>
                {sameUser && (
                    <Link href={"/settings/edit-profile"}>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="text-primary-500 font-bold"
                    >
                        Edit Profile
                    </Button>
                    </Link>
                )}
            </div>

            {profileData?.bio && (
                <p className="text-sm text-muted-foreground leading-relaxed">{profileData.bio}</p>
            )}

            <div className="flex flex-col gap-4 text-sm text-muted-foreground ">
                {profileData?.city && (
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-orange-500" />
                        <span>{profileData.city}</span>
                    </div>
                )}
                {profileData?.phoneNumber && (
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-orange-500" />
                        <span>{profileData.phoneNumber}</span>
                    </div>
                )}
                {profileData?.businessEmail && (
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-orange-500" />
                        <span>{profileData.businessEmail}</span>
                    </div>
                )}
                {profileData?.googleMapsLink && (
                    <div className="flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-orange-500" />
                        <a
                            href={profileData.googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-500 hover:underline truncate"
                        >
                            View on Google Maps
                        </a>
                    </div>
                )}
            </div>

            {profileData?.kitchenCategory && profileData.kitchenCategory.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {profileData.kitchenCategory.map((category) => (
                        <span
                            key={category}
                            className="text-xs text-white font-semibold bg-primary-500 px-2 py-1 rounded-full text-muted-foreground border border-border"
                        >
                            {category}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProfileHeader;