import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./SearchHeader.css";
import cx from "classnames";
// Locale
import messages from "../../../locale/messages";

// Components
import Dates from "../Filters/Dates";
import Guests from "../Filters/Guests";
import HomeType from "../Filters/HomeType";
import Price from "../Filters/Price";
import InstantBook from "../Filters/InstantBook";
import MoreFilters from "../Filters/MoreFilters";
import ShowMap from "../Filters/ShowMap";
import SpokenLanguages from "../Filters/SpokenLanguages";
import ExperienceType from "../Filters/ExperienceType";
import PlusesIncluded from "../Filters/PlusesIncluded";
import Hours from "../Filters/Hours/Hours";

class SearchHeader extends Component {
  static propTypes = {
    tabs: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        dates: false,
        hours: false,
        guests: false,
        homeType: false,
        price: false,
        instantBook: false,
        spokenLanguages: false,
        experienceType: false,
        plusesIncluded: false,
        moreFilters: false,
      },
      overlay: false,
      smallDevice: false,
      verySmallDevice: false,
    };

    this.handleTabToggle = this.handleTabToggle.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    let isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      this.handleResize();
      window.addEventListener("resize", this.handleResize);
    }
  }

  componentWillUnmount() {
    let isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      window.removeEventListener("resize", this.handleResize);
    }
  }

  handleResize(e) {
    let isBrowser = typeof window !== "undefined";
    let smallDevice = isBrowser
      ? window.matchMedia("(max-width: 768px)").matches
      : true;
    let verySmallDevice = isBrowser
      ? window.matchMedia("(max-width: 480px)").matches
      : false;
    this.setState({ smallDevice, verySmallDevice });
  }

  handleTabToggle(currentTab, isExpand) {
    const { showForm, showResults, showFilter } = this.props;
    const { tabs, smallDevice } = this.state;

    for (let key in tabs) {
      if (key == currentTab) {
        tabs[key] = isExpand;
      } else {
        tabs[key] = false;
      }
    }

    this.setState({
      tabs,
      overlay: isExpand,
    });

    if (smallDevice) {
      if (isExpand) {
        showFilter();
      } else {
        showResults();
      }
    }
  }

  render() {
    const { searchSettings } = this.props;
    const { tabs, overlay, smallDevice, verySmallDevice } = this.state;

    return (
      <div>
        <div
          className={cx(s.searchHeaderContainerBox, {
            [s.fullResponsiveContainer]:
              tabs.dates == true ||
              tabs.guests == true ||
              tabs.moreFilters == true ||
              tabs.hours == true,
          })}
        >
          <div className={s.searchHeaderContainer}>
            <Dates
              className={s.filterButtonContainer}
              handleTabToggle={this.handleTabToggle}
              isExpand={tabs.dates}
              smallDevice={smallDevice}
              verySmallDevice={verySmallDevice}
            />
            <Hours
              className={s.filterButtonContainer}
              handleTabToggle={this.handleTabToggle}
              isExpand={tabs.hours}
              smallDevice={smallDevice}
              verySmallDevice={verySmallDevice}
            />
            <Price
              className={cx(
                s.filterButtonContainer,
                "hidden-xs",
                s.hideTabletSection
              )}
              handleTabToggle={this.handleTabToggle}
              searchSettings={searchSettings}
              isExpand={tabs.price}
            />
            <Guests
              className={s.filterButtonContainer}
              handleTabToggle={this.handleTabToggle}
              isExpand={tabs.guests}
              smallDevice={smallDevice}
            />
            {/* <HomeType
              className={cx(
                s.filterButtonContainer,
                "hidden-xs",
                s.hideTabletSection
              )}
              handleTabToggle={this.handleTabToggle}
              isExpand={tabs.homeType}
            /> */}

            {/* <InstantBook
              className={cx(
                s.filterButtonContainer,
                "hidden-xs",
                s.hideTabletSection
              )}
              handleTabToggle={this.handleTabToggle}
              isExpand={tabs.instantBook}
            /> */}
            <ExperienceType
              className={cx(
                s.filterButtonContainer,
                "hidden-xs",
                s.hideTabletSection
              )}
              isExpand={tabs.experienceType}
              handleTabToggle={this.handleTabToggle}
            />
            <PlusesIncluded
              className={cx(
                s.filterButtonContainer,
                "hidden-xs",
                s.hideTabletSection
              )}
              isExpand={tabs.plusesIncluded}
              handleTabToggle={this.handleTabToggle}
            />
            <SpokenLanguages
              className={cx(
                s.filterButtonContainer,
                "hidden-xs",
                s.hideTabletSection
              )}
              handleTabToggle={this.handleTabToggle}
              isExpand={tabs.spokenLanguages}
            />
            <MoreFilters
              className={s.filterButtonContainer}
              handleTabToggle={this.handleTabToggle}
              isExpand={tabs.moreFilters}
              searchSettings={searchSettings}
              smallDevice={smallDevice}
            />
            <ShowMap
              className={cx(
                s.filterButtonContainer,
                s.showMapSection,
                "pull-right",
                "hidden-xs",
                s.hideTabletSection
              )}
              handleTabToggle={this.handleTabToggle}
            />
          </div>
        </div>
        {overlay && (
          <div
            className={s.searchFilterPopoverOverlay}
            onClick={this.handleTabToggle}
          ></div>
        )}
      </div>
    );
  }
}

export default withStyles(s)(SearchHeader);
