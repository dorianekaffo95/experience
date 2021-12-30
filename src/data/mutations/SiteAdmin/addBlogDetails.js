import BlogDetailsType from '../../types/BlogDetailsType';
import { BlogDetails } from '../../../data/models';
import {
    GraphQLString as StringType
} from 'graphql';
import translate from '../../../core/translate';

const addBlogDetails = {
    type: BlogDetailsType,
    args: {
        metaTitle: { type: StringType },
        metaDescription: { type: StringType },
        pageUrl: { type: StringType },
        pageTitle: { type: StringType },
        content: { type: StringType },
        footerCategory: { type: StringType },
    },
    async resolve({ request }, {
        metaTitle,
        metaDescription,
        pageUrl,
        pageTitle,
        content,
        footerCategory,
    }) {

        let pageURLCheck = pageUrl.trim();

        if (request.user && request.user.admin == true) {
            const checkUrl = await BlogDetails.findOne({
                where: {
                    pageUrl: pageURLCheck
                }
            })
            if (checkUrl) {
                return {
                    status: 'URL exist'
                }
            } else {
                const createBlog = await BlogDetails.create({
                    metaTitle,
                    metaDescription,
                    pageUrl,
                    pageTitle,
                    footerCategory,
                    content: content
                });

                await translate([
                    {
                        id: `blogDetails${createBlog.id}.metaTitle`,
                        description: `Meta title for blog page ${createBlog.id}`,
                        defaultMessage: metaTitle,
                        message: metaTitle
                    },
                    {
                        id: `blogDetails${createBlog.id}.metaDescription`,
                        description: `Meta description for blog page ${createBlog.id}`,
                        defaultMessage: metaDescription,
                        message: metaDescription
                    },
                    {
                        id: `blogDetails${createBlog.id}.pageTitle`,
                        description: `Page title for blog page ${createBlog.id}`,
                        defaultMessage: pageTitle,
                        message: pageTitle
                    },
                    {
                        id: `blogDetails${createBlog.id}.content`,
                        description: `Content for blog page ${createBlog.id}`,
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
export default addBlogDetails;
