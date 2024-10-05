import { sequelize } from '../../config/config';
import { DataTypes } from 'sequelize';

const Page = sequelize.define('pages', {
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
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  status: {
    type: "ENUM('enabled', 'disabled')",
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'pages',
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

export default Page