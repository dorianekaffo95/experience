import React, { Component } from "react";
import PropTypes from "prop-types";
// Translation
import { injectIntl, FormattedMessage } from "react-intl";

import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./SpokenLanguages.css";
import { Button, FormControl, Image } from "react-bootstrap";
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

const countryCodes = {
  "English": "GB",
  "French": "FR",
  "Italian": "IT",
  "German": "DE",
  "Chinese": "CN",
  "Spanish": "ES",
  "Hindi": "IN",
  "Punjabi": "IN",
  "Bengali": "BD",
  "Portuguese": "PT",
  "Russian": "RU",
  "Japanese": "JP", 
};

class SpokenLanguages extends Component {
  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool,
  };
   static defaultProps = {
    isExpand: false,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setBtnWrapperRef = this.setBtnWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = {
      othersSelected: false,
      others: "",
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  async handleSubmit() {
    const {
      className,
      handleTabToggle,
      isExpand,
      spokenLanguages,
    } = this.props;
    const { change, submitForm } = this.props;
    const { others } = this.state;

    console.log("Values for this filter: ", spokenLanguages, others);
    const languages = spokenLanguages || [];
    await change("currentPage", 1);
    // await change("spokenLanguages", [...languages, ...others.split(",")]);
    submitForm("SearchForm");
    handleTabToggle("spokenLanguages", !isExpand);
  }

  handleReset() {
    const { className, handleTabToggle, isExpand } = this.props;
    const { change, submitForm } = this.props;
    change("spokenLanguages", []);
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
        handleTabToggle("spokenLanguages", !isExpand);
      }
    }
  }

  checkboxHorizontalGroup = ({ label, name, options, input }) => {
    const { formatMessage } = this.props.intl;
    const { othersSelected, others } = this.state;

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
                className={cx(s.displayTableCell, s.checkboxSection, s.NHtype)}
              >
                <CustomCheckbox
                  key={index}
                  className={"icheckbox_square-green"}
                  name={`${input.name}[${index}]`}
                  value={option.id}
                  checked={input.value.indexOf(option.id) !== -1}
                  onChange={(event) => {
                    if (option.id !== "Others") {
                      const newValue = [...input.value];
                      if (event === true) {
                        newValue.push(option.id);
                      } else {
                        newValue.splice(newValue.indexOf(option.id), 1);
                      }
                      input.onChange(newValue);
                    } else if (option.id === "Others") {
                      this.setState({ othersSelected: !othersSelected });
                    }
                  }}
                />
              </div>
              <div className={cx(s.displayTableCell, s.captionTitle, s.NhName)}>
                <label>
                  <Image style={{
                      height: "2em",
                      padding: "0px 10px"
                    }} src={`/flags/${option.otherItemName ? option.otherItemName.toLowerCase() : '_generic'}.svg`}
                    alt={option.itemName}
                  />
                  <span style={{ fontWeight: 100 }}>
                    {messages[`listSetting${option.id}ItemName`] ? <FormattedMessage {...messages[`listSetting${option.id}ItemName`]} /> : this.props.intl.messages[`listSetting${option.id}.itemName`]}
                    </span>
                </label>
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
        <div style={{ display: "table-row" }}>
          <div style={{ display: "table-cell" }}></div>
          <div style={{ display: "table-cell" }}>
            {othersSelected && (
              <FormControl
                placeholder={formatMessage(messages.otherLanguages)}
                type="text"
                onChange={(e) => {
                  console.log("Value: ", e.target.value);
                  this.setState({ others: e.target.value });
                }}
              ></FormControl>
            )}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { className, handleTabToggle, isExpand } = this.props;
    const { 
      fieldsSettingsData,
      spokenLanguages } = this.props;
    const { formatMessage } = this.props.intl;

    const options = fieldsSettingsData ? fieldsSettingsData.spokenLanguages : [];

    let buttonLabel = formatMessage(messages.spokenLanguages);
    if (spokenLanguages && spokenLanguages.length > 0) {
      buttonLabel = `${spokenLanguages.length} ${spokenLanguages.length > 1 ? formatMessage(messages.languages) : formatMessage(messages.language)}`;
    }

    return (
      <div className={className}>
        <div ref={this.setBtnWrapperRef}>
          <Button
            className={cx(
              {
                [s.btnSecondary]:
                  isExpand === true ||
                  (spokenLanguages && spokenLanguages.length > 0),
              },
              s.btn,
              s.responsiveFontsize
            )}
            onClick={() => handleTabToggle("spokenLanguages", !isExpand)}
          >
            {buttonLabel}
          </Button>
        </div>
        {isExpand && (
          <div className={s.searchFilterPopover} ref={this.setWrapperRef}>
            <div className={s.searchFilterPopoverContent}>
              <Field
                name="spokenLanguages"
                component={this.checkboxHorizontalGroup}
                options={options}
              />
              <div className={cx(s.searchFilterPopoverFooter, s.displayTable, s['height-40'])}>
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

SpokenLanguages = reduxForm({
  form: "SearchForm", // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(SpokenLanguages);

// Decorate with connect to read form values
const selector = formValueSelector("SearchForm"); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data,
  spokenLanguages: selector(state, "spokenLanguages"),
});

const mapDispatch = {
  change,
  submitForm,
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(SpokenLanguages)),
);
