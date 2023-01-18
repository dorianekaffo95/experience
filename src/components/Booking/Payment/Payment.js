import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Grid,
  Row,
  Col,
  Panel,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';
import { injectIntl, FormattedMessage } from 'react-intl';
import * as FontAwesome from 'react-icons/lib/fa';

// Redux
import { connect } from 'react-redux';

// Component
import PaymentDetails from './PaymentDetails';
import PaymentForm from './PaymentForm';
import Avatar from '../../Avatar';
import ListCoverPhoto from '../../ListCoverPhoto';

// Helper
import { convert } from '../../../helpers/currencyConvertion';

// Locale
import messages from '../../../locale/messages';
import { Elements } from 'react-stripe-elements';

//Images
import RightArrowIcon from '../../../../public/rightArrow.svg'

class Payment extends Component {

  static propTypes = {
    listId: PropTypes.number.isRequired,
    hostId: PropTypes.string.isRequired,
    guestId: PropTypes.string.isRequired,
    guestEmail: PropTypes.string.isRequired,
    hostDisplayName: PropTypes.string.isRequired,
    hostPicture: PropTypes.string,
    coverPhoto: PropTypes.string,
    listTitle: PropTypes.string.isRequired,
    allowedPersonCapacity: PropTypes.number.isRequired,
    listType: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    houseRules: PropTypes.arrayOf(PropTypes.shape({
      listsettings: PropTypes.shape({
        itemName: PropTypes.string.isRequired
      })
    })),
    checkIn: PropTypes.object.isRequired,
    checkOut: PropTypes.object.isRequired,
    guests: PropTypes.number.isRequired,
    basePrice: PropTypes.number.isRequired,
    cleaningPrice: PropTypes.number,
    currency: PropTypes.string.isRequired,
    weeklyDiscount: PropTypes.number,
    monthlyDiscount: PropTypes.number,
    listPhotos: PropTypes.array,
    serviceFees: PropTypes.shape({
      guest: PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired
      }).isRequired,
      host: PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    base: PropTypes.string.isRequired,
    rates: PropTypes.object.isRequired,
    bookingType: PropTypes.string.isRequired,
    policyName: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
    adults: PropTypes.number,
    teens: PropTypes.number,
    childrenOrYounger: PropTypes.number
  };

