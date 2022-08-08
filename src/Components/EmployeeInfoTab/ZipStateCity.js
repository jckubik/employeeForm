/* eslint-disable react/prop-types */
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux';
import { updateInfo } from '../../Slices/employeeInfoSlice';

const ZipStateCity = ({
  zip,
  labelZip,
  setLabelZip,
  state,
  labelState,
  setLabelState,
  city,
  labelCity,
  setLabelCity,
  labelWorkedInState,
}) => {
  const dispatch = useDispatch();

  const states = [
    { displayText: 'Select', code: 'None' },
    { displayText: 'AA', value: 'AA' },
    { displayText: 'AE', value: 'AE' },
    { displayText: 'AK', value: 'AK' },
    { displayText: 'AL', value: 'AL' },
    { displayText: 'AP', value: 'AP' },
    { displayText: 'AR', value: 'AR' },
    { displayText: 'AS', value: 'AS' },
    { displayText: 'AZ', value: 'AZ' },
    { displayText: 'CA', value: 'CA' },
    { displayText: 'CO', value: 'CO' },
    { displayText: 'CT', value: 'CT' },
    { displayText: 'DC', value: 'DC' },
    { displayText: 'DE', value: 'DE' },
    { displayText: 'FL', value: 'FL' },
    { displayText: 'FM', value: 'FM' },
    { displayText: 'GA', value: 'GA' },
    { displayText: 'GU', value: 'GU' },
    { displayText: 'HI', value: 'HI' },
    { displayText: 'IA', value: 'IA' },
    { displayText: 'ID', value: 'ID' },
    { displayText: 'IL', value: 'IL' },
    { displayText: 'IN', value: 'IN' },
    { displayText: 'KS', value: 'KS' },
    { displayText: 'KY', value: 'KY' },
    { displayText: 'LA', value: 'LA' },
    { displayText: 'MA', value: 'MA' },
    { displayText: 'MD', value: 'MD' },
    { displayText: 'ME', value: 'ME' },
    { displayText: 'MH', value: 'MH' },
    { displayText: 'MI', value: 'MI' },
    { displayText: 'MN', value: 'MN' },
    { displayText: 'MO', value: 'MO' },
    { displayText: 'MP', value: 'MP' },
    { displayText: 'MS', value: 'MS' },
    { displayText: 'MT', value: 'MT' },
    { displayText: 'NC', value: 'NC' },
    { displayText: 'ND', value: 'ND' },
    { displayText: 'NE', value: 'NE' },
    { displayText: 'NH', value: 'NH' },
    { displayText: 'NJ', value: 'NJ' },
    { displayText: 'NM', value: 'NM' },
    { displayText: 'NV', value: 'NV' },
    { displayText: 'NY', value: 'NY' },
    { displayText: 'OH', value: 'OH' },
    { displayText: 'OK', value: 'OK' },
    { displayText: 'OR', value: 'OR' },
    { displayText: 'PA', value: 'PA' },
    { displayText: 'PR', value: 'PR' },
    { displayText: 'PW', value: 'PW' },
    { displayText: 'RI', value: 'RI' },
    { displayText: 'SC', value: 'SC' },
    { displayText: 'SD', value: 'SD' },
    { displayText: 'TN', value: 'TN' },
    { displayText: 'TX', value: 'TX' },
    { displayText: 'UT', value: 'UT' },
    { displayText: 'VA', value: 'VA' },
    { displayText: 'VI', value: 'VI' },
    { displayText: 'VT', value: 'VT' },
    { displayText: 'WA', value: 'WA' },
    { displayText: 'WI', value: 'WI' },
    { displayText: 'WV', value: 'WV' },
    { displayText: 'WY', value: 'WY' },
  ];

  return (
    <Row>
      <Col sm={2}>
        <Form.Group controlId="formZip">
          <Form.Label>{labelZip}</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Text"
            value={zip}
            onChange={(event) => {
              dispatch(updateInfo({ value: event.target.value, field: 'zip' }));
            }}
          />
        </Form.Group>
      </Col>
      <Col sm={2}>
        <Form.Group controlId="formState">
          <Form.Label>{labelState}</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Text"
            value={state}
            onChange={(event) =>
              dispatch(
                updateInfo({ value: event.target.value, field: 'state' })
              )
            }
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="formCity">
          <Form.Label>{labelCity}</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Text"
            value={city}
            onChange={(event) =>
              dispatch(updateInfo({ value: event.target.value, field: 'city' }))
            }
          />
        </Form.Group>
      </Col>
      <Col sm={3}>
        <Form.Group controlId="formWorkedInState">
          <Form.Label>{labelWorkedInState}</Form.Label>
          <Form.Select
            size="sm"
            onChange={(event) => {
              dispatch(
                updateInfo({
                  value: event.target.value,
                  field: 'workedInState',
                })
              );
            }}
          >
            {states.map((stateWorked, index) => (
              <option key={index} value={stateWorked.value}>
                {stateWorked.displayText}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default ZipStateCity;
