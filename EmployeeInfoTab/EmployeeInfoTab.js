/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  updateInfo,
  setValidityStatus,
  setRequiredFieldsStatus,
} from '../../Slices/employeeInfoSlice';
import { setCurrentPage } from '../../Slices/navigationSlice';
import ZipStateCity from './ZipStateCity';

const EmlpoyeeInfoTab = () => {
  const dispatch = useDispatch();
  const {
    workerType,
    companyName,
    employeeStatus,
    terminationDate,
    firstName,
    middleInitial,
    lastName,
    address1,
    address2,
    zip,
    state,
    city,
    occupationalCode,
    email,
    ssnTin,
    dateOfBirth,
    gender,
    hireDate,
    validityStatus,
    requiredFieldsStatus,
  } = useSelector((reduxState) => reduxState.employeeInfo);

  const [labelHireDate, setLabelHireDate] = useState('Date of Hire *');
  const [labelTerminationDate, setLabelTerminationDate] = useState(
    'Date of Termination'
  );
  const [labelEmployeeStatus, setLabelEmployeeStatus] =
    useState('Employee Status');
  const [labelCompanyName, setLabelCompanyName] = useState('Company Name');
  const [labelFirstName, setLabelFirstName] = useState('First Name *');
  const [labelMiddleInitial, setLabelMiddleInitial] = useState('MI');
  const [labelLastName, setLabelLastName] = useState('Last Name *');
  const [labelAddress1, setLabelAddress1] = useState('Address 1 *');
  const [labelAddress2, setLabelAddress2] = useState('Address 2');
  const [labelZip, setLabelZip] = useState('Zip *');
  const [labelCity, setLabelCity] = useState('City *');
  const [labelState, setLabelState] = useState('State *');
  const [labelWorkedInState, setLabelWorkedInState] =
    useState('Worked in State');
  const [labelOccupationalCode, setLabelOccupationalCode] =
    useState('Occupational Code');
  const [labelEmail, setLabelEmail] = useState('Email Address');
  const [labelSsnTin, setLabelSsnTin] = useState('Social Security Number *');
  const [labelDateOfBirth, setLabelDateOfBirth] = useState('Date of Birth');
  const [labelGender, setLabelGender] = useState('Gender *');
  const workerTypes = [
    { value: 'W-2', label: 'W-2' },
    { value: '1099', label: '1099' },
  ];
  const genders = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  // Grabs the original label without additional info text
  function originalLabel(inputLabel) {
    return inputLabel.match(/^.*\*|^.* - |^.*/)[0].replace(' - ', '');
  }

  /**
   * Validates an input field based off the given parameters.
   *
   * @param {object} event - The event fired onChange and onBlur.
   * @param {string} field - The form field that is being validated. This will be used to save the valid conditon for the field.
   * @param {string} label - The label variable of the label to be changed.
   * @param {*} setLabel - The setState function for the label to be changed.
   * @param {boolean} required - Whether or not this is a required field (True or False).
   * @param {*} regExp - The regular expression to test the input with. Written in the format that if the expression tests true, then the input is invalid.
   * @param {string} infoText - The text to be added to the label to inform the user about invalid inputs.
   */
  const inputValidator = (
    event,
    field,
    label,
    setLabel,
    required,
    regExp,
    infoText
  ) => {
    let valid = false;
    let exists = true;
    if (required && !event.target.value) {
      // If empty input, add info text
      setLabel(`${originalLabel(label)} - is required`);
      exists = false;
    } else if (regExp.test(event.target.value)) {
      // If regExp tests true, add info text
      setLabel(`${originalLabel(label)} - ${infoText}`);
    } else {
      // Else, no validation errors, remove info text
      setLabel(originalLabel(label));
      valid = true;
    }

    dispatch(setValidityStatus({ field: [field], value: valid }));
    dispatch(setRequiredFieldsStatus({ field: [field], value: exists }));
  };

  // Formats inputs for the occupationalCode field
  const occupationalCodeFormatter = (event) => {
    // Get rid of all non-integer characters
    let code = event.target.value.replace(/[^\d]+/g, '');

    // If code has at least 3 numbers, add '-' at index 2
    if (code.length > 2) {
      code = `${code.slice(0, 2)}-${code.slice(2)}`;
    }

    // If code has at least 6 numbers, add '.' at index 7
    if (code.length > 7) {
      code = `${code.slice(0, 7)}.${code.slice(7, 9)}`;
    }

    // Set occupationalCode to formatted value
    dispatch(updateInfo({ value: code, field: 'occupationalCode' }));
  };

  // Formats inputs for the ssn field
  const ssnTinFormatter = (event) => {
    let valid = true;
    let exists = true;
    // Get rid of non-integer characters
    let social = event.target.value.replace(/[^\d]+/g, '');

    // If social isn't empty, format the social
    if (social) {
      setLabelSsnTin(originalLabel(labelSsnTin));

      // If social has at least 4 integers, add '-' at index 3
      if (social.length > 3) {
        social = `${social.slice(0, 3)}-${social.slice(3)}`;
      }

      // If social has at least 6 integers, add '-' at index 6
      // Limit the social to 9 integers
      if (social.length > 6) {
        social = `${social.slice(0, 6)}-${social.slice(6, 10)}`;
      }

      // If the social exists but is not complete, show info text
      if (social.length >= 1 && social.length < 11) {
        setLabelSsnTin(`${originalLabel(labelSsnTin)} - Invalid SSN or TIN`);
        valid = false;
      }
    } else {
      // Else, the soical is empty, show info text
      setLabelSsnTin(`${originalLabel(labelSsnTin)} - is required`);
      valid = false;
      exists = false;
    }

    // Finally, set the ssn, set isValid, setRequiredFields
    dispatch(updateInfo({ value: social, field: 'ssnTin' }));
    dispatch(setValidityStatus({ field: 'ssnTin', value: valid }));
    dispatch(setRequiredFieldsStatus({ field: 'ssnTin', value: exists }));
  };

  // Validates that an emil input is the correct format
  const emailInputValidator = (event) => {
    let valid;
    if (event.target.value && !/.+@.+\..+/.test(event.target.value)) {
      setLabelEmail(`${originalLabel(labelEmail)} - format isn't correct`);
      valid = false;
    } else {
      setLabelEmail(originalLabel(labelEmail));
      valid = true;
    }

    // Set validity of field
    dispatch(setValidityStatus({ field: 'email', value: valid }));
  };

  // Handles onChange for the companyName field
  const handleCompanyNameChange = (event) => {
    dispatch(updateInfo({ value: event.target.value, field: 'companyName' }));

    inputValidator(
      event,
      'companyName',
      labelCompanyName,
      setLabelCompanyName,
      false,
      /[^- &A-Za-z0-9']+/,
      "Allowed Characters: A-Z, 0-9, &, -, '"
    );

    // Change the firstName, middleInitial, lastName to empty
    // Stop firing for every change
    if (event.target.value && event.target.value.length < 2) {
      dispatch(updateInfo({ value: '', field: 'firstName' }));
      dispatch(updateInfo({ value: '', field: 'lastName' }));
      dispatch(updateInfo({ value: '', field: 'middleInitial' }));
    }

    // If 1099 and companyName exists, user should enter TIN not SSN
    setLabelSsnTin(
      event.target.value && workerType === '1099'
        ? 'TIN *'
        : 'Social Security Number *'
    );
    dispatch(updateInfo({ value: '', field: 'ssnTin' }));
    dispatch(setValidityStatus({ field: 'ssnTin', value: true }));
    dispatch(setRequiredFieldsStatus({ field: 'ssnTin', value: false }));
  };

  // Set class for input if invalid
  const setInvalidField = (field, type) =>
    !validityStatus[field] ? `validationError${type}` : '';

  // Handles terminationDate and hireDate change
  // Checks to see that hire date is before termination date
  useEffect(() => {
    // If hireDate is after terminationDate, inputs are invalid
    if (
      terminationDate !== '' &&
      hireDate !== '' &&
      hireDate > terminationDate
    ) {
      setLabelTerminationDate(
        'Date of Termnination cannot precede Date of Hire'
      );
      setLabelHireDate('Date of Hire should Precede Date of Termination');
      dispatch(setValidityStatus({ field: 'terminationDate', value: false }));
      dispatch(setValidityStatus({ field: 'hireDate', value: false }));
    } else {
      // Else, check for incorrect date before marking valid
      let terminationValid = false;
      let hireValid = false;

      // Check terminationDate
      if (!/^\d\d\d\d\d+-/.test(terminationDate)) {
        setLabelTerminationDate('Date of Termination');
        terminationValid = true;
      }
      // Check hireDate
      if (!/^\d\d\d\d\d+-/.test(hireDate)) {
        setLabelHireDate('Date of Hire *');
        hireValid = true;
      }
      // Set validityStatus for terminationDate and hireDate
      dispatch(
        setValidityStatus({ field: 'terminationDate', value: terminationValid })
      );
      dispatch(setValidityStatus({ field: 'hireDate', value: hireValid }));
    }

    // Set the validity condition for the fields
  }, [hireDate, terminationDate, validityStatus.hireDate]);

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
    dispatch(setCurrentPage({ value: 0 }));
    console.log('setting currentPAge to 0');
  }, []);

  return (
    <Form className="form">
      <hr />
      {/* First Row - workerType, companyName, employeeStatus, terminationDate */}
      <Row>
        <Col>
          <div key="inline-radio">
            {workerTypes.map((radio) => (
              <Form.Check
                inline
                label={radio.label}
                name="workerType"
                type="radio"
                value={radio.value}
                id={`workerType-radio-${radio.value}`}
                key={`workerType-radio-${radio.value}`}
                onClick={(event) => {
                  dispatch(
                    updateInfo({
                      value: event.target.value,
                      field: 'workerType',
                    })
                  );
                  if (event.target.value === 'W-2') {
                    dispatch(updateInfo({ value: '', field: 'companyName' }));
                    setLabelSsnTin('Social Security Number *');
                    dispatch(updateInfo({ value: '', field: 'ssnTin' }));
                    dispatch(
                      setValidityStatus({ field: 'ssnTin', value: true })
                    );
                    dispatch(
                      setRequiredFieldsStatus({
                        field: 'ssnTin',
                        value: false,
                      })
                    );
                  }
                }}
                defaultChecked={workerType === radio.value}
              />
            ))}
          </div>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="formCompanyId">
            <Form.Label className={setInvalidField('companyName', 'Text')}>
              {labelCompanyName}
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Text"
              value={companyName}
              className={setInvalidField('companyName', 'Input')}
              onChange={(event) => {
                handleCompanyNameChange(event);
              }}
              disabled={workerType === 'W-2'}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formEmployeeStatus">
            <Form.Label>{labelEmployeeStatus}</Form.Label>
            <Form.Select
              size="sm"
              onChange={(event) =>
                dispatch(
                  updateInfo({
                    value: event.target.value,
                    field: 'employeeStatus',
                  })
                )
              }
              defaultValue={employeeStatus}
            >
              <option value="Active">Active</option>
              <option value="Terminated">Terminated</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formTerminationDate">
            {employeeStatus === 'Active' ? (
              ''
            ) : (
              <>
                <Form.Label
                  className={setInvalidField('terminationDate', 'Text')}
                >
                  {labelTerminationDate}
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="date"
                  value={terminationDate}
                  className={setInvalidField('terminationDate', 'Input')}
                  onChange={(event) => {
                    dispatch(
                      updateInfo({
                        value: event.target.value,
                        field: 'terminationDate',
                      })
                    );
                    inputValidator(
                      event,
                      'terminationDate',
                      labelTerminationDate,
                      setLabelTerminationDate,
                      false,
                      /^\d\d\d\d\d+-/,
                      'Enter a 4 digit year'
                    );
                  }}
                />
              </>
            )}
          </Form.Group>
        </Col>
        <Col>
          <Form.Text>* Denotes Required Field</Form.Text>
        </Col>
      </Row>

      {/* Second Row - firstName, middleInitial, lastName */}
      <Row>
        <Col>
          <Form.Group controlId="formFirstName">
            <Form.Label className={setInvalidField('firstName', 'Text')}>
              {labelFirstName}
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Text"
              className={setInvalidField('firstName', 'Input')}
              value={firstName}
              onChange={(event) => {
                dispatch(
                  updateInfo({ value: event.target.value, field: 'firstName' })
                );
                inputValidator(
                  event,
                  'firstName',
                  labelFirstName,
                  setLabelFirstName,
                  true,
                  /[^'a-zA-Z-]+/,
                  "Allowed Characters: A-Z, -, '"
                );
              }}
              onBlur={(event) => {
                inputValidator(
                  event,
                  'firstName',
                  labelFirstName,
                  setLabelFirstName,
                  true,
                  /[^'a-zA-Z-]+/,
                  "Allowed Characters: A-Z, -, '"
                );
              }}
              disabled={companyName}
            />
          </Form.Group>
        </Col>
        <Col sm={2}>
          <Form.Group controlId="formMiddleInitial">
            <Form.Label>{labelMiddleInitial}</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Text"
              value={middleInitial}
              onChange={(event) => {
                if (!middleInitial || event.target.value.length < 1) {
                  if (!/[^A-Za-z]+/.test(event.target.value)) {
                    dispatch(
                      updateInfo({
                        value: event.target.value,
                        field: 'middleInitial',
                      })
                    );
                  }
                }
              }}
              disabled={companyName}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formLastName">
            <Form.Label className={setInvalidField('lastName', 'Text')}>
              {labelLastName}
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Text"
              className={setInvalidField('lastName', 'Input')}
              value={lastName}
              onChange={(event) => {
                dispatch(
                  updateInfo({ value: event.target.value, field: 'lastName' })
                );
                inputValidator(
                  event,
                  'lastName',
                  labelLastName,
                  setLabelLastName,
                  true,
                  /[^'a-zA-Z-]+/,
                  "Allowed Characters: A-Z, -, '"
                );
              }}
              onBlur={(event) => {
                inputValidator(
                  event,
                  'lastName',
                  labelLastName,
                  setLabelLastName,
                  true,
                  /[^'a-zA-Z-]+/,
                  "Allowed Characters: A-Z, -, '"
                );
              }}
              disabled={companyName}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Third Row - address1, address2 */}
      <Row>
        <Col>
          <Form.Group controlId="formAddress1">
            <Form.Label className={setInvalidField('address1', 'Text')}>
              {labelAddress1}
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Text"
              value={address1}
              className={setInvalidField('address1', 'Input')}
              onChange={(event) => {
                dispatch(
                  updateInfo({ value: event.target.value, field: 'address1' })
                );
                inputValidator(
                  event,
                  'address1',
                  labelAddress1,
                  setLabelAddress1,
                  true,
                  /[^A-Za-z'0-9 #&/-]+/,
                  "Allowed Characters: A-Z, 0-9, -, ', #, &, /"
                );
              }}
              onBlur={(event) => {
                inputValidator(
                  event,
                  'address1',
                  labelAddress1,
                  setLabelAddress1,
                  true,
                  /[^A-Za-z'0-9 #&/-]+/,
                  "Allowed Characters: A-Z, 0-9, -, ', #, &, /"
                );
              }}
            />
          </Form.Group>
        </Col>
        <Col md={{ offset: 2 }}>
          <Form.Group controlId="formAddress2">
            <Form.Label className={setInvalidField('address2', 'Text')}>
              {labelAddress2}
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Text"
              value={address2}
              className={setInvalidField('address2', 'Input')}
              onChange={(event) => {
                dispatch(
                  updateInfo({ value: event.target.value, field: 'address2' })
                );
                inputValidator(
                  event,
                  'address2',
                  labelAddress2,
                  setLabelAddress2,
                  false,
                  /[^A-Za-z'0-9 #&/-]+/,
                  "Allowed Characters: A-Z, 0-9, -, ', #, &, /"
                );
              }}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Fourth Row - zip, state, city, workedInState, occupationalCode, email */}
      <Row>
        <Col>
          <ZipStateCity
            zip={zip}
            labelZip={labelZip}
            setLabelZip={setLabelZip}
            state={state}
            labelState={labelState}
            setLabelState={setLabelState}
            city={city}
            labelCity={labelCity}
            setLabelCity={setLabelCity}
            labelWorkedInState={labelWorkedInState}
            inputValidator={inputValidator}
          />
        </Col>
        <Col sm={2}>
          <Form.Group controlId="formOccupationalCode">
            <Form.Label>{labelOccupationalCode}</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Numbers"
              value={occupationalCode}
              onChange={(event) => {
                occupationalCodeFormatter(event);
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formEmail">
            <Form.Label className={setInvalidField('email', 'Text')}>
              {labelEmail}
            </Form.Label>
            <Form.Control
              size="sm"
              type="email"
              placeholder="Text"
              value={email}
              className={setInvalidField('email', 'Input')}
              onChange={(event) => {
                dispatch(
                  updateInfo({ value: event.target.value, field: 'email' })
                );
                emailInputValidator(event);
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <hr />

      {/* Fifth Row - ssn, dateOfBirth, gender, hireDate */}
      <Row>
        <Col md={3}>
          <Form.Group controlId="formSsn">
            <Form.Label
              className={
                (workerType === 'W-2' && !validityStatus.ssnTin) ||
                (workerType === '1099' && !validityStatus.ssnTin)
                  ? 'validationErrorText'
                  : ''
              }
            >
              {labelSsnTin}
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="eg. 123-45-6789"
              value={ssnTin}
              className={
                (workerType === 'W-2' && !validityStatus.ssnTin) ||
                (workerType === '1099' && !validityStatus.ssnTin)
                  ? 'validationErrorInput'
                  : ''
              }
              onChange={(event) => {
                ssnTinFormatter(event);
              }}
              onBlur={(event) => {
                ssnTinFormatter(event);
              }}
            />
          </Form.Group>
        </Col>
        <Col md={2} className="border-left border-dark">
          <Form.Group controlId="formDateOfBirth">
            <Form.Label className={setInvalidField('dateOfBirth', 'Text')}>
              {labelDateOfBirth}
            </Form.Label>
            <Form.Control
              size="sm"
              type="date"
              placeholder="Enter Date"
              value={dateOfBirth}
              className={setInvalidField('dateOfBirth', 'Input')}
              onChange={(event) => {
                dispatch(
                  updateInfo({
                    value: event.target.value,
                    field: 'dateOfBirth',
                  })
                );
                inputValidator(
                  event,
                  'dateOfBirth',
                  labelDateOfBirth,
                  setLabelDateOfBirth,
                  false,
                  /^\d\d\d\d\d+-/,
                  'Enter a 4 digit year'
                );
              }}
            />
          </Form.Group>
        </Col>
        <Col md={{ span: 2, offset: 1 }}>
          <div key="radio-gender">
            <Form.Label>{labelGender}</Form.Label>
            {genders.map((radio) => (
              <Form.Check
                label={radio.label}
                name="gender"
                type="radio"
                value={radio.value}
                id={`gender-radio-${radio.value}`}
                key={`gender-radio-${radio.value}`}
                onClick={(event) => {
                  dispatch(
                    updateInfo({ value: event.target.value, field: 'gender' })
                  );
                }}
                defaultChecked={gender === radio.value}
              />
            ))}
          </div>
        </Col>
        <Col md={2}>
          <Form.Group controlId="formHireDate">
            <Form.Label className={setInvalidField('hireDate', 'Text')}>
              {labelHireDate}
            </Form.Label>
            <Form.Control
              size="sm"
              type="date"
              value={hireDate}
              className={setInvalidField('hireDate', 'Input')}
              onChange={(event) => {
                dispatch(
                  updateInfo({ value: event.target.value, field: 'hireDate' })
                );
                inputValidator(
                  event,
                  'hireDate',
                  labelHireDate,
                  setLabelHireDate,
                  true,
                  /^\d\d\d\d\d+-/,
                  'Enter a 4 digit year'
                );
              }}
              onBlur={(event) => {
                inputValidator(
                  event,
                  'hireDate',
                  labelHireDate,
                  setLabelHireDate,
                  true,
                  /^\d\d\d\d\d+-/,
                  'Enter a 4 digit year'
                );
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <hr />
    </Form>
  );
};

export default EmlpoyeeInfoTab;
