
export type UserRole="USER"|"RESTAURANT"|"ADMIN"

export type UserAppModel = UserDbModel & {
    // profile: NormalUserProfile | RestaurantUserProfile | null
}

type UserDbModel = {
    id: string

    userName: string
    email: string
    role: UserRole

    status: "ACTIVE" | "SUSPENDED"

    isVerified: boolean
    isOnboardingCompleted: boolean

    password: string
    passwordChangedAt?: Date

    verificationTokenHash?: string | null
    verificationTokenExpires?: Date | null

    passwordResetTokenHash?: string | null
    passwordResetExpires?: Date | null

    createdAt: Date
    updatedAt: Date
}

// type NormalUserProfile = {
//     basicInformation: {
//         fullName: string
//         city: string | null
//         phoneNumber: string
//         bio: string | null
//         profileImageUrl?: string
//     }

//     usagePreferences: {
//         usageGoal: UsageGoal
//         kitchenCategory: KitchenCategory
//     } | null
// }
// type RestaurantUserProfile = {
//     basicInformation: {
//         restaurantName: string
//         restaurantLogoUrl: string | null
//         businessEmail: string | null
//         phoneNumber: string
//     }

//     locationAndContact: {
//         city: string
//         wilaya: Wilaya
//         street: string | null
//         postalCode?: string
//         googleMapsLink?: string
//     }

//     restaurantDetails: {
//         kitchenCategories: KitchenCategory[]
//         openingHours: {
//             day: WeekDay
//             from: string
//             to: string
//         }[]
//     }
// }