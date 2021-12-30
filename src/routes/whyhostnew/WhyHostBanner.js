import React, { Component } from 'react';
import Image from './whyhostbanner.jpg';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHostBanner.css';
import {
    Button,
    Col
} from 'react-bootstrap';
import cx from 'classnames';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// History
import history from '../../core/history';

// ES6 Imports
import Scroll from 'react-scroll'; // Imports all Mixins

// Or Access Link,Element,etc as follows
let Link = Scroll.Link;

class WhyHostBanner extends Component {
    handleClick() {
        history.push('/become-a-host?mode=new');
    }

    render() {
        return (
            <div>
                <div className={s.TopBannerHeader} style={{ backgroundImage: `url(${Image})` }} >

                    <div className={s.bannerText}>
                        <Col
                            xs={12} sm={12} md={12} lg={12}
                            className={s.responsiveMargin}
                        >
                            <h1 className={s.bannerTitle}>
                                <FormattedMessage {...messages.topBannerTitle} />
                            </h1>
                            <div className={s.displayFlex}>
                                <Button
                                    className={cx(s.button)}
                                    onClick={this.handleClick}
                                >
                                    <FormattedMessage {...messages.becomeAHost} />
                                </Button>
                                <Link
                                    className={cx(s.button, s.btnPrimaryBorder, s.linkButton, s.btnRight)}
                                    activeClass={s.active}
                                    to="test1"
                                    spy={true}
                                    smooth={true}
                                >
                                    <FormattedMessage {...messages.learnMore} />
                                </Link>
                            </div>
                        </Col>
                    </div>
                </div>

            </div>
        );
    }
}

export default withStyles(s)(WhyHostBanner);