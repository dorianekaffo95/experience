import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';
import FooterToggle from '../FooterToggle';
import cx from 'classnames';
import CookiesDisclaimer from '../CookiesDisclaimer';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    page: PropTypes.string
  };

  static defaultProps = {
    page: ''
  };

  render() {
    const { page, className } = this.props;
    console.log("FooterLessLayout: Page ", page);

    return (
      <div>
        <Header page={page} />
        {this.props.children}
        <div className={cx('hidden-xs', { [s.searchFooter]: ['search', 'storeSearch'].includes(page) }, className)}>
          <FooterToggle />
        </div>
        <CookiesDisclaimer />
      </div>
    );
  }
}

export default withStyles(s)(Layout);
