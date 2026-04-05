import { fetchAPI } from "@/store/base.store";
import { editProfileCredientials, UserResponse } from "@/types/api.types";






export const userApiSlice=fetchAPI.injectEndpoints({
    endpoints:(build)=>({
        updateProfile: build.mutation<UserResponse,editProfileCredientials>({
            query:({endpoint,profile})=>({
                url: `/profile/${endpoint}/edit-profile`,
                method:"PATCH",
                body:{profile}
            })
        })
})
})

export const { useUpdateProfileMutation } = userApiSlice