import React from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";
import CustomCheckbox from "../../../../CustomCheckbox";

import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./ExperienceType.css";
import { Button, Collapse } from "react-bootstrap";
import cx from "classnames";
import * as FontAwesome from 'react-icons/lib/fa';

// Redux Form
import { reduxForm, Field, formValueSelector } from "redux-form";

// Redux
import { connect } from "react-redux";

// Submit Action
import submit from "../../../SearchForm/submit";

// Locale
import messages from "../../../../../locale/messages";

class ExperienceType extends React.Component {
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
    this.state = {
      isOpen: false,
    };

    this.checkboxGroup = this.checkboxGroup.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.renderCollapse = this.renderCollapse.bind(this);
  }

  renderCollapse(input, restArray, isOpen) {
    const { showLabel, hideLabel } = this.props;

    if (restArray && restArray.length > 0) {
      return (
        <div className={s.space2}>
          <Collapse className={s.collapseContainer} in={isOpen}>
            <div>
              {
                restArray.map((option, index) => {
                  return (
                    <div key={index} className={cx(s.checkBoxContainer)}>
                      <div className={cx(s.displayTable, s.space2)}>
                        <div className={cx(s.displayTableCell, s.checkBoxSection)}>
                          <CustomCheckbox
                            className={'icheckbox_square-green'}
                            name={`${input.name}[${index}]`}
                            value={option.id}
                            checked={input.value.indexOf(option.id) !== -1}
                            onChange={event => {
                              const newValue = [...input.value];
                              if (event === true) {
                                newValue.push(option.id);
                              } else {
                                newValue.splice(newValue.indexOf(option.id), 1);
                              }
                              return input.onChange(newValue);
                            }}
                          />
                        </div>
                        <div className={s.displayTableCell}>
                          {/* option.itemName */}
                          <FormattedMessage {...messages[`listSetting${option.id}ItemName`]} />
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </Collapse>
          <Button bsStyle="link" type="button" className={cx(s.btn, s.btnLink, s.btnLinkSecondary, s.toggleLink)}
            onClick={() => this.handleToggle()}>
            {isOpen ? hideLabel : showLabel}
            {
              isOpen && <FontAwesome.FaAngleUp className={s.toggleIcon} />
            }
            {
              !isOpen && <FontAwesome.FaAngleDown className={s.toggleIcon} />
            }
          </Button>
        </div>
      );
    } else {
      return <span />
    }

  }

  checkboxGroup = ({ label, name, options, input, isOpen }) => {
    let count = 4, firstArray = [], restArray = [];
    let itemList = options && options.length > 0 ? options.filter(o => o.isEnable == "1") : [];
    if (itemList && itemList.length > 0) {
      firstArray = itemList.slice(0, count);
      restArray = itemList.slice(count, itemList.length);
    }

    return (
      <div>
        {
          firstArray.map((option, index) => {
            return (
              <div key={index} className={cx(s.checkBoxContainer)}>
                <div className={cx(s.displayTable, s.space2)}>
                  <div className={cx(s.displayTableCell, s.checkBoxSection)}>
                    <CustomCheckbox
                      className={'icheckbox_square-green'}
                      name={`${input.name}[${index}]`}
                      value={option.id}
                      checked={input.value.indexOf(option.id) !== -1}
                      onChange={event => {
                        const newValue = [...input.value];
                        if (event === true) {
                          newValue.push(option.id);
                        } else {
                          newValue.splice(newValue.indexOf(option.id), 1);
                        }
                        return input.onChange(newValue);
                      }}
                    />
                  </div>
                  <div className={s.displayTableCell}>
                    {option.itemName}
                  </div>
                </div>
              </div>
            )
          })
        }
        {this.renderCollapse(input, restArray, isOpen)}
      </div>
    )
  };

  handleToggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  render() {
    const { isExpand, className, handleTabToggle, fieldsSettingsData } = this.props;
    const { isOpen } = this.state;

    const experienceTypes = fieldsSettingsData ? fieldsSettingsData.experienceTypes : [];
    
    /* const experienceTypes = [
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
        <p className={cx(s.captionTitle, s.space3, s.textBold, s.spaceTop1)}>
          <FormattedMessage {...messages.experienceTypes} />
        </p>
        <div className={cx(s.displayTable, s.space4)}>
          <Field
            name="experienceType"
            component={this.checkboxGroup}
            options={experienceTypes}
            isOpen={isOpen}
          />
        </div>
      </div>
    );
  }
}

ExperienceType = reduxForm({
  form: "SearchForm", // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(ExperienceType);

const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data,
  experienceTypes: selector(state, 'experienceType'),
});

const mapDispatch = {};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(ExperienceType))
);
