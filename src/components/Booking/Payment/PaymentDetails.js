import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl } from "react-intl";

import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";

import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Payment.css";

// Redux
import { connect } from 'react-redux';

// Component
import CurrencyConverter from "../../CurrencyConverter";

import { formValueSelector } from 'redux-form';

// Locale
import messages from "../../../locale/messages";
import Faq from "./question.svg";

class PaymentDetails extends Component {
  static propTypes = {
    basePrice: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    dayDifference: PropTypes.number.isRequired,
    priceForDays: PropTypes.number.isRequired,
    serviceFees: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    cleaningPrice: PropTypes.number,
    discount: PropTypes.number,
    discountType: PropTypes.string,
    formatMessage: PropTypes.any,
    bookingSpecialPricing: PropTypes.array,
    isSpecialPriceAssigned: PropTypes.bool,
  };

  static defaultProps = {
    bookingSpecialPricing: [],
    isSpecialPriceAssigned: false,
  };

  render() {
    const { basePrice, cleaningPrice, currency, dayDifference } = this.props;
    const {
      priceForDays,
      serviceFees,
      discount,
      discountType,
      total,
    } = this.props;
    const { formatMessage } = this.props.intl;
    const {
      bookingSpecialPricing,
      isSpecialPriceAssigned,
      isAverage,
    } = this.props;

    const {
      adults,
      teens,
      childrenOrYounger,
      adultPrice,
      teenPrice,
      childOrYoungerPrice
    } = this.props;

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
          {/* <a href={href}>{children}</a> */}
          {children}
        </OverlayTrigger>
      );
    }

    const totalGuests = (!isNaN(adults) ? adults : 0) + (!isNaN(teens) ? teens : 0) + (!isNaN(childrenOrYounger) ? childrenOrYounger : 0);
    const totalPrice = ((!isNaN(adults) ? adults : 0) * adultPrice) + ((!isNaN(teens) ? teens : 0) * teenPrice) + ((!isNaN(childrenOrYounger) ? childrenOrYounger : 0) * childOrYoungerPrice);

    return (
      <div>
        <div>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <table className={cx("table")}>
                <tbody>
                  {/* <tr className={s.tableText}>
                    <td className={cx(s.noBorder)}>
                      <div className={s.specialPriceIcon}>
                        {
                          isSpecialPriceAssigned &&
                          <span className={s.iconSection}>
                            <img src={Faq} className={s.faqImage} /> */}
                  {/* <FontAwesome.FaQuestion className={s.toolTipColor} /> */}
                  {/*</span>

                        }
                        <div className={cx(s.tltip, s.relativeSection)}>
                          Average rate per night for your trip.
                        </div>
                      </div>
                      <div className={s.specialPriceText}>
                        <span>
                          <CurrencyConverter
                            //amount={basePrice}
                            amount={isAverage}
                            from={currency}
                          />
                        </span>
                        <span>
                          x {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
                        </span>
                      </div>

                    </td>
                    <td className={cx(s.noBorder, 'text-right')}>
                      <span>
                        <CurrencyConverter
                          amount={priceForDays}
                          from={currency}
                        />
                      </span>
                    </td>
                  </tr>
                  {
                    cleaningPrice > 0 && <tr className={s.tableText}>
                      <td className={cx(s.noBorder)}><FormattedMessage {...messages.cleaningFee} /></td>
                      <td className={cx(s.noBorder, 'text-right')}>
                        <span>
                          <CurrencyConverter
                            amount={cleaningPrice}
                            from={currency}
                          />
                        </span>
                      </td>
                    </tr>
                  }
                  {
                    serviceFees > 0 && <tr className={s.tableText}>
                      <td className={cx(s.noBorder)}><FormattedMessage {...messages.serviceFee} /></td>
                      <td className={cx(s.noBorder, 'text-right')}>
                        <span>
                          <CurrencyConverter
                            amount={serviceFees}
                            from={currency}
                          />
                        </span>
                      </td>
                    </tr>
                  }
                  {
                    discount > 0 && <tr className={s.tableText}>
                      <td className={cx(s.noBorder)}>{discountType}</td>
                      <td className={cx(s.noBorder, 'text-right')}>
                        - <span>
                          <CurrencyConverter
                            amount={discount}
                            from={currency}
                          />
                        </span>
                      </td>
                    </tr>
                  } */}


                  {!isNaN(adults) && adults > 0 && (
                    <tr className={cx({ [s['de-em']]: basePrice > totalPrice && totalGuests > 0 })}>
                      <td className={cx(s.noBorder)}>
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
                      <td className={cx(s.noBorder, "text-right")}>
                        <CurrencyConverter
                          //amount={basePrice}
                          amount={adultPrice * adults}
                          from={currency}
                        />
                      </td>
                    </tr>
                  )}

                  {!isNaN(teens) && teens > 0 && (
                    <tr className={cx({ [s['de-em']]: basePrice > totalPrice && totalGuests > 0 })}>
                      <td className={cx(s.noBorder)}>
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
                      <td className={cx(s.noBorder, "text-right")}>
                        <CurrencyConverter
                          //amount={basePrice}
                          amount={teenPrice * teens}
                          from={currency}
                        />
                      </td>
                    </tr>
                  )}

                  {!isNaN(childrenOrYounger) && childrenOrYounger > 0 && (
                    <tr className={cx({ [s['de-em']]: basePrice > totalPrice && totalGuests > 0 })}>
                      <td className={cx(s.noBorder)}>
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
                      <td className={cx(s.noBorder, "text-right")}>
                        <CurrencyConverter
                          //amount={basePrice}
                          amount={childOrYoungerPrice * childrenOrYounger}
                          from={currency}
                        />
                      </td>
                    </tr>
                  )}

                  {!isNaN(totalPrice) && (
                      <tr className={cx({ [s['de-em']]: !(basePrice > totalPrice && totalGuests > 0) })}>
                        <td className={cx(s.noBorder)}>
                          <span>
                            <FormattedMessage {...messages.minimumPrice} />
                          </span>
                        </td>
                        <td className={cx(s.noBorder, "text-right")}>
                          <CurrencyConverter
                            amount={basePrice}
                            from={currency}
                          />
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            </Col>
          </Row>
        </div>
        <div className={cx(s.totalValue, s.space2)}>
          <Col xs={12} sm={12} md={12} lg={12} className={s.smPadding}>
            <table className={cx("table")}>
              <tbody>
                <tr className={s.totalText}>
                  <td className={cx(s.noBorder)}>
                    <FormattedMessage {...messages.total} />
                  </td>
                  <td className={cx(s.noBorder, "text-right")}>
                    <span>
                      <CurrencyConverter
                        amount={basePrice > totalPrice && totalGuests > 0 ? basePrice : totalPrice }
                        from={currency}
                        superSymbol
                      />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('PaymentForm'); // <-- same as form name

const mapState = (state) => ({
  adults: selector(state, 'adults'),
  teens: selector(state, 'teens'),
  childrenOrYounger: selector(state, 'childrenOrYounger'),
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PaymentDetails)));
