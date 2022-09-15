import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class pets extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    pet_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pet_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "pet_name_uq"
    },
    pet_desc: {
      type: DataTypes.STRING(3000),
      allowNull: true
    },
    pet_url_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pets',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pet_id_pk",
        unique: true,
        fields: [
          { name: "pet_id" },
        ]
      },
      {
        name: "pet_name_uq",
        unique: true,
        fields: [
          { name: "pet_name" },
        ]
      },
    ]
  });
  }
}
