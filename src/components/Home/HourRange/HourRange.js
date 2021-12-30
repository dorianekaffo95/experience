import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./HourRange.css";
import cx from "classnames";
import PropTypes from "prop-types";

import { FormControl, Col, Row } from "react-bootstrap";
import * as FontAwesome from "react-icons/lib/fa";

// Action
import { setPersonalizedValues } from "../../../actions/personalized";

// Redux
import { connect } from "react-redux";

import messages from "../../../locale/messages";

class HourRange extends React.Component {
  static propTypes = {
    classNames: PropTypes.arrayOf(PropTypes.any),
  };

  static defaultProps = {
    classNames: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      startFocused: false,
      endFocused: false,
    };
  }

  onTimeChange = (e) => {
    const { setPersonalizedValues } = this.props;
    setPersonalizedValues({ name: e.target.name, value: e.target.value });
  };

  onFocus = (e) => {
    console.log("Focus input: ", e.target);
    if (e.target.name === "startTime") this.setState({ startFocused: true });
    if (e.target.name === "endTime") this.setState({ endFocused: true });
  };

  onBlur = (e) => {
    console.log("Blur input: ", e.target);
    if (e.target.name === "startTime") this.setState({ startFocused: false });
    if (e.target.name === "endTime") this.setState({ endFocused: false });
  };

  render() {
    const { isExpanded, startFocused, endFocused } = this.state;
    const {
      personalized,
      intl: { formatMessage },
      classNames,
    } = this.props;

    return (
      <div>
        <div className={cx(...classNames, s.loadfield)}>
          <Row>
            <Col
              className={cx(s["start-input-ctn"])}
              xs={5}
              sm={5}
              md={5}
              lg={5}
            >
              <FormControl
                className={cx(s.formControlInput, s.input, s.timeinput)}
                value={personalized && personalized.startTime}
                placeholder={formatMessage(messages.from)}
                type={
                  (personalized && personalized.startTime) || startFocused
                    ? "time"
                    : "text"
                }
                name="startTime"
                onChange={this.onTimeChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
              />
            </Col>
            <Col
              className={cx(s["arrow-container"])}
              xs={2}
              sm={2}
              md={2}
              lg={2}
            >
              <svg className={cx(s.arrow)} viewBox="0 0 1000 1000">
                <path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z"></path>
              </svg>
            </Col>
            <Col className={cx(s["end-input-ctn"])} xs={5} sm={5} md={5} lg={5}>
              <FormControl
                className={cx(s.formControlInput, s.input, s.timeinput)}
                value={personalized && personalized.endTime}
                placeholder={formatMessage(messages.to)}
                type={
                  (personalized && personalized.endTime) || endFocused
                    ? "time"
                    : "text"
                }
                name="endTime"
                onChange={this.onTimeChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
              />
            </Col>
          </Row>
        </div>
        {isExpanded && <div></div>}
      </div>
    );
  }
}

const mapState = (state) => ({
  personalized: state.personalized,
});

const mapDispatch = {
  setPersonalizedValues,
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(HourRange))
);
