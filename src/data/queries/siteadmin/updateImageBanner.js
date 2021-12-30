import ImageBannerType from '../../types/ImageBannerType';
import { ImageBanner } from '../../../data/models';

import {
  GraphQLString as StringType
} from 'graphql';

import translate from '../../../core/translate';

const updateImageBanner = {

  type: ImageBannerType,

  args: {
    title: { type: StringType },
    description: { type: StringType },
    buttonLabel: { type: StringType }
  },

  async resolve({ request }, {
    title,
    description,
    buttonLabel
  }) {

    if (request.user && request.user.admin == true) {
      let isImageBanner = false;

      // Site Name
      const updateBanner = await ImageBanner.update({
        title,
        description,
        buttonLabel
      },
        {
          where: {
            id: 1
          }
        })
        .then(async function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isImageBanner = true;

            // await translate([
            //   {
            //       id: `imageBanner.title`,
            //       description: `Image banner title`,
            //       defaultMessage: title,
            //       message: title    
            //   },
            //   {
            //       id: `imageBanner.description`,
            //       description: `Image banner description`,
            //       defaultMessage: description,
            //       message: description
            //   },
            //   {
            //     id: `imageBanner.buttonLabel`,
            //     description: `Image banner button label`,
            //     defaultMessage: buttonLabel,
            //     message: buttonLabel
            // },
            // ]);

          } else {
            isImageBanner = false;
          }
        });

      if (isImageBanner) {
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
        status: 'notLoggedIn'
      }
    }

  },
};

export default updateImageBanner;
