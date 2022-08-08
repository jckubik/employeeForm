import { createSlice } from '@reduxjs/toolkit';

export const employeeInfoSlice = createSlice({
  name: 'employeeInfo',
  initialState: {
    workerType: 'W-2',
    companyName: '',
    employeeStatus: 'Active',
    terminationDate: '',
    firstName: '',
    middleInitial: '',
    lastName: '',
    address1: '',
    address2: '',
    zip: '',
    state: '',
    city: '',
    workedInState: '',
    occupationalCode: '',
    email: '',
    ssnTin: '',
    dateOfBirth: '',
    gender: 'Male',
    hireDate: '',
    allValid: true,
    allRequired: false,
    validityStatus: {
      workerType: true,
      companyName: true,
      employeeStatus: true,
      terminationDate: true,
      firstName: true,
      middleInitial: true,
      lastName: true,
      address1: true,
      address2: true,
      zip: true,
      state: true,
      city: true,
      workedInState: true,
      occupationalCode: true,
      email: true,
      ssnTin: true,
      dateOfBirth: true,
      gender: true,
      hireDate: true,
    },
    requiredFieldsStatus: {
      firstName: false,
      lastName: false,
      address1: false,
      // zip: false,
      // state: false,
      // city: false,
      ssnTin: false,
      gender: true,
      hireDate: false,
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
  employeeInfoSlice.actions;

export default employeeInfoSlice.reducer;
