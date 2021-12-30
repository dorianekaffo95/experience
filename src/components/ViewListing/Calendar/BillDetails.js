import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl } from "react-intl";

// External Component
import moment from "moment";

// Redux
import { connect } from "react-redux";

//Images
import Faq from "./question.svg";

// Style
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Calendar.css";
import { Row, Col, FormGroup, Tooltip, OverlayTrigger } from "react-bootstrap";
import cx from "classnames";

// Component
import CurrencyConverter from "../../CurrencyConverter";

// Helper
import { convert } from "../../../helpers/currencyConvertion";

// Locale
import messages from "../../../locale/messages";
import { formValueSelector } from "redux-form";

class BillDetails extends Component {
  static propTypes = {
    basePrice: PropTypes.number.isRequired,
    cleaningPrice: PropTypes.number,
    currency: PropTypes.string.isRequired,
    monthlyDiscount: PropTypes.number,
    weeklyDiscount: PropTypes.number,
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    serviceFees: PropTypes.shape({
      guest: PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    base: PropTypes.string.isRequired,
    rates: PropTypes.object.isRequired,
    formatMessage: PropTypes.any,
    specialPricing: PropTypes.array,
  };

  static defaultProps = {
    basePrice: 0,
    cleaningPrice: 0,
    monthlyDiscount: 0,
    weeklyDiscount: 0,
    startDate: null,
    endDate: null,
    specialPricing: [],
  };

  render() {
    const {
      basePrice,
      adultPrice,
      teenPrice,
      childOrYoungerPrice,
      adults,
      teens,
      childrenOrYounger,
      cleaningPrice,
      currency,
      monthlyDiscount,
      weeklyDiscount,
      startDate,
      endDate,
    } = this.props;
    const { serviceFees, base, rates, specialPricing } = this.props;
    const { formatMessage } = this.props.intl;
    let serviceFee = 0,
      serviceFeeCurrency;
    let currentDay,
      bookingSpecialPricing = [],
      isSpecialPriceAssigned = false;
    let priceForDays = 0,
      isAverage = 0;
    let isDayTotal = 0;

    let momentStartDate,
      momentEndDate,
      dayDifference,
      discount,
      discountType;
      // total;
    /*if (startDate != null && endDate != null) {
      momentStartDate = moment(startDate);
      momentEndDate = moment(endDate);
      dayDifference = momentEndDate.diff(momentStartDate, "days");

      if (dayDifference > 0) {
        let stayedNights = [];
        // Find stayed nights
        for (let i = 0; i < dayDifference; i++) {
          let currentDate = moment(startDate).add(i, "day");
          stayedNights.push(currentDate);
        }

        if (stayedNights && stayedNights.length > 0) {
          stayedNights.map((item, key) => {
            let isSpecialPricing;
            if (item) {
              let pricingRow, currentPrice;
              currentDay = moment(item)
                .format("dddd")
                .toLowerCase();
              isSpecialPricing = specialPricing.find(
                (o) =>
                  moment(item).format("MM/DD/YYYY") ==
                  moment(o.blockedDates).format("MM/DD/YYYY")
              );
              if (isSpecialPricing && isSpecialPricing.isSpecialPrice) {
                isSpecialPriceAssigned = true;
                currentPrice = Number(isSpecialPricing.isSpecialPrice);
              } else {
                currentPrice =
                  Number(basePrice) +
                  Number(!isNaN(adults) ? adults : 0) * Number(adultPrice) +
                  Number(!isNaN(teens) ? teens : 0) * Number(teenPrice) +
                  Number(!isNaN(childrenOrYounger) ? childrenOrYounger : 0) *
                    Number(childOrYoungerPrice);
              }
              // Price object
              pricingRow = {
                blockedDates: item,
                isSpecialPrice: currentPrice,
              };
              bookingSpecialPricing.push(pricingRow);
            }
          });
        }
      }

      if (isSpecialPriceAssigned) {
        bookingSpecialPricing.map((item, index) => {
          priceForDays = priceForDays + Number(item.isSpecialPrice);
        });
      } else {
        bookingSpecialPricing.map((item, index) => {
          priceForDays = priceForDays + Number(item.isSpecialPrice);
        });
        // priceForDays = Number(basePrice) * Number(dayDifference);
      }
      //priceForDays = Number(basePrice) * Number(dayDifference);
      discount = 0;
      discountType = null;
      total = 0;
    }

    isAverage = Number(priceForDays) / Number(dayDifference);
    isDayTotal = isAverage.toFixed(2) * dayDifference;
    priceForDays = isDayTotal;

    if (dayDifference >= 7) {
      if (monthlyDiscount > 0 && dayDifference >= 28) {
        discount = (Number(priceForDays) * Number(monthlyDiscount)) / 100;
        discountType =
          monthlyDiscount + "% " + formatMessage(messages.monthlyDiscount);
      } else {
        discount = (Number(priceForDays) * Number(weeklyDiscount)) / 100;
        discountType =
          weeklyDiscount + "% " + formatMessage(messages.weeklyDiscount);
      }
    }

    if (serviceFees) {
      if (serviceFees.guest.type === "percentage") {
        serviceFee = priceForDays * (Number(serviceFees.guest.value) / 100);
      } else {
        serviceFee = convert(
          base,
          rates,
          serviceFees.guest.value,
          serviceFees.guest.currency,
          currency
        );
      }
    } 

    total = priceForDays + serviceFee  + cleaningPrice - discount;*/
    const total = ((!isNaN(adults) ? adults : 0) * adultPrice) + ((!isNaN(teens) ? teens : 0) * teenPrice) + ((!isNaN(childrenOrYounger) ? childrenOrYounger : 0) * childOrYoungerPrice);

    function LinkWithTooltip({ id, children, href, tooltip }) {
      return (
        <OverlayTrigger
          overlay={
            <Tooltip className={s.tooltip} id={id}>
              {tooltip}
            </Tooltip>
          }
          placement="top"
          delayShow={300}
          delayHide={150}
        >
          {children}
        </OverlayTrigger>
      );
    }

    console.log(
      "Prices: ",
      adultPrice,
      teenPrice,
      childOrYoungerPrice,
      adults,
      teens,
      childrenOrYounger
    );

    return (
      <FormGroup>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <table className={cx("table")}>
              <tbody>
                {/*<tr className={cx(s.positionR)}>
                  <td className={cx(s.noBorder)}>*/}
                    {/* {
                                            isSpecialPriceAssigned &&

                                            <div className={s.specialPriceIcon}> */}

                    {/* // tooltip="Average rate per night for your trip." */}

                    {/* <span>
                                                    <img src={Faq} className={s.faqImage} /> */}
                    {/* <FontAwesome.FaQuestion className={s.toolTipColor} /> */}
                    {/* </span>


                                                <div className={cx(s.tltip, s.relativeSection)}>
                                                    Average rate per night for your trip.
                                            </div>
                                            </div>

                                        } */}
                    {/* {
                                            isSpecialPriceAssigned &&
                                            <div className={cx(s.specialPriceText, s.paddingLeft)}>
                                                <CurrencyConverter
                                                    //amount={basePrice}
                                                    amount={isAverage}
                                                    from={currency}
                                                />
                                                x {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
                                            </div>

                                        } */}
                    {/*!isSpecialPriceAssigned && (
                      <div className={cx(s.specialPriceText)}>
                        <CurrencyConverter
                                                    //amount={basePrice}
                                                    amount={isAverage}
                                                    from={currency}
                                                />
                                                x {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
                        {adults && !isNaN(adults) && (
                          <span>
                            <CurrencyConverter
                              //amount={basePrice}
                              amount={adultPrice}
                              from={currency}
                            />
                            x {adults}{" "}
                            {adults > 1
                              ? formatMessage(messages.adults)
                              : formatMessage(messages.adult)}
                          </span>
                        )}
                        {teens && !isNaN(teens) && (
                          <span>
                            <CurrencyConverter
                              //amount={basePrice}
                              amount={teenPrice}
                              from={currency}
                            />
                            x {teens}{" "}
                            {teens > 1
                              ? formatMessage(messages.teens)
                              : formatMessage(messages.teen)}
                          </span>
                        )}
                        {childrenOrYounger && !isNaN(childrenOrYounger) && (
                          <span>
                            <CurrencyConverter
                              //amount={basePrice}
                              amount={childOrYoungerPrice}
                              from={currency}
                            />
                            x {childrenOrYounger}{" "}
                            {childrenOrYounger > 1
                              ? formatMessage(messages.children)
                              : formatMessage(messages.child)}
                          </span>
                        )}
                      </div>
                    )*/}
                  {/*</td>

                  <td className={cx(s.noBorder, "text-right")}>
                    <CurrencyConverter
                      //amount={priceForDays}
                      amount={isDayTotal}
                      from={currency}
                    />
                  </td>
                </tr>*/}

                {!isNaN(adults) && adults > 0 && (
                  <tr>
                    <td>
                      <span>
                        <CurrencyConverter
                          //amount={basePrice}
                          amount={adultPrice}
                          from={currency}
                        />
                        x {adults}{" "}
                        {adults > 1
                          ? formatMessage(messages.adults)
                          : formatMessage(messages.adult)}
                      </span>
                    </td>
                    <td className={cx("text-right")}>
                      <CurrencyConverter
                        //amount={basePrice}
                        amount={adultPrice * adults}
                        from={currency}
                      />
                    </td>
                  </tr>
                )}

                {!isNaN(teens) && teens > 0 && (
                  <tr>
                    <td>
                      <span>
                        <CurrencyConverter
                          //amount={basePrice}
                          amount={teenPrice}
                          from={currency}
                        />
                        x {teens}{" "}
                        {teens > 1
                          ? formatMessage(messages.teens)
                          : formatMessage(messages.teen)}
                      </span>
                    </td>
                    <td className={cx("text-right")}>
                      <CurrencyConverter
                        //amount={basePrice}
                        amount={teenPrice * teens}
                        from={currency}
                      />
                    </td>
                  </tr>
                )}

                {!isNaN(childrenOrYounger) && childrenOrYounger > 0 && (
                  <tr>
                    <td>
                      <span>
                        <CurrencyConverter
                          //amount={basePrice}
                          amount={childOrYoungerPrice}
                          from={currency}
                        />
                        x {childrenOrYounger}{" "}
                        {childrenOrYounger > 1
                            ? formatMessage(messages.children)
                              : formatMessage(messages.child)}
                      </span>
                    </td>
                    <td className={cx("text-right")}>
                      <CurrencyConverter
                        //amount={basePrice}
                        amount={childOrYoungerPrice * childrenOrYounger}
                        from={currency}
                      />
                    </td>
                  </tr>
                )}

                {/*discount > 0 && (
                  <tr>
                    <td>{discountType}</td>
                    <td className={cx("text-right", s.discountText)}>
                      - <CurrencyConverter amount={discount} from={currency} />
                    </td>
                  </tr>
                )*/}
                {/* {
                                    serviceFee > 0 && <tr>
                                        <td><FormattedMessage {...messages.serviceFee} /></td>
                                        <td className={cx('text-right')}>
                                            <CurrencyConverter
                                                amount={serviceFee}
                                                from={currency}
                                            />
                                        </td>
                                    </tr>
                                } */}
                {/*
                                    cleaningPrice > 0 && <tr>
                                        <td><FormattedMessage {...messages.cleaningFee} /></td>
                                        <td className={cx('text-right')}>
                                            <CurrencyConverter
                                                amount={cleaningPrice}
                                                from={currency}
                                            />
                                        </td>
                                    </tr>
                                */}
                <tr>
                  <td>
                    <FormattedMessage {...messages.total} />
                  </td>
                  <td className={cx("text-right")}>
                    <CurrencyConverter amount={total} from={currency} />
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

const selector = formValueSelector("BookingForm");

const mapState = (state) => ({
  specialPricing: state.viewListing.specialPricing,
  adults: Number(selector(state, "adults")),
  teens: Number(selector(state, "teens")),
  childrenOrYounger: Number(selector(state, "childrenOrYounger")),
});

const mapDispatch = {};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(BillDetails))
);
