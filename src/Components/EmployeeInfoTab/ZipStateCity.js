/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import JSONFile from './JSONFiles/states.json';
import {
  updateInfo,
  setValidityStatus,
  setRequiredFieldsStatus,
} from '../../Slices/employeeInfoSlice';

let abbrevHolder = '';

function App({
  labelZip,
  labelState,
  labelCity,
  inputValidator,
  labelWorkedInState,
  setLabelZip,
  setLabelState,
  setLabelCity,
  setLabelWorkedInState,
}) {
  const dispatch = useDispatch();
  const { zip, state, city, workedInState } = useSelector(
    (reduxState) => reduxState.employeeInfo
  );
  const firstUpdate = useRef(true);

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
  const inputValidatorv2 = (
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
    if (required && !event) {
      // If empty input, add info text
      setLabel(`${originalLabel(label)} - is required`);
      exists = false;
    } else if (regExp.test(event)) {
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

  useEffect(() => {
    const fetchCityState = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBHM7kZfsXwNQWRmIILXY86CealgXpSqTc&components=country:US|postal_code:${zip}`,
          { headers: { accept: 'application/json' } }
        );
        const data = await response.text();
        let cityHolder;
        let stateHolder;
        const jsonHolder = JSON.parse(data);

        if (jsonHolder.status !== 'ZERO_RESULTS' && zip.length === 5) {
          for (
            let i = 0;
            i < jsonHolder.results[0].address_components.length;
            i++
          ) {
            if (
              jsonHolder.results[0].address_components[i].types[0] ===
              'locality'
            ) {
              cityHolder =
                jsonHolder.results[0].address_components[i].long_name;
            }
            if (
              jsonHolder.results[0].address_components[i].types[0] ===
              'administrative_area_level_1'
            ) {
              stateHolder =
                jsonHolder.results[0].address_components[i].long_name;
            }
          }
        } else {
          cityHolder = '';
          stateHolder = '';
        }

        for (let i = 0; i < JSONFile.length; i++) {
          if (stateHolder === JSONFile[i].name) {
            abbrevHolder = JSONFile[i].abbreviation;
            stateHolder = JSONFile[i].abbreviation;
          }
        }

        dispatch(updateInfo({ field: 'state', value: stateHolder }));
        dispatch(updateInfo({ field: 'city', value: cityHolder }));
        dispatch(updateInfo({ field: 'workedInState', value: abbrevHolder }));
      } catch (e) {
        console.log(e);
      }
    };
    fetchCityState();
  }, [zip]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    inputValidatorv2(
      state,
      'state',
      labelState,
      setLabelState,
      true,
      /[^a-zA-Z]+/,
      'Allowed Characters: A-Z'
    );
    inputValidatorv2(
      city,
      'city',
      labelCity,
      setLabelCity,
      true,
      /[^'a-zA-Z- ]+/,
      "Allowed Characters: A-Z, -, space, '"
    );
  }, [state, city]);

  return (
    <div className="App">
      <Row className="mainrow">
        <Col>
          <div>
            {/* <button type = "button" onClick = {() => console.log(cityState.city + " and " + cityState.state + " and " + cityState.stateWorkedIn)}>Log city</button> */}
            <Form.Group>
              <Form.Label
                className={labelZip !== 'Zip *' ? 'validationErrorText' : ''}
              >
                {labelZip}
              </Form.Label>
              <Form.Control
                value={zip || ''}
                type="text"
                placeholder="Numbers"
                className={labelZip !== 'Zip *' ? 'validationErrorInput' : ''}
                name="zip"
                id="zip"
                onChange={(event) => {
                  const { value } = event.target;
                  dispatch(
                    updateInfo({
                      field: 'zip',
                      value: value.replace(/[^\d{5}]$/, '').substr(0, 5),
                    })
                  );
                  inputValidator(
                    event,
                    'zip',
                    labelZip,
                    setLabelZip,
                    true,
                    /[^\d{5}]$/,
                    'Allowed Characters: 0-9'
                  );
                }}
                onBlur={(event) => {
                  inputValidator(
                    event,
                    'zip',
                    labelZip,
                    setLabelZip,
                    true,
                    /[^\d{5}]$/,
                    'Allowed Characters: 0-9'
                  );
                }}
              />
            </Form.Group>
          </div>
        </Col>
        <Col>
          <div>
            <Form.Group>
              <Form.Label
                className={
                  labelState !== 'State *' ? 'validationErrorText' : ''
                }
              >
                {labelState}
              </Form.Label>
              <Form.Control
                value={state}
                maxLength={2}
                type="text"
                placeholder="Text"
                className={
                  labelState !== 'State *' ? 'validationErrorInput' : ''
                }
                name="state"
                id="state"
                onChange={(event) => {
                  const value = event.target.value.toUpperCase();
                  const re = /^[A-Za-z]+$/;
                  if (value === '' || re.test(value)) {
                    dispatch(updateInfo({ field: 'state', value }));
                  }
                  inputValidator(
                    event,
                    'state',
                    labelState,
                    setLabelState,
                    true,
                    /[^a-zA-Z]+/,
                    'Allowed Characters: A-Z'
                  );
                }}
                onBlur={(event) => {
                  inputValidator(
                    event,
                    'state',
                    labelState,
                    setLabelState,
                    true,
                    /[^a-zA-Z]+/,
                    'Allowed Characters: A-Z'
                  );
                }}
              />
            </Form.Group>
          </div>
        </Col>
        <Col>
          <div>
            <Form.Group>
              <Form.Label
                className={labelCity !== 'City *' ? 'validationErrorText' : ''}
              >
                {labelCity}
              </Form.Label>
              <Form.Control
                className={labelCity !== 'City *' ? 'validationErrorInput' : ''}
                value={city}
                type="text"
                placeholder="Text"
                name="city"
                id="city"
                onChange={(event) => {
                  const { value } = event.target;
                  dispatch(updateInfo({ field: 'city', value }));
                  inputValidator(
                    event,
                    'city',
                    labelCity,
                    setLabelCity,
                    true,
                    /[^'a-zA-Z- ]+/,
                    "Allowed Characters: A-Z, -, space, '"
                  );
                }}
                onBlur={(event) => {
                  inputValidator(
                    event,
                    'city',
                    labelCity,
                    setLabelCity,
                    true,
                    /[^'a-zA-Z- ]+/,
                    "Allowed Characters: A-Z, -, space, '"
                  );
                }}
              />
            </Form.Group>
          </div>
        </Col>
        <Col>
          <div className="dropdown">
            <Form.Group>
              <Form.Label>Worked in State </Form.Label>
              <Form.Select
                value={abbrevHolder}
                onChange={(event) => {
                  abbrevHolder = event.target.value;
                  dispatch(
                    updateInfo({ field: 'workedInState', value: abbrevHolder })
                  );
                }}
              >
                {JSONFile.map((stater, index) => (
                  <option value={stater.abbreviation} key={index}>
                    {stater.abbreviation}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
