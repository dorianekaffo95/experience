import React, { Component } from "react";
import PropTypes from "prop-types";
// Translation
import { injectIntl, FormattedMessage } from "react-intl";

import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Guests.css";
import { Button } from "react-bootstrap";
import cx from "classnames";

// Redux Form
import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  submit as submitForm,
} from "redux-form";

// Redux
import { connect } from "react-redux";

// Locale
import messages from "../../../locale/messages";

// Internal Component
import IncrementBtnCircle from "../../IncrementBtnCircle";

// Action
import { setPersonalizedValues } from "../../../actions/personalized";

// Submit
// import submit from "../SearchForm/submit";

class Guests extends Component {
  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool,
  };

  static defaultProps = {
    isExpand: false,
    fieldsSettingsData: {
      adults: [],
      teens: [],
      children: [],
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState((state) => ({...state, isExpanded: false}));
    }
  }

  renderIncrementButton = (field) => <IncrementBtnCircle {...field} />;

  toggleExpandedView = (event) => {
    let { isExpanded } = this.state;
    this.setState({ isExpanded: !isExpanded });
  };

  handleClick = (event) => {
    this.setState((state) => ({...state, isExpanded: false}));
  }

  render() {
    const { className, handleTabToggle, isExpand } = this.props;
    const {
      setPersonalizedValues,
      personalized: { adults, teens, children },
    } = this.props;
    const { isExpanded } = this.state;

    const { formatMessage } = this.props.intl;

    let label = formatMessage(messages.guests);

    let totalGuests = 0;

    if (
      (adults && adults > 0) ||
      (teens && teens > 0) ||
      (children && children > 0)
    ) {
      label = "";
      let groups = 0;

      if (adults && adults > 0) {
        totalGuests += adults;
        label += `${adults} ${
          adults > 1
            ? formatMessage(messages.adults)
            : formatMessage(messages.adult)
        }`;
        groups += 1;
      }

      if (teens && teens > 0) {
        totalGuests = teens;
        label += `${groups > 0 ? ", " : ""}${teens} ${
          teens > 1
            ? formatMessage(messages.teens)
            : formatMessage(messages.teen)
        }`;
        groups += 1;
      }

      if (children && children > 0) {
        totalGuests = children;
        label += `${groups > 0 ? ", " : ""}${children} ${
          children > 1
            ? formatMessage(messages.children)
            : formatMessage(messages.child)
        }`;
        groups += 1;
      }
    }

    return (
      <div ref={this.wrapperRef} className={cx(s.relativePos)}>
        <div className={cx(s.loadfield, "vidFormsearch")} onClick={this.toggleExpandedView}>
          <a
            className={cx(s.placeholder, s["vert-center"])}
          >
            {label}
          </a>
        </div>
        {isExpanded && (
          <div className={cx(className, s.ctn)}>
            <svg
              role="presentation"
              focusable="false"
              className={cx(s.fang)}
              style={{ top: "-10px" }}
            >
              <path
                className={cx(s["fang-shape"])}
                d="M0,10 20,10 10,0z"
              ></path>
              <path
                className={cx(s["fang-stroke"])}
                d="M0,10 10,0 20,10"
              ></path>
            </svg>
            <div>
              <div className={cx(s.displayTable, s.space2)}>
                <div
                  className={cx(
                    s.displayTableCell,
                    s.captionTitle,
                    s.fullWidth,
                    s.capitalizeText,
                    s.darkGrey
                  )}
                >
                  {formatMessage(messages.adults)}
                </div>
                <div className={cx(s.displayTableCell, s.fullWidth)}>
                  <Field
                    name="adults"
                    type="text"
                    component={this.renderIncrementButton}
                    maxValue={/*adults[0].endValue*/ 25}
                    minValue={0}
                    incrementBy={1}
                    onChange={(event, newValue, previousValue, name) => {
                      setPersonalizedValues({
                        name: "adults",
                        value: Number(newValue),
                      });
                    }}
                  />
                </div>
              </div>
              <div className={cx(s.displayTable, s.space2)}>
                <div
                  className={cx(
                    s.displayTableCell,
                    s.captionTitle,
                    s.fullWidth,
                    s.capitalizeText,
                    s.darkGrey
                  )}
                >
                  {formatMessage(messages.teensAgeGroup)}
                </div>
                <div className={cx(s.displayTableCell, s.fullWidth)}>
                  <Field
                    name="teens"
                    type="text"
                    component={this.renderIncrementButton}
                    maxValue={/*teens[0].endValue*/ 25}
                    minValue={0}
                    incrementBy={1}
                    onChange={(event, newValue, previousValue, name) => {
                      setPersonalizedValues({
                        name: "teens",
                        value: Number(newValue),
                      });
                    }}
                  />
                </div>
              </div>
              <div className={cx(s.displayTable, s.space4)}>
                <div
                  className={cx(
                    s.displayTableCell,
                    s.captionTitle,
                    s.fullWidth,
                    s.capitalizeText,
                    s.darkGrey
                  )}
                >
                  {formatMessage(messages.kidsAgeGroup)}
                </div>
                <div className={cx(s.displayTableCell, s.fullWidth)}>
                  <Field
                    name="children"
                    type="text"
                    component={this.renderIncrementButton}
                    maxValue={/*kids[0].endValue*/ 25}
                    minValue={0}
                    incrementBy={1}
                    onChange={(event, newValue, previousValue, name) => {
                      setPersonalizedValues({
                        name: "children",
                        value: Number(newValue),
                      });
                    }}
                  />
                </div>
              </div>
              <div className={cx(s.search)}>
                  <Button
                    className={cx(s.btn, s.btnPrimary, s.btnBlock)}
                    style={{width: '100%'}}
                    onClick={this.handleClick}
                  >
                    <span className={cx("hidden-md hidden-sm")}>
                      <FormattedMessage {...messages.ok} />
                    </span>
                  </Button>
                </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Guests = reduxForm({
  form: "DetailSearchForm", // a unique name for this form
  // onSubmit: submit,
  destroyOnUnmount: false,
})(Guests);

// Decorate with connect to read form values
const selector = formValueSelector("DetailSearchForm"); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data,
  personalized: state.personalized,
});

const mapDispatch = {
  change,
  submitForm,
  setPersonalizedValues,
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(Guests))
);