  render() {
    const { guestEmail, hostDisplayName, hostPicture, coverPhoto, listPhotos, bookingType, policyName } = this.props;
    const { listId, listTitle, listType, city, state, country, allowedPersonCapacity } = this.props;
    const { houseRules, hostId, guestId } = this.props;
    const { guests, checkIn, checkOut, guestPicture } = this.props;
    const { basePrice, cleaningPrice, currency, weeklyDiscount, monthlyDiscount } = this.props;
    const { serviceFees, base, rates, specialPricing, bookingData } = this.props;
    const { adults, teens, childrenOrYounger, selectedHour } = this.props;
    const { adultCapacity, teenCapacity, childOrYoungerCapacity } = this.props;
    const { adultPrice, teenPrice, childOrYoungerPrice } = this.props;
    const { spokenLanguages, duration } = this.props;
    let guestServiceFee = 0, hostServiceFee = 0, priceForDays = 0;
    let discount = 0, discountType, total = 0, totalWithoutFees = 0;
    let momentStartDate, momentEndDate, dayDifference, isAverage = 0;
    let currentDay, bookingSpecialPricing = [], isSpecialPriceAssigned = false;
    let isDayTotal = 0;

    if (checkIn != null && checkOut != null) {
      momentStartDate = moment(checkIn);
      momentEndDate = moment(checkOut);
      dayDifference = momentEndDate.diff(momentStartDate, 'days');
      // priceForDays = Number(basePrice) * Number(dayDifference);
 
      // if (dayDifference > 0) {

      //   let stayedNights = [];
      //   // Find stayed nights
      //   for (let i = 0; i < dayDifference; i++) {
      //     let currentDate = moment(checkIn).add(i, 'day');
      //     stayedNights.push(currentDate);
      //   }

      //   if (stayedNights && stayedNights.length > 0) {
      //     stayedNights.map((item, key) => {
      //       let isSpecialPricing;
      //       if (item) {
      //         let pricingRow, currentPrice;
      //         currentDay = (moment(item).format('dddd').toLowerCase());
      //         // isSpecialPricing = specialPricing.find(o => moment(item).format('MM/DD/YYYY') == moment(o.blockedDates).format('MM/DD/YYYY'));
      //         isSpecialPricing = bookingData && bookingData.listBlockedPrice.find(o => moment(item).format('MM/DD/YYYY') == moment(o.blockedDates).format('MM/DD/YYYY'));

      //         if (isSpecialPricing && isSpecialPricing.isSpecialPrice) {
      //           isSpecialPriceAssigned = true;
      //           currentPrice = Number(isSpecialPricing.isSpecialPrice);
      //         } else {
      //           currentPrice = Number(basePrice);
      //         }
      //         // Price object
      //         pricingRow = {
      //           blockedDates: item,
      //           isSpecialPrice: currentPrice,
      //         };
      //         bookingSpecialPricing.push(pricingRow);
      //       }
      //     });
      //   }
      // }

      // if (isSpecialPriceAssigned) {
      //   bookingSpecialPricing.map((item, index) => {
      //     priceForDays = priceForDays + Number(item.isSpecialPrice);
      //   });
      // } else {
      //   bookingSpecialPricing.map((item, index) => {
      //     priceForDays = priceForDays + Number(item.isSpecialPrice);
      //   });
      // }
    }

    isAverage = Number(priceForDays) / Number(dayDifference);
    isDayTotal = isAverage.toFixed(2) * dayDifference;
    priceForDays = isDayTotal;

    // if (serviceFees) {
    //   if (serviceFees.guest.type === 'percentage') {
    //     guestServiceFee = priceForDays * (Number(serviceFees.guest.value) / 100);
    //   } else {
    //     guestServiceFee = convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
    //   }

    //   if (serviceFees.host.type === 'percentage') {
    //     hostServiceFee = priceForDays * (Number(serviceFees.host.value) / 100);
    //   } else {
    //     hostServiceFee = convert(base, rates, serviceFees.host.value, serviceFees.host.currency, currency);
    //   }

    // }

    // if (dayDifference >= 7) {
    //   if (monthlyDiscount > 0 && dayDifference >= 28) {
    //     discount = (Number(priceForDays) * Number(monthlyDiscount)) / 100;
    //     discountType = monthlyDiscount + "% monthly price discount";
    //   } else {
    //     if (weeklyDiscount > 0) {
    //       discount = (Number(priceForDays) * Number(weeklyDiscount)) / 100;
    //       discountType = weeklyDiscount + "% weekly price discount";
    //     }
    //   }
    // }

    // total = (priceForDays + guestServiceFee + cleaningPrice) - discount;
    // totalWithoutFees = (priceForDays + cleaningPrice) - discount;

    total = ((!isNaN(adults) ? adults : 0) * adultPrice) + ((!isNaN(teens) ? teens : 0) * teenPrice) + ((!isNaN(childrenOrYounger) ? childrenOrYounger : 0) * childOrYoungerPrice);

    // let checkInDate = checkIn != null ? moment(checkIn).format('ddd, Do MMM') : '';
    // let checkOutDate = checkOut != null ? moment(checkOut).format('ddd, Do MMM') : '';

    let initialValues = {
      listId,
      listTitle,
      hostId,
      guestId,
      guests,
      checkIn,
      checkOut,
      basePrice,
      currency,
      cleaningPrice,
      discount,
      discountType,
      guestServiceFee,
      hostServiceFee,
      adults,
      teens,
      childrenOrYounger,
      selectedHour,
      total, /* totalWithoutFees*/
      bookingType,
      paymentType: '2',
      guestEmail,
      isSpecialPriceAssigned,
      bookingSpecialPricing: JSON.stringify(bookingSpecialPricing),
      isSpecialPriceAverage: isAverage.toFixed(2),
      dayDifference
    };

    return (
      <Grid>
        <Row>
          <Col lg={7} md={7} >
            <Elements>
              <PaymentForm
                hostDisplayName={hostDisplayName}
                houseRules={houseRules}
                allowedPersonCapacity={allowedPersonCapacity}
                initialValues={initialValues}
                listId={listId}
                guestPicture={guestPicture}
                adults={adults}
                teens={teens}
                childrenOrYounger={childrenOrYounger}
                adultCapacity={adultCapacity}
                teenCapacity={teenCapacity}
                childOrYoungerCapacity={childOrYoungerCapacity}
                selectedHour={selectedHour}
                adultPrice={adultPrice}
                teenPrice={teenPrice}
                childOrYoungerPrice={childOrYoungerPrice}
              />
            </Elements>
          </Col>
          <Col lg={5} md={5} className={s.positionSticky}>
            <div className={cx(s.summaryCard, s.colCenter)}>
              <div>
                <div className={s.postionRelative}>
                  <ListCoverPhoto
                    className={cx(s.bannerImage, s.backgroundCover)}
                    coverPhoto={coverPhoto}
                    listPhotos={listPhotos}
                    photoType={"x_medium"}
                    bgImage
                  />
                  <div className={s.secondSection}>
                    <div className={cx(s.displayInline, s.avatarWidth, s.vtrMiddle)}>
                      <div className={cx(s.profileAvatarLink, s.profileAvatarSection)}>
                        <Avatar
                          source={hostPicture}
                          title={hostDisplayName}
                          className={s.profileAvatar}
                        />
                      </div>
                      <div className={cx(s.textMuted, s.colorWhite, s.textEllipsis)}>
                        <span>{hostDisplayName}</span>
                      </div>
                    </div>
                    <div className={cx(s.displayInline, s.contentWidth, s.vtrMiddle)}>
                      <div className={cx(s.textLarge, s.colorWhite, s.propertyText)}>
                        <span>{listTitle}</span>
                      </div>
                      <div className={cx(s.textMuted, s.colorWhite, s.listItem)}>
                        <ul className={s.listStyle}>
                          <li>
                            {spokenLanguages && spokenLanguages.length > 0 && <FormattedMessage {...messages.experienceInLanguages} />}
                            {spokenLanguages &&
                            (spokenLanguages.length > 0 &&
                            spokenLanguages.map(element => messages[`listSetting${element.spokenLanguageId}ItemName`] ? <FormattedMessage {...messages[`listSetting${element.spokenLanguageId}ItemName`]} /> : this.props.messages[`listSetting${element.spokenLanguageId}.itemName`])  // element.listsettings.itemName)
                            .reduce((previousValue, currentValue) => `${previousValue}, ${currentValue}`)
                            )}
                          </li>
                        </ul>
                        <div className={s.colorWhite}> {city}, {state}, {country} - {duration}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <Panel className={s.panelHeader}>
                {/* <div className={s.spaceTop2}>
                  <Row className={cx(s.spaceTop3, s.space3)}>
                    <Col xs={5} sm={5} className={s.textCenter}>
                      <div className={cx(s.textGray, s.space1, s.checkInText)}>
                        <span><FormattedMessage {...messages.checkIn} /></span>
                      </div>
                      <div className={s.checkInDate}>{checkInDate}</div>
                    </Col>
                    <Col xs={1} sm={1}>
                      <img src={RightArrowIcon} className={s.arrrowIcon} />
                    </Col>
                    <Col xs={5} sm={5} className={cx(s.pullRight, s.textCenter)}>
                      <div className={cx(s.textGray, s.space1, s.checkInText)}>
                        <span><FormattedMessage {...messages.checkOut} /></span>
                      </div>
                      <div className={s.checkInDate}>{checkOutDate}</div>
                    </Col>
                  </Row>
                  <hr className={s.horizondalLine} />
                </div> */}

                <PaymentDetails
                  basePrice={basePrice}
                  cleaningPrice={cleaningPrice}
                  currency={currency}
                  dayDifference={dayDifference}
                  priceForDays={priceForDays}
                  discount={discount}
                  discountType={discountType}
                  serviceFees={guestServiceFee}
                  total={total}
                  bookingSpecialPricing={bookingSpecialPricing}
                  isSpecialPriceAssigned={isSpecialPriceAssigned}
                  isAverage={isAverage}
                  adults={adults}
                  teens={teens}
                  childrenOrYounger={childrenOrYounger}
                  selectedHour={selectedHour}
                  adultPrice={adultPrice}
                  teenPrice={teenPrice}
                  childOrYoungerPrice={childOrYoungerPrice}
                  adultCapacity={adultCapacity}
                  teenCapacity={teenCapacity}
                  childOrYoungerCapacity={childOrYoungerCapacity}
                />
                <div>
                  <span className={s.checkInText}><FormattedMessage {...messages.cancellationPolicy} />: </span>
                  <span className={s.policyColor}>{policyName}</span>
                </div>
              </Panel>
            </div>
          </Col>
        </Row>
      </Grid>

    );
  }
}

const mapState = (state) => ({
  messages: state.intl.messages
});

const mapDispatch = {}

export default withStyles(s)(connect(mapState, mapDispatch)(Payment));
