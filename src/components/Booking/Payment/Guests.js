import React, { Component } from "react";
import PropTypes from "prop-types";
// Translation
import { injectIntl, FormattedMessage } from "react-intl";

import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Payment.css";
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
    maxAdults: PropTypes.number,
    maxTeens: PropTypes.number,
    maxChildrenOrYounger: PropTypes.number,
    personCapacity: PropTypes.number,
    updateTotal: PropTypes.func
  };

  static defaultProps = {
    isExpand: false,
    maxAdults: 0,
    maxTeens: 0,
    maxChildrenOrYounger: 0,
  };

  constructor(props) {
    super(props);
  }

  renderIncrementButton = (field) => <IncrementBtnCircle {...field} />;

  getMaxValue = (value, maxValue) => {
    const {adults, teens, childOrYounger, personCapacity} = this.props;
    const totalGuests = (adults || 0) + (teens || 0) + (childOrYounger || 0);
    const remainingGuests = personCapacity - totalGuests >= 0 ? personCapacity - totalGuests : 0;
    console.log("Tous les invités: ", totalGuests, adults, teens, childOrYounger, maxValue, remainingGuests);
    return maxValue <= ((value || 0) + remainingGuests) ? maxValue : (value || 0) + remainingGuests;
  }

  render() {
    const { className, handleTabToggle, isExpand, updateTotal } = this.props;
    const {
      setPersonalizedValues, adults, teens, childOrYounger, maxAdults, maxTeens, maxChildrenOrYounger, personCapacity
    } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(className, s.ctn)} style={{display: 'contents'}}>
        <div className={cx(s.displayTable, s.space2)}>
          <div
            className={cx(
              s.displayTableCell,
              s.captionTitle,
              s.fullWidth,
              s.capitalizeText
            )}
          >
            {formatMessage(messages.adults)}
          </div>
          <div className={cx(s.displayTableCell, s.fullWidth)}>
            <Field
              name="adults"
              type="text"
              component={this.renderIncrementButton}
              maxValue={this.getMaxValue(adults, maxAdults)}
              minValue={0}
              incrementBy={1}
              onChange={(event, newValue, previousValue, name) => updateTotal(newValue, teens, childOrYounger)}
            />
          </div>
        </div>
        <div className={cx(s.displayTable, s.space2)}>
          <div
            className={cx(
              s.displayTableCell,
              s.captionTitle,
              s.fullWidth,
              s.capitalizeText
            )}
          >
            {formatMessage(messages.teensAgeGroup)}
          </div>
          <div className={cx(s.displayTableCell, s.fullWidth)}>
            <Field
              name="teens"
              type="text"
              component={this.renderIncrementButton}
              maxValue={this.getMaxValue(teens, maxTeens)}
              minValue={0}
              incrementBy={1}
              onChange={(event, newValue, previousValue, name) => updateTotal(adults, newValue, childOrYounger)}
            />
          </div>
        </div>
        <div className={cx(s.displayTable, s.space4)}>
          <div
            className={cx(
              s.displayTableCell,
              s.captionTitle,
              s.fullWidth,
              s.capitalizeText
            )}
          >
            {formatMessage(messages.kidsAgeGroup)}
          </div>
          <div className={cx(s.displayTableCell, s.fullWidth)}>
            <Field
              name="childrenOrYounger"
              type="text"
              component={this.renderIncrementButton}
              maxValue={this.getMaxValue(childOrYounger, maxChildrenOrYounger)}
              minValue={0}
              incrementBy={1}
              onChange={(event, newValue, previousValue, name) => updateTotal(adults, teens, newValue)}
            />
          </div>
        </div>
      </div>
    );
  }
}

Guests = reduxForm({
  form: "PaymentForm", // a unique name for this form
  // onSubmit: submit,
  destroyOnUnmount: false,
})(Guests);

// Decorate with connect to read form values
const selector = formValueSelector("PaymentForm"); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data,
  adults: selector(state, 'adults'),
  teens: selector(state, 'teens'),
  childOrYounger: selector(state, 'childrenOrYounger'),
});

const mapDispatch = {
  change,
  submitForm,
  setPersonalizedValues,
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(Guests))
);
