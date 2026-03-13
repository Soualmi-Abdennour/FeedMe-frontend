import { KithcenCategory, ServiceStatus, UsageGoal, WeekDay, Wilaya } from "@/types/app.types"

export type UserRole = "USER" | "RESTAURANT" | "ADMIN"

// export type UserAppModel 
// = UserDbModel 
// & (
// NormalUserProfile | RestaurantUserProfile | null
// )

export type UserAppModel = {
    id: string

    userName: string
    email: string
    role: UserRole

    status: "ACTIVE" | "SUSPENDED"

    isVerified: boolean
    isOnboardingCompleted: boolean
    isLoggedOut:boolean

    password: string
    passwordChangedAt?: Date

    verificationTokenHash?: string | null
    verificationTokenExpires?: Date | null

    passwordResetTokenHash?: string | null
    passwordResetExpires?: Date | null
    slug:string
    createdAt: Date
    updatedAt: Date

    profile: NormalUserProfile | RestaurantUserProfile
}

export type NormalUserProfile = {
    userBasicInformation: {
        fullName: string
        city?: Wilaya | string
        phoneNumber: string
        bio?: string
        profileImageUrl?: string
    }

    usagePreferences: {
        usageGoal?: UsageGoal[]
        kitchenCategory?: KithcenCategory[]
    }
}
export type RestaurantUserProfile = {
    restaurantBasicInformation: {
        restaurantName: string
        restaurantLogoUrl?: string 
        businessEmail?: string 
        phoneNumber: string
    }

    restaurantLocationAndContact: {
        // city: string
        city: Wilaya
        street?: string 
        postalCode?: string
        googleMapsLink: string
    }

    restaurantDetails: {
        kitchenCategory: KithcenCategory[]
        // openingHours: {
        //     day: WeekDay
        //     from: string
        //     to: string
        // }[]

    }
    restaurantServices: {
        delivery: ServiceStatus;
        reservation: ServiceStatus;
        dineIn: ServiceStatus;
        specialCustomerService: ServiceStatus;
        parkAvailability: ServiceStatus;
    };
}
