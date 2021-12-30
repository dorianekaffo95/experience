import DataType from "sequelize";
import Model from "../sequelize";

const ExperienceHours = Model.define("ExperienceHours", {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  listId: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  startTime: {
    type: DataType.TIME,
  },

  endTime: {
    type: DataType.TIME,
  },

  // Day of the week (Monday - Sunday <=> 0 - 6)
  dayOfWeek: {
    type: DataType.INTEGER,
  },

  //  Day of the month
  dayOfMonth: {
    type: DataType.INTEGER,
  },

  date: {
    type: DataType.DATE,
    allowNull: false,
  },

  frequency: {
    type: DataType.ENUM(['WEEKLY', 'MONTHLY', 'YEARLY', 'IRREGULAR']),
    allowNull: false,
  },

  status: {
    type: DataType.ENUM(['expired', 'booked', 'available']),
    defaultValue: 'available'
  },
});

export default ExperienceHours;
