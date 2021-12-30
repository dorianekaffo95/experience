import DataType from "sequelize";
import Model from "../sequelize";

const PlusesIncluded = Model.define("PlusesIncluded", {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  listId: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  plusId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
});

export default PlusesIncluded;
