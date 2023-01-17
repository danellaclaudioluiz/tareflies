import { createSlice } from '@reduxjs/toolkit';

const name = JSON.parse(localStorage.getItem("name"));

const initialState = {
    isLoggedIn: false,
    name: name ? name : "",
    user: {
        name: "",
        email: "",
        phone: "",
        bio: "",
        photo: ""
    },
    userId: ""
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_LOGIN(state, action) {
            state.isLoggedIn = action.payload;
        },
        SET_NAME(state, action) {
            localStorage.setItem("name", JSON.stringify(action.payload));
            state.name = action.payload;
        },
        SET_USER(state, action) {
            const profile = action.payload; 
            state.user.name = profile.name;
            state.email = profile.email;
            state.phone = profile.phone;
            state.bio = profile.bio;
            state.photo = profile.photo;
        },
    }
})

export const {SET_LOGIN, SET_USER, SET_NAME} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.authSlice.isLoggedIn;
export const selectUser = (state) => state.authSlice.user;
export const selectName = (state) => state.authSlice.name;

export default authSlice.reducer;