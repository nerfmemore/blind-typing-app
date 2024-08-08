import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    text: {},
    status: 'idle',
    error: null
}

export const fetchingText = createAsyncThunk('text/fetchingText', () => {
    return axios
        .get('https://baconipsum.com/api/?type=meat-and-filler&paras=1')
        .then((response) => response.data[0])
})

const textSlice = createSlice({
    name: 'text',
    initialState,
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