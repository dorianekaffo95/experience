import DataType from "sequelize";
import Model from "../sequelize";

const PrivateExperience = Model.define("PrivateExperience", {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  listId: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  privateExperienceId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
});

export default PrivateExperience;
