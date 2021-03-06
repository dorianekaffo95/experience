import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl } from "react-intl";
// Style
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Calendar.css";
import { Button, FormGroup } from "react-bootstrap";
import cx from "classnames";
// Component
import Loader from "../../Loader";
import history from "../../../core/history";

// Locale
import messages from "../../../locale/messages";
class BookingButton extends Component {
  static propTypes = {
    availability: PropTypes.bool.isRequired,
    isDateChosen: PropTypes.bool.isRequired,
    basePrice: PropTypes.number.isRequired,
    isHost: PropTypes.bool.isRequired,
    bookingProcess: PropTypes.any.isRequired,
    listId: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    selectedHour: PropTypes.object,
    adults: PropTypes.number,
    teens: PropTypes.number,
    childrenOrYounger: PropTypes.number,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    bookingType: PropTypes.string.isRequired,
    bookingLoading: PropTypes.bool,
    formatMessage: PropTypes.any,
    maximumStay: PropTypes.bool,
    userBanStatus: PropTypes.number,
  };
  static defaultProps = {
    availability: true,
    isDateChosen: false,
    bookingLoading: false,
  };
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleClick() {
    const {
      bookingProcess,
      listId,
      guests,
      selectedHour,
      adults,
      teens,
      childrenOrYounger,
      startDate,
      endDate,
    } = this.props;
    
    bookingProcess(
      listId,
      adults + teens, // guests,
      selectedHour,
      // adults,
      // teens,
      // childrenOrYounger,
      // startDate,
      // endDate,
      true
    );
  }

  handleChange() {
    history.push("/s");
  }
  render() {
    const {
      basePrice,
      userBanStatus,
      isDateChosen,
      availability,
      isHost,
      bookingType,
      bookingLoading,
    } = this.props;
    const { formatMessage } = this.props.intl;
    const { maximumStay } = this.props;

    let disabled, buttonLabel;

    // @TODO(): Check conditions for button to be disabled
    // if (
    //   !isDateChosen ||
    //   basePrice < 1 ||
    //   isHost ||
    //   maximumStay ||
    //   userBanStatus
    // ) {
    //   disabled = true;
    // } else {
    //   disabled = false;
    // }
    disabled = false;
    if (bookingType === "instant") {
      buttonLabel = messages.book;
    } else {
      buttonLabel = messages.requestToBook;
    }
    if (!availability && isDateChosen) {
      return (
        <div>
          <FormGroup className={s.formGroup}>
            <Button
              className={cx(s.btn, s.btnBlock, s.btnlarge, s.btnPrimaryBorder)}
              onClick={this.handleChange}
            >
              <FormattedMessage {...messages.viewOtherListings} />
            </Button>
          </FormGroup>
        </div>
      );
    } else {
      return (
        <FormGroup className={s.formGroup}>
          <Loader
            type={"button"}
            className={cx(s.btn, s.btnBlock, s.btnlarge, s.btnPrimary)}
            handleClick={this.handleClick}
            disabled={disabled}
            show={bookingLoading}
            label={formatMessage(buttonLabel)}
          />
        </FormGroup>
      );
    }
  }
}
export default injectIntl(withStyles(s)(BookingButton));
