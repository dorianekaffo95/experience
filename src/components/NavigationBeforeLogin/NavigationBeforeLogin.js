import React from "react";
import PropTypes from "prop-types";

import { FormattedMessage, injectIntl } from "react-intl";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./NavigationBeforeLogin.css";

import { Nav } from "react-bootstrap";

// Modals
import LoginModal from "../LoginModal";
import SignupModal from "../SignupModal";
import ForgotPassword from "../ForgotPassword";

import NavLink from "../NavLink";
import LanguageNavLink from "../LanguageNavLink/LanguageNavLink";
import CurrencyNavLink from "../CurrencyNavLink/CurrencyNavLink";

// Locale
import messages from "../../locale/messages";

// Modals
import CurrencySwitcherModal from "../CurrencySwitcherModal/CurrencySwitcherModal";
import LanguageSwitcherModal from "../LanguageSwitcherModal/LanguageSwitcherModal";

class NavigationBeforeLogin extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    setUserLogout: PropTypes.any,
    openLanguageSwitcherModal: PropTypes.any,
    openCurrencySwitcherModal: PropTypes.any,
    openLoginModal: PropTypes.any,
    openSignupModal: PropTypes.any,
  };

  // goToStore() {
  //   window.location.href = "http://78.46.11.29:3000";
  // }

  render() {
    const {
      className,
      openLanguageSwitcherModal,
      openCurrencySwitcherModal,
      openLoginModal,
      openSignupModal,
    } = this.props;

    const { locale } = this.props.intl;

    return (
      <div>
        <LoginModal />
        <SignupModal />
        <ForgotPassword />
        <LanguageSwitcherModal />
        <CurrencySwitcherModal />
        <Nav pullRight className={s.newMenu}>
          <NavLink to="/" className={cx("hidden-lg", s.newMenuDesign)}>
            <FormattedMessage {...messages.home} />
          </NavLink>
          <NavLink to="#" onClick={openLanguageSwitcherModal}>
            <LanguageNavLink locale={locale}/>
          </NavLink>
          <NavLink to="#" onClick={openCurrencySwitcherModal}>
            <CurrencyNavLink />
          </NavLink>
          <NavLink to="/whyhost">
            <FormattedMessage {...messages.becomeAHost} />
          </NavLink>
          {/* '/store' */}
          <NavLink to="http://store.visitmycellar.com">
            <FormattedMessage {...messages.store} />
          </NavLink>
          <NavLink to="/help">
            <FormattedMessage {...messages.help} />
          </NavLink>
          <NavLink to="#" noLink onClick={openLoginModal}>
            <FormattedMessage {...messages.login} />
          </NavLink>
          <NavLink to="#" noLink onClick={openSignupModal}>
            <FormattedMessage {...messages.signup} />
          </NavLink>
        </Nav>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(NavigationBeforeLogin));
