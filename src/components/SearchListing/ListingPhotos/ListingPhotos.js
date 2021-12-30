import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingPhotos.css';

import cx from 'classnames';

import Slider from 'react-slick';

import LazyLoadImage from '../../LazyLoadImage';

const nextArrowStyle = {
  right: '1px',
  color: '#484848', zIndex: '0', width: '40px', height: '100%', top: '50%',
  fontSize: '40px', cursor: 'pointer', textAlign: 'center', backgroundColor: 'transparent',
  backgroundImage: '-webkit-linear-gradient(left,rgba(0,0,0,.0001),rgba(0,0,0,.3))',
  backgroundImage: '-o-linear-gradient(left,rgba(0,0,0,.0001) 0,rgba(0,0,0,.3) 100%)',
  backgroundImage: 'linear-gradient(90deg,rgba(0,0,0,.0001) 0,rgba(0,0,0,.3))',
  backgroundRepeat: 'repeat-x',
  filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000000",endColorstr="#80000000",GradientType=1)',
  borderTopRightRadius: '4px',
  borderBottomRightRadius: '4px'
};

const prevArrowStyle = {
  left: '1px',
  color: '#484848', zIndex: '1', width: '40px', height: '100%', top: '50%',
  fontSize: '40px', cursor: 'pointer', textAlign: 'center', backgroundColor: 'transparent',
  backgroundImage: '-webkit-linear-gradient(left,rgba(0,0,0,.3),rgba(0,0,0,.0001))',
  backgroundImage: '-o-linear-gradient(left,rgba(0,0,0,.3) 0,rgba(0,0,0,.0001) 100%)',
  backgroundImage: 'linear-gradient(90deg,rgba(0,0,0,.3) 0,rgba(0,0,0,.0001))',
  backgroundRepeat: 'repeat-x',
  filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#80000000",endColorstr="#00000000",GradientType=1)',
  borderTopLeftRadius: '4px',
  borderBottomLeftRadius: '4px'
};


function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={nextArrowStyle}
      onClick={onClick}
    >
      <svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false"
        style={{ height: '24px', width: '24px', display: 'block', fill: 'rgb(255, 255, 255)', position: 'absolute', top: '45%', right: '0px' }}>
        <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"></path>
      </svg>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={prevArrowStyle}
      onClick={onClick}
    >
      <svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false"
        style={{ height: '24px', width: '24px', display: 'block', fill: 'rgb(255, 255, 255)', position: 'absolute', top: '45%', left: '0px' }}>
        <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"></path>
      </svg>
    </div>
  );
}

class ListingPhotos extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    size: PropTypes.string,
  };

  static defaultProps = {
    listPhotos: [],
    coverPhoto: 0,
    size: 'x_medium_',
  };

  render() {
    const { id, listPhotos, coverPhoto, size, formatURL, title, isMapShow } = this.props;
    const imagepath = `/images/upload/${size}`;
    const placeholderPath = `/images/upload/placeholder_`;

    let indicators = (listPhotos != null && listPhotos.length > 1) ? true : false;

    const settings = {
      dots: indicators,
      infinite: indicators,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      swipe: indicators,
      swipeToSlide: indicators,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            swipe: indicators,
            swipeToSlide: indicators,
            touchMove: indicators,
          }
        },
        {
          breakpoint: 640,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            swipe: indicators,
            swipeToSlide: indicators,
            touchMove: indicators
          }
        }]
    };

    return (
      <div className={cx(s.listPhotoContainer, { [s.listPhotoContainerFullWidth]: isMapShow == false })}>
        <Slider {...settings}>
          {
            listPhotos != null && listPhotos.length && listPhotos.map((item, itemIndex) => {

              return (
                <div className={cx('col-md-12 col-sm-12 col-xs-12', s.sliderItem)} key={itemIndex}>
                  <a href={`/rooms/${formatURL(title)}-${id}`} target={'_blank'}>
                    <div className={s.parent}>
                      <div className={cx(s.children)}>
                        <div className={s.content}>
                          {/* <div
                            className={cx(s.imageContent)}
                            style={{ backgroundImage: `url(${imagepath}${item.name})` }}
                          /> */}
                          <LazyLoadImage 
                            src={`${imagepath}${item.name}`}
                            placeholderSrc={`${placeholderPath}${item.name}`}
                            className={cx(s.imageContent)}
                            placeholderClassName={cx(s.imageContent)}
                          />
                        </div>
                      </div>
                    </div>
                  </a>

                </div>


              )
            })
          }
        </Slider>
        <div className="clearBoth"></div>
      </div>
    );
  }
}

export default withStyles(s)(ListingPhotos);

