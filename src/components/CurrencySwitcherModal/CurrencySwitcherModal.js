// General
import React, { Component } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";

// Redux Action
import { choseToCurrency } from "../../actions/getCurrencyRates";
import { closeCurrencySwitcherModal } from "../../actions/modalActions";

// Style
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./CurrencySwitcherModal.css";
import { Modal, Container, Row, Col } from "react-bootstrap";
import cx from "classnames";

const currencyNames = {
  USD: "Dollar américain",
  AUD: "Dollar australien",
  BGN: "Lev bulgare",
  BRL: "Réal brésilien",
  CAD: "Dollar canadien",
  CHF: "Franc suisse",
  CNY: "Yuan chinois",
  CZK: "Couronne tchèque",
  DKK: "Couronne danoise",
  EUR: "Euro",
  GBP: "Livre sterling",
  HKD: "Dollar de Hong Kong",
  HRK: "Kuna croate",
  HUF: "Forint hongrois",
  IDR: "Roupie indonésien",
  ILS: "Nouveau Shekel israëlien",
  INR: "Roupie indien",
  JPY: "Yen japonais",
  KRW: "Won sud-coréen",
  MXN: "Peso mexicain",
  MYR: "Ringgit malais",
  NOK: "Couronne norvégienne",
  NZD: "Dollar néo-zélandais",
  PHP: "Peso philippien",
  PLN: "Zloty polonais",
  RON: "Leu roumain",
  RUB: "Rouble russe",
  SEK: "Couronne suédoise",
  SGD: "Dollar de Singapour",
  THB: "Baht thaïlaindais",
  TRY: "Livre turque",
};

class CurrencySwitcherModal extends React.Component {
  static propTypes = {
    currencies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        symbol: PropTypes.string.isRequired,
        isEnable: PropTypes.bool.isRequired,
        isBaseCurrency: PropTypes.bool,
      })
    ).isRequired,
    baseCurrency: PropTypes.string.isRequired,
    toCurrency: PropTypes.string,
    choseToCurrency: PropTypes.any.isRequired,
    currencySwitcherModal: PropTypes.bool.isRequired,
    closeCurrencySwitcherModal: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currencySwitcherModalStatus: false,
      isFormOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { currencySwitcherModal } = nextProps;
    if (currencySwitcherModal === true) {
      this.setState({ currencySwitcherModalStatus: true });
    } else {
      this.setState({ currencySwitcherModalStatus: false });
    }
  }

  handleChange(value) {
    const { choseToCurrency, closeCurrencySwitcherModal } = this.props;
    choseToCurrency(value);
    closeCurrencySwitcherModal();
  }

  render() {
    const {
      currencies,
      baseCurrency,
      toCurrency,
      closeCurrencySwitcherModal,
    } = this.props;
    const { currencySwitcherModalStatus } = this.state;

    let targetCurrency;
    if (toCurrency) {
      targetCurrency = toCurrency;
    } else {
      targetCurrency = baseCurrency;
    }

    return (
      <div>
        <Modal
          show={currencySwitcherModalStatus}
          animation={false}
          onHide={closeCurrencySwitcherModal}
          dialogClassName={cx(s.signupModalContainer, "currencySwitcherModal")}
        >
          <Modal.Header closeButton>
            {/* <Modal.Title><FormattedMessage {...messages.signup} /></Modal.Title> */}
          </Modal.Header>
          <Modal.Body bsClass={s.signupModalBody}>
            <Row>
              <div>
                <h1>Choisissez une devise</h1>
              </div>
            </Row>
            <Row style={{ marginLeft: 15, marginRight: 15 }}>
              {currencies.map((currency, key) => {
                if (currency.isEnable === true) {
                  return (
                    <Col xs={6} sm={6} md={3} lg={2} xl={2} key={key}>
                      <div
                        className={cx(s.element, {
                          [s.active]: currency.symbol === targetCurrency,
                        })}
                        onClick={() => this.handleChange(currency.symbol)}
                      >
                        <div>{currencyNames[currency.symbol]}</div>
                        <div style={{ color: "grey" }}>{currency.symbol}</div>
                      </div>
                    </Col>
                  );
                }
              })}
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapState = (state) => ({
  currencies: state.currency.availableCurrencies,
  baseCurrency: state.currency.base,
  toCurrency: state.currency.to,
  currencySwitcherModal: state.modalStatus.isCurrencySwitcherModalOpen,
});

const mapDispatch = {
  choseToCurrency,
  closeCurrencySwitcherModal,
};

export default withStyles(s)(
  connect(mapState, mapDispatch)(CurrencySwitcherModal)
);
