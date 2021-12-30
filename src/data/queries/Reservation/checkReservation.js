import ReservationType from '../../types/ReservationType';
import { Reservation, Listing } from '../../models';
import { ListBlockedDates } from '../../models';
import moment from 'moment';

import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

const checkReservation = {

    // type:  new List(ReservationType),
    type: ReservationType,

    args: {
        listId: { type: IntType },
        adults: { type: IntType },
        teens: { type: IntType },
        childrenOrYounger: { type: IntType },
        selectedHourId: { type: IntType },
    },

    async resolve({ request }, { listId, adults, teens, childrenOrYounger, selectedHourId }) {
        if (request.user) {

            // const checkAvailableDates = await ListBlockedDates.findAll({
            //     where: {
            //         listId,
            //         blockedDates: {
            //             $between: [moment(checkIn).format('YYYY-MM-DD HH:MM:SS'), moment(checkOut).format('YYYY-MM-DD HH:MM:SS')]
            //         },
            //         calendarStatus: {
            //             $notIn: ['available']
            //         }
            //     },
            // });

            const listing = await Listing.find({
                where: {
                    id: listId
                },
            });

            // const reservations = await Reservation.findAll({
            //     where: {
            //         experienceHourId: selectedHourId
            //     }
            // });

            let totalGuests = adults + teens + childrenOrYounger;
            // reservations.forEach((reservation) => {
            //     totalGuests += reservation.adults + reservation.teens + reservation.childrenOrYounger ;
            // });

            if (totalGuests >= listing.personCapacity) {
                return {
                    status: "400",
                };
            }
            else {
                return {
                    status: "200",
                };
            }
            // if (checkAvailableDates && checkAvailableDates.length > 0) {
            //     return {
            //         status: "400",
            //     };
            // }
            // else {
            //     return {
            //         status: "200",
            //     };
            // }
        } else {
            return {
                status: "notLoggedIn",
            };
        }
    }
};

export default checkReservation;