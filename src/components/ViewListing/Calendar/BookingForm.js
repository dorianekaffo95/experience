import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
// Redux
import { connect } from "react-redux";
// Redux Form
import { Field, change, reduxForm, formValueSelector } from "redux-form";
// Style
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Calendar.css";
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
} from "react-bootstrap";
import cx from "classnames";
import * as FontAwesome from "react-icons/lib/fa";
// Translation
import { injectIntl, FormattedMessage } from "react-intl";

// Locale
import messages from "../../../locale/messages";
// Redux action
import { bookingProcess } from "../../../actions/booking/bookingProcess";
import { getExperienceHours } from "../../../actions/getExperienceHours";
// Component
import DateRange from "../DateRange";
import BillDetails from "./BillDetails";
import BookingButton from "./BookingButton";
import Guests from "./Guests";
import ExperienceHours from "./ExperienceHours";
import { openBookingModal } from '../../../actions/BookingModal/modalActions';

class BookingForm extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    personCapacity: PropTypes.number.isRequired,
    basePrice: PropTypes.number.isRequired,
    cleaningPrice: PropTypes.number,
    currency: PropTypes.string,
    monthlyDiscount: PropTypes.number,
    weeklyDiscount: PropTypes.number,
    minNight: PropTypes.number,
    maxNight: PropTypes.number,
    maxDaysNotice: PropTypes.string,
    loading: PropTypes.bool,
    availability: PropTypes.bool,
    maximumStay: PropTypes.bool,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    blockedDates: PropTypes.array,
    isHost: PropTypes.bool.isRequired,
    guests: PropTypes.number,
    serviceFees: PropTypes.shape({
      guest: PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    base: PropTypes.string.isRequired,
    rates: PropTypes.object.isRequired,
    bookingType: PropTypes.string.isRequired,
    bookingLoading: PropTypes.bool,
    formatMessage: PropTypes.any,
    account: PropTypes.shape({
      userBanStatus: PropTypes.number,
    }),
    maxVisibleHours: PropTypes.number,
  };
  static defaultProps = {
    blockedDates: [],
    availability: true,
    maximumStay: false,
    startDate: null,
    endDate: null,
    guests: 1,
    personCapacity: 0,
    seeMoreHours: false,
    maxVisibleHours: 4,
    modal: false,
  };

  componentDidMount() {
    this.getNextExperienceDates();
  }

  // componentWillReceiveProps (nextProps) {
  //   const {startDate, endDate} = nextProps;
  //   if (startDate != this.props.startDate || endDate != this.props.endDate) {
  //     this.getNex
  //   }
  // }

  onHourSelect = async (selectedHour) => {
    const { change, id, /* adults, teens,*/ personCapacity, bookingProcess} = this.props;
    await change("selectedHour", selectedHour);
    bookingProcess(
      id,
      personCapacity,
      selectedHour,
      true
    );
  }

  getNextExperienceDates = async () => {
    const { id, getExperienceHours } = this.props;
    await getExperienceHours(
      id,
      moment().format("YYYY-MM-DD"),
      moment()
        .add(1, "months")
        .format("YYYY-MM-DD"),
      'available'
    );
  };

  renderFormControlSelect({
    input,
    label,
    meta: { touched, error },
    children,
    className,
  }) {
    return (
      <div>
        <FormControl componentClass="select" {...input} className={className}>
          {children}
        </FormControl>
      </div>
    );
  }
  renderGuests(personCapacity) {
    const { formatMessage } = this.props.intl;
    const rows = [];
    for (let i = 1; i <= personCapacity; i++) {
      rows.push(
        <option key={i} value={i}>
          {i}{" "}
          {i > 1
            ? formatMessage(messages.guests)
            : formatMessage(messages.guest)}
        </option>
      );
    }
    return rows;
  }

  render() {
    const { formatMessage } = this.props.intl;
    const {
      id,
      personCapacity,
      basePrice,
      adultPrice,
      teenPrice,
      childOrYoungerPrice,
      adultCapacity,
      teenCapacity,
      childOrYoungerCapacity,
      cleaningPrice,
      currency,
      isHost,
      bookingType,
      experienceHours,
      maxVisibleHours
    } = this.props;
    const {
      monthlyDiscount,
      weeklyDiscount,
      minNight,
      maxNight,
      maxDaysNotice,
    } = this.props;
    const {
      isLoading,
      availability,
      maximumStay,
      guests,
      startDate,
      endDate,
      account,
      blockedDates,
    } = this.props;
    const {
      bookingProcess,
      serviceFees,
      base,
      rates,
      bookingLoading,
      openBookingModal,
      initialValues,
    } = this.props;
    const {
      selectedHour,
      adults,
      teens,
      childrenOrYounger,
      modal,
    } = this.props;
    const isDateChosen = (startDate != null && endDate != null) || false;
    let userBanStatusValue;
    if (account) {
      const {
        account: { userBanStatus },
      } = this.props;
      userBanStatusValue = userBanStatus;
    }

    let visibleExperienceHours = [];
    if (experienceHours && experienceHours.length > 0) {
      visibleExperienceHours =
      experienceHours.length > maxVisibleHours
        ? experienceHours.slice(0, maxVisibleHours)
        : experienceHours;
    }

    return (
      <Form>
        <FormGroup className={s.formGroup}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <label className={s.text}>
                <span>
                  <FormattedMessage {...messages.dates} />
                </span>
              </label>
              <span className={cx("viewListingDate")}>
                <DateRange
                  listId={id}
                  minimumNights={/*minNight*/ 0}
                  maximumNights={maxNight}
                  blockedDates={blockedDates}
                  displayFormat={"DD/MM/yyyy"}
                  formName={"BookingForm"}
                  maxDaysNotice={maxDaysNotice}
                />
              </span>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <ControlLabel className={s.text}>
                <FormattedMessage {...messages.hours} />
              </ControlLabel>
              {(!startDate || !endDate) && experienceHours &&
                experienceHours.length === 0 && (
                <div>
                  <FormattedMessage {...messages.selectTimeRange} />
                </div>
              )}
              {startDate &&
                endDate &&
                experienceHours &&
                experienceHours.length === 0 && (
                  <div><FormattedMessage {...messages.noHourAvailable} /></div>
                )}

              {/*startDate && endDate &&*/ experienceHours && (
                <div>
                   <div className={cx({ [s.expHoursContainer]: modal })}>
                  {visibleExperienceHours.map((element, index) => (
                    <ExperienceHours
                      price={basePrice}
                      isHost={isHost}
                      currency={currency}
                      startTime={moment(element.startTime, "HH:mm:ss").format(
                        "HH:mm"
                      )}
                      endTime={moment(element.endTime, "HH:mm:ss").format(
                        "HH:mm"
                      )}
                      date={element.date}
                      handleClick={() => this.onHourSelect(element)}
                    />
                  ))}
                  </div>
                  {!modal && experienceHours.length > maxVisibleHours && (
                    <div style={{textAlign: 'center', margin: '10px 0px'}}>
                      <Button onClick={openBookingModal}>
                        <FormattedMessage {...messages.seeMoreHours} />
                      </Button>
                    </div>
                  )}
                </div>
              )}

            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              {/* <ControlLabel className={s.text}>
                <FormattedMessage {...messages.guest} />
              </ControlLabel>
              <Field
                name="guests"
                component={this.renderFormControlSelect}
                className={s.formControlSelect}
              >
                {this.renderGuests(personCapacity)}
              </Field>
              <Guests
                maxAdults={adultCapacity}
                maxTeens={teenCapacity}
                maxChildrenOrYounger={childOrYoungerCapacity}
                personCapacity={personCapacity}
              /> */}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          {/*!isLoading && maximumStay && isDateChosen && !userBanStatusValue && (
            <div className={cx(s.bookItMessage, s.spaceTop3)}>
              <p className={cx(s.noMargin, s.textCenter, s.textError)}>
                <FormattedMessage {...messages.maximumStay} /> {maxNight}{" "}
                {maxNight > 1
                  ? formatMessage(messages.nights)
                  : formatMessage(messages.night)}
              </p>
            </div>
          )*/}
          {!isLoading && !availability && isDateChosen && !userBanStatusValue && (
            <div className={cx(s.bookItMessage, s.spaceTop3)}>
              <p className={cx(s.noMargin, s.textCenter, s.textError)}>
                <FormattedMessage {...messages.hostErrorMessage2} />
              </p>
            </div>
          )}
        </FormGroup>
        {/* !maximumStay &&
          availability &&
        isDateChosen && (
          !userBanStatusValue &&
          <BillDetails
            basePrice={basePrice}
            adultPrice={adultPrice}
            teenPrice={teenPrice}
            childOrYoungerPrice={childOrYoungerPrice}
            cleaningPrice={cleaningPrice}
            currency={currency}
            monthlyDiscount={monthlyDiscount}
            weeklyDiscount={weeklyDiscount}
            startDate={startDate}
            endDate={endDate}
            serviceFees={serviceFees}
            base={base}
            rates={rates}
          />
        )}
        <BookingButton
          listId={id}
          startDate={startDate}
          endDate={endDate}
          guests={!isNaN(guests) ? guests : 1}
          selectedHour={selectedHour}
          adults={adults}
          teens={teens}
          childrenOrYounger={childrenOrYounger}
          bookingProcess={bookingProcess}
          availability={availability}
          isDateChosen={isDateChosen}
          userBanStatus={userBanStatusValue}
          basePrice={basePrice}
          isHost={isHost}
          bookingType={bookingType}
          bookingLoading={bookingLoading}
          maximumStay={maximumStay}
        /> */}
      </Form>
    );
  }
}
BookingForm = reduxForm({
  form: "BookingForm", // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(BookingForm);
// Decorate with connect to read form values
const selector = formValueSelector("BookingForm"); // <-- same as form name
const mapState = (state) => ({
  isLoading: state.viewListing.isLoading,
  availability: state.viewListing.availability,
  maximumStay: state.viewListing.maximumStay,
  startDate: selector(state, "startDate"),
  endDate: selector(state, "endDate"),
  guests: Number(selector(state, "guests")),
  experienceHours: selector(state, "experienceHours"),
  account: state.account.data,
  serviceFees: state.book.serviceFees,
  base: state.currency.base,
  rates: state.currency.rates,
  bookingLoading: state.book.bookingLoading,
  selectedHour: selector(state, "selectedHour"),
  adults: Number(selector(state, 'adults')),
  teens: Number(selector(state, 'teens')),
  childrenOrYounger: Number(selector(state, 'childrenOrYounger')),
});
const mapDispatch = {
  bookingProcess,
  openBookingModal,
  getExperienceHours,
  change,
};
export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(BookingForm))
);
