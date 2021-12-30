import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from "graphql";

import { Listing, Reservation } from '../models';

const ExperienceHourType = new ObjectType({
  name: "ExperienceHour",
  fields: {
    id: { type: IntType },
    listId: { type: IntType },
    startTime: { type: StringType },
    endTime: { type: StringType },
    date: { type: StringType },
    dayOfMonth: { type: IntType },
    dayOfWeek: { type: IntType },
    frequency: { type: StringType },
    status: { type: StringType },
    availablePlaces: {
      type: IntType,
      async resolve(experienceHour) {
        const listing = await Listing.findById(experienceHour.listId);
        const reservationCount = await Reservation.sum('guests', {
          where: {
            experienceHourId: experienceHour.id,
            reservationState: 'approved'
          }
        }) || 0;
        const diff = listing.personCapacity - reservationCount;
        return diff < 0 ? 0 : diff; 
      }
    }
  },
});

export default ExperienceHourType;
