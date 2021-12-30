// General
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux Form
import { Field, reduxForm, formValueSelector } from "redux-form";

// Redux
import { connect } from "react-redux";

// Translation
import { injectIntl, FormattedMessage } from "react-intl";

// Locale
import messages from "../../locale/messages";

// Style
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import {
  Grid,
  Button,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
} from "react-bootstrap";
import s from "./ListPlaceStep1.css";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

import update from "./update";

// Component
import ListPlaceTips from "../ListPlaceTips";

class ExperienceType extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    nextPage: PropTypes.any,
    userData: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    userData: {
      firstName: "",
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      roomType: [],
      personCapacity: [],
      foodSelected: false,
    };
  }

  componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({
        roomType: listingFields.roomType,
        personCapacity: listingFields.personCapacity,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;
    if (listingFields != undefined) {
      this.setState({
        roomType: listingFields.roomType,
        personCapacity: listingFields.personCapacity,
      });
    }
  }

  renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
  }) => {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <select {...input}>{children}</select>
        {touched && error && <span>{formatMessage(error)}</span>}
      </div>
    );
  };

  renderFormControlSelect = ({
    input,
    label,
    meta: { touched, error },
    children,
    className,
  }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl componentClass="select" {...input} className={className}>
          {children}
        </FormControl>
      </div>
    );
  };

  checkboxGroup = ({ label, name, options, input }) => {
    console.log("This is the input: ", input, options);
    return (
    <ul className={s.listContainer}>
      {options.map((option, index) => {
        if (option.isEnable === "1") {
          return (
            <li className={s.listContent} key={index}>
              <span className={s.checkBoxSection}>
                <CustomCheckbox
                  name={`${input.name}[${index}]`}
                  className={"icheckbox_square-green"}
                  value={option.id}
                  checked={input.value.indexOf(option.id) !== -1}
                  onChange={(event) => {
                    const newValue = [...input.value];
                    if (event === true) {
                      newValue.push(option.id);
                    } else {
                      newValue.splice(newValue.indexOf(option.id), 1);
                    }
                    return input.onChange(newValue);
                  }}
                />
              </span>
              <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>
                <label className={cx(s.checkboxLabel, s.noPadding)}>
                  <FormattedMessage {...messages[`listSetting${option.id}ItemName`]} />
                </label>
              </span>
            </li>
          );
        }
      })}
    </ul>
  ); }

  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage } = this.props;
    const { userData, listingFields } = this.props;
    const { roomType, personCapacity, foodSelected } = this.state;

    const experienceTypes = listingFields ? listingFields.experienceTypes : [];
    /* const experienceTypes = [
      { id: "WINE", name: "Wine", itemName: "Wine", isEnable: "1" },
      {
        id: "WINE_AND_APPETIZER",
        name: "Wine & Appetizer",
        itemName: "Wine & Appetizer",
        isEnable: "1",
      },
      { id: "SPIRITS", name: "Spirits", itemName: "Spirits", isEnable: "1" },
      { id: "BEER", name: "Beer", itemName: "Beer", isEnable: "1" },
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
      { id: "OTHERS", name: "Others", itemName: "Other", isEnable: "1" },
    ];*/

    return (
      <Grid>
        <Row>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <Col
              xs={12}
              smOffset={1}
              sm={8}
              mdOffset={1}
              md={8}
              lgOffset={1}
              lg={8}
            >
              <h2 className={s.landingTitle}>
                <FormattedMessage {...messages.hi} />, {userData.firstName}!{" "}
                <FormattedMessage {...messages.letYouGetReady} />.
              </h2>
              <strong className={s.landingStep}>
                <span>STEP 1</span>
              </strong>
              <h3 className={s.landingContentTitle}>
                {" "}
                <FormattedMessage {...messages.whatKindOfPlace} />{" "}
              </h3>

              <form onSubmit={handleSubmit}>
                <FormGroup className={s.formGroup}>
                  <Row>
                    <Col
                      componentClass={ControlLabel}
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                    >
                      <Field
                        name="experienceTypes"
                        component={this.checkboxGroup}
                        options={experienceTypes}
                      />
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col
                      componentClass={ControlLabel}
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                    >
                      <Field
                        name="roomType"
                        component={this.renderFormControlSelect}
                        className={cx(
                          s.backgroundPosition,
                          s.formControlSelect,
                          s.jumboSelect,
                          s.noFontWeight
                        )}
                      >
                        {roomType.map((value, key) => {
                          return (
                            value.isEnable == 1 && (
                              <option value={value.id} key={key}>
                                {value.itemName}
                              </option>
                            )
                          );
                        })}
                      </Field>
                    </Col>

                    <Col
                      componentClass={ControlLabel}
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                    >
                      <Field
                        name="personCapacity"
                        component={this.renderFormControlSelect}
                        className={cx(
                          s.backgroundPosition,
                          s.formControlSelect,
                          s.jumboSelect,
                          s.noFontWeight
                        )}
                      >
                        {personCapacity.map((value, key) => {
                          let rows = [];
                          for (
                            let i = value.startValue;
                            i <= value.endValue;
                            i++
                          ) {
                            rows.push(
                              <option value={i}>
                                for {i}{" "}
                                {i > 1 ? value.otherItemName : value.itemName}
                              </option>
                            );
                          }
                          return rows;
                        })}
                      </Field>
                    </Col>
                  </Row>*/}
                </FormGroup>

                <FormGroup className={s.formGroup}>
                  <Button
                    type="button"
                    className={cx(s.button, s.btnPrimary, s.btnlarge)}
                    onClick={() => nextPage("pluses-included")}
                  >
                    <FormattedMessage {...messages.continue} />
                  </Button>
                </FormGroup>
              </form>
            </Col>
          </Col>
          {/* <ListPlaceTips /> */}
        </Row>
      </Grid>
    );
  }
}

ExperienceType = reduxForm({
  form: "ListPlaceStep1", // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  onSubmit: update,
})(ExperienceType);

const selector = formValueSelector("ListPlaceStep1");

const mapState = (state) => ({
  userData: state.account.data,
  listingFields: state.listingFields.data,
  experienceType: selector(state, "experienceType"),
});

const mapDispatch = {};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(ExperienceType))
);
