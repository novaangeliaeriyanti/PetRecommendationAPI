import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class criteria extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    crite_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    crite_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "critename_uq"
    },
    crite_desc: {
      type: DataTypes.STRING(3000),
      allowNull: true
    },
    crite_url_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'criteria',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "crite_id_pk",
        unique: true,
        fields: [
          { name: "crite_id" },
        ]
      },
      {
        name: "critename_uq",
        unique: true,
        fields: [
          { name: "crite_name" },
        ]
      },
    ]
  });
  }
}
