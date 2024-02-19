import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConterState {
  serverData: [];
  appName: string;
  artfactName: string;
  isTorusControl: boolean;
  fabrics:string;
  TRSVersion: string;
  ER_Artifacts : string;
}

const initialState: ConterState = {
  serverData: [],
  appName: "",
  artfactName: "",
  isTorusControl: false,
  fabrics:"",
  TRSVersion: "",
  ER_Artifacts : ""
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
    selectFabrics: (state, action: PayloadAction<string>) => {
      state.fabrics = action.payload;
    },
    setTRSVersion : (state, action: PayloadAction<string>) => {
      state.TRSVersion = action.payload;
    },
    setER_Artifacts : (state , action : PayloadAction<string>) =>{
      state.ER_Artifacts = action.payload;
    }
    
  },
});

export const { getServer, selectApp, selectFabrics , selectArtifact, setTorusControl , setTRSVersion , setER_Artifacts } =
  counterSlice.actions;

export default counterSlice.reducer;
