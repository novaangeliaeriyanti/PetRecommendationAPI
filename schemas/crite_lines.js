import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class crite_lines extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    critelines_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    critelines_crite_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'criteria',
        key: 'crite_id'
      }
    },
    critelines_pet_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pets',
        key: 'pet_id'
      }
    },
    critelines_weight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'crite_lines',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "critelines_id_pk",
        unique: true,
        fields: [
          { name: "critelines_id" },
        ]
      },
    ]
  });
  }
}
