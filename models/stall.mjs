export default function stallModel(sequelize, DataTypes) {
  return sequelize.define('stall', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    unitNum: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cateogries',
        key: 'id',
      },
    },
    operatingHours: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    menu: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    // The underscored option makes Sequelize reference snake_case names in the DB.
    underscored: true,
  });
}
