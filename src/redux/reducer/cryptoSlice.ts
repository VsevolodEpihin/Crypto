import { createSlice } from "@reduxjs/toolkit";

import { CryptoData } from "../../types";

interface CryptoState {
  selectedCryptos: string[];
  cryptoData: CryptoData[];
}

const initialState: CryptoState = {
  selectedCryptos: [],
  cryptoData: []
}

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    toggleCryptoSelection: (state, action) => {
      const id = action.payload;
      if(state.selectedCryptos.includes(id)){
        state.selectedCryptos = state.selectedCryptos.filter(crypto => crypto!==id)
      }else{
        state.selectedCryptos.push(id)
      }
    },
    setCryptoData: (state, action) => {
      state.cryptoData = action.payload;
    }
  }
})

export const { toggleCryptoSelection, setCryptoData } = cryptoSlice.actions;

export default cryptoSlice.reducer;
