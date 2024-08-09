import { configureStore } from "@reduxjs/toolkit";
import textReducer from "../reducers/textSlice";

export const store = configureStore({
    reducer: {
        text: textReducer,
    }
});