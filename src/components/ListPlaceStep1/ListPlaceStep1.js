// General
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Internal Helpers
import submit from "./submit";
import update from "./update";
import updateStep2 from "./updateStep2";
import updateStep3 from "./updateStep3";

// Translation
import { injectIntl } from "react-intl";

// Step #1
import ExistingPage1 from "./ExistingPage1";
import ExperienceType from "./ExperienceType";
import Map from "./Map";
import PlusesIncluded from "./PlusesIncluded";
import MaximumGuests from "./MaximumGuests";
import Location from "./Location";
import SpokenLanguages from "./SpokenLanguages";
import OwnerCare from "./OwnerCare";
import FamilyWelcome from "./FamilyWelcome";

// Step #2
import Photos from "./Photos";
import PhotoCover from "./PhotoCover";
import Title from "./Title";
import Description from "./Description";

// Step #3
import GuestRequirements from "./GuestRequirements";
import HouseRules from "./HouseRules";
import AdvanceNotice from "./AdvanceNotice";
import MaxDaysNotice from "./MaxDaysNotice";
import CancellationPolicy from "./CancellationPolicy";
import PrivateExperience from "./PrivateExperience";
import Pricing from "./Pricing";
import InstantBook from "./InstantBook";

// Tab Bar
import TabBarStep1 from "./TabBarStep1";
import TabBarStep2 from "./TabBarStep2";
import TabBarStep3 from "./TabBarStep3";

import history from "../../core/history";
import Calendar from "./Calendar";

