import React from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";

import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./SpokenLanguages.css";
import { Button, FormControl, Collapse, Image } from "react-bootstrap";
import cx from "classnames";
import * as FontAwesome from "react-icons/lib/fa";

// Redux Form
import { reduxForm, Field, formValueSelector } from "redux-form";

// Redux
import { connect } from "react-redux";

// Submit Action
import submit from "../../../SearchForm/submit";

// Locale
import messages from "../../../../../locale/messages";
import CustomCheckbox from "../../../../CustomCheckbox/CustomCheckbox";

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

class SpokenLanguages extends React.Component {
  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool,
  };

  static defaultProps = {
    isExpand: false,
    options: [],
    showLabel: "Show",
    hideLabel: "Hide",
    isActive: false,
  };

  static defaultProps = {
    isExpand: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      othersSelected: false,
      others: "",
      isOpen: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.renderCollapse = this.renderCollapse.bind(this);
  }

  componentWillMount() {
    const { isActive } = this.props;
    this.setState({
      isOpen: isActive,
    });
  }

  handleToggle = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  renderCollapse = (input, restArray, isOpen) => {
    const { formatMessage } = this.props.intl;
    const { othersSelected } = this.state;
    if (restArray && restArray.length > 0) {
      return (
        <div className={s.space2}>
          <Collapse className={s.collapseContainer} in={isOpen}>
            <div>
              {restArray.map((language, index) => {
                return (
                  <div key={index}>
                    <div>
                      <CustomCheckbox
                        name={`${input.name}[${index}]`}
                        className={"icheckbox_square-green"}
                        value={language.id}
                        checked={
                          input.value.indexOf(language.id) !== -1
                        }
                        onChange={(event) => {
                          if (language.id !== "Others") {
                            const newValue = [...input.value];
                            if (event === true) {
                              newValue.push(language.id);
                            } else {
                              newValue.splice(newValue.indexOf(language.id), 1);
                            }
                            input.onChange(newValue);
                          } else if (language.id === "Others") {
                            this.setState({ othersSelected: !othersSelected });
                          }
                        }}
                      />
                      <label>
                        <Image style={{
                            height: "2em",
                            padding: "0px 10px"
                          }} src={`/flags/${countryCodes[language.itemName].toLowerCase()}.svg`}
                          alt={language.itemName}
                        />
                        <span style={{ fontWeight: 100 }}>{language.itemName}</span>
                      </label>
                    </div>
                    <div style={{ display: "table-row" }}>
                      <div style={{ display: "table-cell" }}></div>
                      <div style={{ display: "table-cell" }}>
                        {othersSelected && language.id === "Others" && (
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
              })}
            </div>
          </Collapse>
          <Button
            bsStyle="link"
            type="button"
            className={cx(s.btn, s.btnLink, s.btnLinkSecondary, s.toggleLink)}
            onClick={() => this.handleToggle()}
          >
            {isOpen
              ? formatMessage(messages.hideOtherSpokenLanguages)
              : formatMessage(messages.showAllSpokenLanguages)}
            {isOpen && <FontAwesome.FaAngleUp className={s.toggleIcon} />}
            {!isOpen && <FontAwesome.FaAngleDown className={s.toggleIcon} />}
          </Button>
        </div>
      );
    } else {
      return <span />;
    }
  };

  renderLanguagesSelect = ({ label, name, options, input, isOpen }) => {
    let count = 4,
      firstArray = [],
      restArray = [];
    let itemList =
      options && options.length > 0
        ? options.filter((o) => o.isEnable == "1")
        : [];
    if (itemList && itemList.length > 0) {
      firstArray = itemList.slice(0, count);
      restArray = itemList.slice(count, itemList.length);
    }

    const { othersSelected } = this.state;
    const { formatMessage } = this.props.intl;

    return (
      <div>
        {firstArray.map((language, index) => (
          <div>
            <div>
              <CustomCheckbox
                name={`${input.name}[${index}]`}
                className={"icheckbox_square-green"}
                value={language.id}
                checked={input.value.indexOf(language.id) !== -1}
                onChange={(event) => {
                  if (language.id !== "Others") {
                    const newValue = [...input.value];
                    if (event === true) {
                      newValue.push(language.id);
                    } else {
                      newValue.splice(newValue.indexOf(language.id), 1);
                    }
                    input.onChange(newValue);
                  } else if (language.id === "Others") {
                    this.setState({ othersSelected: !othersSelected });
                  }
                }}
              />
              <label>
                  <Image style={{
                      height: "2em",
                      padding: "0px 10px"
                    }} src={`/flags/${countryCodes[language.itemName].toLowerCase()}.svg`}
                    alt={language.itemName}
                  />
                  <span style={{ fontWeight: 100 }}>{language.itemName}</span>
                </label>
            </div>
            <div style={{ display: "table-row" }}>
              <div style={{ display: "table-cell" }}></div>
              <div style={{ display: "table-cell" }}>
                {othersSelected && language.id === "Others" && (
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
        ))}
        {this.renderCollapse(input, restArray, isOpen)}
      </div>
    );
  };

  render() {
    const { className, isExpand, handleTabToggle, fieldsSettingsData } = this.props;
    const { languages, isOpen } = this.state;

    const options = fieldsSettingsData ? fieldsSettingsData.spokenLanguages : [];

    return (
      <div className={className}>
        <p className={cx(s.captionTitle, s.space3, s.textBold, s.spaceTop1)}>
          <FormattedMessage {...messages.spokenLanguages} />
        </p>
        <div className={cx(s.displayTable, s.space4)}>
          <Field
            name="spokenLanguages"
            component={this.renderLanguagesSelect}
            options={options}
            isOpen={isOpen}
          />
        </div>
      </div>
    );
  }
}

SpokenLanguages = reduxForm({
  form: "SearchForm",
  onSubmit: submit,
  destroyOnUnmount: false,
})(SpokenLanguages);

const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data,
  spokenLanguages: selector(state, 'spokenLanguages'),
});

const mapDispatch = {};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(SpokenLanguages))
);
