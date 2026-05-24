import { KithcenCategory, ServiceStatus, UsageGoal, WeekDay, Wilaya, WorkingDay } from "@/types/app.types"

export type UserRole = "USER" | "RESTAURANT" | "ADMIN" | "GUEST"
export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPEND"


export type UserDbModel = {
    id: string;
    userName: string;
    email: string,
    role: UserRole;
    status: UserStatus;
    isVerified: boolean;
    isOnboardingCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    isLoggedOut: boolean;
    slug: string;
    verificationTokenHash: string | null;
    verificationTokenExpires: Date | null;
    passwordResetExpires: Date | null;
    passwordResetTokenHash: string | null;
    passwordChangedAt: Date;
    pendingEmail: string | null;

    RestaurantProfile?: RestaurantUserProfileDbModel | null
    UserProfile?: NormalUserProfileDbModel | null
}
export type NormalUserProfileDbModel = {
    id: string;
    fullName: string;
    city: Wilaya | null;
    phoneNumber: string;
    bio: string | null
    profilePicture: string | null,
    usageGoal: UsageGoal[] | null,
    kitchenCategory: KithcenCategory[] | null,
    userId: string,
    createdAt: Date;
    updatedAt: Date;
}
export type RestaurantUserProfileDbModel = {
    id: string,
    restaurantName: string,
    businessEmail: string | null,
    phoneNumber: string,
    restaurantLogoUrl: string | null,
    city: Wilaya,
    street: string | null,
    postalCode: string | null,
    googleMapsLink: string,
    bio: string | null,
    kitchenCategory: KithcenCategory[],
    workingDays: WorkingDay[],
    services: {
        delivery: ServiceStatus;
        reservation: ServiceStatus;
        dineIn: ServiceStatus;
        takeAway: ServiceStatus;
        parkAvailability: ServiceStatus;
    },
    userId: string,
    createdAt: Date,
    updatedAt: Date
}


export type UserAppModel = {
    id: string;
    userName: string;
    email: string,
    role: UserRole;
    status: UserStatus;
    isVerified: boolean;
    isOnboardingCompleted: boolean;
    passwordChangedAt: Date;
    isLoggedOut: boolean;
    slug: string;
    pendingEmail: string | null;
    createdAt: Date;
    updatedAt: Date;
    profile?: NormalUserProfileAppModel | RestaurantUserProfileAppModel
}


export type NormalUserProfileAppModel = {
    userBasicInformation: {
        fullName: string
        city?: Wilaya
        phoneNumber: string
        bio?: string
        profileImageUrl?: string
    }

    userUsagePreferences: {
        usageGoal?: UsageGoal[]
        kitchenCategory?: KithcenCategory[]
    }
}
export type RestaurantUserProfileAppModel = {
    restaurantBasicInformation: {
        restaurantName: string
        restaurantLogoUrl?: string
        businessEmail?: string
        phoneNumber: string
        bio?: string
    }

    restaurantLocationAndContact: {
        city: Wilaya
        street?: string
        postalCode?: string
        googleMapsLink: string
    }

    restaurantDetails: {
        kitchenCategory: KithcenCategory[]
        workingDays: WorkingDay[]

    }
    restaurantServices: {
        delivery: ServiceStatus;
        reservation: ServiceStatus;
        dineIn: ServiceStatus;
        takeAway: ServiceStatus;
        parkAvailability: ServiceStatus;
    };
}

// export type EditProfileCredientials=