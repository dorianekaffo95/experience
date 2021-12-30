// General
import React from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";

// Translation
import { injectIntl } from "react-intl";

// Styles
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Header.css";
import cx from "classnames";
import { Navbar } from "react-bootstrap";

// Internal Components
import Navigation from "../Navigation";
import Logo from "../Logo";

// External Components
import Toaster from "../Toaster";
import LoadingBar from "react-redux-loading-bar";
import HeaderLocationSearch from "./HeaderLocationSearch";

// Redux action
import { toggleOpen, toggleClose } from "../../actions/Menu/toggleControl";

import history from "../../core/history";

class Header extends React.Component {
  static propTypes = {
    borderLess: PropTypes.bool,
    showMenu: PropTypes.bool,
    toggleOpen: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
    checked: PropTypes.any,
    page: PropTypes.string,
  };

  static defaultProps = {
    borderLess: false,
    showMenu: false,
    searchDisablePages: ["/", "/home"],
  };

  constructor(props) {
    super(props);
    this.state = {
      searchHide: true,
      load: false,
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleDisableSearchPages = this.handleDisableSearchPages.bind(this);
  }

  componentDidMount() {
    this.setState({
      load: true,
    });
    this.handleDisableSearchPages();
  }

  componentWillReceiveProps(nextProps) {
    this.handleDisableSearchPages();
  }

  handleMenu() {
    const { showMenu, toggleOpen, toggleClose } = this.props;
    if (showMenu) {
      toggleClose();
    } else {
      toggleOpen();
    }
  }

  handleDisableSearchPages() {
    const { searchDisablePages } = this.props;
    let location = history.location ? history.location.pathname : null;
    let searchHide = false;
    if (location && searchDisablePages.length > 0) {
      searchHide = searchDisablePages.find((o) => location === o);
      searchHide = searchHide ? true : false;
    }

    this.setState({
      searchHide,
    });
  }

  render() {
    const { borderLess, showMenu, page } = this.props;
    const { searchHide, load } = this.state;
    let borderClass;
    let location;
    if (borderLess) {
      borderClass = s.rentAllHeaderBorderLess;
    }

    if (history.location) {
      location = history.location.pathname;
    }

    if (!load) {
      return (
        <div className="">
          <div className={s.root} key={new Date().getTime()}>
            <Toaster />
            <LoadingBar />
            <div className={s.container}>
              <Navbar
                fluid
                className={cx(
                  s.rentAllHeader,
                  "headerArrow",
                  "rentAllHeader",
                  borderClass,
                  {
                    [s.fixedHeader]: location === "/s" || location === "/store",
                  },
                  { ["homeHeader"]: location === "/" || location === "/home" }
                )}
                expanded={showMenu}
                onToggle={this.handleMenu}
              >
                <Navbar.Header
                  className={cx(
                    "logoPadding",
                    !showMenu ? "normalPosition" : "fixedPosition"
                  )}
                >
                  <Navbar.Brand>
                    <Logo link={"/"} className={cx(s.brand, s.brandImg)} />
                  </Navbar.Brand>
                  <Navbar.Toggle
                    className={cx(s.navBarToggle, "whiteToggle")}
                    children={
                      <div className={cx("menuToggle", "menuToggleOne")}>
                        <input type="checkbox" checked={showMenu} />
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    }
                  />
                </Navbar.Header>
                <Navbar.Collapse
                  className={cx("location", {
                    ["searchHeader"]: location === "/s",
                  })}
                >
                  {!searchHide && (
                    <Navbar.Form
                      pullLeft
                      className={("hidden-xs", s.breakPoint)}
                    >
                      <HeaderLocationSearch page={page}/>
                    </Navbar.Form>
                  )}
                  <Navigation />
                </Navbar.Collapse>
              </Navbar>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="">
        <div className={s.root}>
          <Toaster />
          <LoadingBar />
          <div className={s.container}>
            <Navbar
              fluid
              className={cx(
                s.rentAllHeader,
                "rentAllHeader",
                borderClass,
                { [s.fixedHeader]: location === "/s" || location === "/store" },
                { ["homeHeader"]: location === "/" || location === "/home" }
              )}
              expanded={showMenu}
              onToggle={this.handleMenu}
            >
              <Navbar.Header
                className={cx(
                  "logoPadding",
                  !showMenu ? "normalPosition" : "fixedPosition"
                )}
              >
                <Navbar.Brand>
                  <Logo link={"/"} className={cx(s.brand, s.brandImg)} />
                </Navbar.Brand>
                <Navbar.Toggle
                  className={s.navBarToggle}
                  children={
                    <div className={cx("menuToggle", "menuToggleOne")}>
                      <input type="checkbox" checked={showMenu} />
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  }
                />
              </Navbar.Header>
              <Navbar.Collapse
                className={cx("location", {
                  ["searchHeader"]: location === "/s",
                })}
              >
                {!searchHide && (
                  <Navbar.Form pullLeft className={("hidden-xs", s.breakPoint)}>
                    <HeaderLocationSearch page={page} />
                  </Navbar.Form>
                )}
                <Navigation />
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  siteSettings: state.siteSettings.data,
  showMenu: state.toggle.showMenu,
});

const mapDispatch = {
  toggleOpen,
  toggleClose,
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(Header))
);
