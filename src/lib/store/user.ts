import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { getUser, type UserRes } from "@/api/user"
import { Status } from "@/api/request"

const store_name = "user_store"

export interface UserState {
  data?: UserRes
}

const initialState = {} satisfies UserState as UserState

const user = createSlice({
  name: store_name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.data = action.payload
    })
  },
})

export const loadUser = createAsyncThunk("user/loadUser", async (_: void, thunkAPI) => {
  const response = await getUser()
  const { data, code } = response.data
  if (code === Status.Success) return data

  return thunkAPI.rejectWithValue(response)
})

export default user.reducer
