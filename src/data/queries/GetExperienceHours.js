import ExperienceHourType from "../types/ExperienceHourType";
import { ExperienceHours } from "../models";

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from "graphql";

const getExperienceHours = {
  type: new List(ExperienceHourType),

  args: {
    listId: { type: new NonNull(IntType) },
    startDate: { type: new NonNull(StringType) },
    endDate: { type: new NonNull(StringType) },
    status: { type: StringType },
  },

  async resolve({ request }, { listId, startDate, endDate, status }) {
    let hours = [];
    if (status != null) {
      hours = await ExperienceHours.findAll({
        where: {
          listId,
          date: {
            $between: [`${startDate} 00:00:00`, `${endDate} 23:59:59`],
          },
          status
        },
      });
    } else {
      hours = await ExperienceHours.findAll({
        where: {
          listId,
          date: {
            $between: [`${startDate} 00:00:00`, `${endDate} 23:59:59`],
          },
        },
      });
    }

    return hours;
  },
};

export default getExperienceHours;
