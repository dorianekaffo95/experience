import DataType from "sequelize";
import Model from "../sequelize";

const ExperienceType = Model.define("ExperienceType", {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  listId: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  experienceTypeId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
});

export default ExperienceType;
