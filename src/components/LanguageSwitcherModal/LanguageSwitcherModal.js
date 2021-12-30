// General
import React, { Component } from "react";
import PropTypes from "prop-types";
import { setLocale } from "../../actions/intl";

// Redux
import { connect } from "react-redux";

// Redux Action
import { closeLanguageSwitcherModal } from "../../actions/modalActions";

// Style
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./LanguageSwitcherModal.css";
import { Modal, Row, Col } from "react-bootstrap";
import cx from "classnames";

import messages from "../../locale/messages";
import { injectIntl } from 'react-intl';

// Constants
const localeDict = {
  "en-US": "English",
  de: "Deutsch",
  es: "Español",
  "it-IT": "Italiano",
  "fr-FR": "Français",
  "pt-PT": "Português",
};
const localeName = (locale) => localeDict[locale] || locale;

class LanguageSwitcherModal extends React.Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    availableLocales: PropTypes.arrayOf(PropTypes.string).isRequired,
    setLocale: PropTypes.any.isRequired,
    languageSwitcherModal: PropTypes.bool,
    closeLanguageSwitcherModal: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      languageSwitcherModalStatus: false,
      isFormOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { languageSwitcherModal } = nextProps;
    if (languageSwitcherModal === true) {
      this.setState({ languageSwitcherModalStatus: true });
    } else {
      this.setState({ languageSwitcherModalStatus: false });
    }
  }

  handleChange(event) {
    const { setLocale, closeLanguageSwitcherModal } = this.props;
    console.log("Change locale event: ", event);
    setLocale({ locale: event });
    closeLanguageSwitcherModal();
  }

  render() {
    const {
      currentLocale,
      availableLocales,
      closeLanguageSwitcherModal,
      intl: { formatMessage } 
    } = this.props;
    const { languageSwitcherModalStatus } = this.state;

    console.log("Current locale: ", currentLocale, availableLocales);

    return (
      <div>
        <Modal
          show={languageSwitcherModalStatus}
          animation={false}
          onHide={closeLanguageSwitcherModal}
          dialogClassName={cx(s.signupModalContainer, "languageSwitcherModal")}
        >
          <Modal.Header closeButton>
            {/* <Modal.Title><FormattedMessage {...messages.signup} /></Modal.Title> */}
          </Modal.Header>
          <Modal.Body bsClass={s.signupModalBody}>
            <Row>
              <div>
                <h1>{formatMessage(messages.chooseLanguage)}</h1>
              </div>
            </Row>
            <Row style={{ marginLeft: 15, marginRight: 15 }}>
              {availableLocales.map((locale) => (
                <Col xs={6} sm={6} md={4} lg={3} xl={2} key={locale}>
                  <div
                    className={cx(s.element, {
                      [s.active]: locale === currentLocale,
                    })}
                    onClick={() => this.handleChange(locale)}
                  >
                    <div>{localeName(locale)}</div>
                    <div style={{ color: "grey" }}>{locale}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapState = (state) => ({
  availableLocales: state.runtime.availableLocales,
  currentLocale: state.intl.locale,
  languageSwitcherModal: state.modalStatus.isLanguageSwitcherModalOpen,
});

const mapDispatch = {
  setLocale,
  closeLanguageSwitcherModal,
};

export default injectIntl(withStyles(s)(
  connect(mapState, mapDispatch)(LanguageSwitcherModal)
));
