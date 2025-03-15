import { createSlice, current, isPending } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
//make http request using redux thunk middleware
export const UserAuthorLoginThunk = createAsyncThunk('User-Author-login', async (userCredObj, thunkApi) => {
    if (userCredObj.userType === 'user') {
        try {
            const res = await axios.post('http://localhost:4001/user-api/login', userCredObj)
            if (res.data.message === 'LoginSuccessfull') {
                //console.log("user logged in")
                //store the token in local or sessional storage
                localStorage.setItem('token', res.data.token)
                //return the data
                return res.data;

            } else {
                return thunkApi.rejectWithValue(res.data.message)
            }

        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
    else if (userCredObj.userType === 'author') {
        try {
            const res = await axios.post('http://localhost:4001/author-api/login', userCredObj)
            if (res.data.message === 'LoginSuccessfull') {
                //console.log("author logged in")
                //store the token in local storage
                localStorage.setItem('token', res.data.token)
                //return the data
                return res.data
            } else {
                return thunkApi.rejectWithValue(res.data.message)
            }
        } catch (err) {
            return thunkApi.rejectWithValue(err);
        }
    }
});
 

export const UserAuthorSlice = createSlice({
    name: "User-Author-login",
    initialState: {
        isPending: false,
        LoginUserStatus: false,
        currentUser: {},
        errorOccured: false,       
        errMsg: "",
    },
    reducers: {
        resetState: (state) => {
            state.isPending = false;
            state.currentUser = {};
            state.LoginUserStatus = false;
            state.errorOccured = false;            
            state.errMsg = "";
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(UserAuthorLoginThunk.pending, (state) => {
                state.isPending = true;
            })
            .addCase(UserAuthorLoginThunk.fulfilled, (state, action) => {
                state.isPending = false;
                state.currentUser = action.payload.user;
                state.LoginUserStatus = true;
                state.errorOccured = false;
                state.errMsg = "";
                state.likedBlogs = action.payload.user.likedBlogs || []; // Fetching liked blogs from user data
            })
            .addCase(UserAuthorLoginThunk.rejected, (state, action) => {
                state.isPending = false;
                state.currentUser = {};
                state.LoginUserStatus = false;
                state.errorOccured = true;
                state.errMsg = action.payload;
            })
            // Handling Likes
            // .addCase(toggleLike.fulfilled, (state, action) => {
            //     state.isPending = false;
            //     const { blogId, likes } = action.payload;

            //     if (likes.includes(state.currentUser.username)) {
            //         // Add blog to likedBlogs if user has liked it
            //         if (!state.likedBlogs.includes(blogId)) {
            //             state.likedBlogs.push(blogId);
            //         }
            //     } else {
            //         // Remove blog from likedBlogs if user removed like
            //         state.likedBlogs = state.likedBlogs.filter((id) => id !== blogId);
            //     }
            // })
            // .addCase(toggleLike.rejected, (state) => {
            //     state.isPending = false;
            //     state.errorOccured = true;
            // }),
});

//export action creator function
export const { resetState } = UserAuthorSlice.actions;

//export the root reducers
export default UserAuthorSlice.reducer;
