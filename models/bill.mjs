export default function billModel(sequelize, DataTypes) {
  return sequelize.define(
    'bill',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      total: {
        type: DataTypes.DECIMAL,
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      // The underscored option makes Sequelize reference snake_case names in the DB.
      underscored: true,
    },
  );
}
