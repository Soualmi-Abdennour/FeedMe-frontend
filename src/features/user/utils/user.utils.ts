import {
    NormalUserProfileAppModel,
    NormalUserProfileDbModel,
    ProfileData,
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
    let user: UserAppModel
    const {UserProfile,RestaurantProfile,...rest}=db
    if (db.role === "USER" ){
        const profile =db.UserProfile &&  mapNormalUserProfileToAppModel(db.UserProfile)
        return user={
            ...rest,
            role:"USER",
            ...(profile && {profile: {...profile}})
        }
    }
    else {
        const profile =db.RestaurantProfile && mapRestaurantProfileToAppModel(db.RestaurantProfile)
        return user = {
        ...rest,
            role: "RESTAURANT",
            ...(profile && { profile: { ...profile } })
        }
    }
}




export function extractProfileData(user: UserAppModel): ProfileData | null {
    if (user.role === "USER" && user.profile) {
        const {
            userBasicInformation: { profileImageUrl, fullName, bio, city, phoneNumber },
            userUsagePreferences: { kitchenCategory },
        } = user.profile as NormalUserProfileAppModel;

        return {
            displayName: fullName,
            // imageUrl: profileImageUrl,
            imageUrl: "",
            bio,
            city,
            phoneNumber,
            kitchenCategory,
        };
    }

    if (user.role === "RESTAURANT" && user.profile) {
        const {
            restaurantBasicInformation: { restaurantLogoUrl, restaurantName, phoneNumber, bio, businessEmail },
            restaurantLocationAndContact: { googleMapsLink },
            restaurantDetails: { kitchenCategory },
        } = user.profile as RestaurantUserProfileAppModel;

        return {
            displayName: restaurantName,
            // imageUrl: restaurantLogoUrl,
            imageUrl: "",
            bio,
            phoneNumber,
            businessEmail,
            googleMapsLink,
            kitchenCategory,
        };
    }

    return null;
}