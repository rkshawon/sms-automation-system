import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  dataMap: [],
};
export const mapSlice = createSlice({
  name: "datamap",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.dataMap = action.payload;
    },
  },
});

// this is for dispatch
export const { updateData } = mapSlice.actions;
// this is for configureStore
export default mapSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   dataMap: [],
// };
// export const mapSlice = createSlice({
//   name: "datamap",
//   initialState,
//   reducers: {
//     insertNode: (state, { payload }) => {
//       console.log(payload);
//       const type = payload.type;
//       if (type === "sendMessage") {
//         state.dataMap.push({ id: payload.id, nodeType: type, message: "" });
//       } else {
//         state.dataMap.push({ id: payload.id, nodeType: type, time: 0 });
//       }
//     },
//     updateData: (state, { payload }) => {
//       state.dataMap = payload;
//     },
//   },
// });

// // this is for dispatch
// export const { updateData, insertNode } = mapSlice.actions;
// // this is for configureStore
// export default mapSlice.reducer;
