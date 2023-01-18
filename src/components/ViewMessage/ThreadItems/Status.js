import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';

import moment from 'moment';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';

import messages from '../../../locale/messages';

class Status extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired
    };

    static defaultProps = {
        type: null,
        createdAt: null
    };

    label(status) {
        const { formatMessage } = this.props.intl;
        switch (status) {
            case 'inquiry':
                return formatMessage(messages.inquiry); // 'Inquiry';
            case 'preApproved':
                return formatMessage(messages.preApproved); // 'Pre Approved';
            case 'declined':
                return formatMessage(messages.declined); // 'Declined';
            case 'approved':
                return formatMessage(messages.approved); // 'Approved';
            case 'pending':
                return formatMessage(messages.pending); // 'Pending';
            case 'cancelledByHost':
                return formatMessage(messages.cancelledByHost); // 'Cancelled by host';
            case 'cancelledByGuest':
                return formatMessage(messages.cancelledByGuest); // 'Cancelled by guest';
            case 'intantBooking':
                return formatMessage(messages.intantBooking); // 'Booking Confirmed';
            case 'confirmed':
                return formatMessage(messages.confirmed); // 'Booking Confirmed';
            case 'expired':
                return formatMessage(messages.expired); // 'Expired';
            case 'requestToBook':
                return formatMessage(messages.requestToBook); // 'Request to book';
            case 'completed':
                return formatMessage(messages.completed); // 'Completed';
        }
    }

    render() {
        const { type, createdAt } = this.props;
        let date = createdAt != null ? moment(createdAt).format('MM/D/YYYY') : '';
        return (
            <div className={cx(s.inlineStatus, s.space5)}>
                <div className={cx(s.horizontalText)}>
                    <span className={s.textWrapper}>
                        <span>{this.label(type)}</span>
                        <span> {date}</span>
                    </span>
                </div>
            </div>
        );
    }
}

export default injectIntl(withStyles(s)(Status));

