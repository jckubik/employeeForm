import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    pages: [
      {
        id: 'employeeInfoNav',
        label: 'Employee Info',
        url: '/',
        accessible: true,
      },
      {
        id: 'payTaxInfoNav',
        label: 'Pay/Tax Info',
        url: '/pay-tax-info',
        accessible: false,
      },
      {
        id: 'bankInfoNav',
        label: 'Bank Info',
        url: '/bank-info',
        accessible: false,
      },
      {
        id: 'reviewNav',
        label: 'Review',
        url: '/review',
        accessible: false,
      },
    ],
    currentPage: 0,
    reviewAccessible: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.value;
    },
    setPageAccessibility: (state, action) => {
      state.pages[action.payload.index].accessible = action.payload.value;
    },
    setReviewAccess: (state, action) => {
      state.reviewAccessible = action.payload.value;
    },
  },
});

export const { setCurrentPage, setPageAccessibility, setReviewAccess } =
  navigationSlice.actions;

export default navigationSlice.reducer;
