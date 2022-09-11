import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class recomendation_results extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    res_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    res_pet_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pets',
        key: 'pet_id'
      }
    }
  }, {
    sequelize,
    tableName: 'recomendation_results',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "res_id_pk",
        unique: true,
        fields: [
          { name: "res_id" },
        ]
      },
    ]
  });
  }
}
