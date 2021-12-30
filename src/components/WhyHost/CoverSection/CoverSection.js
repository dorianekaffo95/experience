import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CoverSection.css';
import { FormattedMessage } from 'react-intl';

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
      <Grid>
        <Row className={s.coveredsection}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={cx(s.seperator, s.boxseperator)}></div>
            <div className={s.mainhedding}>
              <h1><FormattedMessage {...messages.coverSectiontitle} /></h1>
            </div>
            <Col xs={12} sm={12} md={6} lg={6} className={s.coveredtextarea}>
              <p className={s.common}><FormattedMessage {...messages.coverSectiondesc1} /></p>
              {/* <p className={s.common}><FormattedMessage {...messages.coverSectiondesc2} /></p> */}
              {/* <a href="#">Lorem ipsum dolor sit amet</a> */}
            </Col>

            <Col xs={12} sm={12} md={6} lg={6}>
              <ul className={s.coverul}>
              <li><FormattedMessage {...messages.coverSectionlistItem1} /></li>
                <li><FormattedMessage {...messages.coverSectionlistItem2} /></li>
                <li><FormattedMessage {...messages.coverSectionlistItem3} /></li>
                <li><FormattedMessage {...messages.coverSectionlistItem4} /> </li>
                <li><FormattedMessage {...messages.coverSectionlistItem5} /></li>
                <li><FormattedMessage {...messages.coverSectionlistItem6} /></li>
                <li><FormattedMessage {...messages.coverSectionlistItem7} /></li>
                <li><FormattedMessage {...messages.coverSectionlistItem8} /></li>
                <li><FormattedMessage {...messages.coverSectionlistItem9} /></li>
                <li><FormattedMessage {...messages.coverSectionlistItem10} /></li>
                <li><FormattedMessage {...messages.coverSectionlistItem11} /></li>
                <li><FormattedMessage {...messages.coverSectionlistItem12} /></li>
                <li><FormattedMessage {...messages.coverSectionlistItem13} /></li>
                <li><FormattedMessage {...messages.coverSectionlistItem14} /></li>
                <li><FormattedMessage {...messages.coverSectionlistItem15} /></li>
                <li><FormattedMessage {...messages.coverSectionlistItem16} /></li>
                <li><FormattedMessage {...messages.coverSectionlistItem17} /></li>
                <li><FormattedMessage {...messages.coverSectionlistItem18} /></li>
                <li><FormattedMessage {...messages.coverSectionlistItem19} /></li>
              </ul>
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
