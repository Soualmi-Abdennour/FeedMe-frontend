import { NormalUserProfileAppModel, RestaurantUserProfileAppModel } from "@/features/user/types/user.types";
import { OnboardingFormData } from "../types/onboarding.types";

export function buildOnboardingFormData(data: OnboardingFormData): FormData {
    const formData = new FormData();

    formData.append("role", data.onboardingType);
    if (data.avatarImageFile) {
        formData.append("avatarImageFile", data.avatarImageFile);
    }

    if (data.profile) {
        const profile =
            data.onboardingType === "USER"
                ? (data.profile as NormalUserProfileAppModel)
                : (data.profile as RestaurantUserProfileAppModel);

        appendToFormData(formData, profile, "profile");
    }

    return formData;
}

function appendToFormData(formData: FormData, value: unknown, key: string): void {
    if (value === null || value === undefined) {
        return;
    }

    if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
        return;
    }

    if (Array.isArray(value)) {
        // value.forEach((item, index) => appendToFormData(formData, item, `${key}[${index}]`));
        value.forEach((item, index) => appendToFormData(formData, item, `${key}`));
        return;
    }

    if (typeof value === "object") {
        Object.entries(value).forEach(([field, val]) =>
            // appendToFormData(formData, val, `${key}[${field}]`)
            appendToFormData(formData, val, `${key}-${field}`)
        );
        return;
    }

    formData.append(key, String(value));
}