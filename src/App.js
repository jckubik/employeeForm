import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavRow from './Components/NavRow';
import BottomRow from './Components/BottomRow';
import FormTitleRow from './Components/FormTitleRow';
import './App.css';
import PrivacyVersionRow from './Components/PrivacyVersionRow/PrivacyVersionRow';
import EmployeeInfoTab from './Components/EmployeeInfoTab/EmployeeInfoTab';
import PayTaxInfoTab from './Components/PayTaxInfoTab/PayTaxInfoTab';
import BankInfoTab from './Components/BankInfoTab/BankInfoTab';
import ReviewTab from './Components/ReviewTab/ReviewTab';

function App() {
  return (
    <div id="pageContainer">
      <FormTitleRow />
      <div id="formContainer">
        <NavRow />
        <Routes>
          <Route path="/" element={<EmployeeInfoTab />} />
          <Route path="pay-tax-info" element={<PayTaxInfoTab />} />
          <Route path="bank-info" element={<BankInfoTab />} />
          <Route path="review" element={<ReviewTab />} />
        </Routes>
        <BottomRow />
        <PrivacyVersionRow />
      </div>
    </div>
  );
}

export default App;
