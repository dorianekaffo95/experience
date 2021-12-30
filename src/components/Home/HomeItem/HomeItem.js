import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomeItem.css';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import { injectIntl } from 'react-intl';

// Component
import StarRating from '../../StarRating';
import CurrencyConverter from '../../CurrencyConverter';
import ListCoverPhoto from '../../ListCoverPhoto';
import WishListIcon from '../../WishListIcon';

// Locale
import messages from '../../../locale/messages';

// Helpers
import { formatURL } from '../../../helpers/formatURL';

class HomeSlider extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.func,
    id: PropTypes.number,
    photo: PropTypes.string.isRequired,
    beds: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    basePrice: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    roomType: PropTypes.string.isRequired,
    bookingType: PropTypes.string.isRequired,
    listPhotos: PropTypes.array.isRequired,
    coverPhoto: PropTypes.number,
    reviewsCount: PropTypes.number,
    reviewsStarRating: PropTypes.number,
    wishListStatus: PropTypes.bool,
    isListOwner: PropTypes.bool,
    recommended: PropTypes.bool,
    experienceTypes: PropTypes.array,
    duration: PropTypes.number,
  };

  static defaultProps = {
    recommended: false,
  };

  constructor(props) {
    super(props);
    this.randomStyleClass = this.randomStyleClass.bind(this);
  }

  randomStyleClass() {
    let styleClasses = {
      0: s.textDarkBlue,
      1: s.textLightBlue,
      3: s.textLightBrown,
      5: s.textBrown,
      6: s.textMaroon,
      7: s.textDarkBrown,
      8: s.textMediumBrown,
      9: s.textSkyBlue
    };

    let currentIndex = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    return styleClasses[currentIndex];
  }

  render() {
    const { id, photo, basePrice, currency, roomType, beds, title, bookingType } = this.props;
    const { listPhotos, coverPhoto, reviewsCount, reviewsStarRating } = this.props;
    const { wishListStatus, isListOwner, recommended, experienceTypes, duration } = this.props;
    const { formatMessage } = this.props.intl;

    let starRatingValue = 0;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Number(reviewsStarRating / reviewsCount)
    }
    return (
      <div>
        <div className={cx(s.imgContainer)}>
          {
            !isListOwner && <WishListIcon listId={id} key={id} isChecked={wishListStatus} />
          }
          <div className={cx(s.parent)}>
            <div className={cx(s.children)}>
              <div className={cx(s.content)}>
                <a href={"/rooms/" + formatURL(title) + '-' + id} target={'_blank'}>
                  <ListCoverPhoto
                    className={cx(s.imageContent)}
                    coverPhoto={coverPhoto}
                    listPhotos={listPhotos}
                    photoType={"x_small"}
                    bgImage
                    lazyLoad
                  />
                </a>

              </div>
            </div>
          </div>
        </div>
        <div className={s.infoContainer}>
          <a className={s.linkContainer} href={"/rooms/" + formatURL(title) + '-' + id} target={'_blank'}>
            <Row>
              {/* {!recommended && <Col
                xs={12}
                sm={12}
                md={12}
                className={cx(s.space1, s.textEllipsis, s.infoDesc, s.infoText, s.infoSpace)}>
                <div className={cx(s.listingInfo)}>
                  <span>{roomType}</span>
                  <span>&nbsp;&#183;&nbsp;</span>
                  <span>{beds} {beds > 1 ? 'beds' : 'bed'}</span>
                </div>
              </Col> } */}
              {/* <Col xs={12} sm={12} md={12} className={cx(s.textEllipsis, s.listingTitle)}>
                {title}
              </Col>
              <Col xs={12} sm={12} md={12} className={cx(s.textEllipsis)} style={{color: "#484848"}}>
                {experienceTypes && experienceTypes[0] && experienceTypes[0].listsettings.itemName} {experienceTypes && experienceTypes.length > 1 && formatMessage(messages.andMore)} - {`${duration} h`}
              </Col> */}

              <Col
                xs={12}
                sm={12}
                md={12}
                className={cx(s.textStrong, s.space1, s.textEllipsis, s.infoTitle, s.infoText)}
                style={{marginTop: /*recommended ?*/ '8px' /* 'inherit'*/}}
              >
                <span className={s.roomTitleBlock}>
                  <CurrencyConverter
                    amount={basePrice}
                    from={currency}
                  />
                  {
                    bookingType === "instant" && <span><FontAwesome.FaBolt className={s.instantIcon} /></span>
                  }
                </span>
                <span>{title}</span>
              </Col>
              <Col
                xs={12}
                sm={12}
                md={12}
                className={cx(s.textEllipsis, s.infoReview, s.infoText, 'small-star-rating')}>
                <StarRating className={s.reviewStar} value={starRatingValue} name={'review'} />
                <span className={s.reviewText}>
                  {reviewsCount} {reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}
                </span>
              </Col>
            </Row>
          </a>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(HomeSlider));
