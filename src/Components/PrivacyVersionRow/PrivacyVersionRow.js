import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Privacy from './Privacy';

const PrivacyVersionRow = () => (
  <Container>
    <Row>
      <Row>
        <Col md={3}>
          <Privacy /> <span id="privacySpacer" /> Version 1.0
        </Col>
      </Row>
    </Row>
  </Container>
);

export default PrivacyVersionRow;
