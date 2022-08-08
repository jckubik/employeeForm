import { createSlice } from '@reduxjs/toolkit';

export const payTaxInfoSlice = createSlice({
  name: 'payTaxInfo',
  initialState: {
    payRate: 'Salary',
    payAmount: '',
    standardHours: '',
    payFrequency: '',
    basisOfPay: 'Same as pay type',
    ownerOfficer: false,
    departmentNumber: '',
    departmentName: '',
    w42020: true,
    federalFilingStatus: 'Single',
    fedIncomeTax: 'Not Exempt',
    numberFederalAllowances: '',
    otherIncome: '',
    fedTaxOverride: '',
    fedTaxOverrideAmount: '',
    deductions: '',
    claimDependents: '',
    extraWithholding: '',
    fedUnemploymentTaxExempt: false,
    medicareExempt: false,
    socialSecurityExempt: false,
    multipleJobsSpouseWorks: false,
    stateFilingStatus: 'Single',
    stateIncomeTax: 'Not Exempt',
    numberStateAllowances: '',
    stateTaxOverride: '',
    stateTaxOverrideAmount: '',
    countyCode: '',
    arizonaWithholding: '',
    workersCompClassCode: '',
    stateUnemploymentTaxExempt: false,
    workersCompExempt: false,
    earningsDeductions: [
      {
        id: 0,
        earningsDescription: '',
        earningsType: '',
        earningsAmount: '',
        deductionDescription: '',
        deductionType: '',
        deductionAmount: '',
      },
    ],
    allValid: true,
    allRequired: false,
    validityStatus: {
      payRate: true,
      payAmount: true,
      standardHours: true,
      payFrequency: true,
      basisOfPay: true,
      ownerOfficer: true,
      departmentNumber: true,
      departmentName: true,
      federalFilingStatus: true,
      fedIncomeTax: true,
      numberFederalAllowances: true,
      otherIncome: true,
      fedTaxOverride: true,
      fedTaxOverrideAmount: true,
      deductions: true,
      claimDependents: true,
      extraWithholding: true,
      numberStateAllowances: true,
      stateTaxOverrideAmount: true,
    },
    requiredFieldsStatus: {
      payAmount: false,
      payFrequency: false,
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
    addEarningsDeductions: (state, action) => {
      // Loop over each object in the state array
      // If the object is the one we're looking for, update the property
      state.earningsDeductions.forEach((object) => {
        if (object.id === action.payload.toUpdate.id) {
          object[action.payload.property] = action.payload.value;
        }
      });
    },
    newLineEarningsDeductions: (state, action) => {
      state.earningsDeductions = [
        ...state.earningsDeductions,
        action.payload.newObj,
      ];
    },
    removeLineEarningsDeductions: (state) => {
      state.earningsDeductions = state.earningsDeductions.filter(
        (object) => object.id !== state.earningsDeductions.length - 1
      );
    },
  },
});

export const {
  updateInfo,
  setValidityStatus,
  setRequiredFieldsStatus,
  addEarningsDeductions,
  newLineEarningsDeductions,
  removeLineEarningsDeductions,
} = payTaxInfoSlice.actions;

export default payTaxInfoSlice.reducer;
