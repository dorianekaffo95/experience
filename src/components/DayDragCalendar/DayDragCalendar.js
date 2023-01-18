import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import moment from "moment";

// Redux
import { connect } from "react-redux";
import { change, formValueSelector } from "redux-form";

import CurrencyConverter from "../CurrencyConverter";
import StickyPopover from "./StickyPopover";

// External Component
import DayPicker, { DateUtils } from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";
import { Row, Col, Popover, Overlay, Button } from "react-bootstrap";

// Style
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from 'classnames';
import s from "!isomorphic-style-loader!css-loader!./DayDragCalendar.css";

import SaveCalendar from "./SaveCalendar";
import sc from './SaveCalendar.css';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../locale/messages';

// Actions
import { getExperienceHoursGeneral } from '../../actions/getExperienceHoursGeneral';
import { deleteExperienceHour } from '../../actions/ExperienceHours/deleteExperienceHour';
import { getBlockedDates } from "../../actions/Listing/getBlockedDates";

class DayDragCalendar extends Component {
  static propTypes = {
    change: PropTypes.func,
    formName: PropTypes.string,
    disabledDates: PropTypes.array,
    blockedDates: PropTypes.array,
  };

  static defaultProps = {
    disabledDates: [],
    blockedDates: [],
    listId: null,
    sources: [],
  };

  constructor(props) {
    super(props);
    this.experiences = [];
    this.state = {
      selectedDays: [],
      from: undefined,
      to: undefined,
      dateRange: [],
      //availableDates: [],
      chooseRangeDate: [],
      isPrice: [],
      sources: [],
      show: false,
      id: null
    };

    this.isDaySelected = this.isDaySelected.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.resetCalendar = this.resetCalendar.bind(this);
    this.renderDay = this.renderDay.bind(this);
    this.resetDatePickerChange = this.resetDatePickerChange.bind(this);
  }

  componentWillMount() {
    const { blockedDates, sources, availableDatesPrices } = this.props;
    if (blockedDates != undefined) {
      this.setState({ selectedDays: blockedDates });
    }

    let sourcesValue = [];
    let sourceObject = {};

    availableDatesPrices &&
      availableDatesPrices.map((item, key) => {
        sourceObject = {};
        sourceObject["isSpecialPrice"] = item.isSpecialPrice;
        sourceObject["blockedDates"] = item.date;
        sourcesValue.push(sourceObject);
      });
    this.setState({ sources: sourcesValue });

    this.getHours(new Date());
  }

  componentWillReceiveProps(nextProps) {
    const { blockedDates, sources, availableDatesPrices } = nextProps;
    if (blockedDates != undefined) {
      this.setState({ selectedDays: blockedDates });
    }
    let sourcesValue = [];
    let sourceObject = {};

    availableDatesPrices &&
      availableDatesPrices.map((item, key) => {
        sourceObject = {};
        sourceObject["isSpecialPrice"] = item.isSpecialPrice;
        sourceObject["blockedDates"] = item.date;
        sourcesValue.push(sourceObject);
      });
    this.setState({ sources: sourcesValue });
  }

  getTarget(key) {
    return ReactDOM.findDOMNode(this.experiences[key]);
  }

  handleMouseLeave() {
    clearTimeout(this.setTimeoutConst)
    this.setState((state) => ({id: state.id === key ? null : key}))
  }

  isEnglishLocale = () => {
    let { locale } = this.props.intl;
    return ['en-us', 'en-tt', 'en-au', 'en-bz', 'en-ca', 'en-cb', 'en-gb', 'en-in', 'en-ie', 'en-jm', 'en-nz', 'en-ph', 'en-za'].includes(locale.toLowerCase());
  }

  renderDay(day) {
    const { currency, baseCurrency, isAdminCurrency, availableDates, experienceHours } = this.props;
    const { dateRange } = this.state;
    const date = day.getDate();
    let dateRangeValue = moment(day).format("YYYY-MM-DD");

    const sources = experienceHours && experienceHours.data;

    return (
      <div className={s.responsiveDisplay}>
        <span className={"dateFontWeight"}>{date}</span>
        <div>
          {sources &&
            sources.map((item, key) => {
              let dateValue = moment(item.date).format("YYYY-MM-DD");
              if (dateRangeValue == dateValue) {
                return (
                    <div
                      style={{display: 'inline-block'}}
                      ref={button => {
                        this.experiences[key] = button;
                      }}
                    >
                      <StickyPopover
                          delay={10}
                          component={<span>
                            <span style={{margin: '0px 10px', fontWeight: 'bold'}}>
                              {moment(item.startTime, "HH:mm:ss").format(this.isEnglishLocale() ? "hh:mm A" : 'HH:mm')} - {moment(item.endTime, "HH:mm:ss").format(this.isEnglishLocale() ? "hh:mm A" : 'HH:mm')}
                            </span>
                            <Button onClick={(event) => this.removeHours(event, item)} title="Remove hour" style={{backgroundColor: '#FA7475', color: 'white'}}>
                              <FormattedMessage {...messages.delete} />
                            </Button>
                          </span>}
                          placement={'top'}
                        >
                        <a
                          className={cx(sc.expHour, {[sc.availableExpHour]: item.status === 'available'}, {[sc.notAvailableExpHour]: item.status !== 'available'})}
                          onClick={(event) => {event.stopPropagation(); this.setState((state) => ({id: state.id === key ? null : key}))}}
                          onBlur={() => {event.stopPropagation(); this.setState((state) => ({id: state.id === key ? null : state.id }));}}
                        ></a>
                      </StickyPopover>
                    </div>
                  );
              }
            })}
        </div>
      </div>
    );
  }

