// General
import React, { Component } from "react";
import PropTypes from "prop-types";

//Redux Form
import { Field, reduxForm } from "redux-form";

// Translation
import { injectIntl, FormattedMessage } from "react-intl";

// Locale
import messages from "../../locale/messages";

// Redux
import { connect } from "react-redux";

// Style
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import { Grid, Button, Row, FormGroup, Col } from "react-bootstrap";
import s from "./ListPlaceStep1.css";

// Internal Components
import CustomCheckbox from "../CustomCheckbox";
import ListPlaceTips from "../ListPlaceTips";

import update from "./update";

class FamilyWelcome extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      essentialsAmenities: [],
      safetyAmenities: [],
    };
  }

  componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({
        essentialsAmenities: listingFields.essentialsAmenities,
        safetyAmenities: listingFields.safetyAmenities,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;
    if (listingFields != undefined) {
      this.setState({
        essentialsAmenities: listingFields.essentialsAmenities,
        safetyAmenities: listingFields.safetyAmenities,
      });
    }
  }

  radioGroup = ({ label, name, options, input }) => (
    <ul className={s.listContainer}>
      {options.map((option, index) => (
        <li className={s.listContent} key={index}>
          <span className={s.checkBoxSection}>
            <input
              type="radio"
              name={input.name}
              value={option.id}
              onChange={() => input.onChange(option.id)}
            />
          </span>
        </li>
      ))}
    </ul>
  );

  render() {
    const {
      handleSubmit,
      submitting,
      pristine,
      previousPage,
      nextPage,
    } = this.props;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}>
                <FormattedMessage {...messages.familyWelcomeMessage} />
              </h3>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <div className={cx(s.space6, s.spaceTop3)}>
                    <label className={s.displayTable}>
                      <span className={s.displayTableRow}>
                        <span className={s.displayTableCellTop}>
                          <Field
                            name="familyWelcome"
                            component="input"
                            type="radio"
                            value="YES"
                            className={s.BookingradioInput}
                          />
                        </span>
                        <span className={s.displayTableCell} style={{width: "93%"}}>
                          <span className={s.bookText}>
                            <FormattedMessage {...messages.yes} />
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
                            name="familyWelcome"
                            component="input"
                            type="radio"
                            value="NO"
                            className={s.BookingradioInput}
                          />
                        </span>
                        <span className={s.displayTableCell} style={{width: "93%"}}>
                          <span className={s.bookText}>
                            <FormattedMessage {...messages.no} />
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
                            name="familyWelcome"
                            component="input"
                            type="radio"
                            value="PARTIALLY"
                            className={s.BookingradioInput}
                          />
                        </span>
                        <span className={s.displayTableCell} style={{width: "93%"}}>
                          <span className={s.bookText}>
                            <FormattedMessage {...messages.partially} />
                          </span>
                          <span className={s.subText}>
                            <FormattedMessage {...messages.partialWelcomeDescription} />
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
                          onClick={() => previousPage("map")}
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
                          type={"submit"}
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

FamilyWelcome = reduxForm({
  form: "ListPlaceStep1", // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: update,
})(FamilyWelcome);

const mapState = (state) => ({
  listingFields: state.listingFields.data,
});

const mapDispatch = {};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(FamilyWelcome))
);
