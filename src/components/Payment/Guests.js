import React, { Component } from "react";
import PropTypes from "prop-types";
// Translation
import { injectIntl } from "react-intl";

import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Payment.css";
import cx from "classnames";

// Redux
import { connect } from "react-redux";

// Locale
import messages from "../../locale/messages";

// Internal Component
import IncrementBtnCircle from "../IncrementBtnCircle";

// Action
// import { setPersonalizedValues } from "../../../actions/personalized";

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
  }

  renderIncrementButton = (field) => <IncrementBtnCircle {...field} />;

  toggleExpandedView = (event) => {
    let { isExpanded } = this.state;
    this.setState({ isExpanded: !isExpanded });
  };

  getMaxValue = (value, maxValue) => {
    const { adults, teens, childrenOrYounger, personCapacity } = this.props;
    const totalGuests = (adults || 0) + (teens || 0) + (childrenOrYounger || 0);
    const remainingGuests = personCapacity - totalGuests >= 0 ? personCapacity - totalGuests : 0;
    return maxValue <= ((value || 0) + remainingGuests) ? maxValue : (value || 0) + remainingGuests;
  }

  render() {
    const { className, handleTabToggle, isExpand } = this.props;
    const {
      adults,
      teens,
      childrenOrYounger,
    } = this.props;
    const { isExpanded } = this.state;

    const { formatMessage } = this.props.intl;

    let label = formatMessage(messages.guests);

    let totalGuests = 0;

    if (
      (adults && adults > 0) ||
      (teens && teens > 0) ||
      (childrenOrYounger && childrenOrYounger > 0)
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

      if (childrenOrYounger && childrenOrYounger > 0) {
        totalGuests = childrenOrYounger;
        label += `${groups > 0 ? ", " : ""}${childrenOrYounger} ${
          childrenOrYounger > 1
            ? formatMessage(messages.children)
            : formatMessage(messages.child)
        }`;
        groups += 1;
      }
    }

    return (
      <div className={cx(s.relativePos)}>
        <div className={cx(s.loadfield, "vidFormsearch")}>
          <a
            className={cx(s.placeholder, s["vert-center"])}
            onClick={this.toggleExpandedView}
          >
            {label}
          </a>
        </div>
      </div>
    );
  }
}

export default injectIntl(
  withStyles(s)(Guests)
);
