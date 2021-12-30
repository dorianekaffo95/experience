import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';


import s from './HomeKindofTrip.css';
import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';
import cx from 'classnames';

// Loader
import Loader from '../../Loader';
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

class HomeKindofTrip extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        loading: PropTypes.bool,
    };

    render() {
        let path = '/images/home/';
        let headerTitle, headerContent, blockTitle1, blockContent2;
        let blockContent1, blockImage1, blockTitle2, blockImage2;
        const { loading, data } = this.props;

        if (data && data.getStaticInfo) {
            data.getStaticInfo.map((item, key) => {
                if (item.name == 'header') {
                    headerTitle = item.title;
                    headerContent = item.content;
                } else if (item.name == 'block1') {
                    blockTitle1 = item.title
                    blockContent1 = item.content
                    blockImage1 = item.image;
                } else {
                    blockTitle2 = item.title
                    blockContent2 = item.content
                    blockImage2 = item.image
                }
            });
        }

        if (loading) {
            return <Loader type={"text"} />
        } else {
            return (
                <div className={s.container}>
                    <Grid fluid className={s.containerPadding}>
                        <div className={s.homeFind}>
                            <div className={s.containerTitle}>
                                <div className={s.homeFindHeader}>
                                    {/* Rent amazing homes for your trip */}
                                    {/* headerTitle */}
                                    <FormattedMessage {...messages.staticInfoBlockHeaderTitle} />
                                </div>
                                <div className={s.homePara}>
                                    {/* Homes with high standards and better facilities */}
                                    {/* headerContent */}
                                    <FormattedMessage {...messages.staticInfoBlockHeaderContent} />
                                </div>
                            </div>
                            <Row className={cx(s.homeFindMain, s.SectionPadding)}>
                                <Col lg={6} md={6} sm={6} xs={12} className={s.paddingLeft}>
                                    <div className={s.homeFindLeft}>
                                        <div className={s.homeFindBg} style={{ backgroundImage: `url(${path}${blockImage1})` }}>
                                        </div>
                                        <div className={s.homeFindSmall}>
                                            {/* Enjoy your trip! */}
                                            {/* blockTitle1 */}
                                            <FormattedMessage {...messages.staticInfoBlockTitle1} />
                                        </div>
                                        <div className={s.homeParaInner}>
                                            {/* Rent the home that's suitable for you & your family and enjoy your trip! */}
                                            {/* blockContent1 */}
                                            <FormattedMessage {...messages.staticInfoBlockContent1} />
                                        </div>
                                    </div>

                                </Col>
                                <Col lg={6} md={6} sm={6} xs={12} className={cx(s.paddingLeft, s.paddingTopMobile, s.noPaddingRight)}>
                                    <div className={s.homeFindLeft}>
                                        <div className={s.homeFindBg} style={{ backgroundImage: `url(${path}${blockImage2})` }}></div>
                                        <div className={s.homeFindSmallColor}>
                                            {/* Trusted community! */}
                                            {/* blockTitle2 */}
                                            <FormattedMessage {...messages.staticInfoBlockTitle2} />
                                        </div>
                                        <div className={s.homeParaInner}>
                                            {/* Our community is completely driven by trust and your family safety is assured */}
                                            {/* blockContent2 */}
                                            <FormattedMessage {...messages.staticInfoBlockContent2} />
                                        </div>
                                    </div>

                                </Col>
                            </Row>
                        </div>

                    </Grid>
                </div>
            );
        }
    }
}

export default withStyles(s)(HomeKindofTrip);

