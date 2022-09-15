import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class hab_lines extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    hablines_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hablines_hab_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'habitats',
        key: 'hab_id'
      }
    },
    hablines_pet_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pets',
        key: 'pet_id'
      }
    },
    hablines_weight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'hab_lines',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "hablines_id_pk",
        unique: true,
        fields: [
          { name: "hablines_id" },
        ]
      },
    ]
  });
  }
}
