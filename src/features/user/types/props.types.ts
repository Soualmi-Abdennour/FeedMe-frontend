import { z } from "zod";
import { IRestaurantEditBasicInfoForm, IRestaurantEditLocationInfoForm } from "../schema/restaurantUserEditProfile.schema";
import { INormalUserEditBasicInfoForm } from "../schema/normalUserEditProfile.schema";
import { IFormField } from "@/types/props.types";
import { NormalUserProfileAppModel, ProfileImage, RestaurantUserProfileAppModel } from "./user.types";
import { PostAppModel } from "@/features/studio-and-publication/types/studio.types";
import { Dispatch, SetStateAction } from "react";
import { MediaAppModel } from "@/features/studio-and-publication/types/media.types";

type TuplePaths<T> = {
    [K in keyof T & string]: [K, keyof T[K] & string]
}[keyof T & string];

export type AccountFields = "userName" | "email" | "password"

export interface IEditInformationFormProps<FormSchema extends z.ZodType> {
    defaultValues: z.infer<FormSchema>;
    validationSchema: FormSchema;
    endpoint:"user"|"restaurant"
    fieldToUpdate: keyof Pick<NormalUserProfileAppModel, "userBasicInformation"> | keyof Pick<RestaurantUserProfileAppModel, "restaurantBasicInformation"|"restaurantLocationAndContact" > | AccountFields
    formFields: Omit<IFormField, "errors" | "control">[];
}


export interface IEditSelectFormProps<T> {
    itemsList: T[]
    sectionTitle: string
    defaultValues: T[]
    endpoint: "user" | "restaurant"
    fieldToUpdate: TuplePaths<NormalUserProfileAppModel> | TuplePaths<RestaurantUserProfileAppModel>

}

export interface IProfilePosts  {
    posts: PostAppModel[];
    isLoading: boolean;
    isError: boolean;
    sameUser?:boolean
};


export interface IProfileImageDropZone {
    profileImage:ProfileImage 
    setProfileImage:Dispatch<SetStateAction<ProfileImage>>
    disabled?:boolean
}
