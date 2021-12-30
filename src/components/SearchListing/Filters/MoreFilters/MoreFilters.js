import React, { Component } from "react";
import PropTypes from "prop-types";
// Translation
import { injectIntl, FormattedMessage } from "react-intl";

import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./MoreFilters.css";
import { Row, Col, Button } from "react-bootstrap";
import cx from "classnames";
import MdClear from "react-icons/lib/md/clear";

// Redux Form
import {
  reduxForm,
  formValueSelector,
  change,
  submit as submitForm,
  getFormValues,
} from "redux-form";

// Redux
import { connect } from "react-redux";

// Locale
import messages from "../../../../locale/messages";

// Submit
import submit from "../../SearchForm/submit";

// Internal Components
import RoomsBeds from "./RoomsBeds";
import CheckboxListItems from "./CheckboxListItems";
import HomeType from "./HomeType";
import Price from "./Price";
import InstantBook from "./InstantBook";
import FamilyWelcome from "./FamilyWelcome";
import ExperienceType from "./ExperienceType";
import SpokenLanguages from "./SpokenLanguages";
import PlusesIncluded from "./PlusesIncluded";
import PrivateCollective from "./PrivateCollective/PrivateCollective";

class MoreFilters extends Component {
  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool,
  };

  static defaultProps = {
    isExpand: false,
    fieldsSettingsData: {
      roomType: [],
      essentialsAmenities: [],
      spaces: [],
      houseRules: [],
    },
    homeType: [],
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setBtnWrapperRef = this.setBtnWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    const { isExpand } = this.props;
    document.addEventListener("mousedown", this.handleClickOutside);
    if (isExpand) {
      document.querySelector("body").setAttribute("style", "overflow: hidden");
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.querySelector("body").removeAttribute("style");
  }

  componentWillReceiveProps(nextProps) {
    const { isExpand } = nextProps;
    if (isExpand) {
      document.querySelector("body").setAttribute("style", "overflow: hidden");
    } else {
      document.querySelector("body").removeAttribute("style");
    }
  }

  async handleSubmit() {
    const { className, handleTabToggle, isExpand } = this.props;
    const { change, submitForm } = this.props;
    await change("currentPage", 1);
    submitForm("SearchForm");
    handleTabToggle("moreFilters", !isExpand);
  }

  handleReset() {
    const { className, handleTabToggle, isExpand } = this.props;
    const { change, submitForm } = this.props;
    handleTabToggle("moreFilters", !isExpand);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  setBtnWrapperRef(node) {
    this.btnWrapperRef = node;
  }

  handleClickOutside(event) {
    const { className, handleTabToggle, isExpand } = this.props;
    const { change, submitForm } = this.props;

    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      change("currentPage", 1);
      submitForm("SearchForm");
      if (this.btnWrapperRef && !this.btnWrapperRef.contains(event.target)) {
        handleTabToggle("moreFilters", !isExpand);
      }
    }
  }

  render() {
    const {
      className,
      handleTabToggle,
      isExpand,
      formValues,
      searchSettings,
    } = this.props;
    const {
      fieldsSettingsData: { essentialsAmenities, spaces, houseRules },
    } = this.props;
    const { formatMessage } = this.props.intl;

    const privateCollectiveExperience = [
      { id: "PRIVATE", name: "Private", itemName: "Private", isEnable: "1" },
      {
        id: "COLLECTIVE",
        name: "Collective",
        itemName: "Collective with guests",
        isEnable: "1",
      },
    ];

    let isActive = false;

    if (
      (formValues &&
        (formValues.beds ||
          formValues.bedrooms ||
          formValues.bathrooms ||
          formValues.familyWelcome ||
          (formValues.amenities && formValues.amenities.length) ||
          (formValues.spaces && formValues.spaces.length) ||
          (formValues.houseRules && formValues.houseRules.length)))
    ) {
      isActive = true;
    }

    return (
      <div className={className}>
        <div ref={this.setBtnWrapperRef}>
          <Button
            className={cx(
              { [s.btnSecondary]: isExpand === true || isActive == true },
              s.btn,
              s.btnFontsize,
              s.responsiveFontsize
            )}
            onClick={() => {
              handleTabToggle("moreFilters", !isExpand);
            }}
          >
            <span className={cx("hidden-md hidden-lg")}>
              <FormattedMessage {...messages.filter} />
            </span>
            <span className={cx("hidden-xs hidden-sm")}>
              <FormattedMessage {...messages.moreFilters} />
            </span>
          </Button>
        </div>
        {isExpand && (
          <div className={s.searchFilterPopoverFull} ref={this.setWrapperRef}>
            <div className={cx(s.searchFilterPopoverContent, s.padding6)}>
              <div
                className={cx(
                  "visible-xs",
                  s.searchFilterPopoverHeader,
                  s.showTabletSection
                )}
              >
                <div className={cx(s.displayTable)}>
                  <div
                    className={cx(
                      "text-left",
                      s.displayTableCell,
                      s.searchFilterCloseIcon
                    )}
                  >
                    <span onClick={this.handleSubmit}>
                      <MdClear />
                    </span>
                  </div>
                </div>
              </div>

              {/* <HomeType
                className={cx(
                  s.filters,
                  "visible-xs",
                  s.spaceTop7,
                  s.space4,
                  s.showTabletSection
                )}
              /> */}

              <Price
                className={cx(
                  s.filters,
                  "visible-xs",
                  s.space4,
                  s.showTabletSection
                )}
                searchSettings={searchSettings}
              />

              <ExperienceType
                className={cx(
                  s.filters,
                  "visible-xs",
                  s.spaceTop7,
                  s.space4,
                  s.showTabletSection
                )}
                showLabel={formatMessage(messages.showExperienceTypes)}
                hideLabel={formatMessage(messages.hideExperienceTypes)}
              />

              <SpokenLanguages
                className={cx(
                  s.filters,
                  "visible-xs",
                  s.spaceTop7,
                  s.space4,
                  s.showTabletSection
                )}
              />

              <PlusesIncluded
                className={cx(
                  s.filters,
                  "visible-xs",
                  s.spaceTop7,
                  s.space4,
                  s.showTabletSection
                )}
                showLabel={formatMessage(messages.showPlusesIncluded)}
                hideLabel={formatMessage(messages.hidePlusesIncluded)}
              />

              {/* <RoomsBeds className={s.filters} /> */}
              <FamilyWelcome className={s.filters} />
              <InstantBook
                className={cx(
                  s.filters,
                  // "visible-xs",
                  // s.space4,
                  // s.showTabletSection
                )}
              />
              <PrivateCollective className={s.filters} />
              {/* <CheckboxListItems
                className={s.filters}
                fieldName={"amenities"}
                options={essentialsAmenities}
                captionTitle={formatMessage(messages.aminities)}
                showLabel={formatMessage(messages.showAmenities)}
                hideLabel={formatMessage(messages.closeAmenities)}
                isActive={
                  formValues &&
                  formValues.amenities &&
                  formValues.amenities.length > 0
                }
              /> */}
              {/* <CheckboxListItems
                className={s.filters}
                fieldName={"spaces"}
                options={spaces}
                captionTitle={formatMessage(messages.facilities)}
                showLabel={formatMessage(messages.showAllFacilities)}
                hideLabel={formatMessage(messages.closeFacilities)}
                isActive={
                  formValues &&
                  formValues.spaces &&
                  formValues.spaces.length > 0
                }
              /> */}
              {/* <div className={s.houseMobile}>
                <CheckboxListItems
                  className={s.filters}
                  fieldName={"houseRules"}
                  options={houseRules}
                  captionTitle={formatMessage(messages.houseRules)}
                  showLabel={formatMessage(messages.showAllHouseRules)}
                  hideLabel={formatMessage(messages.closeHouseRules)}
                  isActive={
                    formValues &&
                    formValues.houseRules &&
                    formValues.houseRules.length > 0
                  }
                />
              </div> */}
              <div className={cx(s.filtersFooter, "text-right")}>
                <Row>
                  <Col
                    lg={6}
                    lgOffset={6}
                    md={6}
                    mdOffset={6}
                    sm={12}
                    smOffset={0}
                    xs={12}
                    xsOffset={0}
                  >
                    <Col lg={6} md={6} sm={6} xs={6} className={s.spaceTop1}>
                      <Button
                        bsStyle="link"
                        className={cx(s.btnLink)}
                        onClick={this.handleReset}
                      >
                        <FormattedMessage {...messages.cancel} />
                      </Button>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <Button
                        className={cx(s.btn, s.btnSecondary, s.fullWidth)}
                        onClick={this.handleSubmit}
                      >
                        <FormattedMessage {...messages.applyFilters} />
                      </Button>
                    </Col>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

MoreFilters = reduxForm({
  form: "SearchForm", // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(MoreFilters);

// Decorate with connect to read form values
const selector = formValueSelector("SearchForm"); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data,
  homeType: selector(state, "roomType"),
  formValues: getFormValues("SearchForm")(state),
});

const mapDispatch = {
  change,
  submitForm,
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(MoreFilters))
);
