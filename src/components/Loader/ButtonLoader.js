import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  Button
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Loader.css';

// Component
import MDSpinner from 'react-md-spinner';

class ButtonLoader extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    children: PropTypes.node,
    handleClick: PropTypes.any,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    spinnerColor: PropTypes.string,
  };

  static defaultProps = {
    label: 'Submit',
    show: false,
    type: 'button',
    spinnerColor: '#fff'
  };

  render() {
    const { label, show, type, handleClick, className, disabled, spinnerColor, children } = this.props;
    let isDisabled = false;
    if (show || disabled) {
      isDisabled = true;
    }
    return (
      <Button
        className={className}
        disabled={isDisabled}
        type={type}
        onClick={handleClick}
      >
        {
          show && <MDSpinner
            singleColor={spinnerColor}
            size={18}
          />
        }
        &nbsp;{label}
        {children}
      </Button>
    );
  }
}

export default withStyles(s)(ButtonLoader);