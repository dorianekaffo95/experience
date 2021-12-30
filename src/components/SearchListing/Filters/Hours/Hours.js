import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl } from "react-intl";

import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Hours.css";
import { Button, Col } from "react-bootstrap";
import cx from "classnames";
import moment from "moment";
import MdClear from "react-icons/lib/md/clear";

// Redux
import { connect } from "react-redux";

// Redux form
import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  submit as submitForm,
} from "redux-form";

// Locale
import messages from "../../../../locale/messages";

// Components
import DateRange from "../../DateRange";

// Submit Action
import submit from "../../SearchForm/submit";

import { setPersonalizedValues } from "../../../../actions/personalized";
import HourRange from "../../../Home/HourRange/HourRange";

class Hours extends Component {
  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool,
  };

  static defaultProps = {
    isExpand: false,
    smallDevice: false,
    verySmallDevice: false,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setBtnWrapperRef = this.setBtnWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  componentWillReceiveProps(nextProps) {
    const {currentLocale} = nextProps;
    if (currentLocale) {
      moment.locale(currentLocale);
    }
  }

  async handleSubmit() {
    const { className, handleTabToggle, isExpand } = this.props;
    const {
      change,
      submitForm,
      personalized,
      setPersonalizedValues,
    } = this.props;
    let endTime;

    if (personalized && personalized.startTime) {
      change('startTime', `${personalized.startTime}`);
    }
    if (personalized && personalized.endTime) {
      change('endTime', `${personalized.endTime}`);
    }
    await change("currentPage", 1);
    submitForm("SearchForm");
    handleTabToggle("hours", !isExpand);
  }

  handleReset() {
    const { className, handleTabToggle, isExpand } = this.props;
    const { change, submitForm, setPersonalizedValues } = this.props;
    change("hours", null);
    change("startTime", null);
    change("endTime", null);
    setPersonalizedValues({ name: "startTime", value: null });
    setPersonalizedValues({ name: "endTime", value: null });
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  setBtnWrapperRef(node) {
    this.btnWrapperRef = node;
  }

  handleClickOutside(event) {
    const { className, handleTabToggle, isExpand } = this.props;
    const {
      change,
      submitForm,
      personalized,
      setPersonalizedValues,
    } = this.props;
    let endTime;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (personalized && personalized.startTime) {
        change('startTime', `${personalized.startTime}`);
      }
      if (personalized && personalized.endTime) {
        change('endTime', `${personalized.endTime}`);
      }

      change("currentPage", 1);
      submitForm("SearchForm");
      if (this.btnWrapperRef && !this.btnWrapperRef.contains(event.target)) {
        handleTabToggle("hours", !isExpand);
      }
    }
  }

  renderHourRange = ({
    input,
    label,
    meta: { touched, error },
    className,
    formName,
    numberOfMonths,
  }) => {
    const { formatMessage } = this.props.intl;
    const { handleSubmit, change, smallDevice, verySmallDevice } = this.props;
    return (
      <div className={cx("searchFilter", s.ctn, s.space4)}>
        <HourRange
          {...input}
          formName={formName}
          numberOfMonths={numberOfMonths}
          onChange={(value) => {
            input.onChange(value);
          }}
          smallDevice={smallDevice}
          verySmallDevice={verySmallDevice}
        />
      </div>
    );
  };

  render() {
    const {
      className,
      handleTabToggle,
      isExpand,
      personalized,
      smallDevice,
    } = this.props;
    const { formatMessage } = this.props.intl;

    moment.locale();

    let buttonLabel = isExpand
      ? formatMessage(messages.from) + " - " + formatMessage(messages.to)
      : formatMessage(messages.hours);
    let isActive = false;
    if (personalized) {
      if (personalized.startTime && !personalized.endTime) {
        buttonLabel =
          moment(personalized.startTime, [moment.ISO_8601, "HH:mm"]).format(
            "LT"
          ) +
          " - " +
          formatMessage(messages.to);
        isActive = true;
      } else if (!personalized.startTime && personalized.endTime) {
        buttonLabel =
          formatMessage(messages.from) +
          " - " +
          moment(personalized.endTime, [moment.ISO_8601, "HH:mm"]).format(
            "LT"
          );
        isActive = true;
      } else if (personalized.startTime && personalized.endTime) {
        if (personalized.startTime == personalized.endTime) {
          buttonLabel = moment(personalized.startTime, [
            moment.ISO_8601,
            "HH:mm",
          ]).format("LT");
        } else {
          buttonLabel =
            moment(personalized.startTime, [moment.ISO_8601, "HH:mm"]).format(
              "LT"
            ) +
            " - " +
            moment(personalized.endTime, [moment.ISO_8601, "HH:mm"]).format(
              "LT"
            );
        }
        isActive = true;
      }
    }

    return (
      <div className={className}>
        <div ref={this.setBtnWrapperRef}>
          <Button
            className={cx(
              { [s.btnSecondary]: isExpand === true || isActive == true },
              s.btn,
              s.btnFontsize,
              s.responsiveFontsize
            )}
            onClick={() => handleTabToggle("hours", !isExpand)}
          >
            {buttonLabel}
          </Button>
        </div>
        {isExpand && (
          <div
            className={cx(s.searchFilterPopover, {
              [s.searchFilterPopoverFull]: smallDevice == true,
            })}
            ref={this.setWrapperRef}
          >
            <div className={s.searchFilterPopoverContent}>
              <div
                className={cx(
                  "visible-xs visible-sm",
                  s.searchFilterPopoverHeader
                )}
              >
                <div className={cx(s.displayTable)}>
                  <div
                    className={cx(
                      "text-left",
                      s.displayTableCell,
                      s.searchFilterCloseIcon
                    )}
                  >
                    <span onClick={this.handleSubmit}>
                      <MdClear />
                    </span>
                  </div>
                  <div className={cx("text-right", s.displayTableCell)}>
                    {personalized &&
                      personalized.startDate &&
                      personalized.endDate && (
                        <Button
                          bsStyle="link"
                          className={cx(s.btnLink)}
                          onClick={this.handleReset}
                        >
                          <FormattedMessage {...messages.clear} />
                        </Button>
                      )}
                  </div>
                </div>
              </div>
              <Field
                name="hours"
                component={this.renderHourRange}
                formName={"SearchForm"}
                numberOfMonths={2}
                smallDevice={smallDevice}
              />
              <div className={cx(s.searchFilterPopoverFooter, s.displayTable)}>
                <div
                  className={cx(
                    "text-left",
                    "hidden-xs hidden-sm",
                    s.displayTableCell
                  )}
                >
                  {personalized &&
                    personalized.startDate &&
                    personalized.endDate && (
                      <Button
                        bsStyle="link"
                        className={cx(s.btnLink)}
                        onClick={this.handleReset}
                      >
                        <FormattedMessage {...messages.clear} />
                      </Button>
                    )}
                </div>
                <div className={cx(s.displayTableCell)}>
                  <Button
                    bsStyle="link"
                    className={cx(s.btnLink, s.btnLinkSecondary, "hidden-xs")}
                    onClick={this.handleSubmit}
                  >
                    <FormattedMessage {...messages.apply} />
                  </Button>
                  <Col
                    xs={6}
                    xsOffset={6}
                    className={cx(s.noPadding, "visible-xs")}
                  >
                    <Button
                      className={cx(s.btn, s.btnSecondary, s.fullWidth)}
                      onClick={this.handleSubmit}
                    >
                      <FormattedMessage {...messages.apply} />
                    </Button>
                  </Col>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Hours = reduxForm({
  form: "SearchForm", // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(Hours);

const selector = formValueSelector("SearchForm");

const mapState = (state) => ({
  personalized: state.personalized,
  currentLocale: state.intl.locale,
});

const mapDispatch = {
  change,
  setPersonalizedValues,
  submitForm,
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Hours)));
