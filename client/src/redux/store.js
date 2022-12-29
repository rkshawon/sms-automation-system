import { configureStore } from "@reduxjs/toolkit";
import mapSlice from "./slice/mapSlice";

export default configureStore({
  reducer: {
    dataArray: mapSlice,
  },
});
