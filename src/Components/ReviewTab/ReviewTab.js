/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { setCurrentPage, setReviewAccess } from '../../Slices/navigationSlice';

const ReviewTab = () => {
  const dispatch = useDispatch();
  const employeeInfo = useSelector((state) => state.employeeInfo);
  const payTaxInfo = useSelector((state) => state.payTaxInfo);
  const bankInfo = useSelector((state) => state.bankInfo);
  const navigation = useSelector((state) => state.navigation);

  const [employeeInfoLabels, setEmployeeInfoLabels] = useState({
    workerType: 'Worker Type',
    firstName: 'First Name',
    middleInitial: 'Middle Initials',
    lastName: 'Last Name',
    companyName: 'Company Name',
    employeeStatus: 'Employee Status',
    terminationDate: 'Termination Date',
    address1: 'Address 1',
    address2: 'Address 2',
    zip: 'Zip',
    state: 'State',
    city: 'City',
    country: 'Country',
    workedInState: 'Worked In State',
    occupationalCode: 'Occupational Code',
    email: 'Email Address',
    ssnTin:
      employeeInfo.workerType === 'W-2' ? 'Social Security Number' : 'TIN',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    hireDate: 'Date of Hire',
  });
  const [payTaxInfoLabels, setPayTaxInfoLabels] = useState({
    payRate: 'Pay rate',
    payAmount: 'Pay Amount',
    standardHours: 'Standard Hours',
    payFrequency: 'Pay Frequenc',
    basisOfPay: 'Basis of Pay',
    ownerOfficer: 'Owner/Officer',
    departmentNumber: 'Department Number',
    departmentName: 'Department Name',
    w42020: '2020 W-4',
    federalFilingStatus: 'Federal Filing Status',
    fedIncomeTax: 'Fed Income Tax (FIT)',
    numberFederalAllowances: 'Number of Allowances',
    otherIncome: 'Other Income',
    fedTaxOverride: 'Fed Tax Override',
    fedTaxOverrideAmount: 'Fed Tax Override Amount',
    deductions: 'Deductions',
    claimDependents: 'Claim Dependents',
    extraWithholding: 'Extra Withholding',
    fedUnemploymentTaxExempt: 'Fed Unemployment Tax (FUTA) Exempt',
    medicareExempt: 'Medicare Exempt',
    socialSecurityExempt: 'Social Security Exempt',
    multipleJobsSpouseWorks: 'Multiple jobs or spouse works',
    stateFilingStatus: 'State Filing Status',
    stateIncomeTax: 'State Income Tax (SIT)',
    numberStateAllowances: 'Number of Allowances',
    stateTaxOverride: 'State Tax Override',
    stateTaxOverrideAmount: 'State Tax Override Amount',
    countyCode: 'County Code',
    arizonaWithholding: 'Arizona Withholding',
    workersCompClassCode: "Worker's Comp Class Code",
    stateUnemploymentTaxExempt: 'State Unemployment Tax (SUI) Exempt',
    workersCompExempt: "Worker's Comp Exempt",
  });
  const [bankInfoLabels, setBankInfoLabels] = useState({
    enableDirectDeposit: 'Enable Direct Deposit',
    bankRoutingNumber1: 'Account 1 Routing Number',
    bankAccountNumber1: 'Account 1 Account Number',
    accountType1: 'Account 1 Type',
    depositAmount1: 'Account 1 Deposit Amount',
    partialType: 'Partial Type',
    partialAmount: 'Parital Amount',
    bankRoutingNumber2: 'Account 2 Routing Number',
    bankAccountNumber2: 'Account 2 Account Number',
    accountType2: 'Account 2 Type',
    depositAmount2: 'Account 2 Deposit Amount',
  });

  // Set currentPage on page load
  useEffect(() => {
    dispatch(setCurrentPage({ value: 3 }));

    // Grant permanent access to the review tab once user navigates to Review tab for first time
    if (!navigation.reviewAccess) {
      dispatch(setReviewAccess({ value: true }));
    }
  }, []);

  return (
    <Form className="form">
      <hr />
      <Row>
        {/* Employee Info Table */}
        <Col md={3}>
          <Table size="sm">
            <tbody>
              <tr className="tableHeader">
                <td>Employee Info</td>
                <td />
              </tr>
              {Object.keys(employeeInfo)
                .filter(
                  (key) =>
                    key !== 'validityStatus' &&
                    key !== 'requiredFieldsStatus' &&
                    key !== 'allValid' &&
                    key !== 'allRequired'
                )
                .map((key) => {
                  let input = employeeInfo[key];
                  if (typeof input === 'boolean') {
                    input = input ? 'True' : 'False';
                  }

                  return (
                    <tr>
                      <td>{employeeInfoLabels[key]}</td>
                      <td>
                        <strong>{input}</strong>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <div className="reviewEditButtons">
            <Link to="/">
              <Button
                size="sm"
                type="button"
                variant="secondary"
                className="earningsDeductionsButton"
              >
                Edit
              </Button>
            </Link>
          </div>
        </Col>

        {/* Pay Info Table */}
        <Col>
          <Table size="sm">
            <tbody>
              <tr className="tableHeader">
                <td>Pay Info</td>
                <td />
              </tr>
              {Object.keys(payTaxInfo)
                .filter(
                  (key) =>
                    key !== 'earningsDeductions' &&
                    key !== 'validityStatus' &&
                    key !== 'requiredFieldsStatus' &&
                    key !== 'allValid' &&
                    key !== 'allRequired'
                )
                .map((key) => {
                  let input = payTaxInfo[key];
                  if (typeof input === 'boolean') {
                    input = input ? 'True' : 'False';
                  }

                  return (
                    <tr>
                      <td>{payTaxInfoLabels[key]}</td>
                      <td>
                        <strong>{input}</strong>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <div className="reviewEditButtons">
            <Link to="/pay-tax-info">
              <Button
                size="sm"
                type="button"
                variant="secondary"
                className="earningsDeductionsButton"
              >
                Edit
              </Button>
            </Link>
          </div>
        </Col>

        {/* Bank Info Table */}
        <Col md={3}>
          <Table size="sm">
            <tbody>
              <tr className="tableHeader">
                <td>Bank Info</td>
                <td />
              </tr>
              {Object.keys(bankInfo)
                .filter((key) => {
                  if (bankInfo.depositAmount1 === 'Full') {
                    return (
                      key !== 'validityStatus' &&
                      key !== 'requiredFieldsStatus' &&
                      key !== 'allValid' &&
                      key !== 'allRequired' &&
                      key !== 'partialType' &&
                      key !== 'partialAmount' &&
                      key !== 'bankRoutingNumber2' &&
                      key !== 'bankAccountNumber2' &&
                      key !== 'accountType2' &&
                      key !== 'depositAmount2'
                    );
                  }

                  return (
                    key !== 'validityStatus' &&
                    key !== 'requiredFieldsStatus' &&
                    key !== 'allValid' &&
                    key !== 'allRequired'
                  );
                })
                .map((key) => {
                  let input = bankInfo[key];
                  if (typeof input === 'boolean') {
                    input = input ? 'True' : 'False';
                  }

                  return (
                    <tr>
                      <td>{bankInfoLabels[key]}</td>
                      <td>
                        <strong>{input}</strong>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <div className="reviewEditButtons">
            <Link to="/bank-info">
              <Button
                size="sm"
                type="button"
                variant="secondary"
                className="earningsDeductionsButton"
              >
                Edit
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
      <hr />

      <Row>
        {/* Earnings/Deductions Tables */}
        <Col>
          <Table size="sm">
            <tbody>
              <tr className="tableHeader">
                <td>Earnings</td>
                <td>Deductions</td>
              </tr>
              <td>
                {/* Earnings Table */}
                <Table size="sm">
                  <tbody>
                    <tr>
                      <th>Description</th>
                      <th>Type</th>
                      <th>Amount</th>
                    </tr>
                    {payTaxInfo.earningsDeductions
                      .filter((obj) => obj.earningsDescription !== 'empty')
                      .map((obj) => (
                        <tr>
                          <td>{obj.earningsDescription}</td>
                          <td>{obj.earningsType}</td>
                          <td>{obj.earningsAmount}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </td>
              <td>
                {/* Deductions Table */}
                <Table size="sm">
                  <tbody>
                    <tr>
                      <th>Description</th>
                      <th>Type</th>
                      <th>Amount</th>
                    </tr>
                    {payTaxInfo.earningsDeductions
                      .filter((obj) => obj.deductionDescription !== 'empty')
                      .map((obj) => (
                        <tr>
                          <td>{obj.deductionDescription}</td>
                          <td>{obj.deductionType}</td>
                          <td>{obj.deductionAmount}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </td>
            </tbody>
          </Table>
          <div className="reviewEditButtons">
            <HashLink to="/pay-tax-info#earningsDeductionsRow">
              <Button
                size="sm"
                type="button"
                variant="secondary"
                className="earningsDeductionsButton"
              >
                Edit
              </Button>
            </HashLink>
          </div>
        </Col>

        {/* Local Tax Table */}
        <Col>
          <Table size="sm">
            <tbody>
              <tr className="tableHeader">
                <td>Local Tax</td>
                <td />
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <th>Local</th>
                <th>Tax Type</th>
                <th>Local Name</th>
                <th>Tax Status</th>
                <th>%WorkedIn</th>
              </tr>
            </tbody>
          </Table>
          <div className="reviewEditButtons">
            <Link to="#">
              <Button
                size="sm"
                type="button"
                variant="secondary"
                className="earningsDeductionsButton"
                disabled
              >
                Edit
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default ReviewTab;
