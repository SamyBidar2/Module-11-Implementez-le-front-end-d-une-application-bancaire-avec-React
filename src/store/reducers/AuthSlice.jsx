// import { createSlice } from "@reduxjs/toolkit";
// // import { connect } from "react-redux";

// const initialState = {
//     currentUser: undefined,
//     userStatus: {
//         connected: false,
//       },
// };

// export const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         loginSuccess(state, action) {
//             state.currentUser = action.payload;
//             state.userStatus = { connected: true };
//         },
//         userNameUpdate(state, action) {
//             state.userData.userName = action.payload;
//         },
//         loginFailure(state) {
//             state.currentUser = undefined;
//             state.userStatus = { connected: false };
//         },
//         logout(state) {
//             state.currentUser = undefined;
//             state.userStatus = { connected: false };
//             localStorage.removeItem('Token');
//         }
//     }
// });

// export const { loginSuccess, loginFailure, logout, userNameUpdate } = authSlice.actions;

// store/reducers/AuthSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: undefined,
  userStatus: {
    connected: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.currentUser = action.payload.user;
      state.userStatus = { connected: true };
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

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
