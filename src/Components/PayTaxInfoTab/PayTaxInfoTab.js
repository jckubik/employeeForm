/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import {
  updateInfo,
  setValidityStatus,
  setRequiredFieldsStatus,
  addEarningsDeductions,
  newLineEarningsDeductions,
  removeLineEarningsDeductions,
} from '../../Slices/payTaxInfoSlice';
import { setCurrentPage } from '../../Slices/navigationSlice';

const PayTaxInfoTab = () => {
  const dispatch = useDispatch();
  const {
    payRate,
    payAmount,
    standardHours,
    payFrequency,
    basisOfPay,
    ownerOfficer,
    departmentNumber,
    departmentName,
    w42020,
    federalFilingStatus,
    fedIncomeTax,
    numberFederalAllowances,
    otherIncome,
    fedTaxOverride,
    fedTaxOverrideAmount,
    deductions,
    claimDependents,
    extraWithholding,
    fedUnemploymentTaxExempt,
    medicareExempt,
    socialSecurityExempt,
    multipleJobsSpouseWorks,
    stateFilingStatus,
    stateIncomeTax,
    numberStateAllowances,
    stateTaxOverride,
    stateTaxOverrideAmount,
    countyCode,
    arizonaWithholding,
    workersCompClassCode,
    stateUnemploymentTaxExempt,
    workersCompExempt,
    earningsDeductions,
    validityStatus,
    requiredFieldsStatus,
  } = useSelector((state) => state.payTaxInfo);
  const { workerType, workedInState } = useSelector(
    (state) => state.employeeInfo
  );
  const livedInState = useSelector((state) => state.employeeInfo.state);

  const [labelPayRate, setLabelPayRate] = useState('Pay rate');
  const [labelPayAmount, setLabelPayAmount] = useState(
    'Pay Amount* (xxxxxxx.xx)'
  );
  const [labelStandardHours, setLabelStandardHours] =
    useState('Standard Hours');
  const [labelPayFrequency, setLabelPayFrequency] = useState('Pay Frequency *');
  const [labelPayBasis, setLabelPayBasis] = useState('Basis of Pay');
  const [labelOwnerOfficer, setLabelOwnerOfficer] = useState('Owner/Officer');
  const [labelDepartmentNumber, setLabelDepartmentNumber] =
    useState('Department Number');
  const [labelDepartmentName, setLabelDepartmentName] =
    useState('Department Name');
  const [labelW42020, setLabelW42020] = useState('2020 W-4');
  const [labelFederalFilingStatus, setLabelFederalFilingStatus] = useState(
    'Federal Filing Status'
  );
  const [labelFedIncomeTax, setLabelFedIncomeTax] = useState(
    'Fed Income Tax (FIT)'
  );
  const [labelNumberFederalAllowances, setLabelNumberFederalAllowances] =
    useState('Number of Allowances (xx)');
  const [labelOtherIncome, setLabelOtherIncome] = useState('Other Income');
  const [labelFedTaxOverride, setLabelFedTaxOverride] =
    useState('Fed Tax Override');
  const [labelFedTaxOverrideAmount, setLabelFedTaxOverrideAmount] = useState(
    'Fed Tax Override Amount'
  );
  const [labelDeductions, setLabelDeductions] = useState('Deductions');
  const [labelClaimDependents, setLabelClaimDependents] =
    useState('Claim Dependents');
  const [labelExtraWithholding, setLabelExtraWithholding] =
    useState('Extra Withholding');
  const [labelFedUnemploymentTaxExempt, setLabelFedUnemploymentTaxExempt] =
    useState('Fed Unemployment Tax (FUTA) Exempt');
  const [labelMedicareExempt, setLabelMedicareExempt] =
    useState('Medicare Exempt');
  const [labelSocialSecurityExempt, setLabelSocialSecurityExempt] = useState(
    'Social Security Exempt'
  );
  const [labelMultipleJobsSpouseWorks, setLabelMultipleJobsSpouseWorks] =
    useState('Multiple jobs or spouse works');
  const [labelStateFilingStatus, setLabelStateFilingStatus] = useState(
    'State Filing Status'
  );
  const [labelStateIncomeTax, setLabelStateIncomeTax] = useState(
    'State Income Tax (SIT)'
  );
  const [labelNumberStateAllowances, setLabelNumberStateAllowances] = useState(
    'Number of Allowances (xx)'
  );
  const [labelStateTaxOverride, setLabelStateTaxOverride] =
    useState('State Tax Override');
  const [labelStateTaxOverrideAmount, setLabelStateTaxOverrideAmount] =
    useState('State Tax Override Amount');
  const [labelCountyCode, setLabelCountyCode] = useState('County Code');
  const [labelArizonaWithholding, setLabelArizonaWithholding] = useState(
    'Arizona Withholding'
  );
  const [labelWorkersCompClassCode, setLabelWorkersCompClassCode] = useState(
    "Worker's Comp Class Code"
  );
  const [labelStateUnemploymentTaxExempt, setLabelStateUnemploymentTaxExempt] =
    useState('State Unemployment Tax (SUI) Exempt');
  const [labelWorkersCompExempt, setLabelWorkersCompExempt] = useState(
    "Worker's Comp Exempt"
  );
  const [labelEarningsDescription, setLabelEarningsDescription] = useState(
    'Earnings Description'
  );
  const [labelEarningsType, setLabelEarningsType] = useState('Type');
  const [labelEarningsAmount, setLabelEarningsAmount] = useState('Amount');
  const [labelDeductionDescription, setLabelDeductionDescription] = useState(
    'Deduction Description'
  );
  const [labelDeductionType, setLabelDeductionType] = useState('Type');
  const [labelDeductionAmount, setLabelDeductionAmount] = useState('Amount');
  const [isEnableCompClassCode, setIsEnableCompClassCode] = useState(
    !!(
      !workersCompExempt &&
      workedInState !== '' &&
      (workedInState === 'WY' || workedInState === 'WA') &&
      workerType === 'W-2'
    )
  );

  const payRateTypes = [
    {
      value: 'Salary',
      label: 'Salary',
    },
    {
      value: 'Hourly',
      label: 'Hourly',
    },
  ];
  const payFrequencies = [
    {
      value: '',
      label: 'Select',
    },
    {
      value: 'Weekly',
      label: 'Weekly',
    },
    {
      value: 'Biweekly',
      label: 'Biweekly',
    },
    {
      value: 'Semi-Monthly',
      label: 'Semi-Monthly',
    },
    {
      value: 'Monthly',
      label: 'Monthly',
    },
    {
      value: 'Quarterly',
      label: 'Quarterly',
    },
    {
      value: 'Annually',
      label: 'Annually',
    },
  ];
  const basisOfPays = [
    {
      value: 'Same as pay type',
      label: 'Same as pay type',
    },
    {
      value: 'Daily',
      label: 'Daily',
    },
    {
      value: 'Piece',
      label: 'Piece',
    },
    {
      value: 'Shift',
      label: 'Shift',
    },
    {
      value: 'Commission',
      label: 'Commission',
    },
  ];
  const federalFilingStatusTypes = [
    {
      value: 'Single',
      label: 'Single or married but filing separately',
    },
    {
      value: 'Married',
      label: 'Married filing jointly (or qualified widower)',
    },
    {
      value: 'Head of Household',
      label: 'Head of Household',
    },
  ];
  const federalFilingStatusAlt = [
    {
      value: 'Single',
      label: 'Single',
    },
    {
      value: 'Married',
      label: 'Married',
    },
    {
      value: 'Married - at a higher rate',
      label: 'Married - at a higher rate',
    },
  ];
  const fedIncomeTaxExemptions = [
    {
      value: 'Not Exempt',
      label: 'Not Exempt',
    },
    {
      value: 'Exempt from Tax',
      label: 'Exempt from Tax',
    },
    {
      value: 'Exempt from Withholding',
      label: 'Exempt from Withholding',
    },
  ];
  const fedTaxOverrides = [
    {
      value: '',
      label: 'Select',
    },
    {
      value: 'Additional Amount Withheld',
      label: 'Additional Amount Withheld',
    },
    {
      value: 'Additional Percentage Withheld',
      label: 'Additional Percentage Withheld',
    },
    {
      value: 'Flat $ Amount',
      label: 'Flat $ Amount',
    },
    {
      value: 'Flat % Amount',
      label: 'Flat % Amount',
    },
  ];
  const row2Checkboxes = [
    {
      id: 'fedUnemploymentTaxExempt',
      label: labelFedUnemploymentTaxExempt,
      value: fedUnemploymentTaxExempt,
      callback: () => {
        dispatch(
          updateInfo({
            value: !fedUnemploymentTaxExempt,
            field: 'fedUnemploymentTaxExempt',
          })
        );
      },
    },
    {
      id: 'medicareExempt',
      label: labelMedicareExempt,
      value: medicareExempt,
      callback: () => {
        dispatch(
          updateInfo({ value: !medicareExempt, field: 'medicareExempt' })
        );
      },
    },
    {
      id: 'socialSecurityExempt',
      label: labelSocialSecurityExempt,
      value: socialSecurityExempt,
      callback: () => {
        dispatch(
          updateInfo({
            value: !socialSecurityExempt,
            field: 'socialSecurityExempt',
          })
        );
      },
    },
    {
      id: 'multipleJobsSpouseWorks',
      label: labelMultipleJobsSpouseWorks,
      value: multipleJobsSpouseWorks,
      callback: () => {
        dispatch(
          updateInfo({
            value: !multipleJobsSpouseWorks,
            field: 'multipleJobsSpouseWorks',
          })
        );
      },
    },
  ];
  const row3Checkboxes = [
    {
      id: 'stateUnemploymentTaxExempt',
      label: labelStateUnemploymentTaxExempt,
      value: stateUnemploymentTaxExempt,
      callback: () => {
        dispatch(
          updateInfo({
            value: !stateUnemploymentTaxExempt,
            field: 'stateUnemploymentTaxExempt',
          })
        );
      },
    },
    {
      id: 'workersCompExempt',
      label: labelWorkersCompExempt,
      value: workersCompExempt,
      callback: () => {
        dispatch(
          updateInfo({ value: !workersCompExempt, field: 'workersCompExempt' })
        );
      },
    },
  ];
  const stateFilingStatusOptions = [
    {
      value: 'Single',
      label: 'Single',
    },
    {
      value: 'Married',
      label: 'Married',
    },
    {
      value: 'Married - at a higher rate',
      label: 'Married - at a higher rate',
    },
  ];
  const countyCodes = [
    { label: 'No County Selected', value: '' },
    { label: 'Allegany County', value: 'Allegany Count' },
    { label: 'Anne Arundel County', value: 'Anne Arundel County' },
    { label: 'Baltimore County', value: 'Baltimore County' },
    { label: 'Baltimore City', value: 'Baltimore City' },
    { label: 'Calvert County', value: 'Calvert County' },
    { label: 'Caroline County', value: 'Caroline County' },
    { label: 'Carroll County', value: 'Carroll County' },
    { label: 'Cecil County', value: 'Cecil County' },
    { label: 'Charles County', value: 'Charles County' },
    { label: 'Dorchester County', value: 'Dorchester County' },
    { label: 'Frederick County', value: 'Frederick County' },
    { label: 'Garrett County', value: 'Garrett County' },
    { label: 'Harford County', value: 'Harford County' },
    { label: 'Howard County', value: 'Howard County' },
    { label: 'Kent County', value: 'Kent County' },
    { label: 'Montgomery County', value: 'Montgomery County' },
    { label: "Prince George's County", value: "Prince George's County" },
    { label: "Queen Anne's County", value: "Queen Anne's County" },
    { label: "St Mary's County", value: "St Mary's County" },
    { label: 'Somerset County', value: 'Somerset County' },
    { label: 'Talbot County', value: 'Talbot County' },
    { label: 'Washington County', value: 'Washington County' },
    { label: 'Wicomico County', value: 'Wicomico County' },
    { label: 'Worcester County', value: 'Worcester County' },
    { label: 'Non resident (No county)', value: 'Non Resident' },
    {
      label: 'MD resident works in Delaware',
      value: 'MD resident works in Delaware',
    },
  ];
  const arizonaWithholdings = [
    {
      value: '',
      label: 'A-4 not submitted',
    },
    {
      value: '5.1%',
      label: '5.1% withholding',
    },
    {
      value: '4.2%',
      label: '4.2% withholding',
    },
    {
      value: '3.6%',
      label: '3.6% withholding',
    },
    {
      value: '2.7%',
      label: '2.7% withholding',
    },
    {
      value: '1.8%',
      label: '1.8% withholding',
    },
    {
      value: '1.3%',
      label: '1.3% withholding',
    },
    {
      value: '0.8%',
      label: '0.8% withholding',
    },
  ];
  const workersCompClassCodes = [
    {
      value: '',
      label: 'Select Comp Class Code',
    },
  ];
  const earningsDescriptions = [
    {
      value: '',
      label: 'Select',
    },
    {
      value: 'S Corp 2 Percent Medical Plan',
      label: 'S Corp 2 Percent Medical Plan',
    },
    {
      value: 'Mileage Reimbursement Non-taxable',
      label: 'Mileage Reimbursement Non-taxable',
    },
    {
      value: 'Phone Reimbursement Non-taxable',
      label: 'Phone Reimbursement Non-taxable',
    },
    {
      value: 'Clergy Housing Paid Non-taxable',
      label: 'Clergy Housing Paid Non-taxable',
    },
    {
      value: 'Clergy Housing Not Paid Non-taxable',
      label: 'Clergy Housing Not Paid Non-taxable',
    },
    {
      value: 'Other',
      label: 'Other',
    },
  ];
  const earningsTypes = [
    {
      value: '',
      label: 'Select',
    },
    {
      value: 'Amount',
      label: 'Amount',
    },
    {
      value: 'Hours',
      label: 'Hours',
    },
  ];
  const deductionDescriptions = [
    {
      value: '',
      label: 'Select',
    },
    {
      value: 'Medical Insurance pre tax',
      label: 'Medical Insurance pre tax',
    },
    {
      value: 'Dental Insurance pre tax',
      label: 'Dental Insurance pre tax',
    },
    {
      value: 'Medical Insurance post tax',
      label: 'Medical Insurance post tax',
    },
    {
      value: 'Child support garnishment',
      label: 'Child support garnishment',
    },
    {
      value: '401k plan',
      label: '401k plan',
    },
    {
      value: 'Simple IRA',
      label: 'Simple IRA',
    },
    {
      value: 'Other',
      label: 'Other',
    },
  ];
  const deductionTypes = [
    {
      value: '',
      label: 'Select',
    },
    {
      value: 'Amount',
      label: 'Amount',
    },
    {
      value: 'Percentage',
      label: 'Percentage',
    },
  ];

  // Test the validity of the input field
  const inputValidation = (event, field, required, regExp) => {
    let valid = true;
    let exists = true;
    // If the field is required and doesn't exist OR
    // If the regExp matches, then input is invalid
    if ((required && !event.target.value) || !regExp.test(event.target.value)) {
      valid = false;
      exists = false;
    }

    // Set the status of the field - valid or invalid
    dispatch(setValidityStatus({ field: [field], value: valid }));
    if (field === 'payAmount' || field === 'payFrequency') {
      dispatch(setRequiredFieldsStatus({ field: [field], value: exists }));
    }
  };

  // Set class for input if invalid
  const setInvalidField = (field, type) =>
    !validityStatus[field] ? `validationError${type}` : '';

  // Update an object within the earningsDeductions state
  // const updateEarningsDeductionObjects = (toUpdate, event, property) => {
  //   setEarningsDeductions((current) =>
  //     // Map over each object in the state array
  //     // If the object is the one we're looking for, update the property
  //     current.map((object) => {
  //       if (object.id === toUpdate.id) {
  //         return {
  //           ...object,
  //           [property]: event.target.value,
  //         };
  //       }

  //       // Returns the new updated object to be put into state
  //       return object;
  //     })
  //   );
  // };

  // If one exists, then the other must as well
  useEffect(() => {
    let departmentNumberValid = true;
    let departmentNameValid = true;

    // If deptartmentNumber exists and departmentName doesn't, mark invalid
    if (
      departmentNumber &&
      departmentNumber !== '' &&
      (!departmentName || departmentName === '')
    ) {
      departmentNameValid = false;
    }

    // If deptartmentName exists and departmentNumber doesn't, mark invalid
    if (
      departmentName &&
      departmentName !== '' &&
      (!departmentNumber || departmentNumber === '')
    ) {
      departmentNumberValid = false;
    }

    if (
      departmentName &&
      departmentName !== '' &&
      departmentNumber &&
      departmentNumber !== ''
    ) {
      departmentNameValid = true;

      if (!/^[0-9a-zA-Z]*$/.test(departmentNumber)) {
        departmentNumberValid = false;
      }
    }
    dispatch(
      setValidityStatus({
        field: departmentNumber,
        value: departmentNumberValid,
      })
    );
    dispatch(
      setValidityStatus({ field: departmentName, value: departmentNameValid })
    );
  }, [departmentNumber, departmentName]);

  // Checks to see if all required inputs exist and all fields are valid
  useEffect(() => {
    const required = Object.values(requiredFieldsStatus).every(
      (value) => value
    );
    const valid = Object.values(validityStatus).every((value) => value);
    dispatch(updateInfo({ value: required, field: 'allRequired' }));
    dispatch(updateInfo({ value: valid, field: 'allValid' }));
  }, [requiredFieldsStatus, validityStatus]);

  // Set currentPage on page load
  useEffect(() => {
    dispatch(setCurrentPage({ value: 1 }));
    console.log('setting currentPAge to 1');
  }, []);

  return (
    <Form className="form">
      <hr />

      {/* Row 1 - required field info text */}
      <Row>
        <Col md={{ offset: 10 }}>
          <Form.Text column="sm">* Denotes Required Field</Form.Text>
        </Col>
      </Row>

      {/* Row 2 - payRate, payAmount, standardHours, payFrequency, payBasis, ownerOfficer, departmentNumber, departmentName */}
      <Row>
        <Row>
          <Col md={2}>
            <Form.Group controlId="formPayRate">
              <Form.Label column="sm">{labelPayRate}</Form.Label>
              <br />
              {payRateTypes.map((radio) => (
                <Form.Check
                  inline
                  label={radio.label}
                  size="sm"
                  name="payRate"
                  type="radio"
                  value={radio.value}
                  key={`payRate-radio-${radio.value}`}
                  id={`payRate-radio-${radio.value}`}
                  onClick={(event) => {
                    dispatch(
                      updateInfo({
                        value: event.target.value,
                        field: 'payRate',
                      })
                    );
                  }}
                  defaultChecked={payRate === radio.value}
                />
              ))}
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="formPayAmount">
              <Form.Label
                column="sm"
                className={setInvalidField('payAmount', 'Text')}
              >
                {labelPayAmount}
              </Form.Label>
              <InputGroup size="sm">
                <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="00.00"
                  maxLength="10"
                  value={payAmount}
                  className={setInvalidField('payAmount', 'Input')}
                  onChange={(event) => {
                    dispatch(
                      updateInfo({
                        value: event.target.value,
                        field: 'payAmount',
                      })
                    );
                    inputValidation(
                      event,
                      'payAmount',
                      true,
                      /^\d+(\.\d{1,2})?$/
                    );
                  }}
                  onBlur={(event) => {
                    inputValidation(
                      event,
                      'payAmount',
                      true,
                      /^\d+(\.\d{1,2})?$/
                    );
                  }}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Form.Group controlId="formStandardHours">
              <Form.Label column="sm">{labelStandardHours}</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="00"
                maxLength="5"
                value={standardHours}
                onChange={(event) => {
                  dispatch(
                    updateInfo({
                      value: event.target.value,
                      field: 'standardHours',
                    })
                  );
                }}
                disabled={workerType !== '1099'}
              />
            </Form.Group>
          </Col>
          <Col md={{ offset: 1, span: 2 }}>
            <Form.Group controlId="formPayFrequency">
              <Form.Label column="sm">{labelPayFrequency}</Form.Label>
              <Form.Select
                size="sm"
                onChange={(event) => {
                  dispatch(
                    updateInfo({
                      value: event.target.value,
                      field: 'payFrequency',
                    })
                  );
                  const exists = event.target.value !== '';
                  dispatch(
                    setRequiredFieldsStatus({
                      field: 'payFrequency',
                      value: exists,
                    })
                  );
                }}
                defaultValue={payFrequency}
              >
                {payFrequencies.map((frequency) => (
                  <option value={frequency.value}>{frequency.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="formPayBasis">
              <Form.Label column="sm">{labelPayBasis}</Form.Label>
              <Form.Select
                size="sm"
                onChange={(event) => {
                  dispatch(
                    updateInfo({
                      value: event.target.value,
                      field: 'basisOfPay',
                    })
                  );
                }}
                defaultValue={basisOfPay}
              >
                {basisOfPays.map((basis) => (
                  <option value={basis.value}>{basis.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={{ span: 1 }}>
            <Form.Group id="formOwnerOfficer" controlId="formOwnerOfficer">
              <Form.Check
                label={labelOwnerOfficer}
                size="sm"
                name="ownerOfficer"
                type="checkbox"
                id="ownerOfficer-check"
                onClick={(event) => {
                  dispatch(
                    updateInfo({
                      value: event.target.value,
                      field: 'ownerOfficer',
                    })
                  );
                }}
                defaultChecked={ownerOfficer}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <Form.Group controlId="formDepartmentNumber">
              <Form.Label
                column="sm"
                className={setInvalidField('departmentNumber', 'Text')}
              >
                {labelDepartmentNumber}
              </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Text"
                maxLength="6"
                value={departmentNumber}
                className={setInvalidField('departmentNumber', 'Input')}
                onChange={(event) => {
                  dispatch(
                    updateInfo({
                      value: event.target.value,
                      field: 'departmentNumber',
                    })
                  );
                  inputValidation(
                    event,
                    'departmentNumber',
                    false,
                    /^[0-9a-zA-Z]*$/
                  );
                }}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="formDepartmentName">
              <Form.Label
                column="sm"
                className={setInvalidField('departmentName', 'Text')}
              >
                {labelDepartmentName}
              </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Text"
                value={departmentName}
                className={setInvalidField('departmentName', 'Input')}
                onChange={(event) => {
                  dispatch(
                    updateInfo({
                      value: event.target.value,
                      field: 'departmentName',
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Row>
      <hr />

      {/* Row 3 - w42020, W-4 download, "other adjustments" */}
      <Row>
        <Col md={1}>
          <Form.Group id="formW42020" controlId="formW42020">
            <Form.Check
              label={labelW42020}
              size="sm"
              name="w42020"
              type="checkbox"
              id="w42020-check"
              onClick={(event) => {
                dispatch(updateInfo({ value: !w42020, field: 'w42020' }));
              }}
              defaultChecked={w42020}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <a
            id="w4FormDownloadLink"
            href="https://www.irs.gov/pub/irs-pdf/fw4.pdf"
            download
            target="_blank"
            rel="noreferrer noopener"
          >
            Download W-4 Form
          </a>
        </Col>
        <Col md={{ offset: 4 }}>
          <Form.Text>Other Adjustments</Form.Text>
        </Col>
      </Row>

      {/* Row 4 - federalFilingStatus, fedIncomeTax, fedTaxOverride, claimDependents, numberFedAllowances, fedTaxOverrideAmount, otherIncome, deductions, extraWithholding, fedUnemploymentTaxExempt, medicareExempt, socialSecurityExempt, multipleJobsSpouseWorks */}
      <Row>
        <Col>
          <Form.Label column="sm">{labelFederalFilingStatus}</Form.Label>
          <br />
          {(w42020 ? federalFilingStatusTypes : federalFilingStatusAlt).map(
            (radio) => (
              <Form.Group controlId={`form${radio.value}`}>
                <Form.Check
                  inline
                  label={radio.label}
                  size="sm"
                  name="federalFilingStatus"
                  type="radio"
                  value={radio.value}
                  id={`FederalFilingStatus-radio-${radio.value}`}
                  onClick={(event) => {
                    dispatch(
                      updateInfo({
                        value: event.target.value,
                        field: 'federalFilingStatus',
                      })
                    );
                  }}
                  defaultChecked={federalFilingStatus === radio.value}
                />
              </Form.Group>
            )
          )}
        </Col>
        <Col md={2}>
          <Row>
            <Col>
              <Form.Label column="sm">{labelFedIncomeTax}</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFedIncomeTax">
                <Form.Select
                  size="sm"
                  onChange={(event) => {
                    dispatch(
                      updateInfo({
                        value: event.target.value,
                        field: 'fedIncomeTax',
                      })
                    );
                  }}
                  defaultValue={fedIncomeTax}
                >
                  {fedIncomeTaxExemptions.map((exemption) => (
                    <option value={exemption.value}>{exemption.label}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label column="sm">{labelFedTaxOverride}</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFedTaxOverride">
                <Form.Select
                  size="sm"
                  onChange={(event) => {
                    dispatch(
                      updateInfo({
                        value: event.target.value,
                        field: 'fedTaxOverride',
                      })
                    );
                  }}
                  defaultValue={fedTaxOverride}
                  disabled={w42020 || fedIncomeTax === 'Exempt from Tax'}
                >
                  {fedTaxOverrides.map((override) => (
                    <option value={override.value}>{override.label}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label
                column="sm"
                className={setInvalidField('claimDependents', 'Text')}
              >
                {labelClaimDependents}
              </Form.Label>
              <p className="referenceInfoUnder">Step 3 on W-4</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formClaimDependents">
                <InputGroup size="sm">
                  <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="0"
                    maxLength="10"
                    value={claimDependents}
                    className={setInvalidField('claimDependents', 'Input')}
                    onChange={(event) => {
                      dispatch(
                        updateInfo({
                          value: event.target.value,
                          field: 'claimDependents',
                        })
                      );
                      inputValidation(
                        event,
                        'claimDependents',
                        false,
                        /^\d*(\.\d{1,2})?$/
                      );
                    }}
                    disabled={!w42020}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Col>
        <Col md={2}>
          <Row>
            <Col>
              <Form.Label column="sm">
                {labelNumberFederalAllowances}
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formNumberFederalAllowances">
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="00"
                  maxLength="2"
                  value={numberFederalAllowances}
                  onChange={(event) => {
                    if (!/\D/.test(event.target.value)) {
                      dispatch(
                        updateInfo({
                          value: event.target.value,
                          field: 'numberFederalAllowances',
                        })
                      );
                    }
                  }}
                  disabled={w42020 || fedIncomeTax === 'Exempt from Tax'}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label
                column="sm"
                className={setInvalidField('fedTaxOverrideAmount', 'Text')}
              >
                {labelFedTaxOverrideAmount}
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFedTaxOverrideAmount">
                <InputGroup size="sm">
                  <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="00.00"
                    maxLength="10"
                    value={fedTaxOverrideAmount}
                    className={setInvalidField('fedTaxOverrideAmount', 'Input')}
                    onChange={(event) => {
                      dispatch(
                        updateInfo({
                          value: event.target.value,
                          field: 'fedTaxOverrideAmount',
                        })
                      );
                      inputValidation(
                        event,
                        'fedTaxOverrideAmount',
                        false,
                        /^\d*(\.\d{1,2})?$/
                      );
                    }}
                    disabled={
                      fedTaxOverride === '' ||
                      fedIncomeTax === 'Exempt from Tax'
                    }
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Col>
        <Col md={2}>
          <Row>
            <Col>
              <Form.Label
                column="sm"
                className={setInvalidField('otherIncome', 'Text')}
              >
                {labelOtherIncome}
              </Form.Label>
              <p className="referenceInfoUnder">Step 4a on W-4</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formOtherIncome">
                <InputGroup size="sm">
                  <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="00.00"
                    maxLength="20"
                    value={otherIncome}
                    className={setInvalidField('otherIncome', 'Input')}
                    onChange={(event) => {
                      dispatch(
                        updateInfo({
                          value: event.target.value,
                          field: 'otherIncome',
                        })
                      );
                      inputValidation(
                        event,
                        'otherIncome',
                        false,
                        /^\d*(\.\d{1,2})?$/
                      );
                    }}
                    disabled={!w42020}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label
                column="sm"
                className={setInvalidField('deductions', 'Text')}
              >
                {labelDeductions}
              </Form.Label>
              <p className="referenceInfoUnder">Step 4b on W-4</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formDeductions">
                <InputGroup size="sm">
                  <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="00.00"
                    maxLength="20"
                    value={deductions}
                    className={setInvalidField('deductions', 'Input')}
                    onChange={(event) => {
                      dispatch(
                        updateInfo({
                          value: event.target.value,
                          field: 'deductions',
                        })
                      );
                      inputValidation(
                        event,
                        'deductions',
                        false,
                        /^\d*(\.\d{1,2})?$/
                      );
                    }}
                    disabled={!w42020}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label
                column="sm"
                className={setInvalidField('extraWithholding', 'Text')}
              >
                {labelExtraWithholding}
              </Form.Label>
              <p className="referenceInfoUnder">Step 4c on W-4</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formExtraWithholding">
                <InputGroup size="sm">
                  <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="00.00"
                    value={extraWithholding}
                    maxLength="20"
                    className={setInvalidField('extraWithholding', 'Input')}
                    onChange={(event) => {
                      dispatch(
                        updateInfo({
                          value: event.target.value,
                          field: 'extraWithholding',
                        })
                      );
                      inputValidation(
                        event,
                        'extraWithholding',
                        false,
                        /^\d*(\.\d{1,2})?$/
                      );
                    }}
                    disabled={!w42020}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Col>
        <Col>
          {row2Checkboxes.map((checkbox) => (
            <Form.Group
              id={`form${checkbox.id}`}
              controlId={`form${checkbox.id}`}
            >
              <Form.Check
                label={checkbox.label}
                size="sm"
                name={checkbox.id}
                type="checkbox"
                id={checkbox.id}
                onClick={checkbox.callback}
                defaultChecked={checkbox.value}
                disabled={checkbox.id === 'multipleJobsSpouseWorks' && !w42020}
              />
              {checkbox.id === 'multipleJobsSpouseWorks' ? (
                <p
                  id="multipleJobsReferenceText"
                  className="referenceInfoUnder"
                >
                  Step 2c on W-4
                </p>
              ) : (
                ''
              )}
            </Form.Group>
          ))}
        </Col>
      </Row>
      <hr />

      {/* Row 5 - stateFiinfStatus, stateIncomeTax, numberStateAllowances, stateTaxOverride, stateTaxOVerrideAmount, stateUnemploymentTaxExempt, countyCode, arizonaWithholding, workersCompClassCode */}
      <Row>
        <Row>
          <Col md={2}>
            <Form.Group controlId="formStateFilingStatus">
              <Form.Label column="sm">{labelStateFilingStatus}</Form.Label>
              <Form.Select
                size="sm"
                onChange={(event) => {
                  dispatch(
                    updateInfo({
                      value: event.target.value,
                      field: 'stateFilingStatus',
                    })
                  );
                }}
                defaultValue={stateFilingStatus}
              >
                {stateFilingStatusOptions.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={{ offset: 1, span: 2 }}>
            <Form.Group controlId="formStateIncomeTax">
              <Form.Label column="sm">{labelStateIncomeTax}</Form.Label>
              <Form.Select
                size="sm"
                onChange={(event) => {
                  dispatch(
                    updateInfo({
                      value: event.target.value,
                      field: 'stateIncomeTax',
                    })
                  );
                }}
                defaultValue={stateIncomeTax}
              >
                {fedIncomeTaxExemptions.map((exemption) => (
                  <option value={exemption.value}>{exemption.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="formNumberStateAllowances">
              <Form.Label column="sm">{labelNumberStateAllowances}</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="00"
                maxLength="2"
                value={numberStateAllowances}
                onChange={(event) => {
                  if (!/\D/.test(event.target.value)) {
                    dispatch(
                      updateInfo({
                        value: event.target.value,
                        field: 'numberStateAllowances',
                      })
                    );
                  }
                }}
                disabled={
                  livedInState === 'CT' ||
                  (livedInState === 'AL' && stateFilingStatus === 'Single')
                }
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Row>
              <Form.Group controlId="formStateTaxOverride">
                <Form.Label column="sm">{labelStateTaxOverride}</Form.Label>
                <Form.Select
                  size="sm"
                  onChange={(event) => {
                    dispatch(
                      updateInfo({
                        value: event.target.value,
                        field: 'stateTaxOverride',
                      })
                    );
                  }}
                  defaultValue={stateTaxOverride}
                  disabled={stateIncomeTax === 'Exempt from Tax'}
                >
                  {fedTaxOverrides.map((override) => (
                    <option value={override.value}>{override.label}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="formStateTaxOverrideAmount">
                <Form.Label
                  column="sm"
                  className={setInvalidField('stateTaxOverrideAmount', 'Text')}
                >
                  {labelStateTaxOverrideAmount}
                </Form.Label>
                <InputGroup size="sm">
                  <InputGroup.Text id="basic-addon1">
                    {stateTaxOverride === 'additionalPercentageWithheld' ||
                    stateTaxOverride === 'flat%Amount'
                      ? '%'
                      : '$'}
                  </InputGroup.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="00.00"
                    maxLength="10"
                    value={stateTaxOverrideAmount}
                    className={setInvalidField(
                      'stateTaxOverrideAmount',
                      'Input'
                    )}
                    onChange={(event) => {
                      dispatch(
                        updateInfo({
                          value: event.target.value,
                          field: 'stateTaxOverrideAmount',
                        })
                      );
                      inputValidation(
                        event,
                        'stateTaxOverrideAmount',
                        false,
                        /^\d*(\.\d{1,2})?$/
                      );
                    }}
                    disabled={stateTaxOverride === ''}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
          </Col>
          <Col>
            {row3Checkboxes.map((checkbox) => (
              <Form.Group
                id={`form${checkbox.id}`}
                controlId={`form${checkbox.id}`}
              >
                <Form.Check
                  label={checkbox.label}
                  size="sm"
                  name={checkbox.id}
                  type="checkbox"
                  id={checkbox.id}
                  onClick={checkbox.callback}
                  defaultChecked={checkbox.value}
                />
              </Form.Group>
            ))}
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <Form.Group controlId="formCountyCode">
              <Form.Label column="sm">{labelCountyCode}</Form.Label>
              <Form.Select
                size="sm"
                onChange={(event) => {
                  dispatch(
                    updateInfo({
                      value: event.target.value,
                      field: 'countyCode',
                    })
                  );
                }}
                defaultValue={countyCode}
                disabled={livedInState !== 'MD'}
              >
                {countyCodes.map((code) => (
                  <option value={code.value}>{code.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="formArizonaWithholding">
              <Form.Label column="sm">{labelArizonaWithholding}</Form.Label>
              <Form.Select
                size="sm"
                onChange={(event) => {
                  dispatch(
                    updateInfo({
                      value: event.target.value,
                      field: 'arizonaWithholding',
                    })
                  );
                }}
                defaultValue={arizonaWithholding}
                disabled={livedInState !== 'AZ'}
              >
                {arizonaWithholdings.map((withholding) => (
                  <option value={withholding.value}>{withholding.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={{ offset: 1, span: 5 }}>
            <Form.Group controlId="formWorkersCompClassCode">
              <Form.Label column="sm">{labelWorkersCompClassCode}</Form.Label>
              <Form.Select
                size="sm"
                onChange={(event) => {
                  dispatch(
                    updateInfo({
                      value: event.target.value,
                      field: 'workersCompClassCode',
                    })
                  );
                }}
                defaultValue={workersCompClassCode}
                disabled={!isEnableCompClassCode}
              >
                {workersCompClassCodes.map((code) => (
                  <option value={code.value}>{code.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Row>
      <hr />

      {/* Row 6 - earningsDeductions */}
      <Row>
        <Row>
          <Form.Label column="sm">Earnings/Deductions</Form.Label>
          <Form.Text>
            Select per-pay earnings and deductions. Click Add Row to add
            multiple earnings deductions.
          </Form.Text>
        </Row>
        <Row>
          {earningsDeductions.map((object, index) => (
            <Row id="earningsDeductionsRow">
              <Col md={3}>
                <Form.Group controlId={`formEarningsDescriptions${index}`}>
                  <Form.Label column="sm">
                    {labelEarningsDescription}
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    onChange={(event) => {
                      dispatch(
                        addEarningsDeductions({
                          toUpdate: object,
                          property: 'earningsDescription',
                          value: event.target.value,
                        })
                      );
                    }}
                    defaultValue={object.earningsDescription}
                  >
                    {earningsDescriptions.map((choice) => (
                      <option value={choice.value}>{choice.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId={`formEarningsType${index}`}>
                  <Form.Label column="sm">{labelEarningsType}</Form.Label>
                  <Form.Select
                    size="sm"
                    onChange={(event) => {
                      dispatch(
                        addEarningsDeductions({
                          toUpdate: object,
                          property: 'earningsType',
                          value: event.target.value,
                        })
                      );
                    }}
                    defaultValue={object.earningsType}
                    disabled={object.earningsDescription === ''}
                  >
                    {earningsTypes.map((type) => (
                      <option value={type.value}>{type.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={1}>
                <Form.Group controlId={`formEarningsAmount${index}`}>
                  <Form.Label column="sm">{labelEarningsAmount}</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="00"
                    value={object.earningsAmount}
                    onChange={(event) => {
                      dispatch(
                        addEarningsDeductions({
                          toUpdate: object,
                          property: 'earningsAmount',
                          value: event.target.value,
                        })
                      );
                    }}
                    disabled={object.earningsDescription === ''}
                  />
                </Form.Group>
              </Col>
              <Col md={{ span: 3 }}>
                <Form.Group controlId={`formDeductionDescription${index}`}>
                  <Form.Label column="sm">
                    {labelDeductionDescription}
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    onChange={(event) => {
                      dispatch(
                        addEarningsDeductions({
                          toUpdate: object,
                          property: 'deductionDescription',
                          value: event.target.value,
                        })
                      );
                    }}
                    defaultValue={object.deductionDescription}
                  >
                    {deductionDescriptions.map((choice) => (
                      <option value={choice.value}>{choice.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId={`formDeductionType${index}`}>
                  <Form.Label column="sm">{labelDeductionType}</Form.Label>
                  <Form.Select
                    size="sm"
                    onChange={(event) => {
                      dispatch(
                        addEarningsDeductions({
                          toUpdate: object,
                          property: 'deductionType',
                          value: event.target.value,
                        })
                      );
                    }}
                    defaultValue={object.deductionType}
                    disabled={object.deductionDescription === ''}
                  >
                    {deductionTypes.map((type) => (
                      <option value={type.value}>{type.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={1}>
                <Form.Group controlId={`formDeductionAmount${index}`}>
                  <Form.Label column="sm">{labelDeductionAmount}</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="00"
                    value={object.deductionAmount}
                    onChange={(event) => {
                      dispatch(
                        addEarningsDeductions({
                          toUpdate: object,
                          property: 'deductionAmount',
                          value: event.target.value,
                        })
                      );
                    }}
                    disabled={object.deductionDescription === ''}
                  />
                </Form.Group>
              </Col>
            </Row>
          ))}
        </Row>
        <Row id="earningsDeductionsButtonsRow">
          <Col md={5}>
            <Button
              size="sm"
              variant="secondary"
              className="earningsDeductionsButton"
              onClick={() => {
                const newObject = {
                  id: earningsDeductions.length,
                  earningsDescription: '',
                  earningsType: '',
                  earningsAmount: '',
                  deductionDescription: '',
                  deductionType: '',
                  deductionAmount: '',
                };
                dispatch(
                  newLineEarningsDeductions({
                    newObj: newObject,
                  })
                );
              }}
              disabled={
                (earningsDeductions[earningsDeductions.length - 1]
                  .earningsDescription !== '' &&
                  (earningsDeductions[earningsDeductions.length - 1]
                    .earningsType === '' ||
                    earningsDeductions[earningsDeductions.length - 1]
                      .earningsAmount === '')) ||
                (earningsDeductions[earningsDeductions.length - 1]
                  .deductionDescription !== '' &&
                  (earningsDeductions[earningsDeductions.length - 1]
                    .deductionType === '' ||
                    earningsDeductions[earningsDeductions.length - 1]
                      .deductionAmount === ''))
              }
            >
              + ADD ROW
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="earningsDeductionsButton"
              onClick={() => {
                dispatch(removeLineEarningsDeductions());
              }}
              disabled={earningsDeductions.length < 2}
            >
              - REMOVE ROW
            </Button>
          </Col>
        </Row>
      </Row>
      <hr />
    </Form>
  );
};

export default PayTaxInfoTab;
