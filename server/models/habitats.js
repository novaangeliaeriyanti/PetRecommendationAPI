import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class habitats extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    hab_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hab_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "hab_name_uq"
    },
    hab_desc: {
      type: DataTypes.STRING(3000),
      allowNull: true
    },
    hab_url_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'habitats',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "hab_id_pk",
        unique: true,
        fields: [
          { name: "hab_id" },
        ]
      },
      {
        name: "hab_name_uq",
        unique: true,
        fields: [
          { name: "hab_name" },
        ]
      },
    ]
  });
  }
}
