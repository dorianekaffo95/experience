import React from "react";

// -- Bootstrap
import { Col, Row, Container } from "react-bootstrap";

// -- PropTypes
import PropTypes from 'prop-types';

class ExperienceHours extends React.Component {
    static propTypes = {
        startTime: PropTypes.string,
        endTime: PropTypes.string,
        price: PropTypes.number,
    }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={6} lg={6}>
            sam. 7 nov.
          </Col>
          <Col xs={6} lg={6} style={{float: "right"}}>
            <Currency></Currency>/personne
          </Col>
        </Row>
        <Row>
          <Col xs={6} lg={6}>
            <div>{startTime} - {endTime}</div>
          </Col>
          <Col xs={6} lg={6} style={{float: "right"}}>
            <button>Selectionner</button>
          </Col>
        </Row>
      </Container>
    );
  }
}
