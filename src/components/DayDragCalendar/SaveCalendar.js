import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

// Redux
import { connect } from "react-redux";
import { change, reset, initialize } from "redux-form";

// Compose
import { graphql, gql, compose } from "react-apollo";

// Translation
import { injectIntl, FormattedMessage } from "react-intl";

// Toastr
import { toastr } from "react-redux-toastr";

// Redux Form
import { Field, reduxForm, formValueSelector } from "redux-form";

// External Component
import { DateUtils } from "react-day-picker";

import {
  Button,
  FormGroup,
  Col,
  FormControl,
  ControlLabel,
  Checkbox,
} from "react-bootstrap";

// Loader
import Loader from "../Loader";

// Style
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "!isomorphic-style-loader!css-loader!./DayDragCalendar.css";
import c from "./SaveCalendar.css";

// Locale
import messages from "../../locale/messages";

import AvailableDates from "./AvailableDates";
import DateRange from "./DateRange";

import { getListingDataStep3 } from "../../actions/getListingDataStep3";
import { getListBlockedDates } from "../../actions/Listing/getListBlockedDates";
import { manageListingSteps } from "../../actions/manageListingSteps";
import HourRange from "./HourRange";

import { getExperienceHoursGeneral } from '../../actions/getExperienceHoursGeneral';

class SaveCalendar extends Component {
  static propTypes = {
    change: PropTypes.func,
    formName: PropTypes.string,
    selectedDays: PropTypes.array,
    start: PropTypes.any,
    end: PropTypes.any,
  };

  static defaultProps = {
    selectedDays: [],
    start: undefined,
    end: undefined,
    formName: "ListPlaceStep3",
    formNameValue: "CalendarPrice",
    isCurrentStatus: 2,
  };

  constructor(props) {
    super(props);
    this.state = {
      dateRange: [],
      isLoading: false,
    };
    this.chooseDates = this.chooseDates.bind(this);
  }

  componentDidMount() {
    this.setState({ isCurrentStatus: 2 });
  }

  componentWillReceiveProps(nextProps) {
    const { start, end, isStartDate, isEndDate } = nextProps;

    let dateRange = [],
      rangeStart,
      rangeEnd;

    if (start && !end) {
      rangeStart = new Date(start);
      dateRange.push(rangeStart);
    } else if (start && end) {
      rangeStart = new Date(start);
      rangeEnd = new Date(end);

      if (!DateUtils.isSameDay(rangeStart, rangeEnd)) {
        dateRange.push(rangeStart);

        rangeStart = new Date(+rangeStart);

        while (rangeStart < end) {
          dateRange.push(rangeStart);
          const newDate = rangeStart.setDate(rangeStart.getDate() + 1);
          rangeStart = new Date(newDate);
        }
      }
    }
    this.setState({ dateRange });
  }

