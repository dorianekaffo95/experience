import ReportUserType from '../../types/ReportUserType';
import { ReportUser, UserProfile } from '../../../data/models';

import {
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';


const CreateReportUser = {

    type: ReportUserType,

    args: {
        reporterId: { type: StringType },
        userId: { type: StringType },
        reportType: { type: StringType },
        profileId: { type: IntType },
        reporterName: { type: StringType }
    },

    async resolve({ request }, {
        reporterId,
        reportType,
        profileId,
        userId,
        reporterName
    }) {
        const getUser = await UserProfile.findOne({
            where: {
                profileId
            }
        });
        userId = getUser.userId;

        if (request.user && !request.user.admin == true) {

            const createReport = await ReportUser.create({
                reporterId: reporterId,
                userId: userId,
                reportType: reportType,
            })

            return {
                firstName: getUser.firstName,
                status: 'success',
            }
        } else {
            return {
                status: 'failed'
            }
        }

    },
};

export default CreateReportUser;
