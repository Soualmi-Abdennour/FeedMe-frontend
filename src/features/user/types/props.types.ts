import { z } from "zod";
import { IRestaurantEditBasicInfoForm, IRestaurantEditLocationInfoForm } from "../schema/restaurantUserEditProfile.schema";
import { INormalUserEditBasicInfoForm } from "../schema/normalUserEditProfile.schema";
import { IFormField } from "@/types/props.types";
import { NormalUserProfileAppModel, RestaurantUserProfileAppModel } from "./user.types";

type TuplePaths<T> = {
    [K in keyof T & string]: [K, keyof T[K] & string]
}[keyof T & string];

export interface IEditInformationFormProps<FormSchema extends z.ZodType> {
    defaultValues: z.infer<FormSchema>;
    validationSchema: FormSchema;
    endpoint:"user"|"restaurant"
    fieldToUpdate: keyof Pick<NormalUserProfileAppModel, "userBasicInformation"> | keyof Pick<RestaurantUserProfileAppModel, "restaurantBasicInformation"|"restaurantLocationAndContact">
    formFields: Omit<IFormField, "errors" | "control">[];
}


export interface IEditSelectFormProps<T> {
    itemsList: T[]
    sectionTitle: string
    defaultValues: T[]
    endpoint: "user" | "restaurant"
    fieldToUpdate: TuplePaths<NormalUserProfileAppModel> | TuplePaths<RestaurantUserProfileAppModel>

}
