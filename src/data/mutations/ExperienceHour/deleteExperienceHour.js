import { Listing, ExperienceHours, Reservation } from '../../models';
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

            if (!reservation) {
                const removeExperienceHour = await ExperienceHours.destroy({
                    where: { listId, id: experienceHourId}
                });

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
