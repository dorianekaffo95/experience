// General
import React, { Component } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";

// Style
import s from "./LanguageNavLink.css";
import cx from 'classnames';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import * as FontAwesome from "react-icons/lib/fa";
import Globe from "./global.svg";

const localeDict = {
  "en-US": "English",
  de: "Deutsch",
  es: "Español",
  "it-IT": "Italiano",
  "fr-FR": "Français",
  "pt-PT": "Português",
};

const localeName = (locale) => localeDict[locale] || locale;

class LanguageNavLink extends React.Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    invert: PropTypes.bool,
  };

  static defaultProps = {
    invert: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { locale, invert } = this.props;

    return (
      <span>
        <img src={Globe} className={cx(s.icon, "invert")} />
        {localeName(locale)}
      </span>
    );
  }
}

const mapState = (state) => ({
  locale: state.intl.locale,
});

export default withStyles(s)(connect(mapState)(LanguageNavLink));
