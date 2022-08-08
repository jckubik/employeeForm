/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentPage,
  setPageAccessibility,
} from '../Slices/navigationSlice';

const BottomRow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pages, currentPage, reviewAccessible } = useSelector(
    (state) => state.navigation
  );
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;

  const navigateNext = () => {
    if (nextPage <= 3 && nextPage >= 0) {
      navigate(pages[nextPage].url);
    }
  };

  const navigatePrev = () => {
    if (prevPage >= 0 && prevPage <= 2) {
      navigate(pages[prevPage].url);
    }
  };

  const navigateReview = () => {
    navigate(pages[3].url);
  };

  return (
    <div>
      <Col id="bottomButtonContainer" md={{ offset: 9 }}>
        <Button
          variant="secondary"
          onClick={navigatePrev}
          disabled={prevPage < 0}
        >
          Previous
        </Button>{' '}
        <Button
          variant="secondary"
          onClick={navigateNext}
          disabled={nextPage > 3 || !pages[nextPage].accessible}
        >
          Next
        </Button>{' '}
        <Button
          variant="secondary"
          onClick={navigateReview}
          disabled={!reviewAccessible}
        >
          Review
        </Button>
      </Col>
    </div>
  );
};

export default BottomRow;
