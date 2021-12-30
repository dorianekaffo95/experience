// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import { ProgressBar } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TabBarStep3.css';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

class TabBarStep3 extends Component {

  static propTypes = {
    nextPage: PropTypes.any,
    formatMessage: PropTypes.any,
  };

  render() {
    const { nextPage } = this.props;
    const { formatMessage } = this.props.intl;

    const step3Pages = [
      "guest-requirements",
      "house-rules",
      "advance-notice",
      "experience-hours",
      "booking-window",
      "cancellation-policy",
      "private-experience",
      "pricing",
      "instant-book",
    ];

    return (
      <div className={cx(s.progressContainer, 'hidden-xs')}>
        <a className={s.linkReset} onClick={() => nextPage("guest-requirements")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabGuestRequirements)}
          >
            <FormattedMessage {...messages.tabGuestRequirements} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("house-rules")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabHouseRules)}
          >
            <FormattedMessage {...messages.tabHouseRules} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("advance-notice")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabAdvanceNotice)}
          >
            <FormattedMessage {...messages.tabAdvanceNotice} />
          </div>
        </a>


        <a className={s.linkReset} onClick={() => nextPage("experience-hours")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabExperienceHours)}
          >
            <FormattedMessage {...messages.tabExperienceHours} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("booking-window")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabBookingWindow)}
          >
            <FormattedMessage {...messages.tabBookingWindow} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("cancellation-policy")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabCancellationPolicy)}
          >
            <FormattedMessage {...messages.tabCancellationPolicy} />
          </div>
        </a>


        <a className={s.linkReset} onClick={() => nextPage("private-experience")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabPrivateExperience)}
          >
            <FormattedMessage {...messages.tabPrivateExperience} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("pricing")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabPricing)}
          >
            <FormattedMessage {...messages.tabPricing} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("instant-book")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabInstantBook)}
          >
            <FormattedMessage {...messages.tabInstantBook} />
          </div>
        </a>

        <div>
          <ProgressBar className={s.leanProgress} />
        </div>
      </div>
    );
  }

}

export default injectIntl(withStyles(s)(TabBarStep3));
