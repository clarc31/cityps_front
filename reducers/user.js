import { createSlice} from '@reduxjs/toolkit';


const initialState = {
    value: { token: null, username: null, categories: []},
};

export const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.token = action.payload.token;
            state.value.username = action.payload.username;
            state.value.categories = action.payload.categories;
        },
        logout: (state) => {
            state.value.token = null;
            state.value.username = null;
            state.value.categories = [];
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;