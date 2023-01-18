import searchListingType from '../types/searchListingType';
import {
  Listing,
} from '../../data/models';
import sequelize from '../sequelize';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BoolType,
} from 'graphql';

const SearchListing = {

  type: searchListingType,

  args: {
    personCapacity: { type: IntType },
    // dates: { type: StringType },
    startDate: { type: StringType },
    endDate: { type: StringType },
    startTime: { type: StringType },
    endTime: { type: StringType },
    visitWithOwner: { type: BoolType },
    familyWelcome: { type: StringType },
    currentPage: { type: IntType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    roomType: { type: new List(IntType) },
    bedrooms: { type: IntType },
    bathrooms: { type: IntType },
    beds: { type: IntType },
    adults: { type: IntType },
    teens: { type: IntType },
    kids: { type: IntType },
    amenities: { type: new List(IntType) },
    spaces: { type: new List(IntType) },
    houseRules: { type: new List(IntType) },
    priceRange: { type: new List(IntType) },
    plusesIncluded: { type: new List(IntType) },
    spokenLanguages: { type: new List(IntType) },
    experienceTypes: { type: new List(IntType) },
    geography: { type: StringType },
    bookingType: { type: StringType },
    geoType: { type: StringType },
    searchByMap: { type: BoolType },
    sw_lat: { type: FloatType },
    sw_lng: { type: FloatType },
    ne_lat: { type: FloatType },
    ne_lng: { type: FloatType },
  },

  async resolve({ request }, {
    personCapacity,
    // dates,
    startDate,
    endDate,
    startTime,
    endTime,
    visitWithOwner,
    currentPage,
    lat,
    lng,
    roomType,
    bedrooms,
    bathrooms,
    beds,
    plusesIncluded,
    spokenLanguages,
    experienceTypes,
    adults,
    teens,
    kids,
    amenities,
    spaces,
    houseRules,
    priceRange,
    geography,
    bookingType,
    geoType,
    searchByMap,
    sw_lat,
    sw_lng,
    ne_lat,
    ne_lng,
  }) {
    const filter = {};
    const limit = 12;
    let offset = 0;
    const attributesParam = ['id', 'title', 'personCapacity', 'adultCapacity', 'teenCapacity', 'childOrYoungerCapacity', 'visitWithOwner', 'lat', 'lng', 'beds', 'coverPhoto', 'bookingType', 'userId', 'reviewsCount'];
    const havingParam = ['id > ?', 0];
    let publishedStatus = {},
      personCapacityFilter = {},
      datesFilter = {},
      locationFilter = {};
    let roomTypeFilter = {},
      bedroomsFilter = {},
      bathroomsFilter = {},
      bedsFilter = {};
    let amenitiesFilter = {},
      spacesFilter = {},
      houseRulesFilter = {},
      priceRangeFilter = {},
      geographyFilter = {};
    let bookingTypeFilter = {},
      unAvailableFilter = {};

    // -- New Filters
    let startTimeFilter = {},
      endTimeFilter = {},
      startDateFilter = {},
      endDateFilter = {},
      experienceTypesFilter = {},
      spokenLanguagesFilter = {},
      plusesIncludedFilter = {};
    let adultsFilter = {},
      teensFilter = {},
      kidsFilter = {},
      visitWithOwnerFilter = {};

    if (bookingType && bookingType === 'instant') {
      bookingTypeFilter = {
        bookingType,
      };
    } /* else {
      bookingTypeFilter = {
        bookingType: 'instant'
      }
    } */

    if (searchByMap && sw_lat && ne_lat && sw_lng && ne_lng) {
      geographyFilter = {
        id: {
          $in: [
            sequelize.literal(`
                SELECT
                    id
                FROM
                    Listing
                WHERE
                    (
                       lat BETWEEN ${sw_lat} AND ${ne_lat} 
                    ) AND (
                       lng BETWEEN ${sw_lng} AND ${ne_lng}
                    )
              `),
          ],
        },
      };
    } else if (sw_lat && ne_lat && sw_lng && ne_lng) {
      geographyFilter = {
        id: {
          $in: [
            sequelize.literal(`
                SELECT
                    id
                FROM
                    Listing
                WHERE
                    (
                       lat BETWEEN ${sw_lat} AND ${ne_lat} 
                    ) AND (
                       lng BETWEEN ${sw_lng} AND ${ne_lng}
                    )
              `),
          ],
        },
      };
    } else if (geoType) {
      const geographyConverted = await JSON.parse(geography);
      if (geoType === 'state') {
        geographyFilter = {
          $or: [
            {
              state: geographyConverted.administrative_area_level_1_short,
            },
            {
              state: {
                $like: `${geographyConverted.administrative_area_level_1_long}%`,
              },
            },
          ],
        };
      } else if (geoType === 'country') {
        geographyFilter = {
          country: geographyConverted.country,
        };
      }
    } else if (lat && lng) {
      const distanceValue = 300;
      geographyFilter = {
        id: {
          $in: [
            sequelize.literal(`
                SELECT
                    id
                FROM
                    Listing
                WHERE
                    (
                        6371 *
                        acos(
                            cos( radians( ${lat} ) ) *
                            cos( radians( lat ) ) *
                            cos(
                                radians( lng ) - radians( ${lng} )
                            ) +
                            sin(radians( ${lat} )) *
                            sin(radians( lat ))
                        )
                    ) < ${distanceValue}
              `),
          ],
        },
      };
    }

    /* if(geography != undefined){
      let geographyConverted;
      // Convert string to JSON object
      geographyConverted = await JSON.parse(geography);

      if('route' in geographyConverted) {
        geographyFilter = {
          $or: [
            {
              street: geographyConverted.route
            },
            {
              city: {
                $like: geographyConverted.locality + '%'
              }
            },
            {
              city: {
                $like: geographyConverted.administrative_area_level_2  + '%'
              }
            }
          ]
        };
      } else if('street_address' in geographyConverted) {
        geographyFilter = {
          $or: [
            {
              street: geographyConverted.street_address
            },
            {
              city: {
                $like: geographyConverted.locality + '%'
              }
            },
            {
              city: {
                $like: geographyConverted.administrative_area_level_2  + '%'
              }
            }
          ]
        };
      } else if('postal_code' in geographyConverted) {
         geographyFilter = {
          $or: [
            {
              zipcode: geographyConverted.postal_code
            },
            {
              city: {
                $like: geographyConverted.locality + '%'
              }
            },
            {
              city: {
                $like: geographyConverted.administrative_area_level_2  + '%'
              }
            }
          ]
        };
      } else if('locality' in geographyConverted || 'administrative_area_level_2' in geographyConverted || 'political' in geographyConverted) {
         geographyFilter = {
          $or: [
            {
              city: {
                $like: geographyConverted.locality + '%'
              }
            },
            {
              city: {
                $like: geographyConverted.administrative_area_level_2  + '%'
              }
            },
            {
              city: {
                $like: geographyConverted.political  + '%'
              }
            }
          ]
        };
      } else if('administrative_area_level_1_short' in geographyConverted || 'administrative_area_level_1_long' in geographyConverted) {
         geographyFilter = {

          $or: [
            {
              state: geographyConverted.administrative_area_level_1_short
            },
            {
              state: {
                $like: geographyConverted.administrative_area_level_1_long  + '%'
              }
            }
          ]
        };
      } else if('country' in geographyConverted) {
         geographyFilter = {
           country: geographyConverted.country
          };
      }


    } */


    if (priceRange != undefined && priceRange.length > 0) {
      priceRangeFilter = {
        // $and: [
        // {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM ListingData WHERE (basePrice / (SELECT rate FROM CurrencyRates WHERE currencyCode=currency limit 1)) BETWEEN ${priceRange[0]} AND ${priceRange[1]}`),
          ],
        },
        //  }
        // ]
      };
    }


    unAvailableFilter = {
      // $and: [
      // {
      id: {
        $notIn: [
          sequelize.literal('SELECT listId FROM ListingData WHERE maxDaysNotice=\'unavailable\''),
        ],
      },
      //  }
      // ]
    };


    // Offset from Current Page
    if (currentPage) {
      offset = (currentPage - 1) * limit;
    }

    // Published Status
    publishedStatus = {
      isPublished: true,
    };

    // Bedrooms Filter
    if (bedrooms) {
      bedroomsFilter = {
        bedrooms: {
          $gte: bedrooms,
        },
      };
    }

    // Bathrooms Filter
    if (bathrooms) {
      bathroomsFilter = {
        bathrooms: {
          $gte: bathrooms,
        },
      };
    }

    // Beds Filter
    if (beds) {
      bedsFilter = {
        beds: {
          $gte: beds,
        },
      };
    }


    // Person Capacity Filter
    if (personCapacity) {
      personCapacityFilter = {
        personCapacity: {
          $gte: personCapacity,
        },
      };
    }

    // Adults Filter
    if (adults) {
      adultsFilter = {
        adultCapacity: {
          $gte: adults,
        },
      };
    }

    // Teens Filter
    if (teens) {
      teensFilter = {
        teenCapacity: {
          $gte: teens,
        },
      };
    }

    // kids Filter
    if (kids) {
      kidsFilter = {
        childOrYoungerCapacity: {
          $gte: kids,
        },
      };
    }

    // Owner Care Filter
    if (visitWithOwner) {
      visitWithOwnerFilter = {
        visitWithOwner: {
          $eq: visitWithOwner,
        },
      };
    }

    // -- Start date filter
    if (startDate) {
      startDateFilter = {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM ListBlockedDates Where blockedDates>='${startDate}' AND calendarStatus='available'`),
          ],
        },
      };
    }

    // -- End date filter
    if (endDate) {
      endDateFilter = {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM ListBlockedDates Where blockedDates<='${endDate}' AND calendarStatus='available'`),
          ],
        },
      };
    }


    // Date Range Filter
    // if (dates) {
    //   datesFilter = {
    //     $or: [
    //       {
    //         id: {
    //           $notIn: [
    //             sequelize.literal("SELECT listId FROM ListBlockedDates Where calendarStatus!='available'"),
    //           ],
    //         },
    //       },
    //       {
    //         id: {
    //           $notIn: [
    //             sequelize.literal(`SELECT listId FROM ListBlockedDates WHERE blockedDates BETWEEN${dates}and calendarStatus!='available'`),
    //           ],
    //         },
    //       },
    //     ],
    //   };
    // }

    // -- Start time filter
    if (startTime) {
      startTimeFilter = {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM ExperienceHours Where startTime>='${startTime}'`),
          ],
        },
      };
    }

    // -- End time filter
    if (endTime) {
      endTimeFilter = {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM ExperienceHours Where endTime<='${endTime}'`),
          ],
        },
      };
    }

    // Room type Filter
    if (roomType != undefined && roomType.length > 0) {
      // roomTypeFilter = ` AND id in` + sequelize.literal(`SELECT listId FROM UserListingData WHERE settingsId in(${roomType.toString()})`);
      roomTypeFilter = {
        // $and: [
        //   {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM UserListingData WHERE settingsId in(${roomType.toString()})`),
          ],
        },
        //  }
        // ]
      };
    }

    // Amenities Filter
    if (amenities != undefined && amenities.length > 0) {
      // amenitiesFilter = ` AND id in` + sequelize.literal(`SELECT listId FROM UserAmenities WHERE amenitiesId in(${amenities.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${amenities.length}`);
      amenitiesFilter = {
        // $and: [
        // {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM UserAmenities WHERE amenitiesId in(${amenities.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${amenities.length}`),
          ],
        },
        // }
        // ]
      };
    }

    // Pluses Included
    if (plusesIncluded != undefined && plusesIncluded.length > 0) {
      // amenitiesFilter = ` AND id in` + sequelize.literal(`SELECT listId FROM UserAmenities WHERE amenitiesId in(${amenities.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${amenities.length}`);
      plusesIncludedFilter = {
        // $and: [
        // {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM PlusesIncluded WHERE plusId in(${plusesIncluded.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${plusesIncluded.length}`),
          ],
        },
        // }
        // ]
      };
    }

     // Spoken Languages Included
    if (spokenLanguages != undefined && spokenLanguages.length > 0) {
      // amenitiesFilter = ` AND id in` + sequelize.literal(`SELECT listId FROM UserAmenities WHERE amenitiesId in(${amenities.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${amenities.length}`);
      spokenLanguagesFilter = {
        // $and: [
        // {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM SpokenLanguages WHERE spokenLanguageId in(${spokenLanguages.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${spokenLanguages.length}`),
          ],
        },
        // }
        // ]
      };
    }

    // Experience Type
    if (experienceTypes != undefined && experienceTypes.length > 0) {
      // amenitiesFilter = ` AND id in` + sequelize.literal(`SELECT listId FROM UserAmenities WHERE amenitiesId in(${amenities.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${amenities.length}`);
      experienceTypesFilter = {
        // $and: [
        // {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM ExperienceType WHERE experienceTypeId in(${experienceTypes.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${experienceTypes.length}`),
          ],
        },
        // }
        // ]
      };
    }

    // Spaces Filter
    if (spaces != undefined && spaces.length > 0) {
      spacesFilter = {
        // $and: [
        //  {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM UserSpaces WHERE spacesId in(${spaces.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${spaces.length}`),
          ],
        },
        //   }
        //  ]
      };
    }

    // House Rules Filter
    if (houseRules != undefined && houseRules.length > 0) {
      houseRulesFilter = {
        // $and: [
        //   {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM UserHouseRules WHERE houseRulesId in(${houseRules.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${houseRules.length}`),
          ],
        },
        //   }
        //  ]
      };
    }


    // SQL query for count
    const listingCount = await Listing.findAll({
      attributes: attributesParam,
      where: {
        $and: [
          bookingTypeFilter,
          publishedStatus,
          personCapacityFilter,
          datesFilter,

          startTimeFilter,
          endTimeFilter,
          plusesIncludedFilter,
          experienceTypesFilter,
          spokenLanguagesFilter,
          adultsFilter,
          teensFilter,
          kidsFilter,
          visitWithOwnerFilter,

          roomTypeFilter,
          bedroomsFilter,
          bathroomsFilter,
          bedsFilter,
          amenitiesFilter,
          spacesFilter,
          houseRulesFilter,
          priceRangeFilter,
          geographyFilter,
          unAvailableFilter,
        ],
      },
    });

    const countLength = Object.keys(listingCount).length;

    // SQL query for results
    const listingData = await Listing.findAll({
      attributes: attributesParam,
      where: {
        $and: [
          bookingTypeFilter,
          publishedStatus,
          personCapacityFilter,
          startDateFilter,
          endDateFilter,
          startTimeFilter,
          endTimeFilter,
          plusesIncludedFilter,
          experienceTypesFilter,
          spokenLanguagesFilter,
          adultsFilter,
          teensFilter,
          kidsFilter,
          visitWithOwnerFilter,

          roomTypeFilter,
          bedroomsFilter,
          bathroomsFilter,
          bedsFilter,
          amenitiesFilter,
          spacesFilter,
          houseRulesFilter,
          priceRangeFilter,
          geographyFilter,
          unAvailableFilter,
        ],
      },
      limit,
      offset,
      order: [['reviewsCount', 'DESC']],
    });

    return {
      count: countLength,
      results: listingData,
    };
  },
};

export default SearchListing;
