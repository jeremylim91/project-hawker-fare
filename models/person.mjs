export default function personModel(sequelize, DataTypes) {
  return sequelize.define(
    'person',
    {
      id: {
        allowNull: false,
        autoIncreement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      amount: {
        allowNull: false,
        type: DataTypes.DECIMAL,
      },
      bill_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'bills',
          key: 'id',
        },
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
