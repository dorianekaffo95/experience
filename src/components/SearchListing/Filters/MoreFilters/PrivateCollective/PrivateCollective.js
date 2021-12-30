import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";

import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./PrivateCollective.css";

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
import messages from "../../../../../locale/messages";

// Submit
import submit from "../../../SearchForm/submit";

import CustomCheckbox from "../../../../CustomCheckbox";

class PrivateCollective extends Component {
  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    const { className, handleTabToggle, isExpand, bookingType } = this.props;

    return (
      <div className={className}>
        {/* <p className={cx(s.captionTitle, s.space4, s.spaceTop4, s.textBold)}>
          {captionTitle}
        </p> */}
        <div className={cx(s.displayTable, s.space4)}>
          <div className={cx(s.displayTableRow)}>
            <p
              className={cx(s.captionTitle, s.space4, s.spaceTop4, s.textBold)}
            >
              <FormattedMessage {...messages.privateExperience} />
            </p>
          </div>
          <div className={s.displayTableRow}>
            <div>
              <Field
                name="privateOrCollective"
                component="input"
                type="radio"
                value="PRIVATE"
                className={cx(s["radio-btn"])}
              />
              <label className={cx(s.landingLabel, s["radio-label"])}>
                {" "} <FormattedMessage {...messages.private} />
              </label>
            </div>
            <div>
              <Field
                name="privateOrCollective"
                component="input"
                type="radio"
                value="COLLECTIVE"
                className={cx(s["radio-btn"])}
              />
              <label className={cx(s.landingLabel, s["radio-label"])}>
                {" "}
                <FormattedMessage {...messages.collective} />
              </label>
            </div>
            <div>
              <Field
                name="privateOrCollective"
                component="input"
                type="radio"
                value="PRIVATE_COLLECTIVE"
                className={cx(s["radio-btn"])}
              />
              <label className={cx(s.landingLabel, s["radio-label"])}>
                {" "} <FormattedMessage {...messages.privateCollective} />
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PrivateCollective = reduxForm({
  form: "SearchForm", // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(PrivateCollective);

// Decorate with connect to read form values
const selector = formValueSelector("SearchForm"); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data,
  bookingType: selector(state, "bookingType"),
});

const mapDispatch = {
  change,
  submitForm,
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(PrivateCollective))
);
