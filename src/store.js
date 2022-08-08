import { configureStore } from '@reduxjs/toolkit';
import employeeInfoReducer from './Slices/employeeInfoSlice';
import payTaxInfoReducer from './Slices/payTaxInfoSlice';
import bankInfoReducer from './Slices/bankInfoSlice';
import navigationReducer from './Slices/navigationSlice';

export default configureStore({
  reducer: {
    employeeInfo: employeeInfoReducer,
    payTaxInfo: payTaxInfoReducer,
    bankInfo: bankInfoReducer,
    navigation: navigationReducer,
  },
});
