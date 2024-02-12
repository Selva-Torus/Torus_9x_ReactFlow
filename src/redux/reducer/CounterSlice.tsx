import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConterState {
  serverData: [];
  appName: string;
  artfactName: string;
  isTorusControl: boolean;
}

const initialState: ConterState = {
  serverData: [],
  appName: "",
  artfactName: "",
  isTorusControl: false,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    getServer: (state, action: PayloadAction<[]>) => {
      state.serverData = action.payload;
    },
    selectApp: (state, action: PayloadAction<string>) => {
      state.appName = action.payload;
    },
    selectArtifact: (state, action: PayloadAction<string>) => {
      state.appName = action.payload;
    },
    setTorusControl: (state, action: PayloadAction<boolean>) => {
      state.isTorusControl = action.payload;
    },
  },
});

export const { getServer, selectApp, selectArtifact, setTorusControl } =
  counterSlice.actions;

export default counterSlice.reducer;
