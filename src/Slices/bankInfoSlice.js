import { createSlice } from '@reduxjs/toolkit';

export const bankInfoSlice = createSlice({
  name: 'bankInfo',
  initialState: {
    enableDirectDeposit: false,
    bankRoutingNumber1: '',
    bankAccountNumber1: '',
    accountType1: 'Checking',
    depositAmount1: 'Full',
    partialType: 'Amount',
    partialAmount: '',
    bankRoutingNumber2: '',
    bankAccountNumber2: '',
    accountType2: 'Checking',
    depositAmount2: 'Remainder',
    allValid: false,
    allRequired: false,
    validityStatus: {
      bankRoutingNumber1: true,
      bankAccountNumber1: true,
      accountType1: true,
      depositAmount1: true,
      bankRoutingNumber2: true,
      bankAccountNumber2: true,
      accountType2: true,
      depositAmount2: true,
    },
    requiredFieldsStatus: {
      bankAccountNumber1: false,
      bankRoutingNumber1: false,
      partialAmount: true,
      bankAccountNumber2: true,
      bankRoutingNumber2: true,
    },
  },
  reducers: {
    updateInfo: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    setValidityStatus: (state, action) => {
      state.validityStatus[action.payload.field] = action.payload.value;
    },
    setRequiredFieldsStatus: (state, action) => {
      state.requiredFieldsStatus[action.payload.field] = action.payload.value;
    },
  },
});

export const { updateInfo, setValidityStatus, setRequiredFieldsStatus } =
  bankInfoSlice.actions;

export default bankInfoSlice.reducer;
