import ListSettingsType from '../../types/siteadmin/AdminListSettingsType';
import { ListSettings, ListSettingsTypes } from '../../../data/models';

import {
  GraphQLString as StringType,
  GraphQLInt as IntType
} from 'graphql';

import translate from '../../../core/translate';

const updateListSettings = {

  type: ListSettingsType,

  args: {
    id: { type: IntType },
    typeId: { type: IntType },
    itemName: { type: StringType },
    itemDescription: { type: StringType },
    otherItemName: { type: StringType },
    maximum: { type: IntType },
    minimum: { type: IntType },
    startValue: { type: IntType },
    endValue: { type: IntType },
    isEnable: { type: StringType },
  },

  async resolve({ request }, {
    id,
    typeId,
    itemName,
    itemDescription,
    otherItemName,
    maximum,
    minimum,
    startValue,
    endValue,
    isEnable
  }) {

    if (request.user && request.user.admin == true) {

      let isListSettingsUpdated = false;

      const modifyListSettings = await ListSettings.update(
        {
          itemName: itemName,
          itemDescription: itemDescription,
          otherItemName: otherItemName,
          maximum: maximum,
          minimum: minimum,
          startValue: startValue,
          endValue: endValue,
          isEnable: isEnable
        },
        {
          where: {
            id: id,
            typeId: typeId
          }
        }
      )
        .then(async function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isListSettingsUpdated = true;

            const settingType = await ListSettingsTypes.findById(typeId);
            console.log("Setting type: ", itemName, itemDescription, otherItemName);

            if (settingType.dataValues.fieldType == 'stringType') {
              await translate([
                {
                    id: `listSetting${id}.itemName`,
                    description: `List setting ${id} item name`,
                    defaultMessage: itemName,
                    message: itemName
                },
                {
                    id: `listSetting${id}.itemDescription`,
                    description: `List setting ${id} item description`,
                    defaultMessage: itemDescription,
                    message: itemDescription
                },
                {
                  id: `listSetting${id}.otherItemName`,
                  description: `List setting ${id} other item name`,
                  defaultMessage: otherItemName,
                  message: otherItemName
                }
              ]);
            };
          }

        });

      if (isListSettingsUpdated) {
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
        status: 'failed'
      }
    }
  },
};

export default updateListSettings;
