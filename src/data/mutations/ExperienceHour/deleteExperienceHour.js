import { Listing, ExperienceHours, ListBlockedDates, Reservation } from '../../models';
import ExperienceHourType from "../../types/ExperienceHourType";

import {
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const deleteCalendar = {

  type: ExperienceHourType,

  args: {
    experienceHourId: { type: new NonNull(IntType) },
    listId: { type: new NonNull(IntType) },
  },

  async resolve({ request }, { experienceHourId, listId }) {

    // Check whether user is logged in
    if (request.user || request.user.admin) {

      let where = { id: listId };

      if (!request.user.admin) {
        where = {
          id: listId,
          userId: request.user.id
        };
      }

      const isListingAvailable = await Listing.find({ where });

        // Check is the user changing is the host
        if (isListingAvailable) {
            const reservation = await Reservation.find({
                where: {
                    experienceHourId,
                    reservationState: {
                        $notIn: ['expired', 'declined', 'completed', 'cancelled']
                    }
                }
            });
            
            console.log("============================== Reservation: ", reservation, !reservation);

            if (!reservation) {


                const experienceHour = await ExperienceHours.findById(experienceHourId);
                
                const datePart = experienceHour.date.toISOString().substring(0, 10);

                await ExperienceHours.destroy({
                    where: { listId, id: experienceHourId }
                });

                const relatedExpHours = await ExperienceHours.count({
                  where: {
                    date: {
                      $between: [`${datePart} 00:00:00`, `${datePart} 23:59:59`] 
                    },
                    listId
                  }
                });

                if (relatedExpHours == 0) {
                  await ListBlockedDates.destroy({
                    where: {
                      blockedDates: {
                        $between: [`${datePart} 00:00:00`, `${datePart} 23:59:59`] 
                      },
                      listId
                    }
                  });
                }

                return {
                    status: '200'
                };
            } else {
                return {
                    status: '500'
                };
            }

        } else {
            return {
            status: '500'
            }
        }
      
    } else {
      return {
        status: '403'
      };
    }
  },
};

export default deleteCalendar;
