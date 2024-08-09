import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    text: {},
    status: 'idle',
    error: null,
    startTime: new Date().toISOString(),
    timeElapse: new Date().toISOString(),
    words: 0,
    wpm: 0,
    keydowns: 0,
    successed: 0,
    accuracy: 0,
    speed: 0,
    finalStatus: false
}

export const fetchingText = createAsyncThunk('text/fetchingText', () => {
    return axios
        .get('https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1')
        .then((response) => response.data[0])
})
//https://baconipsum.com/api/?type=meat-and-filler&paras=1
const textSlice = createSlice({
    name: 'text',
    initialState,
    reducers: {
        keyPressed(state, action) {
            const chars = state.text.split('');
            const key = action.payload.pressedKey;
            state.successed += key == chars[state.successed] ? 1 : 0;
            state.keydowns += 1;
            
            const currentTime = new Date();
            const timeElapsed = (currentTime - new Date(state.startTime)) / 1000 / 60;
            state.timeElapse = timeElapsed;

            state.words += (key && chars[state.successed] == ' ') ? 1 : 0;
            state.wpm = state.words / timeElapsed;

            state.accuracy = state.successed / state.keydowns * 100;
            state.speed = state.successed / timeElapsed;

            state.finalStatus = state.successed === chars.length ? true : false;
        },
        restart(state) {
            state.status = 'idle';

            state.startTime = new Date();
            state.timeElapse = new Date();
            state.words = 0;
            state.wpm = 0;
            state.keydowns = 0;
            state.successed = 0;
            state.accuracy = 0;
            state.speed = 0;
            state.finalStatus = false;
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
export const { keyPressed, restart } = textSlice.actions;