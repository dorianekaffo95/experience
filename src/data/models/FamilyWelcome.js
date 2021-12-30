import DataType from "sequelize";
import Model from "../sequelize";

const FamilyWelcome = Model.define("FamilyWelcome", {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  listId: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  familyWelcomeId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
});

export default FamilyWelcome;
