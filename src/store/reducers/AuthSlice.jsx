import { createSlice } from "@reduxjs/toolkit";
// import { connect } from "react-redux";

const initialState = {
    currentUser: undefined,
    userStatus: {
        connected: false,
      },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.currentUser = action.payload;
            state.userStatus = { connected: true };
        },
        userNameUpdate(state, action) {
            state.userData.userName = action.payload;
        },
        loginFailure(state) {
            state.currentUser = undefined;
            state.userStatus = { connected: false };
        },
        logout(state) {
            state.currentUser = undefined;
            state.userStatus = { connected: false };
            localStorage.removeItem('Token');
        }
    }
});

export const { loginSuccess, loginFailure, logout, userNameUpdate } = authSlice.actions;
export default authSlice.reducer;
