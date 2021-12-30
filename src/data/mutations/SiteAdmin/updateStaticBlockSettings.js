import StaticBlockType from '../../types/siteadmin/StaticBlockType';
import { StaticInfoBlock } from '../../../data/models';

import {
    GraphQLString as StringType
} from 'graphql';

import translate from '../../../core/translate';

const updateStaticBlockSettings = {

    type: StaticBlockType,

    args: {
        headerTitle: { type: StringType },
        headerContent: { type: StringType },
        blockTitle1: { type: StringType },
        blockContent1: { type: StringType },
        blockTitle2: { type: StringType },
        blockContent2: { type: StringType },
        blockImage1: { type: StringType },
        blockImage2: { type: StringType },
        isEnable: { type: StringType }
    },

    async resolve({ request }, {
        headerTitle,
        headerContent,
        blockTitle1,
        blockContent1,
        blockTitle2,
        blockContent2,
        blockImage1,
        blockImage2,
        isEnable
    }) {

        if (request.user && request.user.admin == true) {
            let isStaticBlockSettingsUpdated = false;

            // Header Info
            const updateHeader = await StaticInfoBlock.update({ content: headerContent, title: headerTitle, isEnable: isEnable }, { where: { name: 'header' } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });

            // Block 1 Info
            // if (blockTitle1 && blockContent1 && blockImage1) {
            const updateBlock1 = await StaticInfoBlock.update({ title: blockTitle1, content: blockContent1, image: blockImage1 }, { where: { name: 'block1' } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });
            // }

            // Block 2 Info
            // if (blockTitle2 && blockContent2 && blockImage2) {
            const updateBlock2 = await StaticInfoBlock.update({ title: blockTitle2, content: blockContent2, image: blockImage2 }, { where: { name: 'block2' } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });
            // }

            await translate([
                {
                    id: 'staticInfoBlock.headerTitle',
                    description: 'Static block header title',
                    defaultMessage: headerTitle,
                    message: headerTitle
                },
                {
                    id: 'staticInfoBlock.headerContent',
                    description: 'Static block header Content',
                    defaultMessage: headerContent,
                    message: headerContent
                },
                {
                    id: 'staticInfoBlock.blockTitle1',
                    description: 'Static block 1 title',
                    defaultMessage: blockTitle1,
                    message: blockTitle1
                },
                {
                    id: 'staticInfoBlock.blockContent1',
                    description: 'Static block content 1',
                    defaultMessage: blockContent1,
                    message: blockContent1
                },
                {
                    id: 'staticInfoBlock.blockTitle2',
                    description: 'Static block 2 title',
                    defaultMessage: blockTitle2,
                    message: blockTitle2
                },
                {
                    id: 'staticInfoBlock.blockContent2',
                    description: 'Static block content 2',
                    defaultMessage: blockContent2,
                    message: blockContent2
                }
            ]);

            if (isStaticBlockSettingsUpdated) {
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

export default updateStaticBlockSettings;
