import React from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

// Translation
import { FormattedMessage, injectIntl } from "react-intl";

import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./DetailSearchForm.css";

import { Button, Grid, Row, Col, FormControl } from "react-bootstrap";
import cx from "classnames";
import * as FontAwesome from "react-icons/lib/fa";

// History
import history from "../../../core/history";

// Components
import DateRange from "../DateRange/DateRange";
import PlaceGeoSuggest from "../PlaceGeoSuggest/PlaceGeoSuggest";
import MobileDateRange from "../MobileDateRange/MobileDateRange";
import CustomCheckbox from "../../CustomCheckbox";

// Redux Action
import { setPersonalizedValues } from "../../../actions/personalized";

// Helper
import detectMobileBrowsers from "../../../helpers/detectMobileBrowsers";

// Locale
import messages from "../../../locale/messages";
import Guests from "../Guests/Guests";
import HourRange from "../HourRange/HourRange";

class DetailSearchForm extends React.Component {
  static propTypes = {
    setPersonalizedValues: PropTypes.any.isRequired,
    personalized: PropTypes.shape({
      location: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
      chosen: PropTypes.number,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      personCapacity: PropTypes.number,
      formatMessage: PropTypes.any,
    }),
    settingsData: PropTypes.shape({
      listSettings: PropTypes.array.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    listingFields: [],
  };

  static defaultProps = {
    personalized: {
      location: null,
      lat: null,
      lng: null,
      startDate: null,
      endDate: null,
      personCapacity: null,
      chosen: null,
    },
    settingsData: {
      listSettings: [],
    },
  };

  constructor(props) {
    super(props);
    (this.state = {
      mobileDevice: false,
      personCapacity: [],
      isLoad: false,
    }),
      (this.handleClick = this.handleClick.bind(this));
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

  componentWillMount() {
    const { listingFields } = this.props;

    this.setState({ isLoad: true });
    if (detectMobileBrowsers.isMobile() === true) {
      this.setState({ mobileDevice: true });
    }
    if (listingFields != undefined) {
      this.setState({
        roomType: listingFields.roomType,
        personCapacity: listingFields.personCapacity,
      });
    }
  }

  componentDidMount() {
    this.setState({ isLoad: false });
  }

  handleClick() {
    const { personalized, setPersonalizedValues } = this.props;
    let updatedURI,
      uri = "/s?";

    if (personalized.chosen != null) {
      uri =
        uri +
        "&address=" +
        personalized.location +
        "&chosen=" +
        personalized.chosen;
    } else {
      if (personalized.location != null) {
        uri = uri + "&address=" + personalized.location;
      }
    }

    if (personalized.startDate != null && personalized.endDate != null) {
      uri =
        uri +
        "&startDate=" +
        personalized.startDate +
        "&endDate=" +
        personalized.endDate;
    }

    if (personalized.startTime != null) {
      uri = uri + "&startTime=" + personalized.startTime;
    }

    if (personalized.endTime != null) {
      uri = uri + "&endTime=" + personalized.endTime;
    }

    if (
      personalized.personCapacity != null &&
      !isNaN(personalized.personCapacity)
    ) {
      uri = uri + "&guests=" + personalized.personCapacity;
    }

    if (personalized.adults != null && !isNaN(personalized.adults)) {
      uri = uri + "&adults=" + personalized.adults;
    }

    if (personalized.teens != null && !isNaN(personalized.teens)) {
      uri = uri + "&=teens" + personalized.teens;
    }

    if (personalized.children != null && !isNaN(personalized.children)) {
      uri = uri + "&children=" + personalized.children;
    }

    updatedURI = encodeURI(uri);
    history.push(updatedURI);
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
        {touched && error && (
          <span className={s.errorMessage}>{formatMessage(error)}</span>
        )}
        <FormControl
          {...input}
          placeholder={label}
          type={type}
          className={className}
        />
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
        {touched && error && (
          <span className={s.errorMessage}>{formatMessage(error)}</span>
        )}
      </div>
    );
  };

  render() {
    const {
      location,
      dates,
      settingsData,
      setPersonalizedValues,
      personalized,
      listingFields,
    } = this.props;
    const { isLoad } = this.state;
    const { formatMessage } = this.props.intl;
    const { personCapacity } = this.state;
    let rows = [];
    const isBrowser = typeof window !== "undefined";

    let startValue, endValue;
    if (personCapacity && personCapacity[0] && personCapacity[0].startValue) {
      for (
        let i = personCapacity[0].startValue;
        i <= personCapacity[0].endValue;
        i++
      ) {
        rows.push(
          <option value={i} key={i}>
            {i}{" "}
            {i > 1
              ? formatMessage(messages.guests)
              : formatMessage(messages.guest)}
          </option>
        );
        startValue = personCapacity[0].startValue;
        endValue = personCapacity[0].endValue;
      }
    }
    const smallDevice = isBrowser
      ? window.matchMedia("(max-width: 640px)").matches
      : undefined;

    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} className={s.pad0}>
            <form>
              <div
                className={cx(
                  s.searchFormInputs,
                  "homeSearchForm vidSearchForm"
                )}
              >
                <div className={s.searchForm}>
                  <div className={cx(s.table)}>
                    <div className={cx(s.tableRow)}>
                      <div className={cx(s.tableCell, s.location)}>
                        <label className={s.label}>
                          <span>
                            {" "}
                            <FormattedMessage {...messages.where} />
                          </span>
                        </label>
                        <label
                          className={s.searchElement}
                          aria-label="Location input"
                        >
                          {!isLoad && (
                            <PlaceGeoSuggest
                              label={formatMessage(messages.homeWhere)}
                              className={cx(s.formControlInput, s.input)}
                              containerClassName={s.geoSuggestContainer}
                            />
                          )}
                          {isLoad && (
                            <Field
                              component={this.renderFormControl}
                              label={formatMessage(messages.homeWhere)}
                              className={cx(
                                s.formControlInput,
                                s.input,
                                s.loadfield
                              )}
                            />
                          )}
                        </label>
                      </div>

                      <div className={cx(s.tableCell, s.dates)}>
                        <Row>
                        <Col xs={12} lg={12} sm={12} md={12}>
                            <label className={s.label}>
                              <span>
                                {" "}
                                <FormattedMessage {...messages.when} />
                              </span>
                            </label>
                            <span
                              className={cx("homeDate vidFormsearch", s.input)}
                            >
                              {!smallDevice && (
                                <DateRange
                                  formName={"SearchForm"}
                                  displayFormat={"DD/MM/yyyy"}
                                  numberOfMonths={2}
                                />
                              )}
                              {smallDevice && (
                                <MobileDateRange
                                  formName={"SearchForm"}
                                  displayFormat={"DD/MM/yyyy"}
                                  numberOfMonths={1}
                                />
                              )}
                            </span>
                          </Col>
                          {/* <Col xs={12} lg={6} sm={6} md={6}>
                            <label className={s.label}>
                              <span>
                                {" "}
                                <FormattedMessage {...messages.hours} />
                              </span>
                            </label>
                            <HourRange />
                          </Col> */}
                        </Row>
                      </div>

                      <div
                        className={cx(s.tableCell, s.guests, s.mobilePadding)}
                      >
                        <div className={cx(s.tableCell, s.dates)}>
                          <label className={s.label}>
                            <span>
                              <FormattedMessage {...messages.guests} />
                            </span>
                          </label>
                          <span className={cx("homeDate", s.input)}>
                            <Guests></Guests>
                          </span>
                        </div>
                      </div>
                      <div className={cx(s.search)}>
                        <Button
                          className={cx(s.btn, s.btnPrimary, s.btnBlock)}
                          onClick={this.handleClick}
                        >
                          <span className={cx("hidden-lg hidden-xs")}>
                            <FontAwesome.FaSearch />
                          </span>
                          <span className={cx("hidden-md hidden-sm")}>
                            <FormattedMessage {...messages.search} />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
DetailSearchForm = reduxForm({
  form: "DetailSearchForm", // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(DetailSearchForm);

const mapState = (state) => ({
  personalized: state.personalized,
  settingsData: state.viewListing.settingsData,
  listingFields: state.listingFields.data,
});

const mapDispatch = {
  setPersonalizedValues,
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(DetailSearchForm))
);
