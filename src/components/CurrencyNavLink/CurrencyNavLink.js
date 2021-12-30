// General
import React, { Component } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";

// Style
import s from "./CurrencyNavLink.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";

class CurrencyNavLink extends React.Component {
  static propTypes = {
    baseCurrency: PropTypes.string.isRequired,
    toCurrency: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { baseCurrency, toCurrency } = this.props;

    let targetCurrency;
    if (toCurrency) {
      targetCurrency = toCurrency;
    } else {
      targetCurrency = baseCurrency;
    }

    return <span>{targetCurrency}</span>;
  }
}

const mapState = (state) => ({
  baseCurrency: state.currency.base,
  toCurrency: state.currency.to,
});

export default withStyles(s)(connect(mapState)(CurrencyNavLink));
