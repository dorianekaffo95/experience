// General
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux Form
import { Field, reduxForm } from "redux-form";

// Redux
import { connect } from "react-redux";

// Translation
import { injectIntl, FormattedMessage } from "react-intl";

// Locale
import messages from "../../locale/messages";

// Helpers
import validateStep3 from "./validateStep3";

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

// Component
import ListPlaceTips from "../ListPlaceTips";
import updateStep3 from "./updateStep3";

class Pricing extends Component {
  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
    };
  }

  componentWillMount() {
    const { valid, listingFields } = this.props;

    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { valid, listingFields } = nextProps;

    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  renderFormControl = ({
    input,
    label,
    type,
    meta: { touched, error },
    className,
  }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl
          {...input}
          placeholder={label}
          type={type}
          className={className}
          maxLength={5}
        />
        {touched && error && (
          <span className={s.errorMessage}>{formatMessage(error)}</span>
        )}
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

  render() {
    const {
      error,
      handleSubmit,
      submitting,
      dispatch,
      nextPage,
      previousPage,
    } = this.props;
    const { isDisabled } = this.state;
    const { formatMessage } = this.props.intl;
    const { base, availableCurrencies, mapUpdateLoading } = this.props;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}>
                <FormattedMessage {...messages.pricing} />
              </h3>

              {/* Pricing rules */}
              <p className={cx(s.landingStep3, s.space4)}>
                <span>
                  <FormattedMessage {...messages.pricingDescription} />
                </span>
              </p>

              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <FormGroup className={s.formGroup}>
                    <ControlLabel className={s.landingStep3}>
                      <FormattedMessage {...messages.currency} />
                    </ControlLabel>

                    {/* Base Currency */}
                    <Field
                      name="currency"
                      component={this.renderFormControlSelect}
                      className={cx(s.formControlSelect, s.jumboSelect)}
                    >
                      {availableCurrencies.map((currency, key) => {
                        if (currency.isEnable === true) {
                          return (
                            <option key={key} value={currency.symbol}>
                              {currency.symbol}
                            </option>
                          );
                        }
                      })}
                    </Field>
                  </FormGroup>

                 <h3>
                   <FormattedMessage {...messages.pricesPerPersonWithVAT} />
                 </h3>
                  {/* Adult Price */}
                  <FormGroup className={cx(s.formGroup, s.space4)}>
                    <ControlLabel className={s.landingStep3}>
                      <FormattedMessage {...messages.adultPrice} />
                    </ControlLabel>
                    <Field
                      name="adultPrice"
                      type="text"
                      component={this.renderFormControl}
                      label={formatMessage(messages.adultPrice)}
                      className={cx(
                        s.formControlInput,
                        s.jumboSelect,
                        s.formControlInputMaxWidth
                      )}
                    />
                  </FormGroup>

                  {/* Teens Price */}
                  <FormGroup className={cx(s.formGroup, s.space4)}>
                    <ControlLabel className={s.landingStep3}>
                      <FormattedMessage {...messages.teenPrice} />
                    </ControlLabel>
                    <Field
                      name="teenPrice"
                      type="text"
                      component={this.renderFormControl}
                      label={formatMessage(messages.teenPrice)}
                      className={cx(
                        s.formControlInput,
                        s.jumboSelect,
                        s.formControlInputMaxWidth
                      )}
                    />
                  </FormGroup>

                  {/* Kids Price */}
                  <FormGroup className={cx(s.formGroup, s.space4)}>
                    <ControlLabel className={s.landingStep3}>
                      <FormattedMessage {...messages.kidPrice} />
                    </ControlLabel>
                    <Field
                      name="childOrYoungerPrice"
                      type="text"
                      component={this.renderFormControl}
                      label={formatMessage(messages.kidPrice)}
                      className={cx(
                        s.formControlInput,
                        s.jumboSelect,
                        s.formControlInputMaxWidth
                      )}
                    />
                  </FormGroup>

                  {/* Minimum Total Price */}
                  <FormGroup className={cx(s.formGroup, s.space4)}>
                    <ControlLabel className={s.landingStep3}>
                      <FormattedMessage {...messages.minimumTotalPrice} />
                    </ControlLabel>
                    <Field
                      name="basePrice"
                      type="text"
                      component={this.renderFormControl}
                      label={formatMessage(messages.minimumTotalPrice)}
                      className={cx(
                        s.formControlInput,
                        s.jumboSelect,
                        s.formControlInputMaxWidth
                      )}
                    />
                  </FormGroup>

                  <p>
                    <FormattedMessage {...messages.descMinPrice} />
                  </p>

                </div>
                <div className={s.nextPosition}>
                  <div className={s.nextBackButton}>
                    <hr className={s.horizontalLineThrough} />

                    <FormGroup className={s.formGroup}>
                      <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        className={s.noPadding}
                      >
                        <Button
                          className={cx(
                            s.button,
                            s.btnPrimaryBorder,
                            s.btnlarge,
                            s.pullLeft
                          )}
                          onClick={() => previousPage("private-experience")}
                        >
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button
                          className={cx(
                            s.button,
                            s.btnPrimary,
                            s.btnlarge,
                            s.pullRight
                          )}
                          disabled={isDisabled}
                          onClick={() => nextPage("instant-book")}
                        >
                          <FormattedMessage {...messages.next} />
                        </Button>
                      </Col>
                    </FormGroup>
                  </div>
                </div>
              </form>
            </div>
          </Col>
          {/* <ListPlaceTips /> */}
        </Row>
      </Grid>
    );
  }
}

Pricing = reduxForm({
  form: "ListPlaceStep3", // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3,
  onSubmit: updateStep3,
  // onSubmit: updateStep4
})(Pricing);

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  availableCurrencies: state.currency.availableCurrencies,
  base: state.currency.base,
  mapUpdateLoading: state.location.mapUpdateLoading,
});

const mapDispatch = {};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(Pricing))
);
