import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAppModel } from "../types/user.types";

interface IUserState {
    user: UserAppModel | null;
}

const initialState: IUserState = {
    user: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state: IUserState, action: PayloadAction<UserAppModel>) => {
            state.user = action.payload;
        },

        // updateUser: (state: IUserState, action: PayloadAction<Partial<UserAppModel>>) => {
        //     if (state.user) {
        //         Object.assign(state.user, action.payload);
        //     }
        // },

        clearUser: (state: IUserState) => {
            state.user = null;
        }
    }
});

export const { clearUser, setUser } = userSlice.actions;
export default userSlice.reducer;