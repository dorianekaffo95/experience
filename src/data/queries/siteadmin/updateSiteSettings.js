import UpdateSiteSettingsType from '../../types/siteadmin/UpdateSiteSettingsType';
import { SiteSettings } from '../../../data/models';

import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

const updateSiteSettings = {

    type: UpdateSiteSettingsType,

    args: {
        siteName: { type: StringType },
        siteTitle: { type: StringType },
        metaDescription: { type: StringType },
        logo: { type: StringType },
        facebookLink: { type: StringType },
        twitterLink: { type: StringType },
        instagramLink: { type: StringType },
        appStoreLink: { type: StringType },
        playStoreLink: { type: StringType },
        logoHeight: { type: IntType },
        logoWidth: { type: IntType },
        homePageType: { type: IntType },
        videoLink: { type: StringType },
        metaKeyword: { type: StringType },
        phoneNumberStatus: { type: IntType },
        homeLogo: { type: StringType },
        emailLogo: { type: StringType },
        homeLogoHeight: { type: IntType },
        homeLogoWidth: { type: IntType },
    },

    async resolve({ request }, {
        siteName,
        siteTitle,
        metaDescription,
        logo,
        facebookLink,
        twitterLink,
        instagramLink,
        appStoreLink,
        playStoreLink,
        logoHeight,
        logoWidth,
        homePageType,
        videoLink,
        metaKeyword,
        phoneNumberStatus,
        homeLogo,
        emailLogo,
        homeLogoHeight,
        homeLogoWidth
    }) {

        if (request.user && request.user.admin == true) {
            let isSiteSettingsUpdated = false;

            // Site Name
            const updateSiteName = await SiteSettings.update({ value: siteName }, { where: { name: 'siteName' } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isSiteSettingsUpdated = true;
                    } else {
                        isSiteSettingsUpdated = false;
                    }
                });

            // Site Logo Height
            if (logoHeight) {
                const updateLogoHeight = await SiteSettings.update({ value: logoHeight }, { where: { name: 'logoHeight' } })
                    .then(function (instance) {
                        // Check if any rows are affected
                        if (instance > 0) {
                            isSiteSettingsUpdated = true;
                        } else {
                            isSiteSettingsUpdated = false;
                        }
                    });
            }

            // Site Logo Width
            if (logoWidth) {
                const updateLogoWidth = await SiteSettings.update({ value: logoWidth }, { where: { name: 'logoWidth' } })
                    .then(function (instance) {
                        // Check if any rows are affected
                        if (instance > 0) {
                            isSiteSettingsUpdated = true;
                        } else {
                            isSiteSettingsUpdated = false;
                        }
                    });
            }


            // Site Title
            const updateSiteTitle = await SiteSettings.update({ value: siteTitle }, { where: { name: 'siteTitle' } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isSiteSettingsUpdated = true;
                    } else {
                        isSiteSettingsUpdated = false;
                    }
                });

            // Meta Description
            const updateMetaDescription = await SiteSettings.update({ value: metaDescription }, { where: { name: "metaDescription" } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isSiteSettingsUpdated = true;
                    } else {
                        isSiteSettingsUpdated = false;
                    }
                });

            // Logo
            const updateLogo = await SiteSettings.update({ value: logo }, { where: { name: "logo" } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isSiteSettingsUpdated = true;
                    } else {
                        isSiteSettingsUpdated = false;
                    }
                });


            // Facebook Link
            const updateFacebookLink = await SiteSettings.update({ value: facebookLink }, { where: { name: "facebookLink" } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isSiteSettingsUpdated = true;
                    } else {
                        isSiteSettingsUpdated = false;
                    }
                });

            // Twitter Link
            const updateTwitterLink = await SiteSettings.update({ value: twitterLink }, { where: { name: "twitterLink" } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isSiteSettingsUpdated = true;
                    } else {
                        isSiteSettingsUpdated = false;
                    }
                });

            // Instagram Link
            const updateInstagramLink = await SiteSettings.update({ value: instagramLink }, { where: { name: "instagramLink" } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isSiteSettingsUpdated = true;
                    } else {
                        isSiteSettingsUpdated = false;
                    }
                });

            // Instagram Link
            const updateAppStoreLink = await SiteSettings.update({ value: appStoreLink }, { where: { name: "appStoreLink" } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isSiteSettingsUpdated = true;
                    } else {
                        isSiteSettingsUpdated = false;
                    }
                });

            // Instagram Link
            const updatePlayStoreLink = await SiteSettings.update({ value: playStoreLink }, { where: { name: "playStoreLink" } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isSiteSettingsUpdated = true;
                    } else {
                        isSiteSettingsUpdated = false;
                    }
                });

            // Home page layout 
            const updateHomePageLayout = await SiteSettings.update({ value: homePageType }, { where: { name: "homePageType" } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isSiteSettingsUpdated = true;
                    } else {
                        isSiteSettingsUpdated = false;
                    }
                });

            // Video Link 
            const updateVideoLink = await SiteSettings.update({ value: videoLink }, { where: { name: "videoLink" } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isSiteSettingsUpdated = true;
                    } else {
                        isSiteSettingsUpdated = false;
                    }
                });

            // Phone Number Status
            const updatePhoneNumberStatus = await SiteSettings.update({ value: phoneNumberStatus }, { where: { name: "phoneNumberStatus" } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isSiteSettingsUpdated = true;
                    } else {
                        isSiteSettingsUpdated = false;
                    }
                });

            // Meta Keyword
            const updateMetaKeyword = await SiteSettings.update({ value: metaKeyword }, { where: { name: "metaKeyword" } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isSiteSettingsUpdated = true;
                    } else {
                        isSiteSettingsUpdated = false;
                    }
                });

            // Home page logo
            const updateHomePageLogo = await SiteSettings.update({ value: homeLogo }, { where: { name: "homeLogo" } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isSiteSettingsUpdated = true;
                    } else {
                        isSiteSettingsUpdated = false;
                    }
                });

            const updateEmailLogo = await SiteSettings.update({ value: emailLogo }, { where: { name: "emailLogo" } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isSiteSettingsUpdated = true;
                    } else {
                        isSiteSettingsUpdated = false;
                    }
                });

            let updateHomeLogoHeight = await SiteSettings.update({
                value: homeLogoHeight
            }, {
                    where: {
                        name: "homeLogoHeight"
                    }
                });

            let updateHomeLogoWidth = await SiteSettings.update({
                value: homeLogoWidth
            }, {
                    where: {
                        name: "homeLogoWidth"
                    }
                });

            if (isSiteSettingsUpdated) {
                return {
                    status: 'success'
                }
            } else {
                return {
                    status: 'failed'
                }
            }

        } else {
            return {
                status: 'failed'
            }
        }

    },
};

export default updateSiteSettings;
