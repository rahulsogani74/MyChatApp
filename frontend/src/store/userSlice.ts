import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  userId: string | null;
}

const initialState: UserState = {
  username: '',
  userId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const { setUsername, setUserId } = userSlice.actions;
export default userSlice.reducer;
