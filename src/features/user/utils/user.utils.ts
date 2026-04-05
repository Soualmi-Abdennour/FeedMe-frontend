import {
    NormalUserProfileAppModel,
    NormalUserProfileDbModel,
    RestaurantUserProfileAppModel,
    RestaurantUserProfileDbModel,
    UserAppModel,
    UserDbModel,
} from "..//types/user.types"

function mapNormalUserProfileToAppModel(
    db: NormalUserProfileDbModel
): NormalUserProfileAppModel {
    return {
        userBasicInformation: {
            fullName: db.fullName,
            phoneNumber: db.phoneNumber,
            ...(db.city && { city: db.city }),
            ...(db.bio && { bio: db.bio }),
            ...(db.profilePicture && { profileImageUrl: db.profilePicture }),
        },
        userUsagePreferences: {
            ...(db.usageGoal?.length && { usageGoal: db.usageGoal }),
            ...(db.kitchenCategory?.length && { kitchenCategory: db.kitchenCategory }),
        },
    }
}

function mapRestaurantProfileToAppModel(
    db: RestaurantUserProfileDbModel
): RestaurantUserProfileAppModel {
    return {
        restaurantBasicInformation: {
            restaurantName: db.restaurantName,
            phoneNumber: db.phoneNumber,
            ...(db.restaurantLogoUrl && { restaurantLogoUrl: db.restaurantLogoUrl }),
            ...(db.businessEmail && { businessEmail: db.businessEmail }),
            ...(db.bio && { bio: db.bio }),
        },
        restaurantLocationAndContact: {
            city: db.city,
            googleMapsLink: db.googleMapsLink,
            ...(db.street && { street: db.street }),
            ...(db.postalCode && { postalCode: db.postalCode }),
        },
        restaurantDetails: {
            kitchenCategory: db.kitchenCategory,
            workingDays: db.workingDays,
        },
        restaurantServices: { ...db.services },
    }
}

export function mapUserDbToAppModel(db: UserDbModel): UserAppModel {
    let profile: UserAppModel["profile"]

    if (db.UserProfile) {
        profile = mapNormalUserProfileToAppModel(db.UserProfile)
    } else if (db.RestaurantProfile) {
        profile = mapRestaurantProfileToAppModel(db.RestaurantProfile)
    }

    return {
        id: db.id,
        userName: db.userName,
        email: db.email,
        role: db.role,
        status: db.status,
        isVerified: db.isVerified,
        isOnboardingCompleted: db.isOnboardingCompleted,
        passwordChangedAt: db.passwordChangedAt,
        isLoggedOut: db.isLoggedOut,
        slug: db.slug,
        pendingEmail: db.pendingEmail,
        createdAt: db.createdAt,
        updatedAt: db.updatedAt,
        ...(profile && { profile }),
    }
}