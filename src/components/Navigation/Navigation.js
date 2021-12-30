import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

// Translation
import { injectIntl } from "react-intl";

import NavigationBeforeLogin from "../NavigationBeforeLogin";
import NavigationAfterLogin from "../NavigationAfterLogin";

import { setUserLogout } from "../../actions/logout";
import {
  openLoginModal,
  openSignupModal,
  openLanguageSwitcherModal,
  openCurrencySwitcherModal,
} from "../../actions/modalActions";

class Navigation extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    setUserLogout: PropTypes.any,
    openLoginModal: PropTypes.any,
    openSignupModal: PropTypes.any,
    openLanguageSwitcherModal: PropTypes.any,
    openCurrencySwitcherModal: PropTypes.any,
  };

  render() {
    const {
      className,
      isAuthenticated,
      setUserLogout,
      openLanguageSwitcherModal,
      openCurrencySwitcherModal,
      openLoginModal,
      openSignupModal,
    } = this.props;

    if (isAuthenticated === true) {
      return (
        <NavigationAfterLogin
          className={className}
          setUserLogout={setUserLogout}
          openLanguageSwitcherModal={openLanguageSwitcherModal}
          openCurrencySwitcherModal={openCurrencySwitcherModal}
        />
      );
    } else {
      return (
        <NavigationBeforeLogin
          className={className}
          openLoginModal={openLoginModal}
          openSignupModal={openSignupModal}
          openLanguageSwitcherModal={openLanguageSwitcherModal}
          openCurrencySwitcherModal={openCurrencySwitcherModal}
        />
      );
    }
  }
}

const mapState = (state) => ({
  isAuthenticated: state.runtime.isAuthenticated,
});

const mapDispatch = {
  setUserLogout,
  openLoginModal,
  openSignupModal,
  openLanguageSwitcherModal,
  openCurrencySwitcherModal,
};
export default injectIntl(connect(mapState, mapDispatch)(Navigation));
