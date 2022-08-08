import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentPage,
  setPageAccessibility,
  setReviewAccess,
} from '../Slices/navigationSlice';

const NavRow = () => {
  const dispatch = useDispatch();
  const { pages, currentPage, reviewAccessible } = useSelector(
    (state) => state.navigation
  );
  const employeeInfo = useSelector((state) => state.employeeInfo);
  const payTaxInfo = useSelector((state) => state.payTaxInfo);
  const bankInfo = useSelector((state) => state.bankInfo);
  const params = new URLSearchParams(window.location.search);
  const oid = params.get('oid');
  const client = params.get('client');

  // Check page accessibility - payTaxInfo
  useEffect(() => {
    dispatch(
      setPageAccessibility({
        index: 1,
        value: employeeInfo.allValid && employeeInfo.allRequired,
      })
    );
  }, [employeeInfo.allValid, employeeInfo.allRequired]);

  // Check page accessibility - bankInfoTab
  useEffect(() => {
    dispatch(
      setPageAccessibility({
        index: 2,
        value: payTaxInfo.allValid && payTaxInfo.allRequired,
      })
    );
  }, [payTaxInfo.allValid, payTaxInfo.allRequired]);

  // Check page accessibility - reviewTab
  useEffect(() => {
    dispatch(
      setPageAccessibility({
        index: 3,
        value: bankInfo.allValid && bankInfo.allRequired,
      })
    );
  }, [bankInfo.allValid, bankInfo.allRequired]);

  useEffect(() => {
    console.log(pages);
    console.log('current page:', currentPage);
  }, [pages, currentPage]);

  const handleNavigation = (event, accessible) => {
    if (!accessible) {
      event.preventDefault();
    }
  };

  return (
    <Container id="topRowContainer">
      <Row>
        <Col md={8}>
          <Navbar variant="dark">
            {pages.map((page) => (
              <NavLink
                id={page.id}
                key={page.id}
                className="navbarLink"
                onClick={(event) => handleNavigation(event, page.accessible)}
                to={page.url}
              >
                {page.label}
              </NavLink>
            ))}
          </Navbar>
        </Col>
        <Col md={{ offset: 1, span: 2 }}>
          <Row>
            <h6>
              OID:
              <br />
              {oid}
            </h6>
          </Row>
          <Row>
            <h6>
              Client:
              <br />
              {client}
            </h6>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default NavRow;
