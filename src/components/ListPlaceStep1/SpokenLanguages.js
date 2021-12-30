// General
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux Form
import { Field, reduxForm } from "redux-form";

// Redux
import { connect } from "react-redux";
import { updateLocationStatus } from "../../actions/getLocation";
import { updateListingMap } from "../../actions/updateListingMap";

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
  Image,
  FormControl,
} from "react-bootstrap";
import s from "./ListPlaceStep1.css";

// Translation
import { injectIntl, FormattedMessage } from "react-intl";

// Locale
import messages from "../../locale/messages";

// Helpers
import validate from "./validate";

// Internal Component
import PlacesSuggest from "../PlacesSuggest";
import ListPlaceTips from "../ListPlaceTips";
import CountryList from "../CountryList";
import Loader from "../Loader";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

import update from "./update";

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
    initialValues: PropTypes.object,
    isLocationChosen: PropTypes.bool,
    previousPage: PropTypes.any,
    onSubmit: PropTypes.any,
    updateLocationStatus: PropTypes.any,
    nextPage: PropTypes.any,
    isExistingList: PropTypes.bool,
    updateListingMap: PropTypes.any,
    mapUpdateLoading: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      hideSuggestInput: true,
      othersSelected: false,
    };
  }

  componentWillMount() {
    const { isExistingList, isLocationChosen } = this.props;
    if (!isLocationChosen && !isExistingList) {
      this.setState({ hideSuggestInput: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isExistingList, isLocationChosen } = nextProps;
    if (!isLocationChosen && !isExistingList) {
      this.setState({ hideSuggestInput: false });
    } else {
      this.setState({ hideSuggestInput: true });
    }
  }

  checkboxGroup = ({ label, name, options, input }) => {
    const { othersSelected } = this.state;
    const { formatMessage } = this.props.intl;

    return (<ul className={s.listContainer}>
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
                    if (option.itemName !== "Others") {
                      const newValue = [...input.value];
                      if (event === true) {
                        newValue.push(option.id);
                      } else {
                        newValue.splice(newValue.indexOf(option.id), 1);
                      }
                      input.onChange(newValue);
                    } else if (option.itemName === "Others") {
                      this.setState({ othersSelected: !othersSelected });
                    }
                  }}
                />
              </span>
              <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>
                <label className={cx(s.checkboxLabel, s.noPadding)}>
                  <Image style={{
                      height: "2em",
                      padding: "0px 10px"
                    }} src={`/flags/${countryCodes[option.itemName].toLowerCase()}.svg`}
                    alt={option.itemName}
                  />
                  <span style={{ fontWeight: 100 }}>{option.itemName}</span>
                  {option.id === "Others" && othersSelected && (
                    <span>
                      <FormControl
                        placeholder={formatMessage(messages.otherLanguages)}
                        type="text"
                        onChange={(e) => {
                          this.setState({ others: e.target.value });
                        }}
                      ></FormControl>
                    </span>
                  )}
                </label>
              </span>
            </li>
          );
        }
      })}
    </ul>);
};

  renderLocationForm = () => {
    const {
      isExistingList,
      nextPage,
      previousPage,
      onSubmit,
      invalid,
      updateListingMap,
      loading,
      mapUpdateLoading,
      listingFields
    } = this.props;
    const { formatMessage } = this.props.intl;
    const { error, handleSubmit, submitting, valid } = this.props;
    let isDisabled = true;
    if (valid) {
      isDisabled = false;
    }

    const options = listingFields ? listingFields.spokenLanguages : [];

    return (
      <div>
        <div className={s.landingMainContent}>
          <h3 className={s.landingContentTitle}>
            <FormattedMessage {...messages.spokenLanguagesMessage} />
          </h3>

          <FormGroup className={s.formGroup}>
            <Field
              name="spokenLanguages"
              component={this.checkboxGroup}
              className={cx(
                s.formControlSelect,
                s.jumboSelect,
                s.formControlSelectLarge
              )}
              options={options}
            />
          </FormGroup>
        </div>
        <div className={s.nextPosition}>
          <div className={s.nextBackButton}>
            <hr className={s.horizontalLineThrough} />

            <FormGroup className={s.formGroup}>
              <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
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
                    s.btnPrimaryBorder,
                    s.btnlarge,
                    s.pullRight
                  )}
                  onClick={() => nextPage("owner-care")}
                >
                  <FormattedMessage {...messages.next} />
                </Button>
              </Col>
            </FormGroup>
          </div>
        </div>
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
      onSubmit,
      nextPage,
    } = this.props;
    const { isLocationChosen, isExistingList } = this.props;
    const { formatMessage } = this.props.intl;
    const { hideSuggestInput } = this.state;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <form onSubmit={handleSubmit}>
              {error && <strong>{formatMessage(error)}</strong>}
              {this.renderLocationForm()}
            </form>
          </Col>
          {/* <ListPlaceTips /> */}
        </Row>
      </Grid>
    );
  }
}

SpokenLanguages = reduxForm({
  form: "ListPlaceStep1", // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmit: update,
})(SpokenLanguages);

const mapState = (state) => ({
  isLocationChosen: state.location.isLocationChosen,
  isExistingList: state.location.isExistingList,
  loading: state.loader.location,
  mapUpdateLoading: state.location.mapUpdateLoading,
  listingFields: state.listingFields.data,
});

const mapDispatch = {
  updateLocationStatus,
  updateListingMap,
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(SpokenLanguages))
);
