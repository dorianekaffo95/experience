import ListSettingsType from '../../types/siteadmin/AdminListSettingsType';
import { ListSettings, ListSettingsTypes } from '../../../data/models';

import {
  GraphQLString as StringType,
  GraphQLInt as IntType
} from 'graphql';

import translate from '../../../core/translate';

const addListSettings = {

  type: ListSettingsType,

  args: {
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

      const insertListSettings = await ListSettings.create({
        typeId: typeId,
        itemName: itemName,
        itemDescription: itemDescription,
        otherItemName: otherItemName,
        maximum: maximum,
        minimum: minimum,
        startValue: startValue,
        endValue: endValue,
        isEnable: isEnable
      });

      const settingType = await ListSettingsTypes.findById(typeId);
      console.log("Setting type: ", settingType);

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

      return {
        status: 'success'
      }
    } else {
      return {
        status: 'failed'
      }
    }
  },
};

export default addListSettings;
