import { configureStore } from "@reduxjs/toolkit";
import videoPlayerReducer from "../dux/videoPlayerReducer";

export const store = configureStore({
  reducer: {
    videoPlayer: videoPlayerReducer,
  }
});