import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Page.css';

import { injectIntl } from 'react-intl';

class Page extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    html: PropTypes.string,
    id: PropTypes.number
  };

  render() {
    const { messages } = this.props.intl;
    const { title, html, id } = this.props;
    let addClass = 'ql-editor frontend';

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{ id ? messages[`staticPage${id}.headerTitle`] : title }</h1>
          <div className={addClass}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: id ? `${messages[`staticPage${id}.content`]}` : html }}
          />
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(Page));
