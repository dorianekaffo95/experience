import DataType from "sequelize";
import Model from "../sequelize";

const SpokenLanguages = Model.define("SpokenLanguages", {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  listId: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  spokenLanguageId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
});

export default SpokenLanguages;
