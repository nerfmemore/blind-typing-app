import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    text: {},
    status: 'idle',
    error: null,
    keydowns: 0,
    successed: 0,
    accuracy: 0,
    speed: 0
}

export const fetchingText = createAsyncThunk('text/fetchingText', () => {
    return axios
        .get('https://baconipsum.com/api/?type=meat-and-filler&paras=1')
        .then((response) => response.data[0])
})

const textSlice = createSlice({
    name: 'text',
    initialState,
    reducers: {
        keyPressed(state, action) {
            const chars = state.text.split('');
            const key = action.payload.pressedKey;
            state.successed += key == chars[state.successed] ? 1 : 0;
            console.log(chars[state.successed])
            state.keydowns += 1;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchingText.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchingText.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.text = action.payload
            })
            .addCase(fetchingText.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default textSlice.reducer;

export const selectText = (state) => state.text;
export const { keyPressed } = textSlice.actions;