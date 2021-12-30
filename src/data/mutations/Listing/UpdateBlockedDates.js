import ListBlockedDatesType from '../../types/ListBlockedDatesType';

import { ListBlockedDates, ExperienceHours, Listing, ListingData } from '../../models';
import moment from 'moment';
import sequelize from 'sequelize';

import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType,
} from 'graphql';

const UpdateBlockedDates = {

  type: ListBlockedDatesType,

  args: {
    listId: { type: new NonNull(IntType) },
    duration: { type: IntType },
    startTime: { type: StringType },
    endTime: { type: StringType },
    blockedDates: { type: new List(StringType) },
    calendarStatus: { type: StringType },
    isSpecialPrice: { type: FloatType },
  },

  async resolve({ request }, { listId, duration, startTime, endTime, blockedDates, calendarStatus, isSpecialPrice }) {
        // Check whether user is logged in
    if (request.user || request.user.admin) {
      const blockedDatesCollection = [];
      const reservationDatesCollection = [];
            // Blocked Dates
      if (blockedDates) {
                // Collect all records of Blocked Dates except Reservation Dates
        const blockedDatesData = await ListBlockedDates.findAll({
          where: {
            listId,
            reservationId: {
              $eq: null,
            },
            calendarId: {
              $ne: null,
            },
          },
        });

        let day;
        let itemValue;
        await Promise.all(blockedDates.map(async (item, key) => {
          day = moment(item).format('YYYY-MM-DD');
                    // let blockedDatesFind =  sequelize.fn('DATE',sequelize.col('blockedDates'), day);

          const dayList = sequelize.where(sequelize.fn('DATE', sequelize.col('blockedDates')), day);

          const blockedDatesFind = await ListBlockedDates.findAll({
                        // attributes: ['id', 'blockedDates'],
            where: {
              blockedDates: dayList,
              listId,
            },
          });

                    // let blockedDatesFind = await ListBlockedDates.findAll({
                    //     where: sequelize.where(sequelize.fn('DATE',
                    //         sequelize.col('blockedDates')), day)
                    // });
          console.log("Blocked Items value: ", itemValue);
          itemValue = item;
          await Promise.all(blockedDatesFind.map(async (value, keys) => {

            if (itemValue === value.blockedDates) {

            } else {
              const updateDates = await ListBlockedDates.update({
                listId,
                blockedDates: value.blockedDates,
                isSpecialPrice,
                calendarStatus,
              },
                {
                  where: {
                    listId,
                    blockedDates: value.blockedDates,
                    reservationId: null,
                  },
                });
            }
          }));

          if (blockedDatesFind.length == 0) {
            const updateBlockedDates = await ListBlockedDates.findOrCreate({
              where: {
                listId,
                blockedDates: item,
                calendarStatus,
                isSpecialPrice,
              },
              defaults: {
                                // properties you want on create
                listId,
                                // blockedDates: new Date(item),
                blockedDates: item,
                calendarStatus,
                isSpecialPrice,
              },
            });
          }

          if (calendarStatus === 'available' && startTime && endTime) {
            const experienceHours = await ExperienceHours.findOrCreate({
              where: {
                listId,
                startTime,
                endTime,
                date: item,
                frequency: 'IRREGULAR',
              },
            });
          }
  
          if (duration) {
            const listing = await ListingData.update({
              duration,
            }, {
              where: {
                id: listId,
              },
            },
                      );
          }

        }));

        return {
          status: '200',
        };
      }
      return {
        status: '500',
      };
    }
  },
};

export default UpdateBlockedDates;


/**
mutation($listId: Int!, $blockedDates: [String]) {
    UpdateBlockedDates(listId: $listId, blockedDates: $blockedDates) {
        status
    }
}
 */
