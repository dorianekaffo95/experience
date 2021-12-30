import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './HostingBlock.css';

// Locale
import messages from '../../../locale/messages';

class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { refer, siteName } = this.props;

    return (

      <Grid className={s.hostingsection}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={cx(s.seperator, s.boxseperator)}></div>
            {/* <div className={s.mainhedding}>
              <h1><FormattedMessage {...messages.hostingBlocktitle} /></h1>
            </div> */}
            <Col xs={12} sm={12} md={4} lg={4}>
              <div className={s.steps}>
                <p className={s.circle}><span> 1 </span></p>
                <h4 className={s.common}><FormattedMessage {...messages.hostingBlockheading1} /></h4>
                <p className={s.common}><FormattedMessage {...messages.hostingBlockdesc1} /></p>
              </div>
            </Col>

            <Col xs={12} sm={12} md={4} lg={4}>
              <div className={s.steps}>
                <p className={s.circle}><span> 2 </span></p>
                <h4 className={s.common}><FormattedMessage {...messages.hostingBlockheading2} /></h4>
                <p className={s.common}><FormattedMessage {...messages.hostingBlockdesc2} /></p>
              </div>
            </Col>

            <Col xs={12} sm={12} md={4} lg={4}>
              <div className={s.steps}>
                <p className={s.circle}><span> 3 </span></p>
                <h4 className={s.common}><FormattedMessage {...messages.hostingBlockheading3} /></h4>
                <p className={s.common}><FormattedMessage {...messages.hostingBlockdesc3} /> </p>
                {/* <a href="#">Lorem Ipsum </a> */}
              </div>
            </Col>
          </Col>
        </Row>
      </Grid>

    );
  }
}

const mapState = state => ({
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(SocialLogin));
