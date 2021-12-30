// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Style
import { ProgressBar } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TabBarStep1.css';

// Locale
import messages from '../../locale/messages';

class TabBarStep1 extends Component {

  static propTypes = {
    nextPage: PropTypes.any,
    formatMessage: PropTypes.any,
  };

  render() {
    const { nextPage } = this.props;
    const { formatMessage } = this.props.intl;

    [
      "experience-type",
      "pluses-included",
      "maximum-guests",
      "location",
      "spoken-languages",
      "owner-care",
      "family-welcome",
    ];

    return (
      <div className={cx(s.progressContainer, 'hidden-xs')}>
        <a className={s.linkReset} onClick={() => nextPage("experience-type")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabExperienceType)}
          >
            <FormattedMessage {...messages.tabExperienceType} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("pluses-included")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabPlusesIncluded)}
          >
            <FormattedMessage {...messages.tabPlusesIncluded} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("maximum-guests")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabMaximumGuests)}
          >
            <FormattedMessage {...messages.tabMaximumGuests} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("location")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.location)}
          >
            <FormattedMessage {...messages.location} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("map")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabMap)}
          >
            <FormattedMessage {...messages.tabMap} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("spoken-languages")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabSpokenLanguages)}
          >
            <FormattedMessage {...messages.tabSpokenLanguages} />
          </div>
        </a>


        <a className={s.linkReset} onClick={() => nextPage("owner-care")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabOwnerCare)}
          >
            <FormattedMessage {...messages.tabOwnerCare} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("family-welcome")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabFamilyWelcome)}
          >
            <FormattedMessage {...messages.tabFamilyWelcome} />
          </div>
        </a>


        <div>
          <ProgressBar className={s.leanProgress} />
        </div>

      </div>
    );
  }

}

export default injectIntl(withStyles(s)(TabBarStep1));

