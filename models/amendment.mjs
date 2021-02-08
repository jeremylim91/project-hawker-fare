export default function amendmentModel(sequelize, DataTypes) {
  return sequelize.define('amendment', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    unitNum: {
      allowNull: false,
      type: DataTypes.STRING,
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
    status: {
      allowNull: false,
      type: DataTypes.STRING,
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
