import { sequelize } from '../../config/config';
import { DataTypes } from 'sequelize';

const Journal = sequelize.define('journals', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  status: {
    type: "ENUM('enabled', 'disabled')",
    allowNull: false,
    defaultValue: 'enabled',
  },
}, {
  sequelize,
  tableName: 'journals',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
  ]
});

export default Journal