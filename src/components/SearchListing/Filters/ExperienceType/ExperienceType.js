import React, { Component } from "react";
import PropTypes from "prop-types";
// Translation
import { injectIntl, FormattedMessage } from "react-intl";

import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./ExperienceType.css";
import { Button } from "react-bootstrap";
import cx from "classnames";

// Redux Form
import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  submit as submitForm,
} from "redux-form";

// Redux
import { connect } from "react-redux";

// Locale
import messages from "../../../../locale/messages";

// Submit
import submit from "../../SearchForm/submit";

import CustomCheckbox from "../../../CustomCheckbox";

class ExperienceType extends Component {
  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool,
  };

  static defaultProps = {
    isExpand: false,
    fieldsSettingsData: {
      roomType: [],
    },
    homeType: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      foodSelected: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setBtnWrapperRef = this.setBtnWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  async handleSubmit() {
    const { className, handleTabToggle, isExpand } = this.props;
    const { change, submitForm } = this.props;
    await change("currentPage", 1);
    submitForm("SearchForm");
    handleTabToggle("experienceType", !isExpand);
  }

  handleReset() {
    const { className, handleTabToggle, isExpand } = this.props;
    const { change, submitForm } = this.props;
    change("roomType", []);
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
        handleTabToggle("experienceType", !isExpand);
      }
    }
  }

  checkboxHorizontalGroup = ({ label, name, options, input }) => {
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.displayTable)}>
        {options.map((option, index) => {
          if (option.isEnable !== "1") {
            return <span maxPrice />;
          }
          let splitLineContent =
            option.itemDescription && option.itemDescription.split("\n");
          let newSplitLineContent =
            splitLineContent &&
            splitLineContent.filter(function(el) {
              return el;
            });
          return (
            <div className={cx(s.displayTableRow)}>
              <div
                className={cx(
                  s.displayTableCell,
                  s.padding4,
                  s.checkboxSection,
                  s.NHtype
                )}
              >
                <CustomCheckbox
                  key={index}
                  className={"icheckbox_square-green"}
                  name={`${input.name}[${index}]`}
                  value={option.id}
                  checked={input.value.indexOf(option.id) !== -1}
                  onChange={(event) => {
                    const newValue = [...input.value];
                    if (event === true) {
                      newValue.push(option.id);
                    } else {
                      newValue.splice(newValue.indexOf(option.id), 1);
                    }
                    input.onChange(newValue);
                  }}
                />
              </div>
              <div
                className={cx(
                  s.displayTableCell,
                  s.captionTitle,
                  s.padding4,
                  s.NhName
                )}
              >
                {/*option.itemName*/}
                <FormattedMessage {...messages[`listSetting${option.id}ItemName`]} />
                <div>
                  {newSplitLineContent &&
                    newSplitLineContent.length > 0 &&
                    newSplitLineContent.map((itemValue, indexes) => {
                      return (
                        <span>
                          <p
                            className={s.dot}
                            dangerouslySetInnerHTML={{ __html: itemValue }}
                          />
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { className, handleTabToggle, isExpand } = this.props;
    const {
      fieldsSettingsData,
      experienceType,
    } = this.props;
    const { formatMessage } = this.props.intl;

    const experienceTypes = fieldsSettingsData ? fieldsSettingsData.experienceTypes : [];

    let buttonLabel = formatMessage(messages.experienceType);

    if (experienceType && experienceType.length > 0) {
      buttonLabel = `${experienceType.length} ${experienceType.length > 1 ? formatMessage(messages.experienceTypes) : formatMessage(messages.experienceType)}`;
    }

    /*
    const experienceTypes = [
      { id: "WINE", name: "Wine", itemName: "Wine", isEnable: "1" },
      {
        id: "WINE_AND_APPETIZER",
        name: "Wine & Appetizer",
        itemName: "Wine & Appetizer",
        isEnable: "1",
      },
      { id: "SPIRITS", name: "Spirits", itemName: "Spirits", isEnable: "1" },
      { id: "COFFEE", name: "Coffee", itemName: "Coffee", isEnable: "1" },
      { id: "OIL", name: "Oil", itemName: "Oil", isEnable: "1" },
      { id: "PASTA", name: "Pasta", itemName: "Pasta", isEnable: "1" },
      {
        id: "FARM_PRODUCTS",
        name: "Farm Products",
        itemName: "Farm Products",
        isEnable: "1",
      },
      {
        id: "CHARCUTERIE",
        name: "Charcuterie",
        itemName: "Charcuterie",
        isEnable: "1",
      },
      {
        id: "MILK_PRODUCTS",
        name: "Milk Products",
        itemName: "Milk Products",
        isEnable: "1",
      },
      { id: "BEER", name: "Beer", itemName: "Beer", isEnable: "1" },
      { id: "OTHERS", name: "Others", itemName: "Other", isEnable: "1" },
    ];*/

    return (
      <div className={className}>
        <div ref={this.setBtnWrapperRef}>
          <Button
            className={cx(
              {
                [s.btnSecondary]:
                  isExpand === true ||
                  (experienceType && experienceType.length > 0),
              },
              s.btn,
              s.responsiveFontsize
            )}
            onClick={() => handleTabToggle("experienceType", !isExpand)}
          >
            {buttonLabel}
          </Button>
        </div>
        {isExpand && (
          <div className={s.searchFilterPopover} ref={this.setWrapperRef}>
            <div className={s.searchFilterPopoverContent}>
              <Field
                name="experienceTypes"
                component={this.checkboxHorizontalGroup}
                options={experienceTypes}
              />

              <div className={cx(s.searchFilterPopoverFooter, s.displayTable)}>
                <div className={cx("text-left", s.displayTableCell)}>
                  {/* <Button
                    bsStyle="link"
                    className={cx(s.btnLink)}
                    onClick={this.handleReset}>
                    <FormattedMessage {...messages.clear} />
                  </Button> */}
                </div>
                <div className={cx("text-right", s.displayTableCell)}>
                  <Button
                    bsStyle="link"
                    className={cx(s.btnLink, s.btnLinkSecondary)}
                    onClick={this.handleSubmit}
                  >
                    <FormattedMessage {...messages.apply} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ExperienceType = reduxForm({
  form: "SearchForm", // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(ExperienceType);

// Decorate with connect to read form values
const selector = formValueSelector("SearchForm"); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data,
  experienceType: selector(state, "experienceTypes"),
});

const mapDispatch = {
  change,
  submitForm,
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(ExperienceType))
);
