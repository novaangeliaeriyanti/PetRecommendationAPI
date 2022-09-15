import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class pet_images extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    petimg_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    petimg_filename: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    petimg_filesize: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    petimg_filetype: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    petimg_pet_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pets',
        key: 'pet_id'
      }
    }
  }, {
    sequelize,
    tableName: 'pet_images',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "petimg_id_pk",
        unique: true,
        fields: [
          { name: "petimg_id" },
        ]
      },
    ]
  });
  }
}
