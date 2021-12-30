// General
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux Form
import { Field, reduxForm, formValueSelector } from "redux-form";

// Redux
import { connect } from "react-redux";

// Translation
import { injectIntl, FormattedMessage } from "react-intl";
import Loader from "../Loader";

// Locale
import messages from "../../locale/messages";

// Helpers
import validate from "./validate";

// Internal Component
import PlaceMap from "../PlaceMap";

// Style
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import { Grid, Button, Row, FormGroup, Col } from "react-bootstrap";
import s from "./ListPlaceStep1.css";

import update from "./update";

class OwnerCare extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    locationMap: PropTypes.object,
    isMapTouched: PropTypes.bool,
    lat: PropTypes.number,
    lng: PropTypes.number,
  };

  renderPlaceMap = ({
    input,
    label,
    meta: { touched, error },
    lat,
    lng,
    isMapTouched,
    mapWarning,
    mapSuccess,
  }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span>{formatMessage(error)}</span>}
        <PlaceMap
          {...input}
          lat={lat}
          lng={lng}
          isMapTouched={isMapTouched}
          mapWarning={mapWarning}
          mapSuccess={mapSuccess}
        />
      </div>
    );
  };

  render() {
    const {
      error,
      handleSubmit,
      submitting,
      pristine,
      previousPage,
      nextPage,
    } = this.props;
    const { locationMap, isMapTouched, lat, lng } = this.props;
    const { formatMessage } = this.props.intl;
    let isDisabled = true;
    if (isMapTouched === true || locationMap != undefined) {
      isDisabled = false;
    }

    const ownerCareOptions = [
      { id: "Y", name: "Yes", itemName: "Yes", isEnable: "1" },
      { id: "N", name: "No", itemName: "No", isEnable: "1" },
    ];

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={12} md={12} lg={12} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}>
                <FormattedMessage {...messages.ownerCareMessage} />
              </h3>
              <form onSubmit={handleSubmit}>
                {error && <strong>{formatMessage(error)}</strong>}
                <div>
                  <FormGroup>
                  <div className={s.spaceTop3}>
                    <label className={s.displayTable}>
                      <span className={s.displayTableRow}>
                        <span className={s.margin15}>
                          <Field
                            name="visitWithOwner"
                            component="input"
                            type="radio"
                            value="YES"
                            className={s.BookingradioInput}
                          />
                        </span>
                        <span>
                          <span className={s.bookText} style={{display: "inline-block"}}>
                            {"Yes"}
                            {/* <FormattedMessage {...messages.whoCanBookInfo1} /> */}
                          </span>
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className={cx(s.space6, s.spaceTop3)}>
                    <label className={s.displayTable}>
                      <span className={s.displayTableRow}>
                        <span className={s.margin15}>
                          <Field
                            name="visitWithOwner"
                            component="input"
                            type="radio"
                            value="NO"
                            className={s.BookingradioInput}
                          />
                        </span>
                        <span>
                          <span className={s.bookText} style={{display: "inline-block"}}>
                            {"No"}
                            {/* <FormattedMessage {...messages.whoCanBookInfo3} /> */}
                          </span>
                        </span>
                      </span>
                    </label>
                  </div>
                  </FormGroup>
                </div>
                <div className={s.nextPosition}>
                  <div className={s.nextBackButtonMap}>
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
                          onClick={() => previousPage("spoken-languages")}
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
                          onClick={() => nextPage("family-welcome")}
                          disabled={isDisabled}
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
        </Row>
      </Grid>
    );
  }
}

OwnerCare = reduxForm({
  form: "ListPlaceStep1", // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmit: update,
})(OwnerCare);

// Decorate with connect to read form values
const selector = formValueSelector("ListPlaceStep1"); // <-- same as form name
OwnerCare = connect((state) => {
  // can select values individually
  const locationMap = selector(state, "locationMap");
  const isMapTouched = selector(state, "isMapTouched");
  const lat = selector(state, "lat");
  const lng = selector(state, "lng");
  return {
    locationMap,
    isMapTouched,
    lat,
    lng,
  };
})(OwnerCare);

export default injectIntl(withStyles(s)(OwnerCare));
