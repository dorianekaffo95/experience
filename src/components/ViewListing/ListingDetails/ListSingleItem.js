import React from "react";
import PropTypes from "prop-types";

// Style
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./ListingDetails.css";
import { Row, Col, Collapse, Button } from "react-bootstrap";
import cx from "classnames";

// Translation
import { injectIntl, FormattedMessage } from "react-intl";
import * as FontAwesome from "react-icons/lib/fa";
import messages from "../../../locale/messages";

class ListSingleItem extends React.Component {
  static propTypes = {
    value: PropTypes.oneOf([PropTypes.string, PropTypes.boolean]).isRequired,
    label: PropTypes.string.isRequired,
  };

  render() {
    const {
      value,
      label,
      intl: { formatMessage },
    } = this.props;

    return (
      <div className={cx(s.horizontalLineThrough)}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space1)}>
            <p className={cx(s.textMutedNew)}> {label} </p>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop1)}>
            <Row>
              <Col md={12} lg={12}>
                <p className={cx(s.splitList, s.vtrTop)}>
                  <span className={cx(s.text, s.overflowText)}>
                    {`${value}`}
                  </span>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(ListSingleItem));
