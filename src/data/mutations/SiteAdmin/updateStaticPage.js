import StaticPageType from '../../types/siteadmin/StaticPageType';
import { StaticPage } from '../../models';
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

import translate from '../../../core/translate';

const updateStaticPage = {
    type: StaticPageType,
    args: {
        id: { type: IntType },
        content: { type: StringType },
        metaTitle: { type: StringType },
        metaDescription: { type: StringType },
    },
    async resolve({ request }, {
        id,
        content,
        metaTitle,
        metaDescription,
    }) {

        if (request.user && request.user.admin == true) {
            const update = await StaticPage.update({
                content,
                metaTitle,
                metaDescription

            }, {
                    where: {
                        id: id
                    }
                });

                await translate([
                    {
                        id: `staticPage${id}.headerTitle`,
                        description: 'Static block header title',
                        defaultMessage: metaTitle,
                        message: metaTitle
                    },
                    {
                        id: `staticPage${id}.metaDescription`,
                        description: `Static page ${id} meta description`,
                        defaultMessage: metaDescription,
                        message: metaDescription
                    },
                    {
                        id: `staticPage${id}.content`,
                        description: `Static page ${id} content`,
                        defaultMessage: content,
                        message: content
                    }
                ]);


            return {
                status: 'success'
            }

        } else {
            return {
                status: 'Not Logged In'
            }
        }
    },
};
export default updateStaticPage;