  renderCheckBox = ({
    input,
    label,
    type,
    meta: { touched, error },
    className,
  }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && (
          <span className={s.errorMessage}>{formatMessage(error)}</span>
        )}
        <Checkbox
          {...input}
          title={label}
          className={className}
        >{label}</Checkbox>
      </div>
    );
  }

  renderFormControl = ({
    input,
    label,
    type,
    meta: { touched, error },
    className,
  }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && (
          <span className={s.errorMessage}>{formatMessage(error)}</span>
        )}
        <FormControl
          {...input}
          placeholder={label}
          type={type}
          className={className}
          maxLength={3}
        />
      </div>
    );
  };

  renderDateRange = ({
    input,
    label,
    meta: { touched, error },
    formName,
    numberOfMonths,
    startDateName,
    endDateName,
    index,
    defaultStartDate,
    defaultEndDate,
    isCurrentStatus,
    resetCalendar,
  }) => {
    const { formatMessage } = this.props.intl;
    const { handleSubmit, change } = this.props;

    return (
      <div className={"saveCalenderDate"}>
        {touched && error && (
          <span className={s.errorMessage}>{formatMessage(error)}</span>
        )}
        <DateRange
          {...input}
          formName={formName}
          numberOfMonths={numberOfMonths}
          index={index}
          defaultStartDate={defaultStartDate}
          defaultEndDate={defaultEndDate}
          displayFormat={"DD/MM/yyyy"}
          isCurrentStatus={isCurrentStatus}
          resetCalendar={resetCalendar}
        />
      </div>
    );
  };

  async handleSave() {
    const { change, formName, start, end, selectedDays } = this.props;
    const {
      resetCalendar,
      mutate,
      listId,
      getListingDataStep3,
      getListBlockedDates,
      getExperienceHoursGeneral
    } = this.props;
    const { formatMessage } = this.props.intl;
    const {
      minNight,
      maxNight,
      houseRules,
      checkInEnd,
      checkInStart,
    } = this.props;
    const { cancellationPolicy, maxDaysNotice, bookingNoticeTime } = this.props;
    const {
      basePrice,
      cleaningPrice,
      currency,
      isStartDate,
      isEndDate,
      manageListingSteps,
    } = this.props;
    const { startTime, endTime } = this.props;
    const { dateRange } = this.state;

    const minNightValues = minNight != "" ? minNight : 0;
    const maxNightValues = maxNight != "" ? maxNight : 0;
    const checkInEndValue = checkInEnd != "" ? checkInEnd : "flexible";
    const checkInStartValue = checkInStart != "" ? checkInStart : "flexible";
    const isCancel = cancellationPolicy || "1";
    const isMaxDays = maxDaysNotice || "unavailable";
    const isBooking = bookingNoticeTime || 58;

    const updatedSelectedDays = selectedDays;
    // let updatedSelectedDays = dateRange;

    const successMsg = formatMessage(messages.selectedDatesSuccess);
    const errorMsg = formatMessage(messages.selectedDatesError);

    let dateRangeNew = [],
      rangeStart,
      rangeEnd;
    if (isStartDate && !isEndDate) {
      rangeStart = new Date(isStartDate);
      dateRangeNew.push(rangeStart);
    } else if (isStartDate && isEndDate) {
      rangeStart = new Date(isStartDate);
      rangeEnd = new Date(isEndDate);

      if (!DateUtils.isSameDay(rangeStart, rangeEnd)) {
        dateRangeNew.push(rangeStart);

        rangeStart = new Date(+rangeStart);

        while (rangeStart < isEndDate) {
          dateRangeNew.push(rangeStart);
          const newDate = rangeStart.setDate(rangeStart.getDate() + 1);
          rangeStart = new Date(newDate);
        }
      }
    }

    this.setState({ isLoading: true });
    if (dateRangeNew && dateRangeNew.length > 0) {
      dateRangeNew.forEach(async (item, index) => {
        const selectedIndex = updatedSelectedDays.findIndex((selectedDay) =>
          DateUtils.isSameDay(selectedDay, item)
        );

        if (selectedIndex < 0) {
          updatedSelectedDays.push(item);
        }
      });

      const { data } = await mutate({
        variables: {
          listId,
          blockedDates: updatedSelectedDays,
        },
      });

      this.setState({ isLoading: false });

      if (
        data &&
        data.RemoveBlockedDates &&
        data.RemoveBlockedDates.status == "200"
      ) {
        // await change(formName, "blockedDates", updatedSelectedDays);
        await change("blockedDates", updatedSelectedDays);
        // await getListingDataStep3(listId);
        // await getListBlockedDates(
        //   listId,
        //   minNightValues,
        //   maxNightValues,
        //   checkInEndValue,
        //   checkInStartValue,
        //   houseRules,
        //   isCancel,
        //   isMaxDays,
        //   isBooking,
        //   basePrice,
        //   cleaningPrice,
        //   currency
        // );
        // await getListingDataStep3(listId);
        // await manageListingSteps(listId, 3);
        console.log("This is the range start: ", rangeStart);
        await getExperienceHoursGeneral(
          listId,
          moment().isAfter(moment(rangeStart).set("date", 1)) ? moment().format("YYYY-MM-DD") : moment(rangeStart).set("date", 1)
          .format("YYYY-MM-DD"),
          moment(rangeEnd || rangeStart).set("date", moment(rangeEnd || rangeStart).daysInMonth())
          .format("YYYY-MM-DD"),
          null
        );
        await resetCalendar();


        // toastr.success("Success!", successMsg);
      } else {
        toastr.error("Error!", errorMsg);
      }
    }
  }

  chooseDates(e) {
    this.setState({ isCurrentStatus: e });
  }

  render() {
    const {
      selectedDays,
      start,
      end,
      formName,
      resetCalendar,
      listId,
      resetDatePickerChange,
    } = this.props;
    const { error, handleSubmit, pristine, submitting, dispatch } = this.props;
    const { initialValues } = this.props;
    const { formatMessage } = this.props.intl;
    const {
      minNight,
      maxNight,
      houseRules,
      houseDescription,
      checkInEnd,
      checkInStart,
    } = this.props;
    const {
      cancellationPolicy,
      maxDaysNotice,
      bookingNoticeTime,
      isStartDate,
      isEndDate,
    } = this.props;
    const { basePrice, cleaningPrice, currency } = this.props;
    const { startTime, endTime, duration } = this.props;
    const { isCurrentStatus } = this.state;

    const { dateRange, isLoading } = this.state;
    const convertStart = start ? moment(start).format("YYYY-MM-DD") : null;
    const convertEnd = end ? moment(end).format("YYYY-MM-DD") : null;
    let isBlock = 1,
      isAvailable = 2;
    const numberParser = (number) => {
      return number && !isNaN(number) ? parseFloat(number) : 0.0;
    }
    const numberValidator = value => {
      return !value || isNaN(value) ? 'Must be a number' : undefined;
    }

    return (
      <div>
        {(start || isStartDate) && (
          <Col
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={cx(c.saveCalendarContainer, c.CalendarPopup)}
          >
            <div className={c.innerCPopup}>
              <FormGroup className={cx(c.formGroup, c.textLeft)}>
                <Button
                  bsStyle="link"
                  className={cx(c.noPadding, c.space3)}
                  onClick={() => {
                    resetCalendar();
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    role="img"
                    style={{
                      height: "16px",
                      width: "16px",
                      display: "block",
                      fill: "rgb(118, 118, 118)",
                    }}
                  >
                    <path d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22" />
                  </svg>
                </Button>
              </FormGroup>
              <div className={c.aBlockWrap}>
                <div className={c.aBWLeft}>
                  <Button
                    className={cx(c.btnBg, {
                      [c.active]: isCurrentStatus == 2,
                    })}
                    onClick={() => this.chooseDates(isAvailable)}
                  >
                    <FormattedMessage {...messages.availableLabel} />
                  </Button>
                </div>
                <div className={c.aBWRight}>
                  <Button
                    className={cx(c.btnBg, {
                      [c.active]: isCurrentStatus == 1,
                    })}
                    onClick={() => this.chooseDates(isBlock)}
                  >
                    <FormattedMessage {...messages.blockLabel} />
                  </Button>
                </div>
              </div>

              {isCurrentStatus === 1 && (<div>
                <FormGroup className={cx(s.formGroup)}>
                  <Field
                    name="availableOnWeekends"
                    type="checkbox"
                    component={this.renderCheckBox}
                    label={formatMessage(messages.blockWeekends)}
                    className={cx(
                      s.formControlInput,
                      s.jumboInput,
                    )}
                  />
                </FormGroup>
                </div>
              )}

              <FormGroup className={cx(c.formGroup, c.sDateWrap)}>
                <label>
                  <FormattedMessage {...messages.selectedDates} />
                </label>
              </FormGroup>
              <FormGroup>
                <Field
                  name="blockedDates"
                  component={this.renderDateRange}
                  defaultStartDate={start}
                  defaultEndDate={end}
                  formName={formName}
                  isCurrentStatus={isCurrentStatus}
                  resetCalendar={resetDatePickerChange}
                />
              </FormGroup>
              {isCurrentStatus === 2 && (
                <FormGroup className={cx(c.formGroup, c.sDateWrap)}>
                  <label>
                    <FormattedMessage {...messages.hours} />
                  </label>
                </FormGroup>
              )}
              {isCurrentStatus === 2 && (
                <FormGroup>
                  <HourRange />
                </FormGroup>
              )}

              {isCurrentStatus === 2 && (
                <FormGroup className={cx(s.formGroup)}>
                  <ControlLabel className={cx(s.landingLabel, c.marginBottom)}>
                    <FormattedMessage {...messages.duration} />
                  </ControlLabel>
                  <Field
                    name="duration"
                    type="text"
                    component={this.renderFormControl}
                    label={formatMessage(messages.duration)}
                    className={cx(
                      s.formControlInput,
                      s.jumboInput,
                      c.inputHeight
                    )}
                    parse={numberParser}
                    validate={numberValidator}
                  />
                </FormGroup>
              )}

              {isCurrentStatus == 2 && (
                <AvailableDates
                  start={start}
                  end={end}
                  listId={listId}
                  selectedDays={selectedDays}
                  resetCalendar={resetCalendar}
                  dateRange={dateRange}
                  minNight={minNight}
                  maxNight={maxNight}
                  houseRules={houseRules}
                  checkInEnd={checkInEnd}
                  checkInStart={checkInStart}
                  cancellationPolicy={cancellationPolicy}
                  maxDaysNotice={maxDaysNotice}
                  bookingNoticeTime={bookingNoticeTime}
                  cleaningPrice={cleaningPrice}
                  basePrice={basePrice}
                  currency={currency}
                  isStartDate={isStartDate}
                  isEndDate={isEndDate}
                  startTime={startTime}
                  endTime={endTime}
                  duration={duration}
                />
              )}

              {isCurrentStatus == 1 && (
                <FormGroup className={cx(c.formGroup, c.buttonLeft)}>
                  <Loader
                    type={"button"}
                    buttonType={"button"}
                    show={isLoading}
                    className={cx(c.btnPrimary, c.btnlarge)}
                    disabled={isLoading}
                    label={formatMessage(messages.blockDates)}
                    handleClick={() => {
                      this.handleSave();
                    }}
                    containerClass={c.loaderContainer}
                  />
                </FormGroup>
              )}

              <Button
                className={cx(c.btnPrimaryBorder, c.btnlarge, c.buttonRight)}
                onClick={() => {
                  resetCalendar();
                }}
              >
                <FormattedMessage {...messages.deSelect} />
              </Button>
            </div>
          </Col>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  change,
  getListingDataStep3,
  getListBlockedDates,
  manageListingSteps,
  getExperienceHoursGeneral
};

// export default compose(
//   injectIntl,
//   withStyles(s, c),
//   connect(mapState, mapDispatch),
//   graphql(gql`
//     mutation (
//       $listId: Int!,
//       $blockedDates: [String],
//       $calendarStatus: String,
//       $duration: Int,
//       $startTime: String,
//       $endTime: String,
//     ) {
//           UpdateBlockedDates (
//             listId: $listId,
//             duration: $duration,
//             startTime: $startTime,
//             endTime: $endTime,
//             blockedDates: $blockedDates,
//             calendarStatus: $calendarStatus
//         ) {
//           status
//         }
//         }
//   `),
// )(SaveCalendar);

export default compose(
  injectIntl,
  withStyles(s, c),
  connect(mapState, mapDispatch),
  graphql(gql`
    mutation($listId: Int!, $blockedDates: [String]) {
      RemoveBlockedDates(listId: $listId, blockedDates: $blockedDates) {
        status
      }
    }
  `)
)(SaveCalendar);
