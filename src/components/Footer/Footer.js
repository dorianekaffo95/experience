import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { graphql, compose } from "react-apollo";

import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Footer.css";

import { Row, Col, Grid, Image } from "react-bootstrap";
import cx from "classnames";
import * as FontAwesome from "react-icons/lib/fa";

// Component
import LanguageSwitcher from "../LanguageSwitcher";
import CurrencySwitcher from "../CurrencySwitcher";
import Link from "../Link";
import BannerImage from "./Banner.jpg";

// Locale
import messages from "../../locale/messages";

import getEnabledBlog from "./getEnabledBlog.graphql";

// Images
import PlayStore from "./Google_Play_Store_badge_EN.svg";
import AppStore from "./download-on-the-app-store.svg";

class Footer extends React.Component {
  static propTypes = {
    siteName: PropTypes.string.isRequired,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    instagram: PropTypes.string,
    formatMessage: PropTypes.any,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getEnabledBlog: PropTypes.array,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      rentall: false,
      hosting: false,
      discover: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      data: { getEnabledBlog },
    } = nextProps;
    getEnabledBlog &&
      getEnabledBlog.length > 0 &&
      getEnabledBlog.map((item) => {
        if (item.footerCategory == "RentALL") {
          this.setState({ rentall: true });
        }
        if (item.footerCategory == "discover") {
          this.setState({ discover: true });
        }
        if (item.footerCategory == "hosting") {
          this.setState({ hosting: true });
        }
      });
  }

  goToStore() {
    window.location.href = "http://78.46.11.29:3000";
  }

  render() {
    const { siteName, facebook, twitter, instagram, appStoreLink, playStoreLink } = this.props;
    
    const {
      data: { getEnabledBlog },
    } = this.props;
    const { rentall, discover, hosting } = this.state;
    return (
      <div className={s.positionRelative}>
        <div
          className={cx(s.topImageBanner, s.root)}
        >
          <div className={s.container}>
            <div className={cx(s.footerSectionContainer, "hidden-print")}>
              <Grid fluid>
                <Row>
                  {/*<Col xs={12} sm={3} md={2} lg={2} className={cx(s.dropDownSection)}>
                  <CurrencySwitcher />
                  <LanguageSwitcher />
                </Col>*/}

                  <Col
                    sm={3}
                    mdOffset={1}
                    md={2}
                    lgOffset={1}
                    lg={2}
                    xsHidden
                    className={cx(s.noPadding, s['first-footer-col'])}
                  >
                    <label className={s.landingLabel}>{siteName}</label>
                    <ul className={s.listContainer}>
                      <li>
                        <Link to={"/about"} className={s.textLink}>
                          <FormattedMessage {...messages.about} />
                        </Link>
                      </li>
                      <li>
                        <Link to={"/contact"} className={s.textLink}>
                          <FormattedMessage {...messages.contactForm} />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"http://store.visitmycellar.com"}
                          className={s.textLink}
                        >
                          <FormattedMessage {...messages.store} />
                        </Link>
                      </li>
                      {rentall &&
                        getEnabledBlog &&
                        getEnabledBlog.length > 0 &&
                        getEnabledBlog.map((item) => {
                          if (item.footerCategory == "RentALL") {
                            return (
                              <li>
                                <Link
                                  to={"/page/" + item.pageUrl}
                                  className={s.textLink}
                                >
                                  {item.pageTitle}
                                </Link>
                              </li>
                            );
                          }
                        })}
                    </ul>
                  </Col>
                  <Col
                    sm={3}
                    mdOffset={1}
                    md={2}
                    lgOffset={1}
                    lg={2}
                    xsHidden
                    className={cx(s.noPadding)}
                  >
                    <label className={s.landingLabel}>
                      <FormattedMessage {...messages.discover} />
                    </label>
                    <ul className={s.listContainer}>
                      <li>
                        <Link to={"/safety"} className={s.textLink}>
                          <FormattedMessage {...messages.trustSafety} />
                        </Link>
                      </li>
                      <li>
                        <Link to={"/travel"} className={s.textLink}>
                          <FormattedMessage {...messages.travelCredit} />
                        </Link>
                      </li>
                      {discover &&
                        getEnabledBlog &&
                        getEnabledBlog.length > 0 &&
                        getEnabledBlog.map((item) => {
                          if (item.footerCategory == "discover") {
                            return (
                              <li>
                                <Link
                                  to={"/page/" + item.pageUrl}
                                  className={s.textLink}
                                >
                                  {item.pageTitle}
                                </Link>
                              </li>
                            );
                          }
                        })}
                    </ul>
                  </Col>
                  <Col
                    sm={3}
                    mdOffset={1}
                    md={2}
                    lgOffset={1}
                    lg={2}
                    xsHidden
                    className={cx(s.noPadding)}
                  >
                    <label className={s.landingLabel}>
                      <FormattedMessage {...messages.hosting} />
                    </label>
                    <ul className={s.listContainer}>
                      <li>
                        <Link to={"/whyhost"} className={s.textLink}>
                          <FormattedMessage {...messages.becomeAHost} />
                        </Link>
                      </li>
                      <li>
                        <Link to={"/privacy"} className={s.textLink}>
                          <FormattedMessage {...messages.termsPrivacy} />
                        </Link>
                      </li>
                      {hosting &&
                        getEnabledBlog &&
                        getEnabledBlog.length > 0 &&
                        getEnabledBlog.map((item) => {
                          if (item.footerCategory == "hosting") {
                            return (
                              <li>
                                <Link
                                  to={"/page/" + item.pageUrl}
                                  className={s.textLink}
                                >
                                  {item.pageTitle}
                                </Link>
                              </li>
                            );
                          }
                        })}
                    </ul>
                  </Col>
                  <Col
                    sm={3}
                    smOffset={0}
                    mdOffset={1}
                    md={2}
                    lgOffset={1}
                    lg={2}
                    xs={6}
                    xsOffset={3}
                  >
                    <label className={s.landingLabel}>
                      <FormattedMessage {...messages.appAvailableOn} />
                    </label>
                    <Row>
                      {/* {playStoreLink && (<div>
                        <a href={playStoreLink}>
                          <Image src={playStore} responsive />
                        </a>
                      </div>)} */}
                      {/* {appStoreLink && (<div>
                        <a href={appStoreLink}>
                          <Image src={appStore} responsive />
                        </a>
                      </div>)} */}
                      <div>
                        <a href={playStoreLink}>
                          <img src={PlayStore} responsive />
                        </a>
                      </div>
                      <div>
                        <a href={appStoreLink}>
                          <img src={AppStore} responsive />
                        </a>
                      </div>
                    </Row>
                  </Col>
                </Row>
                <Row className={cx(s.copyrightSection, s.spaceTop2)}>
                  <Col xs={6} sm={4} md={4} lg={4} className={s.noPadding}>
                    <span className={s.text}>© {siteName}.</span>
                  </Col>
                  <Col xs={6} sm={8} md={8} lg={8} className={s.noPadding}>
                    {instagram && (
                      <a
                        href={instagram}
                        target="_blank"
                        className={cx(s.shareIcon, s.xsHidden)}
                      >
                        <FontAwesome.FaInstagram />
                      </a>
                    )}
                    {twitter && (
                      <a
                        href={twitter}
                        target="_blank"
                        className={cx(s.shareIcon, s.xsHidden)}
                      >
                        <FontAwesome.FaTwitter />
                      </a>
                    )}
                    {facebook && (
                      <a
                        href={facebook}
                        target="_blank"
                        className={cx(s.shareIcon, s.xsHidden)}
                      >
                        <FontAwesome.FaFacebook />
                      </a>
                    )}
                  </Col>
                </Row>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  siteName: state.siteSettings.data.siteName,
  facebook: state.siteSettings.data.facebookLink,
  twitter: state.siteSettings.data.twitterLink,
  instagram: state.siteSettings.data.instagramLink,
  appStoreLink: state.siteSettings.data.appStoreLink,
  playStoreLink: state.siteSettings.data.playStoreLink,
});

const mapDispatch = {};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(getEnabledBlog, {
    options: {
      fetchPolicy: "network-only",
      ssr: false,
    },
  })
)(Footer);
