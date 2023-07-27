import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
	name: "app",
	initialState: {
		userToken: " ",
		date: new Date().toLocaleString(),
	},
	reducers: {
		changeToken(state, action) {
			state.userToken = action.payload.text;
		},
	},
});

export const { changeToken } = appSlice.actions;

export default appSlice.reducer;
