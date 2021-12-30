import BlogDetailsType from '../../types/BlogDetailsType';
import { BlogDetails } from '../../models';
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

import translate from '../../../core/translate';

const updateBlogDetails = {
    type: BlogDetailsType,
    args: {
        id: { type: IntType },
        metaTitle: { type: StringType },
        metaDescription: { type: StringType },
        pageUrl: { type: StringType },
        pageTitle: { type: StringType },
        content: { type: StringType },
        footerCategory: { type: StringType },
    },
    async resolve({ request }, {
        id,
        metaTitle,
        metaDescription,
        pageUrl,
        pageTitle,
        content,
        footerCategory,
    }) {

        if (request.user && request.user.admin == true) {
            const checkUrl = await BlogDetails.findOne({
                where: {
                    pageUrl,
                    id: {
                        $ne: id
                    },

                }
            });

            if (checkUrl) {
                return {
                    status: 'URL exist'
                }
            }
            else {
                const Update = await BlogDetails.update({
                    metaTitle,
                    metaDescription,
                    pageUrl,
                    pageTitle,
                    footerCategory,
                    content: content
                }, {
                        where: {
                            id: id
                        }
                    });

                    await translate([
                        {
                            id: `blogDetails${id}.metaTitle`,
                            description: `Meta title for blog page ${id}`,
                            defaultMessage: metaTitle,
                            message: metaTitle
                        },
                        {
                            id: `blogDetails${id}.metaDescription`,
                            description: `Meta description for blog page ${id}`,
                            defaultMessage: metaDescription,
                            message: metaDescription
                        },
                        {
                            id: `blogDetails${id}.pageTitle`,
                            description: `Page title for blog page ${id}`,
                            defaultMessage: pageTitle,
                            message: pageTitle
                        },
                        {
                            id: `blogDetails${id}.content`,
                            description: `Content for blog page ${id}`,
                            defaultMessage: content,
                            message: content
                        }
                    ]);
                return {
                    status: 'success'
                }
            }
        } else {
            return {
                status: 'failed'
            }
        }
    },
};
export default updateBlogDetails;
