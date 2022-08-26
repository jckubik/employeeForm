import Col from 'react-bootstrap/Col';
import { FaExternalLinkAlt } from 'react-icons/fa';
import ReviewTab from '../ReviewTab/ReviewTab';

const Privacy = () => (
  <a
    id="privacyLink"
    href="#"
    onClick={() => {
      window.open(
        'http://privacy.adp.com/privacy.html',
        'myWin',
        'scrollbars=yes,width=600,height=650'
      );
      return false;
    }}
  >
    <FaExternalLinkAlt /> Privacy
  </a>
);

export default Privacy;
