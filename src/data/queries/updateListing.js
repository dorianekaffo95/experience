// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType,
  GraphQLFloat as FloatType,
} from 'graphql';

// GraphQL Type
import EditListingType from '../types/EditListingType';

// Sequelize models
import {
  Listing,
  UserAmenities,
  UserSafetyAmenities,
  UserSpaces,
  UserListingData,
  BedTypes,
  ExperienceType,
  PlusesIncluded,
  SpokenLanguages,
} from '../../data/models';

const updateListing = {

  type: EditListingType,

  args: {
    id: { type: IntType },
    roomType: { type: StringType },
    houseType: { type: StringType },
    residenceType: { type: StringType },
    bedrooms: { type: StringType },
    buildingSize: { type: StringType },
    bedType: { type: StringType },
    beds: { type: IntType },
    personCapacity: { type: IntType },
    adultCapacity: { type: IntType },
    teenCapacity: { type: IntType },
    childOrYoungerCapacity: { type: IntType },
    bathrooms: { type: FloatType },
    bathroomType: { type: StringType },
    country: { type: StringType },
    street: { type: StringType },
    buildingName: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    zipcode: { type: StringType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    isMapTouched: { type: BooleanType },
    experienceTypes: { type: new List(IntType) },
    plusesIncluded: { type: new List(IntType) },
    spokenLanguages: { type: new List(IntType) },
    amenities: { type: new List(IntType) },
    safetyAmenities: { type: new List(IntType) },
    spaces: { type: new List(IntType) },
    bedTypes: { type: StringType },
    visitWithOwner: { type: BooleanType },
    familyWelcome: { type: StringType },
    privateOrCollective: {type: StringType },
  },

  async resolve({ request, response }, {
    id,
    roomType,
    houseType,
    residenceType,
    bedrooms,
    buildingSize,
    bedType,
    beds,
    personCapacity,
    adultCapacity,
    teenCapacity,
    childOrYoungerCapacity,
    bathrooms,
    bathroomType,
    country,
    street,
    buildingName,
    city,
    state,
    zipcode,
    lat,
    lng,
    isMapTouched,
    plusesIncluded,
    experienceTypes,
    spokenLanguages,
    amenities,
    safetyAmenities,
    spaces,
    bedTypes,
    visitWithOwner,
    privateOrCollective,
    familyWelcome,
   }) {

    let isListUpdated = false;

    if (request.user || request.user.admin) {

      let where = { id };
      if (!request.user.admin) {
        where = {
          id,
          userId: request.user.id
        }
      };

      const doUpdateListing = await Listing.update({
        residenceType: residenceType,
        bedrooms: bedrooms,
        bedType: bedType,
        beds: beds,
        personCapacity: personCapacity,
        adultCapacity: adultCapacity,
        teenCapacity: teenCapacity,
        childOrYoungerCapacity: childOrYoungerCapacity,
        bathrooms: bathrooms,
        country: country,
        street: street,
        buildingName: buildingName,
        city: city,
        state: state,
        zipcode: zipcode,
        lat: lat,
        lng: lng,
        isMapTouched: isMapTouched,
        visitWithOwner: visitWithOwner,
        familyWelcome: familyWelcome,
        privateOrCollective: privateOrCollective,
      },
        {
          where
        })
        .spread(function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isListUpdated = true;
          }
        });

      // User Settings Data
      if (isListUpdated) {
        const removeUserSettingsData = await UserListingData.destroy({
          where: {
            listId: id
          }
        });

        // let otherListSettings = [
        //   { settingsId: roomType, listId: id },
        //   { settingsId: houseType, listId: id },
        //   { settingsId: buildingSize, listId: id },
        //   { settingsId: bedType, listId: id },
        //   { settingsId: bathroomType, listId: id }
        // ];

        // Bulk create on UserListingData to store other settings of this listingSteps
        // const createOtherSettings = await UserListingData.bulkCreate(otherListSettings);

        // Amenities
        if (amenities != null && amenities != undefined) {
          const removeAmenities = await UserAmenities.destroy({
            where: {
              listId: id
            }
          });
          amenities.map(async (item, key) => {
            let updateAmenities = await UserAmenities.create({
              listId: id,
              amenitiesId: item
            })
          });
        }

        // Safety Amenities
        if (safetyAmenities != null && safetyAmenities != undefined) {
          const removeSafetyAmenities = await UserSafetyAmenities.destroy({
            where: {
              listId: id
            }
          });
          safetyAmenities.map(async (item, key) => {
            let updateSafetyAmenities = await UserSafetyAmenities.create({
              listId: id,
              safetyAmenitiesId: item
            })
          });
        }

        // Spaces
        if (spaces != null && spaces != undefined) {
          const removeSpaces = await UserSpaces.destroy({
            where: {
              listId: id
            }
          });
          spaces.map(async (item, key) => {
            let updateUserSpaces = await UserSpaces.create({
              listId: id,
              spacesId: item
            })
          });
        }

        // -- Experience Types
        if (experienceTypes != null && experienceTypes != undefined) {
          const removeExperienceTypes = await ExperienceType.destroy({
            where: {
              listId: id
            }
          });
          experienceTypes.map(async (item, key) => {
            let updateExperienceTypes = await ExperienceType.create({
              listId: id,
              experienceTypeId: item
            })
          });
        }

        // -- Pluses Included
        if (plusesIncluded != null && plusesIncluded != undefined) {
          const removePlusesIncluded = await PlusesIncluded.destroy({
            where: {
              listId: id
            }
          });
          plusesIncluded.map(async (item, key) => {
            let updatePlusesIncluded = await PlusesIncluded.create({
              listId: id,
              plusId: item
            })
          });
        }

        // -- Spoken Languages
        if (spokenLanguages != null && spokenLanguages != undefined) {
          const removeSpokenLanguages = await SpokenLanguages.destroy({
            where: {
              listId: id
            }
          });
          spokenLanguages.map(async (item, key) => {
            let updateSpokenLanguages = await SpokenLanguages.create({
              listId: id,
              spokenLanguageId: item
            })
          });
        }

        let bedTypeData;
        if (bedTypes && bedTypes.length > 0) {

          bedTypeData = JSON.parse(bedTypes);

          // items included
          if (bedTypeData != null && bedTypeData != undefined) {

            const removeBedTypes = await BedTypes.destroy({
              where: {
                listId: id
              }
            });

            await Promise.all(bedTypeData.map(async (item, key) => {
              let updateBedTypes = await BedTypes.create({
                listId: id,
                bedCount: item.bedCount,
                bedType: item.bedType
              })
            })
            );
          }
        }
        
      }




      if (isListUpdated) {
        return {
          status: 'success'
        }
      } else {
        return {
          status: 'failed'
        }
      }

    } else {
      return {
        status: "notLoggedIn",
      };
    }

  },
};

export default updateListing;
