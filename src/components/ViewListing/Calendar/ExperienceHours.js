import React, { Component } from "react";

// Components
import { Grid, Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import CurrencyConverter from "../../CurrencyConverter";
import { FormattedMessage, injectIntl } from "react-intl";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Calendar.css";
import cx from "classnames";
import messages from "../../../locale/messages";

import moment from "moment";

class ExperienceHours extends React.Component {
  static propTypes = {
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    date: PropTypes.string,
    price: PropTypes.number,
    currency: PropTypes.string,
    handleClick: PropTypes.func,
    isHost: PropTypes.bool
  };

  static defaultProps = {};

  isEnglishLocale = () => {
    let { locale } = this.props.intl;
    return ['en-us', 'en-tt', 'en-au', 'en-bz', 'en-ca', 'en-cb', 'en-gb', 'en-in', 'en-ie', 'en-jm', 'en-nz', 'en-ph', 'en-za'].includes(locale.toLowerCase());
  }

  render() {
    const {
      startTime,
      endTime,
      date,
      handleClick,
      price,
      currency,
      isHost
    } = this.props;
    let { locale } = this.props.intl;

    return (
      <Grid className={cx(s.fullWidth, s.expContainer)}>
        <Row>
          <Col lg={7} md={7} sm={7}>
            <b className={cx(s.bold)}>{moment(date).locale(locale).format("ddd, MMM Do")}</b>
          </Col>
          <Col lg={5} md={5} sm={5}>
            <b className={cx(s.bold)}>
              <CurrencyConverter amount={price} from={currency} />
            </b>
            {" / "} <FormattedMessage {...messages.person} />
          </Col>
        </Row>
        <Row>
          <Col lg={7} md={7} sm={7}>
          {moment(startTime, "HH:mm:ss").locale(locale).format(this.isEnglishLocale() ? "hh:mm A" : 'HH:mm')} - {moment(endTime, "HH:mm:ss").locale(locale).format(this.isEnglishLocale() ? "hh:mm A" : 'HH:mm')}
          </Col>
          <Col lg={5} md={5} sm={5}>
            <Button
              className={cx(s.btn, s.btnBlock, s.btnPrimary)}
              disabled={isHost}
              onClick={handleClick}
            >
              <FormattedMessage {...messages.select} />
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default injectIntl(withStyles(s)(ExperienceHours));
