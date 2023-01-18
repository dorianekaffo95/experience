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

// Component
import ListPlaceTips from "../ListPlaceTips";

// Helpers
import validateStep3 from "./validateStep3";

class CancellationPolicy extends Component {
  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    minNightData: PropTypes.number,
    maxNightData: PropTypes.number,
    siteName: PropTypes.string.isRequired,
  };

  static defaultProps = {
    minNightData: 0,
    maxNightData: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      cancellationPolicy: [],
    };
  }

  componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({ cancellationPolicy: listingFields.cancellationPolicy });
    }
  }

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
        {touched && error && (
          <span className={s.errorMessage}>{formatMessage(error)}</span>
        )}
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
      formErrors,
      minNightData,
      maxNightData,
      intl: { formatMessage },
    } = this.props;
    const { siteName } = this.props;
    const { cancellationPolicy } = this.state;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <h3 className={cx(s.landingContentTitle, s.space5)}>
              <FormattedMessage {...messages.localLaws} />
            </h3>
            <form onSubmit={handleSubmit}>
              <div>
                <FormGroup className={cx(s.formGroup, s.spaceTop4)}>
                  <ControlLabel className={s.landingStep3}>
                    <FormattedMessage {...messages.chooseCancellationPolicy} />
                  </ControlLabel>
                  <Field
                    name="cancellationPolicy"
                    component={this.renderFormControlSelect}
                    className={cx(s.formControlSelect, s.jumboSelect)}
                  >
                    {cancellationPolicy.map((value, key) => {
                      return (
                        value.isEnable == 1 && (
                          <option value={value.id} key={key}>
                            { formatMessage(messages[`listSetting${value.id}ItemName`]) }
                          </option>
                        )
                      );
                    })}
                  </Field>
                </FormGroup>
              </div>
              <div className={s.landingMainContent}>
                <p className={cx(s.textHigh, s.space3)}>
                  <span>
                    <FormattedMessage {...messages.localLawsOne} />
                  </span>
                </p>
                <div className={cx(s.textLow, s.space5)}>
                  <p>
                    <span>
                      <FormattedMessage {...messages.localLawsTwo} />
                    </span>
                  </p>
                  <p>
                    <span>
                      <FormattedMessage {...messages.localLawsThree} />
                    </span>
                  </p>
                  <p>
                    <span>
                      <FormattedMessage {...messages.localLawsFive} />{" "}
                      {siteName}.{" "}
                      <FormattedMessage {...messages.localLawsSix} />
                    </span>
                  </p>
                  <p>
                    <span>
                      <FormattedMessage {...messages.localLawsSeven} />
                    </span>
                  </p>
                </div>
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
                        onClick={() => previousPage("booking-window")}
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
                        onClick={() => nextPage("private-experience")}
                      >
                        <FormattedMessage {...messages.next} />
                      </Button>
                    </Col>
                  </FormGroup>
                </div>
              </div>
            </form>
          </Col>
          {/* <ListPlaceTips /> */}
        </Row>
      </Grid>
    );
  }
}

// Decorate with connect to read form values
const selector = formValueSelector("ListPlaceStep3"); // <-- same as form name

CancellationPolicy = reduxForm({
  form: "ListPlaceStep3", // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3,
})(CancellationPolicy);

const mapState = (state) => ({
  siteName: state.siteSettings.data.siteName,
  listingFields: state.listingFields.data,
  formErrors: state.form.ListPlaceStep3,
  minNightData: selector(state, "minNight"),
  maxNightData: selector(state, "maxNight"),
});

const mapDispatch = {};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(CancellationPolicy))
);
