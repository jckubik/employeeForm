/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import {
  updateInfo,
  setValidityStatus,
  setRequiredFieldsStatus,
} from '../../Slices/bankInfoSlice';
import { setCurrentPage } from '../../Slices/navigationSlice';

const BankInfoTab = () => {
  const dispatch = useDispatch();
  const {
    enableDirectDeposit,
    bankRoutingNumber1,
    bankAccountNumber1,
    accountType1,
    depositAmount1,
    bankRoutingNumber2,
    bankAccountNumber2,
    accountType2,
    depositAmount2,
    partialType,
    partialAmount,
    validityStatus,
    requiredFieldsStatus,
  } = useSelector((state) => state.bankInfo);

  const [labelEnableDirectDeposit, setLabelEnableDirectDeposit] = useState(
    'Enable Direct Deposit'
  );
  const [labelPartialType, setLabelPartialType] = useState('Type');
  const [labelPartialAmount, setLabelPartialAmount] = useState('Amount');
  const [labelBankRoutingNumber1, setLabelBankRoutingNumber1] = useState(
    'Bank Routing # * (xxxxxxxxx)'
  );
  const [labelBankAccountNumber1, setLabelBankAccountNumber1] = useState(
    'Bank Account # * (xxxxxxxxx)'
  );
  const [labelDepositAmount1, setLabelDepositAmount1] = useState(
    'Deposit Amount * (xxxxxxx.xx)'
  );
  const [labelBankRoutingNumber2, setLabelBankRoutingNumber2] = useState(
    'Bank Routing # * (xxxxxxxxx)'
  );
  const [labelBankAccountNumber2, setLabelBankAccountNumber2] = useState(
    'Bank Account # * (xxxxxxxxx)'
  );
  const [labelDepositAmount2, setLabelDepositAmount2] =
    useState('Deposit Amount');
  const [labelAccountType2, setLabelAccountType2] = useState('Account Type');
  const [labelAccountType1, setLabelAccountType1] = useState('Account Type');

  const accountTypes = [
    {
      value: 'Checking',
      label: 'Checking',
    },
    {
      value: 'Savings',
      label: 'Savings',
    },
  ];
  const depositAmounts = [
    {
      value: 'Full',
      label: 'Full Amount',
    },
    {
      value: 'Partial',
      label: 'Partial',
    },
  ];
  const depositAmounts2 = [
    {
      value: 'Remainder',
      label: 'Remainder',
    },
  ];
  const partialTypes = [
    {
      value: 'Amount',
      label: '$',
    },
    {
      value: 'Percent',
      label: '%',
    },
  ];

  // Grabs the original label without additional info text
  function originalLabel(inputLabel) {
    return inputLabel.match(/^.*\)|^.* - |^.*/)[0].replace(' - ', '');
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
    } else if (!regExp.test(event.target.value)) {
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

  // Set class for input if invalid
  const setInvalidField = (field, type) =>
    !validityStatus[field] ? `validationError${type}` : '';

  // Checks if deposit amount is full or partial
  // Then changes required field settings
  useEffect(() => {
    let routing2 = true;
    let account2 = true;
    let partial = true;

    // If full, then account2 info should be set to ''
    // Validity is set to true
    if (depositAmount1 === 'Full') {
      setLabelBankAccountNumber2(originalLabel(labelBankAccountNumber2));
      setLabelBankRoutingNumber2(originalLabel(labelBankRoutingNumber2));
      dispatch(
        updateInfo({
          value: '',
          field: 'bankRoutingNumber2',
        })
      );
      dispatch(
        updateInfo({
          value: '',
          field: 'bankAccountNumber2',
        })
      );

      dispatch(setValidityStatus({ field: 'bankAccountNumber2', value: true }));
      dispatch(setValidityStatus({ field: 'bankRoutingNumber2', value: true }));
    } else if (depositAmount1 === 'Partial') {
      // If partial, then required fields is set to false as they now must be entered
      routing2 = false;
      account2 = false;
      partial = false;
    }
    dispatch(
      setRequiredFieldsStatus({ field: 'bankRoutingNumber2', value: routing2 })
    );
    dispatch(
      setRequiredFieldsStatus({ field: 'bankAccountNumber2', value: account2 })
    );
    dispatch(
      setRequiredFieldsStatus({
        field: 'partialAmount',
        value: partial,
      })
    );
  }, [depositAmount1]);

  // Checks to see if all required inputs exist and all fields are valid
  useEffect(() => {
    const required = Object.values(requiredFieldsStatus).every(
      (value) => value
    );
    const valid = Object.values(validityStatus).every((value) => value);

    // Set allValid and allRequired
    dispatch(updateInfo({ value: required, field: 'allRequired' }));
    dispatch(updateInfo({ value: valid, field: 'allValid' }));
  }, [requiredFieldsStatus, validityStatus]);

  // Set currentPage on page load
  useEffect(() => {
    dispatch(setCurrentPage({ value: 2 }));
  }, []);

  return (
    <Form className="form">
      {/* Row 1  - enableDirectDeposit */}
      <Row className="form">
        <Form.Group
          id="formEnableDirectDeposit"
          controlId="formEnableDirectDeposit"
        >
          <Form.Check
            label={labelEnableDirectDeposit}
            size="sm"
            name="enableDirectDeposit"
            type="checkbox"
            id="formEnableDirectDeposit"
            onClick={() => {
              dispatch(
                updateInfo({
                  value: !enableDirectDeposit,
                  field: 'enableDirectDeposit',
                })
              );
            }}
            defaultChecked={enableDirectDeposit}
          />
        </Form.Group>
      </Row>

      {enableDirectDeposit ? (
        <Row>
          {/* Account 1 Column */}
          <Col>
            <Row>
              <Form.Label>Account One</Form.Label>
            </Row>
            <hr />
            <Row>
              <Col>
                <Row>
                  <Form.Group controlId="formBankRoutingNumber1">
                    <Form.Label
                      column="sm"
                      className={setInvalidField('bankRoutingNumber1', 'Text')}
                    >
                      {labelBankRoutingNumber1}
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="eg 123456789"
                      maxLength="9"
                      value={bankRoutingNumber1}
                      className={setInvalidField('bankRoutingNumber1', 'Input')}
                      onChange={(event) => {
                        dispatch(
                          updateInfo({
                            value: event.target.value,
                            field: 'bankRoutingNumber1',
                          })
                        );
                        inputValidator(
                          event,
                          'bankRoutingNumber1',
                          labelBankRoutingNumber1,
                          setLabelBankRoutingNumber1,
                          true,
                          /^(?!5)(?![0]{9})([0-9]{9})$/,
                          'Invalid Number'
                        );
                      }}
                      onBlur={(event) => {
                        inputValidator(
                          event,
                          'bankRoutingNumber1',
                          labelBankRoutingNumber1,
                          setLabelBankRoutingNumber1,
                          true,
                          /^(?!5)(?![0]{9})([0-9]{9})$/,
                          'Invalid Number'
                        );
                      }}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group controlId="formBankAccountNumber1">
                    <Form.Label
                      column="sm"
                      className={setInvalidField('bankAccountNumber1', 'Text')}
                    >
                      {labelBankAccountNumber1}
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="eg 123456789"
                      maxLength="9"
                      value={bankAccountNumber1}
                      className={setInvalidField('bankAccountNumber1', 'Input')}
                      onChange={(event) => {
                        dispatch(
                          updateInfo({
                            value: event.target.value,
                            field: 'bankAccountNumber1',
                          })
                        );
                        inputValidator(
                          event,
                          'bankAccountNumber1',
                          labelBankAccountNumber1,
                          setLabelBankAccountNumber1,
                          true,
                          /^(?!5)(?![0]{9})([0-9]{9})$/,
                          'Invalid Number'
                        );
                      }}
                      onBlur={(event) => {
                        inputValidator(
                          event,
                          'bankAccountNumber1',
                          labelBankAccountNumber1,
                          setLabelBankAccountNumber1,
                          true,
                          /^(?!5)(?![0]{9})([0-9]{9})$/,
                          'Invalid Number'
                        );
                      }}
                    />
                  </Form.Group>
                </Row>
              </Col>
              <Col>
                <img
                  className="bankinfo-image"
                  src="http://cdldevc3poc/bankinfo/images/check-routing-account-number.png"
                  alt="The location of the routing and account numbers on a check."
                />
              </Col>
            </Row>
            <hr />
            <Row>
              <Form.Group controlId="formAccountType1">
                <Form.Label column="sm">{labelAccountType1}</Form.Label>
                <br />
                {accountTypes.map((radio) => (
                  <Form.Check
                    inline
                    label={radio.label}
                    size="sm"
                    name="accountType1"
                    type="radio"
                    value={radio.value}
                    key={`accountType1-radio-${radio.value}`}
                    id={`accountType1-radio-${radio.value}`}
                    onClick={(event) => {
                      dispatch(
                        updateInfo({
                          value: event.target.value,
                          field: 'accountType1',
                        })
                      );
                    }}
                    defaultChecked={accountType1 === radio.value}
                  />
                ))}
              </Form.Group>
            </Row>
            <hr />
            <Row>
              <Col>
                <Form.Group controlId="formDepositAmount1">
                  <Form.Label column="sm">{labelDepositAmount1}</Form.Label>
                  <br />
                  {depositAmounts.map((radio) => (
                    <Form.Check
                      label={radio.label}
                      size="sm"
                      name="DepositAmount1"
                      type="radio"
                      value={radio.value}
                      key={`DepositAmount1-radio-${radio.value}`}
                      id={`DepositAmount1-radio-${radio.value}`}
                      onClick={(event) => {
                        dispatch(
                          updateInfo({
                            value: event.target.value,
                            field: 'depositAmount1',
                          })
                        );
                      }}
                      defaultChecked={depositAmount1 === radio.value}
                    />
                  ))}
                </Form.Group>
              </Col>
              {depositAmount1 === 'Partial' ? (
                <Col>
                  <Row>
                    <Col md={3}>
                      <Form.Group controlId="formPartialType">
                        <Form.Label column="sm">{labelPartialType}</Form.Label>
                        <Form.Select
                          size="sm"
                          onChange={(event) => {
                            dispatch(
                              updateInfo({
                                value: event.target.value,
                                field: 'partialType',
                              })
                            );
                          }}
                          defaultValue={partialType}
                        >
                          {partialTypes.map((type) => (
                            <option value={type.value} key={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={5} id="depositPartialColumn">
                      <Form.Group controlId="formPartialAmount">
                        <Form.Label column="sm">
                          {labelPartialAmount}
                        </Form.Label>
                        <InputGroup size="sm">
                          <InputGroup.Text id="basic-addon1">
                            {partialType === 'Amount' ? '$' : '%'}
                          </InputGroup.Text>
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="00.00"
                            maxLength="10"
                            value={partialAmount}
                            onChange={(event) => {
                              dispatch(
                                updateInfo({
                                  value: event.target.value,
                                  field: 'partialAmount',
                                })
                              );
                              inputValidator(
                                event,
                                'partialAmount',
                                labelPartialAmount,
                                setLabelPartialAmount,
                                true,
                                /^(?![0]{1,7}\.[0]{1,2})[0-9]{2,7}(\.[0-9]{1,2})?$/,
                                'Invalid Number'
                              );
                            }}
                            onBlur={(event) => {
                              inputValidator(
                                event,
                                'partialAmount',
                                labelPartialAmount,
                                setLabelPartialAmount,
                                true,
                                /^(?![0]{1,7}\.[0]{1,2})[0-9]{2,7}(\.[0-9]{1,2})?$/,
                                'Invalid Number'
                              );
                            }}
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              ) : (
                ''
              )}
            </Row>
          </Col>

          {/* Account 2 Column */}
          <Col md={{ offset: 1 }}>
            <Row>
              <Form.Label>Account Two</Form.Label>
            </Row>
            <hr />
            <Row>
              <Col>
                <Row>
                  <Form.Group controlId="formBankRoutingNumber2">
                    <Form.Label
                      column="sm"
                      className={setInvalidField('bankRoutingNumber2', 'Text')}
                    >
                      {labelBankRoutingNumber2}
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="eg 123456789"
                      maxLength="9"
                      value={bankRoutingNumber2}
                      className={setInvalidField('bankRoutingNumber2', 'Input')}
                      onChange={(event) => {
                        dispatch(
                          updateInfo({
                            value: event.target.value,
                            field: 'bankRoutingNumber2',
                          })
                        );
                        inputValidator(
                          event,
                          'bankRoutingNumber2',
                          labelBankRoutingNumber2,
                          setLabelBankRoutingNumber2,
                          true,
                          /^(?!5)(?![0]{9})([0-9]{9})$/,
                          'Invalid Number'
                        );
                      }}
                      onBlur={(event) => {
                        inputValidator(
                          event,
                          'bankRoutingNumber2',
                          labelBankRoutingNumber2,
                          setLabelBankRoutingNumber2,
                          true,
                          /^(?!5)(?![0]{9})([0-9]{9})$/,
                          'Invalid Number'
                        );
                      }}
                      disabled={depositAmount1 !== 'Partial'}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group controlId="formBankAccountNumber2">
                    <Form.Label
                      column="sm"
                      className={setInvalidField('bankAccountNumber2', 'Text')}
                    >
                      {labelBankAccountNumber2}
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="eg 123456789"
                      maxLength="9"
                      value={bankAccountNumber2}
                      className={setInvalidField('bankAccountNumber2', 'Input')}
                      onChange={(event) => {
                        dispatch(
                          updateInfo({
                            value: event.target.value,
                            field: 'bankAccountNumber2',
                          })
                        );
                        inputValidator(
                          event,
                          'bankAccountNumber2',
                          labelBankAccountNumber2,
                          setLabelBankAccountNumber2,
                          true,
                          /^(?!5)(?![0]{9})([0-9]{9})$/,
                          'Invalid Number'
                        );
                      }}
                      onBlur={(event) => {
                        inputValidator(
                          event,
                          'bankAccountNumber2',
                          labelBankAccountNumber2,
                          setLabelBankAccountNumber2,
                          true,
                          /^(?!5)(?![0]{9})([0-9]{9})$/,
                          'Invalid Number'
                        );
                      }}
                      disabled={depositAmount1 !== 'Partial'}
                    />
                  </Form.Group>
                </Row>
              </Col>
              <Col>
                <img
                  className="bankinfo-image"
                  src="http://cdldevc3poc/bankinfo/images/check-routing-account-number.png"
                  alt="The location of the routing and account numbers on a check."
                />
              </Col>
            </Row>
            <hr />
            <Row>
              <Form.Group controlId="formAccountType2">
                <Form.Label column="sm">{labelAccountType2}</Form.Label>
                <br />
                {accountTypes.map((radio) => (
                  <Form.Check
                    inline
                    label={radio.label}
                    size="sm"
                    name="accountType2"
                    type="radio"
                    value={radio.value}
                    key={`accountType2-radio-${radio.value}`}
                    id={`accountType2-radio-${radio.value}`}
                    onClick={(event) => {
                      dispatch(
                        updateInfo({
                          value: event.target.value,
                          field: 'accountType2',
                        })
                      );
                    }}
                    defaultChecked={accountType2 === radio.value}
                    disabled={depositAmount1 !== 'Partial'}
                  />
                ))}
              </Form.Group>
            </Row>
            <hr />
            <Row>
              <Col>
                <Form.Group controlId="formDepositAmount2">
                  <Form.Label column="sm">{labelDepositAmount2}</Form.Label>
                  <br />
                  {depositAmounts2.map((radio) => (
                    <Form.Check
                      label={radio.label}
                      size="sm"
                      name="depositAmount2"
                      type="radio"
                      value={radio.value}
                      key={`DepositAmount2-radio-${radio.value}`}
                      id={`DepositAmount2-radio-${radio.value}`}
                      onClick={(event) => {
                        dispatch(
                          updateInfo({
                            value: event.target.value,
                            field: 'depositAmount2',
                          })
                        );
                      }}
                      defaultChecked={depositAmount2 === radio.value}
                      disabled={depositAmount1 !== 'Partial'}
                    />
                  ))}
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        ''
      )}
      <hr />
    </Form>
  );
};

export default BankInfoTab;
