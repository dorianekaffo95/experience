// General
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux Form
import { Field, reduxForm, formValueSelector } from "redux-form";

// Translation
import { injectIntl, FormattedMessage } from "react-intl";

// Locale
import messages from "../../locale/messages";

// Helpers
import validate from "./validate";

// Redux
import { connect } from "react-redux";

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

// Component
import ListPlaceTips from "../ListPlaceTips";

import update from "./update";

class PrivateExperience extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      houseType: [],
      roomType: [],
      buildingSize: [],
    };
  }

  componentWillMount() {
    const { listingFields } = this.props;

    if (listingFields != undefined) {
      this.setState({
        houseType: listingFields.houseType,
        roomType: listingFields.roomType,
        buildingSize: listingFields.buildingSize,
      });
    }
  }

  componentDidMount() {
    const { valid } = this.props;

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

    if (listingFields != undefined) {
      this.setState({
        houseType: listingFields.houseType,
        roomType: listingFields.roomType,
        buildingSize: listingFields.buildingSize,
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

  render() {
    const {
      handleSubmit,
      submitting,
      pristine,
      valid,
      previousPage,
      nextPage,
      existingList,
    } = this.props;
    const { isDisabled, houseType, roomType, buildingSize } = this.state;

    return (
      <div>
        <Grid fluid>
          <Row className={cx(s.landingContainer, "arrowPosition")}>
            <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
              <div>
                <h3 className={s.landingContentTitle}>
                  <FormattedMessage {...messages.whatKindOfPlaceListing} />
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className={s.landingMainContent}>
                  <div className={cx(s.space6, s.spaceTop3)}>
                    <label className={s.displayTable}>
                      <span className={s.displayTableRow}>
                        <span className={s.displayTableCellTop}>
                          <Field
                            name="privateOrCollective"
                            component="input"
                            type="radio"
                            value="PRIVATE"
                            className={s.BookingradioInput}
                          />
                        </span>
                        <span className={s.displayTableCell} style={{width: "93%"}}>
                          <span className={s.bookText}>
                          <FormattedMessage {...messages.private} />
                            {/* <FormattedMessage {...messages.whoCanBookInfo1} /> */}
                          </span>
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className={cx(s.space6, s.spaceTop3)}>
                    <label className={s.displayTable}>
                      <span className={s.displayTableRow}>
                        <span className={s.displayTableCellTop}>
                          <Field
                            name="privateOrCollective"
                            component="input"
                            type="radio"
                            value="COLLECTIVE"
                            className={s.BookingradioInput}
                          />
                        </span>
                        <span className={s.displayTableCell} style={{width: "93%"}}>
                          <span className={s.bookText}>
                            <FormattedMessage {...messages.collective} />
                            {/* <FormattedMessage {...messages.whoCanBookInfo3} /> */}
                          </span>
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className={s.spaceTop3}>
                    <label className={s.displayTable}>
                      <span className={s.displayTableRow}>
                        <span className={s.displayTableCellTop}>
                          <Field
                            name="privateOrCollective"
                            component="input"
                            type="radio"
                            value="PRIVATE_COLLECTIVE"
                            className={s.BookingradioInput}
                          />
                        </span>
                        <span className={s.displayTableCell} style={{width: "93%"}}>
                          <span className={s.bookText}>
                          <FormattedMessage {...messages.privateCollectiveOption} />
                            {/* <FormattedMessage {...messages.whoCanBookInfo1} /> */}
                          </span>
                          <span className={s.subText}>
                          <FormattedMessage {...messages.privateCollectiveSub} />
                            {/* <FormattedMessage {...messages.whoCanBookInfo2} /> */}
                          </span>
                        </span>
                      </span>
                    </label>
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
                            onClick={() => previousPage("cancellation-policy")}
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
                            onClick={() => nextPage("pricing")}
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
      </div>
    );
  }
}

PrivateExperience = reduxForm({
  form: "ListPlaceStep3", // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmit: update,
})(PrivateExperience);

// Decorate with connect to read form values
const selector = formValueSelector("ListPlaceStep3"); // <-- same as form name

const mapState = (state) => ({
  existingList: state.location.isExistingList,
  listingFields: state.listingFields.data,
});

const mapDispatch = {};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(PrivateExperience))
);