class ListPlaceStep1 extends Component {
  static propTypes = {
    listData: PropTypes.object,
    existingList: PropTypes.bool,
    listingSteps: PropTypes.object,
    listId: PropTypes.number,
    formBaseURI: PropTypes.string,
    mode: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: "index",
      step1: null,
      step2: null,
      step3: null,
      step4: null,
      formValues: {},
    };
  }

  componentWillMount() {
    const { existingList, listingSteps } = this.props;
    if (existingList && listingSteps != undefined) {
      this.setState({
        step1: listingSteps.step1,
        step2: listingSteps.step2,
        step3: listingSteps.step3,
        step4: listingSteps.step4,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { existingList, listingSteps } = nextProps;
    if (existingList && listingSteps != undefined) {
      this.setState({
        step1: listingSteps.step1,
        step2: listingSteps.step2,
        step3: listingSteps.step3,
        step4: listingSteps.step4,
      });
    } else {
      this.setState({
        step1: null,
        step2: null,
        step3: null,
        step4: null,
      });
    }
  }

  nextPage(formPage) {
    const { listId, existingList, formBaseURI } = this.props;
    let pathName = formBaseURI + formPage;
    if (existingList === true) {
      pathName = formBaseURI + listId + "/" + formPage;
    }
    history.push(pathName);
    this.setState({ page: formPage });
  }

  previousPage(formPage) {
    const { listId, existingList, formBaseURI } = this.props;
    let pathName = formBaseURI + formPage;
    if (existingList === true) {
      pathName = formBaseURI + listId + "/" + formPage;
    }
    history.push(pathName);
    this.setState({ page: formPage });
  }

  renderTabBar(currentPage) {
    const { step1, step2, step3, step4 } = this.state;
    const { photosCount } = this.props;

    const step1Pages = [
      "experience-type",
      "pluses-included",
      "maximum-guests",
      "location",
      "map",
      "spoken-languages",
      "owner-care",
      "family-welcome",
    ];
    const step2Pages = ["photos", "cover-photo", "description", "title"];
    const step3Pages = [
      "guest-requirements",
      "house-rules",
      "advance-notice",
      "experience-hours",
      "booking-window",
      "cancellation-policy",
      "private-experience",
      "pricing",
      "instant-book",
    ];

    if (step1Pages.indexOf(currentPage) > -1 && step1 === "completed") {
      return <TabBarStep1 nextPage={this.nextPage} currentPage={currentPage} />;
    }

    if (step2Pages.indexOf(currentPage) > -1 && step2 === "completed") {
      return (
        <TabBarStep2
          nextPage={this.nextPage}
          currentPage={currentPage}
          photosCount={photosCount}
        />
      );
    }

    if (step3Pages.indexOf(currentPage) > -1 && step4 === "completed") {
      return <TabBarStep3 nextPage={this.nextPage} currentPage={currentPage} />;
    }
  }

  render() {
    const { page, formValues, step1 } = this.state;
    const {
      formPage,
      listingSteps,
      photosCount,
      mode,
      existingList,
      listId,
      baseCurrency,
    } = this.props;
    let currentPage = page;
    if (mode != undefined && mode === "new") {
      currentPage = "index";
    } else if (formPage != undefined) {
      currentPage = formPage;
    }
    return (
      <div className={"inputFocusColor"}>
        {this.renderTabBar(currentPage)}
        {["index", "experience-type"].includes(currentPage)  && (
          <ExperienceType nextPage={this.nextPage} />
        )}
        {currentPage === "home" && (
          <ExistingPage1 nextPage={this.nextPage} photosCount={photosCount} />
        )}
        {currentPage === "pluses-included" && (
          <PlusesIncluded
            nextPage={this.nextPage}
            previousPage={this.previousPage}
          />
        )}
        {currentPage === "maximum-guests" && (
          <MaximumGuests
            nextPage={this.nextPage}
            previousPage={this.previousPage}
          />
        )}
        {currentPage === "location" && (
          <Location
            nextPage={this.nextPage}
            previousPage={this.previousPage}
            onSubmit={existingList ? update : submit}
          />
        )}
        {currentPage === "map" && (
          <Map
            nextPage={this.nextPage}
            previousPage={this.previousPage}
          />
        )}
        {currentPage === "spoken-languages" && (
          <SpokenLanguages
            nextPage={this.nextPage}
            previousPage={this.previousPage}
          />
        )}
        {currentPage === "owner-care" && (
          <OwnerCare
            nextPage={this.nextPage}
            previousPage={this.previousPage}
          />
        )}
        {currentPage === "family-welcome" && (
          <FamilyWelcome
            previousPage={this.previousPage}
            onSubmit={update}
          />
        )}

        {currentPage === "photos" && (
          <Photos
            previousPage={this.previousPage}
            listId={listId}
            nextPage={this.nextPage}
          />
        )}
        {currentPage === "cover-photo" && (
          <PhotoCover
            previousPage={this.previousPage}
            listId={listId}
            nextPage={this.nextPage}
          />
        )}
        {currentPage === "description" && (
          <Description
            previousPage={this.previousPage}
            nextPage={this.nextPage}
          />
        )}
        {currentPage === "title" && (
          <Title
            previousPage={this.previousPage}
            nextPage={this.nextPage}
            onSubmit={updateStep2}
          />
        )}

        {currentPage === "guest-requirements" && (
          <div>
            <GuestRequirements
              previousPage={this.previousPage}
              nextPage={this.nextPage}
            />
          </div>
        )}
        {currentPage === "house-rules" && (
          <HouseRules
            previousPage={this.previousPage}
            nextPage={this.nextPage}
          />
        )}
        {currentPage === "advance-notice" && (
          <AdvanceNotice
            previousPage={this.previousPage}
            nextPage={this.nextPage}
          />
        )}
        {currentPage === "experience-hours" && (
          <Calendar
            listId={listId}
            previousPage={this.previousPage}
            nextPage={this.nextPage}
            baseCurrency={baseCurrency}
          />
        )}
        {currentPage === "booking-window" && (
          <MaxDaysNotice
            listId={listId}
            previousPage={this.previousPage}
            nextPage={this.nextPage}
          />
        )}
        {currentPage === "cancellation-policy" && (
          <CancellationPolicy
            previousPage={this.previousPage}
            nextPage={this.nextPage}
          />
        )}
        {currentPage === "private-experience" && (
          <PrivateExperience
            listId={listId}
            previousPage={this.previousPage}
            nextPage={this.nextPage}
            baseCurrency={baseCurrency}
          />
        )}
        {currentPage === "pricing" && (
          <Pricing previousPage={this.previousPage} nextPage={this.nextPage} />
        )}
        {currentPage === "instant-book" && (
          <InstantBook
            previousPage={this.previousPage}
            onSubmit={updateStep3}
          />
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  existingList: state.location.isExistingList,
  listingSteps: state.location.listingSteps,
  photosCount: state.location.photosCount,
});

const mapDispatch = {};

export default injectIntl(connect(mapState, mapDispatch)(ListPlaceStep1));
