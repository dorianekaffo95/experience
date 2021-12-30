import React from "react";
import { injectIntl } from "react-intl";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./HourRange.css";
import cx from "classnames";
import PropTypes from "prop-types";

import { FormControl, Col, Row } from "react-bootstrap";
import * as FontAwesome from "react-icons/lib/fa";

// Redux
import { connect } from "react-redux";
// Locale
import messages from '../../locale/messages';

import {
  Field,
  reduxForm,
  formValueSelector,
  // submit as submitForm,
} from "redux-form";

class HourRange extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startFocused: false,
      endFocused: false,
    };
  }

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

  renderFormControl = ({
    input,
    label,
    type,
    meta: { touched, error },
    className,
  }) => {

    const { intl: {formatMessage}} = this.props;

    return (<div>
      <FormControl
        {...input}
        type={type}
        className={cx(s.formControlInput, s.input, s.timeinput)}
        placeholder={label}
      />
    </div>);
  }

  render() {
    const { isExpanded, startFocused, endFocused } = this.state;
    const { startTime, endTime, intl: { formatMessage } } = this.props;

    return (
      <div>
        <div className={cx(s.loadfield)}>
          <Row>
            <Col
              className={cx(s["start-input-ctn"])}
              xs={5}
              sm={5}
              md={5}
              lg={5}
            >
              <Field
                name={"startTime"}
                component={this.renderFormControl}
                label={formatMessage(messages.from)}
                type={
                  (startTime || startFocused)
                    ? "time"
                    : "text"
                }
                className={cx(s.formControlInput, s.input, s.timeinput)}
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
              <Field
                name={"endTime"}
                component={this.renderFormControl}
                label={formatMessage(messages.to)}
                type={
                  (endTime || endFocused)
                    ? "time"
                    : "text"
                }
                className={cx(s.formControlInput, s.input, s.timeinput)}
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

HourRange = reduxForm({
  form: "ListPlaceStep3", // a unique name for this form
  // onSubmit: submit,
  destroyOnUnmount: false,
})(HourRange);

const selector = formValueSelector("ListPlaceStep3");

const mapState = (state) => ({
  startTime: selector(state, 'startTime'),
  endTime: selector(state, 'endTime'),
});

const mapDispatch = { };

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(HourRange))
);