  isDaySelected(day) {
    const { selectedDays } = this.state;

    if (selectedDays.length > 0) {
      return selectedDays.some((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      );
    }
  }

  async handleDayClick(day, { start, end, selected, disabled }) {
    const { blockedDates, change, formName } = this.props;
    let selectedDays = blockedDates.slice();
    let startDate, endDate;
    let dateRange = [],
      rangeStart,
      rangeEnd;

    if (disabled) {
      return;
    }

    const range = DateUtils.addDayToRange(day, this.state);
    startDate = range.from;
    endDate = range.to;

    if (startDate && !endDate) {
      rangeStart = new Date(startDate);
      dateRange.push(rangeStart);
    } else if (startDate && endDate) {
      rangeStart = new Date(startDate);
      rangeEnd = new Date(endDate);

      if (!DateUtils.isSameDay(rangeStart, rangeEnd)) {
        dateRange.push(rangeStart);

        rangeStart = new Date(+rangeStart);

        while (rangeStart < endDate) {
          dateRange.push(rangeStart);
          var newDate = rangeStart.setDate(rangeStart.getDate() + 1);
          rangeStart = new Date(newDate);
        }
      } else {
        startDate = null;
        endDate = null;
        dateRange, (selectedDays = []);
      }
    }
    this.setState({ selectedDays, dateRange, from: startDate, to: endDate });

    change("ListPlaceStep3", "startDate", startDate);
    change("ListPlaceStep3", "endDate", endDate);
  }

  resetCalendar() {
    const { change } = this.props;
    // this.setState({ dateRange: [], from: null, to: null, startDate: null, endDate: null });
    this.setState({
      dateRange: [],
      from: null,
      to: null,
      startDate: null,
      endDate: null,
    });
    change("ListPlaceStep3", "startDate", null);
    change("ListPlaceStep3", "endDate", null);
  }

  resetDatePickerChange() {
    const { change } = this.props;
    this.setState({ dateRange: [], from: null, to: null });
  }

  getHours = async (month: Date) => {
    const { listId, getExperienceHoursGeneral } = this.props;
    const currentDate = moment();
    const date = moment(month);
    await getExperienceHoursGeneral(
      listId,
      currentDate.isAfter(date) ? currentDate.format("YYYY-MM-DD") : date.format("YYYY-MM-DD"),
      date.set("date", date.daysInMonth())
        .format("YYYY-MM-DD"),
      null
    );
  }

  removeHours = async (event, hour) => {
    
    const {deleteExperienceHour, getBlockedDates, getExperienceHoursGeneral, listId} = this.props;
    const {month} = this.state;

    await deleteExperienceHour(
      hour.id,
      listId
    );

    const currentDate = moment();
    const date = moment(month); 
    await getExperienceHoursGeneral(
      listId,
      currentDate.isAfter(date) ? currentDate.format("YYYY-MM-DD") : date.format("YYYY-MM-DD"),
      date.set("date", date.daysInMonth())
        .format("YYYY-MM-DD"),
      null
    );
    await getBlockedDates(listId);
  }

  render() {
    const { selectedDays, from, to, dateRange } = this.state;
    const { disabledDates, formName, listId, availableDates } = this.props;
    const { availableDatesPrices } = this.props;
    const { sources } = this.state;
    const {
      minNight,
      maxNight,
      houseRules,
      checkInEnd,
      checkInStart,
    } = this.props;
    const { cancellationPolicy, maxDaysNotice, bookingNoticeTime } = this.props;
    const { cleaningPrice, basePrice, currency } = this.props;
    const { isStartDate, isEndDate } = this.props;
    const { startTime, endTime, duration } = this.props;
    const { experienceHours } = this.props;
    const { locale, formatMessage } = this.props.intl;

    let dateObj = new Date();

    const avDates = [];
    experienceHours.data && experienceHours.data.forEach((item) => {
      avDates.push(new Date(item.date));
    });

    // Where to define modifiers
    const modifiers = {
      start: from,
      end: to,
      selected: selectedDays,
      selecting: dateRange,
      available: avDates, // availableDates
      // bl: {daysOfWeek: [0, 6]}
    };

    return (
      <Row>
        <Col lg={8} md={10} sm={10} xs={12} className={"saveCalender"}>
          <DayPicker
            selectedDays={[this.isDaySelected, from, { from, to }]}
            onDayClick={this.handleDayClick}
            modifiers={modifiers}
            disabledDays={[DateUtils.isPastDay, ...disabledDates]}
            fromMonth={dateObj}
            renderDay={this.renderDay}
            localeUtils={MomentLocaleUtils}
            locale={locale}
            todayButton={formatMessage(messages.today)}
            className={"BecomeCalendar"}
            onMonthChange={this.getHours}
          />
        </Col>
        <Col lg={4} md={4} sm={6} xs={12}>
          <SaveCalendar
            selectedDays={dateRange}
            start={from}
            end={to}
            formName={formName}
            resetCalendar={this.resetCalendar}
            resetDatePickerChange={this.resetDatePickerChange}
            listId={listId}
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
        </Col>
      </Row>
    );
  }
}

const selector = formValueSelector("ListPlaceStep3");

const mapState = (state) => ({
  isStartDate: selector(state, "startDate"),
  isEndDate: selector(state, "endDate"),
  startTime: selector(state, "startTime"),
  endTime: selector(state, "endTime"),
  duration: selector(state, "duration"),
  availableOnWeekends: selector(state, "availableOnWeekends"),
  experienceHours: state.experienceHours,
});

const mapDispatch = {
  change,
  getExperienceHoursGeneral,
  deleteExperienceHour,
  getBlockedDates,
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(DayDragCalendar)));
